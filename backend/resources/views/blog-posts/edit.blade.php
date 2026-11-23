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
            <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">
            <div id="editor-container" style="min-height: 320px;" class="bg-white border border-mangrove-100 rounded-xl">{!! old('content', $blogPost->content) !!}</div>
            <textarea name="content" id="content-input" style="display:none;" required>{{ old('content', $blogPost->content) }}</textarea>
            <p class="text-xs text-mangrove-800/40 mt-2">Use the toolbar for headings, font size, images and more.</p>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                window.quill = new Quill('#editor-container', {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ font: [] }],
                            [{ align: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['blockquote', 'link', 'image'],
                            ['clean'],
                        ],
                    },
                });

                var contentInput = document.getElementById('content-input');
                var form = contentInput.closest('form');
                form.addEventListener('submit', function () {
                    contentInput.value = window.quill.root.innerHTML;
                });
            });
        </script>

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

        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Focus Keyword</label>
                <input type="text" name="focus_keyword" value="{{ old('focus_keyword', $blogPost->focus_keyword) }}" placeholder="e.g. green cardamom exporter UAE" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                <p class="text-xs text-mangrove-800/40 mt-1">The single main phrase this post is optimized to rank for.</p>
            </div>
            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Tags</label>
                <input type="text" name="tags" value="{{ old('tags', $blogPost->tags) }}" placeholder="e.g. cardamom, spices, export, UAE" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                <p class="text-xs text-mangrove-800/40 mt-1">Comma-separated. Used for categorisation and related-post linking.</p>
            </div>
        </div>

        {{-- Advanced SEO --}}
        <div x-data="{ seoOpen: {{ ($blogPost->og_title || $blogPost->og_image || $blogPost->schema_type) ? 'true' : 'false' }} }" class="border-t border-mangrove-100 pt-5">
            <button type="button" @click="seoOpen = !seoOpen" class="flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-mangrove-800/60 hover:text-mangrove-900 transition-colors w-full">
                <span x-text="seoOpen ? '▾' : '▸'" class="text-base leading-none w-4 text-left"></span>
                Advanced SEO — Open Graph, Twitter Card, Schema
            </button>

            <div x-show="seoOpen" x-cloak class="mt-5 space-y-5">

                {{-- OG --}}
                <div class="p-5 rounded-xl bg-mangrove-50 border border-mangrove-100 space-y-4">
                    <div class="text-[10px] uppercase tracking-widest text-mangrove-800/40 font-semibold">Open Graph (Facebook · LinkedIn · WhatsApp)</div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">OG Title</label>
                            <input type="text" name="og_title" value="{{ old('og_title', $blogPost->og_title) }}" placeholder="Fallback: Meta Title" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">OG Description</label>
                            <input type="text" name="og_description" value="{{ old('og_description', $blogPost->og_description) }}" placeholder="Fallback: Meta Description" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">OG Image <span class="font-normal normal-case tracking-normal text-mangrove-800/30">Recommended: 1200×630 px</span></label>
                        @if($blogPost->og_image)
                            <img src="{{ Storage::url($blogPost->og_image) }}" class="h-20 w-auto mb-2 rounded-xl object-cover border border-mangrove-100" alt="">
                        @endif
                        <input type="file" name="og_image" accept="image/*" class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">
                        <p class="text-xs text-mangrove-800/40 mt-1">Leave blank to keep the current OG image.</p>
                    </div>
                </div>

                {{-- Twitter --}}
                <div class="p-5 rounded-xl bg-mangrove-50 border border-mangrove-100 space-y-4">
                    <div class="text-[10px] uppercase tracking-widest text-mangrove-800/40 font-semibold">Twitter / X Card</div>
                    <div class="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Card Type</label>
                            <select name="twitter_card" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                <option value="summary_large_image" @selected(old('twitter_card', $blogPost->twitter_card ?? 'summary_large_image') === 'summary_large_image')>Large Image</option>
                                <option value="summary" @selected(old('twitter_card', $blogPost->twitter_card) === 'summary')>Summary (small thumbnail)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Twitter Title</label>
                            <input type="text" name="twitter_title" value="{{ old('twitter_title', $blogPost->twitter_title) }}" placeholder="Fallback: OG Title" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Twitter Description</label>
                            <input type="text" name="twitter_description" value="{{ old('twitter_description', $blogPost->twitter_description) }}" placeholder="Fallback: OG Description" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Twitter Image <span class="font-normal normal-case tracking-normal text-mangrove-800/30">Recommended: 1200×600 px</span></label>
                        @if($blogPost->twitter_image)
                            <img src="{{ Storage::url($blogPost->twitter_image) }}" class="h-16 w-auto mb-2 rounded-xl object-cover border border-mangrove-100" alt="">
                        @endif
                        <input type="file" name="twitter_image" accept="image/*" class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">
                    </div>
                </div>

                {{-- Technical --}}
                <div class="p-5 rounded-xl bg-mangrove-50 border border-mangrove-100 space-y-4">
                    <div class="text-[10px] uppercase tracking-widest text-mangrove-800/40 font-semibold">Technical SEO</div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Canonical URL</label>
                            <input type="text" name="canonical_url" value="{{ old('canonical_url', $blogPost->canonical_url) }}" placeholder="https://mangrovesglobal.com/trading/blog/..." class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-mangrove-accent">
                            <p class="text-xs text-mangrove-800/40 mt-1">Leave blank for the default canonical URL.</p>
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Robots Directive</label>
                            <select name="robots" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                <option value="index,follow"     @selected(old('robots', $blogPost->robots ?? 'index,follow') === 'index,follow')>index, follow (default)</option>
                                <option value="noindex,follow"   @selected(old('robots', $blogPost->robots) === 'noindex,follow')>noindex, follow</option>
                                <option value="index,nofollow"   @selected(old('robots', $blogPost->robots) === 'index,nofollow')>index, nofollow</option>
                                <option value="noindex,nofollow" @selected(old('robots', $blogPost->robots) === 'noindex,nofollow')>noindex, nofollow</option>
                            </select>
                        </div>
                    </div>
                </div>

                {{-- Schema --}}
                <div class="p-5 rounded-xl bg-mangrove-50 border border-mangrove-100 space-y-4">
                    <div class="text-[10px] uppercase tracking-widest text-mangrove-800/40 font-semibold">Structured Data / Schema</div>
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Schema Type</label>
                        <select name="schema_type" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                            <option value="">— None —</option>
                            <option value="Article"      @selected(old('schema_type', $blogPost->schema_type) === 'Article')>Article</option>
                            <option value="BlogPosting"  @selected(old('schema_type', $blogPost->schema_type) === 'BlogPosting')>BlogPosting</option>
                            <option value="NewsArticle"  @selected(old('schema_type', $blogPost->schema_type) === 'NewsArticle')>NewsArticle</option>
                            <option value="FAQPage"      @selected(old('schema_type', $blogPost->schema_type) === 'FAQPage')>FAQPage</option>
                            <option value="Custom"       @selected(old('schema_type', $blogPost->schema_type) === 'Custom')>Custom (use editor below)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Custom JSON-LD <span class="font-normal normal-case tracking-normal text-mangrove-800/30">Rendered as &lt;script type="application/ld+json"&gt;</span></label>
                        <textarea name="custom_schema_json" rows="8" spellcheck="false"
                            placeholder='{&#10;  "@@context": "https://schema.org",&#10;  "@@type": "BlogPosting",&#10;  "headline": "...",&#10;  "author": { "@@type": "Person", "name": "..." }&#10;}'
                            class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-mangrove-accent leading-relaxed">{{ old('custom_schema_json', $blogPost->custom_schema_json) }}</textarea>
                    </div>
                </div>

            </div>
        </div>

        <div class="flex gap-4">
            <button type="button" id="preview-toggle" class="px-8 py-4 border border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-white transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
                Preview
            </button>
            <button type="submit" class="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
                Update Blog Post
            </button>
        </div>
    </form>

    <div id="preview-panel" class="hidden mt-8 bg-white border-2 border-dashed border-mangrove-accent rounded-2xl p-8 sm:p-12">
        <div class="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-4">Preview (unsaved changes)</div>
        <h1 id="preview-title" class="font-serif text-3xl font-bold text-mangrove-900 mb-4"></h1>
        <div id="preview-meta" class="text-xs text-mangrove-800/40 mb-8"></div>
        <img id="preview-image" class="w-full h-72 object-cover rounded-xl mb-8 hidden" alt="">
        <div id="preview-content" class="prose-mgt-light text-mangrove-800/80 leading-relaxed"></div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var toggleBtn = document.getElementById('preview-toggle');
            var panel = document.getElementById('preview-panel');
            var titleInput = document.querySelector('input[name="title"]');
            var authorInput = document.querySelector('input[name="author"]');
            var imageInput = document.querySelector('input[name="featured_image"]');
            var existingImage = @json($blogPost->featured_image ? Storage::url($blogPost->featured_image) : null);

            toggleBtn.addEventListener('click', function () {
                var isHidden = panel.classList.contains('hidden');

                if (isHidden) {
                    document.getElementById('preview-title').textContent = titleInput.value || '(Untitled post)';
                    var authorText = authorInput.value ? authorInput.value + ' · ' : '';
                    document.getElementById('preview-meta').textContent = authorText + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                    document.getElementById('preview-content').innerHTML = window.quill.root.innerHTML;

                    var previewImage = document.getElementById('preview-image');
                    if (imageInput.files && imageInput.files[0]) {
                        previewImage.src = URL.createObjectURL(imageInput.files[0]);
                        previewImage.classList.remove('hidden');
                    } else if (existingImage) {
                        previewImage.src = existingImage;
                        previewImage.classList.remove('hidden');
                    } else {
                        previewImage.classList.add('hidden');
                    }

                    panel.classList.remove('hidden');
                    toggleBtn.textContent = 'Hide Preview';
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    panel.classList.add('hidden');
                    toggleBtn.textContent = 'Preview';
                }
            });
        });
    </script>
</x-app-layout>
