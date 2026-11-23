<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Media Library</h2>
            <p class="text-sm text-mangrove-800/50 mt-0.5">
                {{ $total }} {{ $total === 1 ? 'file' : 'files' }} total
                &nbsp;·&nbsp; {{ $imageCount }} {{ $imageCount === 1 ? 'image' : 'images' }}
                &nbsp;·&nbsp; {{ $videoCount }} {{ $videoCount === 1 ? 'video' : 'videos' }}
            </p>
        </div>
        <div class="flex items-center gap-2">
            <form method="POST" action="{{ route('media.scan') }}" class="inline">
                @csrf
                <button type="submit"
                    class="px-4 py-2.5 border border-mangrove-200 text-mangrove-900 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-50 transition-colors whitespace-nowrap">
                    ⟳ Scan Storage
                </button>
            </form>
            <button onclick="document.getElementById('upload-modal').style.display='flex'"
                class="px-5 py-2.5 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors whitespace-nowrap">
                + Upload Files
            </button>
        </div>
    </x-slot>

    {{-- Flash messages --}}
    @if(session('success'))
        <div class="mb-5 px-5 py-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm">
            {{ session('success') }}
        </div>
    @endif
    @if(session('error'))
        <div class="mb-5 px-5 py-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {{ session('error') }}
        </div>
    @endif

    {{-- Filter + Search bar --}}
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        {{-- Type tabs --}}
        <div class="flex items-center gap-1 bg-mangrove-50 rounded-xl p-1">
            @foreach([['all','All',  $total], ['image','Images', $imageCount], ['video','Videos', $videoCount]] as [$val,$label,$count])
                <a href="{{ route('media.index', array_merge(request()->query(), ['type' => $val, 'page' => 1])) }}"
                   class="px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors
                          {{ $type === $val ? 'bg-white shadow-sm text-mangrove-900' : 'text-mangrove-800/50 hover:text-mangrove-900' }}">
                    {{ $label }}
                    <span class="ml-1 text-mangrove-800/40 normal-case tracking-normal font-normal">{{ $count }}</span>
                </a>
            @endforeach
        </div>

        {{-- Search --}}
        <form method="GET" action="{{ route('media.index') }}" class="sm:ml-auto flex gap-2">
            <input type="hidden" name="type" value="{{ $type }}">
            <input type="search" name="search" value="{{ $search }}" placeholder="Search by name or alt text…"
                class="w-64 border border-mangrove-100 rounded-xl px-4 py-2 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
            <button type="submit"
                class="px-4 py-2 bg-mangrove-900 text-mangrove-accent rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                Search
            </button>
            @if($search)
                <a href="{{ route('media.index', ['type' => $type]) }}"
                   class="px-4 py-2 border border-mangrove-200 text-mangrove-700 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-50">
                    Clear
                </a>
            @endif
        </form>
    </div>

    {{-- Grid --}}
    @if($media->isEmpty())
        <div class="flex flex-col items-center justify-center py-24 text-center">
            <div class="w-16 h-16 rounded-2xl bg-mangrove-50 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-mangrove-800/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <p class="text-mangrove-900 font-semibold">No media files yet</p>
            <p class="text-sm text-mangrove-800/50 mt-1">Upload files or click "Scan Storage" to import existing files.</p>
        </div>
    @else
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
            @foreach($media as $item)
                @php
                    // Absolute URL: frontend files already have http://...
                    // Backend storage files need asset() to prepend app URL
                    $previewUrl = str_starts_with($item->url, 'http') ? $item->url : asset($item->url);
                    $mediaData  = json_encode([
                        'id'      => $item->id,
                        'type'    => $item->isImage() ? 'image' : ($item->isVideo() ? 'video' : 'file'),
                        'url'     => $previewUrl,
                        'name'    => $item->original_name,
                        'size'    => $item->humanSize(),
                        'mime'    => $item->mime_type,
                        'dims'    => $item->dimensionsLabel(),
                        'alt'     => $item->alt_text ?? '',
                        'title'   => $item->title ?? '',
                        'caption' => $item->caption ?? '',
                        'date'    => $item->created_at->format('d M Y, H:i'),
                        'path'    => $item->path,
                        'disk'    => $item->disk,
                        'updateUrl'  => route('media.update',  $item),
                        'destroyUrl' => route('media.destroy', $item),
                    ]);
                @endphp
                <button type="button"
                        data-media='{{ $mediaData }}'
                        onclick="mediaOpen(this)"
                        class="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent
                               hover:border-mangrove-accent focus:outline-none focus:border-mangrove-accent
                               bg-mangrove-50 transition-all duration-200">

                    @if($item->isImage())
                        <img src="{{ $previewUrl }}"
                             alt="{{ $item->alt_text ?: $item->original_name }}"
                             loading="lazy"
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                    @elseif($item->isVideo())
                        <div class="w-full h-full flex flex-col items-center justify-center bg-mangrove-900/90">
                            <svg class="w-10 h-10 text-mangrove-accent" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span class="mt-2 text-[10px] uppercase tracking-widest text-white/60">
                                {{ strtoupper(pathinfo($item->filename, PATHINFO_EXTENSION)) }}
                            </span>
                        </div>
                    @else
                        <div class="w-full h-full flex items-center justify-center bg-mangrove-100">
                            <svg class="w-8 h-8 text-mangrove-800/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                    @endif

                    {{-- Hover overlay --}}
                    <div class="absolute inset-0 bg-mangrove-900/0 group-hover:bg-mangrove-900/60 transition-colors duration-200 flex flex-col justify-end p-2">
                        <p class="text-white text-[10px] leading-tight font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {{ $item->original_name }}
                        </p>
                        <div class="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span class="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold
                                {{ $item->isImage() ? 'bg-blue-500/80 text-white' : ($item->isVideo() ? 'bg-purple-600/80 text-white' : 'bg-mangrove-500/80 text-white') }}">
                                {{ $item->typeLabel() }}
                            </span>
                            <span class="text-white/70 text-[9px]">{{ $item->humanSize() }}</span>
                        </div>
                    </div>

                    {{-- Missing alt indicator --}}
                    @if(!$item->alt_text && $item->isImage())
                        <div class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md" title="No alt text"></div>
                    @endif
                </button>
            @endforeach
        </div>

        {{-- Pagination --}}
        @if($media->hasPages())
            <div class="mt-6">
                {{ $media->links() }}
            </div>
        @endif
    @endif


    {{-- ===================== DETAIL PANEL ===================== --}}
    <div id="media-backdrop"
         onclick="mediaClose()"
         style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.3); z-index:9000; backdrop-filter:blur(2px); opacity:0; transition:opacity 0.3s ease;">
    </div>

    <div id="media-panel"
         style="position:fixed; top:0; right:0; height:100%; width:440px; max-width:95vw; z-index:9001;
                display:flex; flex-direction:column; transform:translateX(100%);
                transition:transform 0.32s cubic-bezier(0.16,1,0.3,1);
                background:#fff; border-left:1px solid #e9e3d6; box-shadow:-8px 0 40px rgba(0,0,0,0.12);">

        {{-- Panel header --}}
        <div style="flex-shrink:0; display:flex; align-items:center; justify-content:space-between; padding:1.25rem 1.5rem; border-bottom:1px solid #e9e3d6;">
            <span class="font-serif font-semibold text-mangrove-900" id="panel-title">File Details</span>
            <button onclick="mediaClose()" class="text-mangrove-800/40 hover:text-mangrove-900 transition-colors p-1 rounded-lg hover:bg-mangrove-50">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>

        {{-- Scrollable body --}}
        <div style="flex:1; overflow-y:auto;">

            {{-- Preview --}}
            <div id="panel-preview" style="background:#1a1a1a; height:220px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
            </div>

            {{-- File metadata --}}
            <div class="p-5 border-b border-mangrove-100">
                <p id="panel-name" class="font-semibold text-mangrove-900 text-sm break-all mb-3"></p>
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="bg-mangrove-50 rounded-lg p-3">
                        <div class="text-mangrove-800/40 uppercase tracking-wider text-[10px] mb-0.5">Type</div>
                        <div id="panel-type" class="font-semibold text-mangrove-900"></div>
                    </div>
                    <div class="bg-mangrove-50 rounded-lg p-3">
                        <div class="text-mangrove-800/40 uppercase tracking-wider text-[10px] mb-0.5">File Size</div>
                        <div id="panel-size" class="font-semibold text-mangrove-900"></div>
                    </div>
                    <div id="panel-dims-wrap" class="bg-mangrove-50 rounded-lg p-3">
                        <div class="text-mangrove-800/40 uppercase tracking-wider text-[10px] mb-0.5">Dimensions</div>
                        <div id="panel-dims" class="font-semibold text-mangrove-900"></div>
                    </div>
                    <div class="bg-mangrove-50 rounded-lg p-3">
                        <div class="text-mangrove-800/40 uppercase tracking-wider text-[10px] mb-0.5">Uploaded</div>
                        <div id="panel-date" class="font-semibold text-mangrove-900"></div>
                    </div>
                </div>

                {{-- URL copy --}}
                <div class="mt-3 flex gap-2">
                    <input id="panel-url-input" readonly type="text"
                           class="flex-1 min-w-0 border border-mangrove-100 rounded-lg px-3 py-2 text-xs text-mangrove-800 bg-mangrove-50 font-mono truncate">
                    <button onclick="copyUrl()" id="copy-btn"
                            class="px-3 py-2 border border-mangrove-200 rounded-lg text-xs font-semibold text-mangrove-900 hover:bg-mangrove-50 whitespace-nowrap transition-colors">
                        Copy URL
                    </button>
                </div>
            </div>

            {{-- SEO & Metadata fields --}}
            <div class="p-5">
                <p class="text-xs uppercase tracking-widest text-mangrove-800/50 font-semibold mb-4">SEO & Metadata</p>

                <div class="space-y-4">
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">
                            Alt Text
                            <span class="ml-1 text-mangrove-800/30 normal-case tracking-normal font-normal">(describes the image for screen readers & search engines)</span>
                        </label>
                        <textarea id="field-alt" rows="2"
                            placeholder="A container ship arriving at Port of Jebel Ali at sunrise…"
                            class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent resize-none"></textarea>
                        <div id="alt-counter" class="text-right text-[10px] text-mangrove-800/30 mt-0.5"></div>
                    </div>

                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">
                            SEO Title / File Name Label
                        </label>
                        <input id="field-title" type="text"
                            placeholder="Logistics port sunrise — Mangroves Global"
                            class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                        <div id="title-counter" class="text-right text-[10px] text-mangrove-800/30 mt-0.5"></div>
                    </div>

                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">
                            Caption
                            <span class="ml-1 text-mangrove-800/30 normal-case tracking-normal font-normal">(shown below image in blog posts)</span>
                        </label>
                        <textarea id="field-caption" rows="2"
                            placeholder="Optional caption displayed beneath the image."
                            class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent resize-none"></textarea>
                    </div>
                </div>

                <div class="flex items-center gap-3 mt-5">
                    <button onclick="mediaSave()"
                        class="flex-1 py-3 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                        Save Changes
                    </button>
                    <div id="save-status" class="text-xs text-mangrove-800/50 hidden">Saved ✓</div>
                </div>

                {{-- Delete / Static notice --}}
                <div class="mt-6 pt-5 border-t border-mangrove-100">
                    <div id="panel-delete-wrap">
                        <p class="text-xs text-mangrove-800/40 mb-3">
                            Deleting a file removes it permanently from storage. Any page or post that uses this file will show a broken image.
                        </p>
                        <button onclick="mediaDelete()"
                            class="w-full py-3 border border-red-200 text-red-600 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-red-50 transition-colors">
                            Delete File
                        </button>
                    </div>
                    <div id="panel-static-notice" style="display:none;"
                         class="flex items-start gap-2 px-4 py-3 bg-mangrove-50 rounded-xl">
                        <svg class="w-4 h-4 text-mangrove-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                        <p class="text-xs text-mangrove-800/60">
                            <strong class="text-mangrove-900">Static file</strong> — this image is part of the site codebase.
                            To replace it, update the file in <code class="font-mono text-mangrove-accent">frontend/public/</code> and re-scan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    {{-- ===================== UPLOAD MODAL ===================== --}}
    <div id="upload-modal" style="display:none; position:fixed; inset:0; z-index:9500; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);">
        <div style="background:#fff; border-radius:1.5rem; width:480px; max-width:95vw; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,0.25);">
            <div class="flex items-center justify-between px-6 py-5 border-b border-mangrove-100">
                <span class="font-serif font-semibold text-mangrove-900 text-lg">Upload Media Files</span>
                <button onclick="document.getElementById('upload-modal').style.display='none'"
                        class="text-mangrove-800/40 hover:text-mangrove-900 p-1 rounded-lg hover:bg-mangrove-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>

            <form id="upload-form" method="POST" action="{{ route('media.store') }}" enctype="multipart/form-data" class="p-6">
                @csrf

                {{-- Drop zone --}}
                <div id="drop-zone"
                     onclick="document.getElementById('file-input').click()"
                     ondragover="event.preventDefault(); this.classList.add('border-mangrove-accent','bg-mangrove-accent/5')"
                     ondragleave="this.classList.remove('border-mangrove-accent','bg-mangrove-accent/5')"
                     ondrop="handleDrop(event)"
                     class="border-2 border-dashed border-mangrove-200 rounded-2xl p-10 text-center cursor-pointer hover:border-mangrove-accent hover:bg-mangrove-50 transition-colors">
                    <svg class="w-10 h-10 text-mangrove-800/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <p class="text-mangrove-900 font-semibold text-sm">Drop files here or click to browse</p>
                    <p class="text-mangrove-800/40 text-xs mt-1">Images (JPG, PNG, WebP, GIF, SVG) and Videos (MP4, WebM, MOV)</p>
                    <p class="text-mangrove-800/30 text-xs mt-0.5">Up to 20 files · Max 100 MB each</p>
                </div>

                <input id="file-input" type="file" name="files[]" multiple
                       accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime,video/x-msvideo"
                       class="sr-only"
                       onchange="previewFiles(this.files)">

                {{-- File preview list --}}
                <div id="file-preview" class="mt-4 space-y-2 max-h-48 overflow-y-auto hidden"></div>

                <div class="flex gap-3 mt-5">
                    <button type="button" onclick="document.getElementById('upload-modal').style.display='none'"
                        class="flex-1 py-3 border border-mangrove-200 text-mangrove-900 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-50 transition-colors">
                        Cancel
                    </button>
                    <button id="upload-btn" type="submit" disabled
                        class="flex-1 py-3 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        Upload Files
                    </button>
                </div>
            </form>
        </div>
    </div>


    {{-- ===================== JAVASCRIPT ===================== --}}
    <script>
    var _currentMedia = null;

    // ── Open detail panel ──────────────────────────────────────────
    function mediaOpen(btn) {
        var data = JSON.parse(btn.getAttribute('data-media'));
        _currentMedia = data;

        // Header
        document.getElementById('panel-title').textContent = data.name;

        // Preview
        var preview = document.getElementById('panel-preview');
        if (data.type === 'image') {
            preview.innerHTML = '<img src="' + escHtml(data.url) + '" alt="" style="max-height:220px;max-width:100%;object-fit:contain;">';
        } else if (data.type === 'video') {
            preview.innerHTML = '<video src="' + escHtml(data.url) + '" controls style="max-height:220px;max-width:100%;"></video>';
        } else {
            preview.innerHTML = '<div style="color:#9e8b6e;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;">File</div>';
        }

        // Meta
        document.getElementById('panel-name').textContent = data.name;
        document.getElementById('panel-type').textContent = data.mime;
        document.getElementById('panel-size').textContent = data.size;
        document.getElementById('panel-date').textContent = data.date;

        var dimsWrap = document.getElementById('panel-dims-wrap');
        if (data.dims) {
            document.getElementById('panel-dims').textContent = data.dims;
            dimsWrap.style.display = '';
        } else {
            dimsWrap.style.display = 'none';
        }

        document.getElementById('panel-url-input').value = data.url;

        // SEO fields
        document.getElementById('field-alt').value     = data.alt     || '';
        document.getElementById('field-title').value   = data.title   || '';
        document.getElementById('field-caption').value = data.caption || '';
        updateCounters();

        document.getElementById('save-status').classList.add('hidden');

        // Delete vs static notice
        var isStatic = data.disk === 'frontend';
        document.getElementById('panel-delete-wrap').style.display  = isStatic ? 'none' : '';
        document.getElementById('panel-static-notice').style.display = isStatic ? ''     : 'none';

        // Slide panel in
        var panel    = document.getElementById('media-panel');
        var backdrop = document.getElementById('media-backdrop');
        backdrop.style.display = '';
        setTimeout(function () {
            backdrop.style.opacity = '1';
            panel.style.transform  = 'translateX(0)';
        }, 10);
    }

    // ── Close panel ────────────────────────────────────────────────
    function mediaClose() {
        var panel    = document.getElementById('media-panel');
        var backdrop = document.getElementById('media-backdrop');
        panel.style.transform  = 'translateX(100%)';
        backdrop.style.opacity = '0';
        setTimeout(function () { backdrop.style.display = 'none'; }, 320);
        _currentMedia = null;
    }

    // ── Save SEO data via AJAX ─────────────────────────────────────
    function mediaSave() {
        if (!_currentMedia) return;
        var btn = event.currentTarget;
        btn.textContent = 'Saving…';
        btn.disabled = true;

        var csrf = document.querySelector('meta[name="csrf-token"]');
        fetch(_currentMedia.updateUrl, {
            method: 'PATCH',
            headers: {
                'X-CSRF-TOKEN':  csrf ? csrf.content : '',
                'Content-Type':  'application/json',
                'Accept':        'application/json',
            },
            body: JSON.stringify({
                alt_text: document.getElementById('field-alt').value,
                title:    document.getElementById('field-title').value,
                caption:  document.getElementById('field-caption').value,
            }),
        })
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (data.success) {
                // Update stored data
                _currentMedia.alt     = document.getElementById('field-alt').value;
                _currentMedia.title   = document.getElementById('field-title').value;
                _currentMedia.caption = document.getElementById('field-caption').value;

                var status = document.getElementById('save-status');
                status.textContent = '✓ Saved';
                status.classList.remove('hidden');
                setTimeout(function () { status.classList.add('hidden'); }, 2500);

                // Update the amber indicator on the grid button
                updateAltIndicator();
            }
        })
        .catch(function () {
            alert('Save failed — please try again.');
        })
        .finally(function () {
            btn.textContent = 'Save Changes';
            btn.disabled = false;
        });
    }

    // ── Delete file ────────────────────────────────────────────────
    function mediaDelete() {
        if (!_currentMedia) return;
        if (!confirm('Delete "' + _currentMedia.name + '"?\n\nThis removes the file permanently. Any page using this file will show a broken image.')) return;

        var csrf = document.querySelector('meta[name="csrf-token"]');
        fetch(_currentMedia.destroyUrl, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrf ? csrf.content : '',
                'Accept':       'application/json',
            },
        })
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (data.success) {
                mediaClose();
                // Remove card from grid
                var btns = document.querySelectorAll('[data-media]');
                btns.forEach(function (b) {
                    var d = JSON.parse(b.getAttribute('data-media'));
                    if (d.id === _currentMedia.id) b.closest('div,button').remove();
                });
                window.location.reload();
            }
        })
        .catch(function () {
            alert('Delete failed — please try again.');
        });
    }

    // ── Copy URL ───────────────────────────────────────────────────
    function copyUrl() {
        var input = document.getElementById('panel-url-input');
        var btn   = document.getElementById('copy-btn');
        navigator.clipboard.writeText(input.value).then(function () {
            btn.textContent = 'Copied!';
            setTimeout(function () { btn.textContent = 'Copy URL'; }, 2000);
        }).catch(function () {
            input.select();
            document.execCommand('copy');
            btn.textContent = 'Copied!';
            setTimeout(function () { btn.textContent = 'Copy URL'; }, 2000);
        });
    }

    // ── Character counters ─────────────────────────────────────────
    function updateCounters() {
        var alt   = document.getElementById('field-alt').value;
        var title = document.getElementById('field-title').value;
        document.getElementById('alt-counter').textContent   = alt.length   + ' / 500 chars · ' + (alt.length < 50 ? 'Too short for good SEO' : alt.length > 300 ? 'Consider shorter' : 'Good length');
        document.getElementById('title-counter').textContent = title.length + ' / 255 chars';
    }

    document.getElementById('field-alt').addEventListener('input', updateCounters);
    document.getElementById('field-title').addEventListener('input', updateCounters);

    // ── Update amber alt-missing indicator on grid card ───────────
    function updateAltIndicator() {
        if (!_currentMedia) return;
        var btns = document.querySelectorAll('[data-media]');
        btns.forEach(function (b) {
            var d = JSON.parse(b.getAttribute('data-media'));
            if (d.id !== _currentMedia.id) return;
            var dot = b.querySelector('.alt-dot');
            if (_currentMedia.alt) {
                if (dot) dot.remove();
            } else {
                if (!dot && d.type === 'image') {
                    var newDot = document.createElement('div');
                    newDot.className = 'alt-dot absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md';
                    b.appendChild(newDot);
                }
            }
        });
    }

    // ── XSS helper ─────────────────────────────────────────────────
    function escHtml(str) {
        return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    // ── Upload modal: file preview ─────────────────────────────────
    function previewFiles(files) {
        var list = document.getElementById('file-preview');
        var btn  = document.getElementById('upload-btn');
        list.innerHTML = '';

        if (!files || files.length === 0) {
            list.classList.add('hidden');
            btn.disabled = true;
            return;
        }

        list.classList.remove('hidden');
        btn.disabled = false;
        btn.textContent = 'Upload ' + files.length + ' ' + (files.length === 1 ? 'File' : 'Files');

        Array.from(files).forEach(function (f) {
            var size = f.size < 1048576 ? Math.round(f.size / 1024) + ' KB' : (f.size / 1048576).toFixed(1) + ' MB';
            var row  = document.createElement('div');
            row.className = 'flex items-center gap-3 px-3 py-2 bg-mangrove-50 rounded-xl text-xs';
            row.innerHTML = '<span class="flex-1 truncate font-medium text-mangrove-900">' + escHtml(f.name) + '</span>'
                          + '<span class="text-mangrove-800/40 shrink-0">' + escHtml(size) + '</span>';
            list.appendChild(row);
        });
    }

    function handleDrop(event) {
        event.preventDefault();
        var zone  = document.getElementById('drop-zone');
        zone.classList.remove('border-mangrove-accent','bg-mangrove-accent/5');
        var input = document.getElementById('file-input');
        // Assign dropped files to the input (using DataTransfer)
        var dt = new DataTransfer();
        Array.from(event.dataTransfer.files).forEach(function (f) { dt.items.add(f); });
        input.files = dt.files;
        previewFiles(input.files);
    }

    // Close upload modal on backdrop click
    document.getElementById('upload-modal').addEventListener('click', function(e) {
        if (e.target === this) this.style.display = 'none';
    });

    // Keyboard close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            mediaClose();
            document.getElementById('upload-modal').style.display = 'none';
        }
    });
    </script>
</x-app-layout>
