<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostApiController extends Controller
{
    /**
     * List published posts for a given division.
     * GET /api/blog-posts?division=trading
     */
    public function index(Request $request)
    {
        $request->validate([
            'division' => 'required|in:trading,logistics,creative',
        ]);

        $posts = BlogPost::where('division', $request->division)
            ->where('status', 'published')
            ->orderByDesc('published_at')
            ->get([
                'title', 'slug', 'excerpt', 'featured_image',
                'author', 'published_at', 'division',
            ]);

        return response()->json(['data' => $posts]);
    }

    /**
     * Show a single published post by division + slug.
     * GET /api/blog-posts/{division}/{slug}
     */
    public function show(string $division, string $slug)
    {
        $post = BlogPost::where('division', $division)
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return response()->json(['data' => $post]);
    }
}
