<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::latest()->paginate(15);

        return view('blog-posts.index', compact('blogPosts'));
    }

    public function create()
    {
        return view('blog-posts.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|in:trading,logistics,creative',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'video_url' => 'nullable|url|max:500',
            'featured_image' => 'nullable|image|max:4096',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        BlogPost::create($validated);

        return redirect()->route('blog-posts.index')->with('status', 'Blog post created.');
    }

    public function edit(BlogPost $blogPost)
    {
        return view('blog-posts.edit', compact('blogPost'));
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'division' => 'required|in:trading,logistics,creative',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug,' . $blogPost->id,
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'video_url' => 'nullable|url|max:500',
            'featured_image' => 'nullable|image|max:4096',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        $blogPost->update($validated);

        return redirect()->route('blog-posts.index')->with('status', 'Blog post updated.');
    }

    public function destroy(BlogPost $blogPost)
    {
        if ($blogPost->featured_image) {
            Storage::disk('public')->delete($blogPost->featured_image);
        }

        $blogPost->delete();

        return redirect()->route('blog-posts.index')->with('status', 'Blog post deleted.');
    }
}
