<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class MediaController extends Controller
{
    private const ALLOWED_EXTS = [
        'jpg', 'jpeg', 'png', 'webp', 'gif', 'svg',
        'ico', 'avif',                                   // small icons / modern formats
        'mp4', 'webm', 'mov', 'avi',
    ];

    // ── Index ───────────────────────────────────────────────────────
    public function index(Request $request)
    {
        $type   = $request->query('type', 'all');
        $search = $request->query('search', '');

        $query = Media::query()->latest();

        if ($type === 'image') {
            $query->where('mime_type', 'like', 'image/%');
        } elseif ($type === 'video') {
            $query->where('mime_type', 'like', 'video/%');
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('original_name', 'like', "%{$search}%")
                  ->orWhere('title',         'like', "%{$search}%")
                  ->orWhere('alt_text',       'like', "%{$search}%");
            });
        }

        $media      = $query->paginate(60)->withQueryString();
        $total      = Media::count();
        $imageCount = Media::where('mime_type', 'like', 'image/%')->count();
        $videoCount = Media::where('mime_type', 'like', 'video/%')->count();

        return view('media.index', compact('media', 'total', 'imageCount', 'videoCount', 'type', 'search'));
    }

    // ── Upload ──────────────────────────────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'files'   => 'required|array|min:1|max:20',
            'files.*' => 'required|file|mimes:jpeg,jpg,png,webp,gif,svg,ico,mp4,webm,mov,avi|max:102400',
        ]);

        $uploaded = 0;
        foreach ($request->file('files') as $file) {
            $mime     = $file->getMimeType() ?? 'application/octet-stream';
            $origName = $file->getClientOriginalName();
            $path     = $file->store('media-library', 'public');
            $url      = Storage::url($path);
            $size     = $file->getSize();
            $width    = null;
            $height   = null;

            if (str_starts_with($mime, 'image/') && $mime !== 'image/svg+xml') {
                try { [$width, $height] = getimagesize($file->getRealPath()); } catch (\Throwable) {}
            }

            Media::create([
                'original_name' => $origName,
                'filename'      => basename($path),
                'path'          => $path,
                'url'           => $url,
                'disk'          => 'storage',
                'mime_type'     => $mime,
                'size'          => $size,
                'width'         => $width,
                'height'        => $height,
                'title'         => pathinfo($origName, PATHINFO_FILENAME),
                'alt_text'      => '',
            ]);
            $uploaded++;
        }

        $noun = $uploaded === 1 ? 'file' : 'files';
        return redirect()->route('media.index')
            ->with('success', "Uploaded {$uploaded} {$noun} successfully.");
    }

    // ── Update SEO metadata ─────────────────────────────────────────
    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'alt_text' => 'nullable|string|max:500',
            'title'    => 'nullable|string|max:255',
            'caption'  => 'nullable|string|max:2000',
        ]);

        $media->update($data);

        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'media' => $media]);
        }

        return back()->with('success', 'Media details updated.');
    }

    // ── Delete ──────────────────────────────────────────────────────
    public function destroy(Media $media)
    {
        if ($media->disk === 'frontend') {
            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'error' => 'Static files cannot be deleted here — they are part of the codebase.'], 403);
            }
            return back()->with('error', 'Static frontend files cannot be deleted from the admin.');
        }

        Storage::disk('public')->delete($media->path);
        $media->delete();

        if (request()->expectsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->route('media.index')->with('success', 'File deleted successfully.');
    }

    // ── Scan both storage and frontend/public ───────────────────────
    public function scan()
    {
        $trackedPaths = Media::pluck('path')->flip();
        $imported     = 0;

        // ── 1. Laravel public storage disk ─────────────────────────
        foreach (Storage::disk('public')->allFiles() as $path) {
            if ($trackedPaths->has($path)) continue;

            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            if (!in_array($ext, self::ALLOWED_EXTS)) continue;

            $basename = basename($path);
            if (str_starts_with($basename, '.')) continue;

            $fullPath = Storage::disk('public')->path($path);
            if (!file_exists($fullPath)) continue;

            $size  = Storage::disk('public')->size($path);
            $mime  = mime_content_type($fullPath) ?: 'application/octet-stream';
            $url   = Storage::url($path);
            [$width, $height] = $this->imageDimensions($fullPath, $mime);

            Media::create([
                'original_name' => $basename,
                'filename'      => $basename,
                'path'          => $path,
                'url'           => $url,
                'disk'          => 'storage',
                'mime_type'     => $mime,
                'size'          => $size,
                'width'         => $width,
                'height'        => $height,
                'title'         => pathinfo($basename, PATHINFO_FILENAME),
                'alt_text'      => '',
            ]);
            $imported++;
        }

        // ── 2. Next.js frontend/public directory ────────────────────
        $frontendPublic = $this->frontendPublicPath();

        if ($frontendPublic && is_dir($frontendPublic)) {
            $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');

            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator(
                    $frontendPublic,
                    RecursiveDirectoryIterator::SKIP_DOTS
                ),
                RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($iterator as $file) {
                if (!$file->isFile()) continue;

                $ext = strtolower($file->getExtension());
                if (!in_array($ext, self::ALLOWED_EXTS)) continue;

                $basename = $file->getFilename();
                // Skip hidden files and Next.js build artefacts
                if (str_starts_with($basename, '.') || str_starts_with($basename, '_next')) continue;

                // Relative web path  e.g. images/icons/sea-freight-icon.png
                $absPath = $file->getPathname();
                $relPath = ltrim(str_replace($frontendPublic, '', $absPath), '/\\');
                $relPath = str_replace('\\', '/', $relPath);

                // Skip _next build artefacts anywhere in the path
                if (str_contains($relPath, '_next/')) continue;

                // Key used to detect duplicates
                $mediaKey = 'frontend/' . $relPath;
                if ($trackedPaths->has($mediaKey)) continue;

                $size = $file->getSize();
                $mime = mime_content_type($absPath) ?: 'application/octet-stream';
                $url  = $frontendUrl . '/' . $relPath;

                [$width, $height] = $this->imageDimensions($absPath, $mime);

                Media::create([
                    'original_name' => $basename,
                    'filename'      => $basename,
                    'path'          => $mediaKey,          // 'frontend/images/icons/...'
                    'url'           => $url,               // full http://... URL for preview
                    'disk'          => 'frontend',
                    'mime_type'     => $mime,
                    'size'          => $size,
                    'width'         => $width,
                    'height'        => $height,
                    'title'         => pathinfo($basename, PATHINFO_FILENAME),
                    'alt_text'      => '',
                ]);
                $imported++;
            }
        }

        $noun = $imported === 1 ? 'file' : 'files';
        $msg  = $imported > 0
            ? "Found and imported {$imported} {$noun} into the media library."
            : 'No new files found — everything is already tracked.';

        return redirect()->route('media.index')->with('success', $msg);
    }

    // ── Helpers ─────────────────────────────────────────────────────

    private function frontendPublicPath(): ?string
    {
        // Try sibling directory (monorepo layout: /project/backend  /project/frontend)
        $candidate = dirname(base_path()) . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR . 'public';
        if (is_dir($candidate)) return realpath($candidate);

        // Allow override via .env
        $env = env('FRONTEND_PUBLIC_PATH');
        if ($env && is_dir($env)) return realpath($env);

        return null;
    }

    private function imageDimensions(string $path, string $mime): array
    {
        if (str_starts_with($mime, 'image/') && !in_array($mime, ['image/svg+xml', 'image/gif'])) {
            try {
                $info = getimagesize($path);
                if ($info) return [(int) $info[0], (int) $info[1]];
            } catch (\Throwable) {}
        }
        return [null, null];
    }
}
