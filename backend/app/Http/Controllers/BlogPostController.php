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
            'division'           => 'required|in:trading,logistics,creative',
            'title'              => 'required|string|max:255',
            'slug'               => 'nullable|string|max:255|unique:blog_posts,slug',
            'excerpt'            => 'nullable|string|max:500',
            'content'            => 'required|string',
            'video_url'          => 'nullable|url|max:500',
            'featured_image'     => 'nullable|image|max:4096',
            'meta_title'         => 'nullable|string|max:255',
            'meta_description'   => 'nullable|string|max:255',
            'focus_keyword'      => 'nullable|string|max:255',
            'og_title'           => 'nullable|string|max:255',
            'og_description'     => 'nullable|string|max:500',
            'og_image'           => 'nullable|image|max:4096',
            'twitter_card'       => 'nullable|in:summary_large_image,summary',
            'twitter_title'      => 'nullable|string|max:255',
            'twitter_description'=> 'nullable|string|max:500',
            'twitter_image'      => 'nullable|image|max:4096',
            'canonical_url'      => 'nullable|string|max:500',
            'robots'             => 'nullable|string|max:100',
            'schema_type'        => 'nullable|string|max:100',
            'custom_schema_json' => 'nullable|string',
            'tags'               => 'nullable|string|max:500',
            'author'             => 'nullable|string|max:255',
            'status'             => 'required|in:draft,published',
            'published_at'       => 'nullable|date',
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        if ($request->hasFile('og_image')) {
            $path = $request->file('og_image')->store('blog-og-images', 'public');
            $validated['og_image'] = rtrim(config('app.url'), '/') . '/storage/' . $path;
        }

        if ($request->hasFile('twitter_image')) {
            $path = $request->file('twitter_image')->store('blog-og-images', 'public');
            $validated['twitter_image'] = rtrim(config('app.url'), '/') . '/storage/' . $path;
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
            'division'           => 'required|in:trading,logistics,creative',
            'title'              => 'required|string|max:255',
            'slug'               => 'nullable|string|max:255|unique:blog_posts,slug,' . $blogPost->id,
            'excerpt'            => 'nullable|string|max:500',
            'content'            => 'required|string',
            'video_url'          => 'nullable|url|max:500',
            'featured_image'     => 'nullable|image|max:4096',
            'meta_title'         => 'nullable|string|max:255',
            'meta_description'   => 'nullable|string|max:255',
            'focus_keyword'      => 'nullable|string|max:255',
            'og_title'           => 'nullable|string|max:255',
            'og_description'     => 'nullable|string|max:500',
            'og_image'           => 'nullable|image|max:4096',
            'twitter_card'       => 'nullable|in:summary_large_image,summary',
            'twitter_title'      => 'nullable|string|max:255',
            'twitter_description'=> 'nullable|string|max:500',
            'twitter_image'      => 'nullable|image|max:4096',
            'canonical_url'      => 'nullable|string|max:500',
            'robots'             => 'nullable|string|max:100',
            'schema_type'        => 'nullable|string|max:100',
            'custom_schema_json' => 'nullable|string',
            'tags'               => 'nullable|string|max:500',
            'author'             => 'nullable|string|max:255',
            'status'             => 'required|in:draft,published',
            'published_at'       => 'nullable|date',
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        if ($request->hasFile('og_image')) {
            if ($blogPost->og_image) {
                $existingPath = str_replace(rtrim(config('app.url'), '/') . '/storage/', '', $blogPost->og_image);
                Storage::disk('public')->delete($existingPath);
            }
            $path = $request->file('og_image')->store('blog-og-images', 'public');
            $validated['og_image'] = rtrim(config('app.url'), '/') . '/storage/' . $path;
        }

        if ($request->hasFile('twitter_image')) {
            if ($blogPost->twitter_image) {
                $existingPath = str_replace(rtrim(config('app.url'), '/') . '/storage/', '', $blogPost->twitter_image);
                Storage::disk('public')->delete($existingPath);
            }
            $path = $request->file('twitter_image')->store('blog-og-images', 'public');
            $validated['twitter_image'] = rtrim(config('app.url'), '/') . '/storage/' . $path;
        }

        $blogPost->update($validated);

        return redirect()->route('blog-posts.index')->with('status', 'Blog post updated.');
    }

    public function destroy(BlogPost $blogPost)
    {
        foreach (['featured_image', 'og_image', 'twitter_image'] as $field) {
            if ($blogPost->$field) {
                Storage::disk('public')->delete($blogPost->$field);
            }
        }

        $blogPost->delete();

        return redirect()->route('blog-posts.index')->with('status', 'Blog post deleted.');
    }
}
