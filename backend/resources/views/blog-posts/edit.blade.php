<x-app-layout>
    <x-slot name="header">
        <div>
            <a href="{{ route('blog-posts.index') }}" class="text-xs uppercase tracking-widest text-mangrove-accent">&larr; Back to Blog Posts</a>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900 mt-2">Edit Blog Post</h2>
        </div>
    </x-slot>

    @if ($errors->any())
        <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
            <ul class="list-disc pl-5">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('blog-posts.update', $blogPost) }}" enctype="multipart/form-data" class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-6">
        @csrf
        @method('PUT')

        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Division</label>
                <select name="division" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                    <option value="trading" @selected(old('division', $blogPost->division) === 'trading')>Trading</option>
                    <option value="logistics" @selected(old('division', $blogPost->division) === 'logistics')>Logistics</option>
                    <option value="creative" @selected(old('division', $blogPost->division) === 'creative')>Creative</option>
                </select>
            </div>
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Status</label>
                <select name="status" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                    <option value="draft" @selected(old('status', $blogPost->status) === 'draft')>Draft</option>
                    <option value="published" @selected(old('status', $blogPost->status) === 'published')>Published</option>
                </select>
            </div>
        </div>

        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Title</label>
            <input type="text" name="title" value="{{ old('title', $blogPost->title) }}" required class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
        </div>

        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">URL Slug</label>
            <input type="text" name="slug" value="{{ old('slug', $blogPost->slug) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
        </div>

        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Excerpt</label>
            <textarea name="excerpt" rows="2" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">{{ old('excerpt', $blogPost->excerpt) }}</textarea>
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Featured Image</label>
                @if ($blogPost->featured_image)
                    <img src="{{ Storage::url($blogPost->featured_image) }}" class="w-32 h-20 object-cover rounded-lg border border-mangrove-100 mb-2">
                @endif
                <input type="file" name="featured_image" accept="image/*" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white">
                <p class="text-xs text-mangrove-800/40 mt-1">JPG or PNG, up to 4MB. Leave blank to keep the current image.</p>
            </div>
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Video URL (optional)</label>
                <input type="url" name="video_url" value="{{ old('video_url', $blogPost->video_url) }}" placeholder="https://youtube.com/watch?v=..." class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
            </div>
        </div>

        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Content</label>
            <textarea name="content" rows="12" required class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm font-mono">{{ old('content', $blogPost->content) }}</textarea>
            <p class="text-xs text-mangrove-800/40 mt-2">Plain text for now — a rich text editor can be added later.</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Author</label>
                <input type="text" name="author" value="{{ old('author', $blogPost->author) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
            </div>
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Published Date</label>
                <input type="date" name="published_at" value="{{ old('published_at', $blogPost->published_at?->format('Y-m-d')) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-5 pt-6 border-t border-mangrove-100">
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">SEO Meta Title</label>
                <input type="text" name="meta_title" value="{{ old('meta_title', $blogPost->meta_title) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
            </div>
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">SEO Meta Description</label>
                <input type="text" name="meta_description" value="{{ old('meta_description', $blogPost->meta_description) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
            </div>
        </div>

        <button type="submit" class="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
            Update Blog Post
        </button>
    </form>
</x-app-layout>
