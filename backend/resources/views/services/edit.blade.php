<x-app-layout>
    <x-slot name="header">
        <div>
            <a href="{{ route('services.index') }}" class="text-xs uppercase tracking-widest text-mangrove-accent">&larr; Back to Services</a>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900 mt-2">Edit Service</h2>
        </div>
    </x-slot>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Playfair+Display&family=Roboto&family=Lato&family=Montserrat&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">
    <style>
        .ql-font-poppins { font-family: 'Poppins', sans-serif; }
        .ql-font-playfair { font-family: 'Playfair Display', serif; }
        .ql-font-roboto { font-family: 'Roboto', sans-serif; }
        .ql-font-lato { font-family: 'Lato', sans-serif; }
        .ql-font-montserrat { font-family: 'Montserrat', sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="poppins"]::before,
        .ql-picker.ql-font .ql-picker-label[data-value="poppins"]::before { content: 'Poppins'; font-family: 'Poppins', sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="playfair"]::before,
        .ql-picker.ql-font .ql-picker-label[data-value="playfair"]::before { content: 'Playfair'; font-family: 'Playfair Display', serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="roboto"]::before,
        .ql-picker.ql-font .ql-picker-label[data-value="roboto"]::before { content: 'Roboto'; font-family: 'Roboto', sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="lato"]::before,
        .ql-picker.ql-font .ql-picker-label[data-value="lato"]::before { content: 'Lato'; font-family: 'Lato', sans-serif; }
        .ql-picker.ql-font .ql-picker-item[data-value="montserrat"]::before,
        .ql-picker.ql-font .ql-picker-label[data-value="montserrat"]::before { content: 'Montserrat'; font-family: 'Montserrat', sans-serif; }
        .image-placeholder {
            background-image: repeating-linear-gradient(45deg, #f2f6f5, #f2f6f5 10px, #dde7e4 10px, #dde7e4 20px);
            border: 1px dashed #3a5951;
        }
    </style>

    @if ($errors->any())
        <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
            <ul class="list-disc pl-5">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('services.update', $service) }}" enctype="multipart/form-data" class="space-y-6">
        @csrf
        @method('PUT')

        <div class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-6">
            <h3 class="font-serif text-lg font-semibold text-mangrove-900">Basics</h3>

            <div class="grid sm:grid-cols-3 gap-5">
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Division</label>
                    <select name="division" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                        <option value="trading" @selected(old('division', $service->division) === 'trading')>Trading</option>
                        <option value="logistics" @selected(old('division', $service->division) === 'logistics')>Logistics</option>
                        <option value="creative" @selected(old('division', $service->division) === 'creative')>Creative</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $service->sort_order) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Status</label>
                    <label class="flex items-center gap-2 border border-mangrove-100 rounded-xl px-4 py-3 text-sm h-[46px]">
                        <input type="checkbox" name="is_active" value="1" @checked(old('is_active', $service->is_active))>
                        Active
                    </label>
                </div>
            </div>

            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Service Name</label>
                <input type="text" name="name" value="{{ old('name', $service->name) }}" required class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">URL Slug</label>
                    <input type="text" name="slug" value="{{ old('slug', $service->slug) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Icon (optional)</label>
                    @php $currentIcon = old('icon', $service->icon); @endphp
                    <select name="icon" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white">
                        <option value="" @selected($currentIcon === '' || $currentIcon === null)>&mdash; No icon &mdash;</option>
                        <optgroup label="Logistics">
                            <option value="Ship" @selected($currentIcon === 'Ship')>Ship (sea freight)</option>
                            <option value="Plane" @selected($currentIcon === 'Plane')>Plane (air freight)</option>
                            <option value="Truck" @selected($currentIcon === 'Truck')>Truck (road transport)</option>
                            <option value="ShieldCheck" @selected($currentIcon === 'ShieldCheck')>Shield Check (customs)</option>
                            <option value="Warehouse" @selected($currentIcon === 'Warehouse')>Warehouse</option>
                            <option value="Boxes" @selected($currentIcon === 'Boxes')>Boxes (warehousing/3PL)</option>
                            <option value="Route" @selected($currentIcon === 'Route')>Route (supply chain)</option>
                            <option value="Globe" @selected($currentIcon === 'Globe')>Globe (global network)</option>
                            <option value="MapPin" @selected($currentIcon === 'MapPin')>Map Pin</option>
                            <option value="Clock" @selected($currentIcon === 'Clock')>Clock (time-sensitive)</option>
                            <option value="PackageCheck" @selected($currentIcon === 'PackageCheck')>Package Check</option>
                        </optgroup>
                        <optgroup label="Creative">
                            <option value="Megaphone" @selected($currentIcon === 'Megaphone')>Megaphone (advertising)</option>
                            <option value="TrendingUp" @selected($currentIcon === 'TrendingUp')>Trending Up (digital marketing)</option>
                            <option value="Palette" @selected($currentIcon === 'Palette')>Palette (branding)</option>
                            <option value="PenTool" @selected($currentIcon === 'PenTool')>Pen Tool (design)</option>
                            <option value="Video" @selected($currentIcon === 'Video')>Video (content production)</option>
                            <option value="Camera" @selected($currentIcon === 'Camera')>Camera</option>
                            <option value="Code" @selected($currentIcon === 'Code')>Code (web development)</option>
                            <option value="LayoutGrid" @selected($currentIcon === 'LayoutGrid')>Layout Grid</option>
                            <option value="Sparkles" @selected($currentIcon === 'Sparkles')>Sparkles</option>
                            <option value="Search" @selected($currentIcon === 'Search')>Search (SEO)</option>
                            <option value="Share2" @selected($currentIcon === 'Share2')>Share (social media)</option>
                            <option value="BarChart3" @selected($currentIcon === 'BarChart3')>Bar Chart (analytics)</option>
                        </optgroup>
                        <optgroup label="General">
                            <option value="Package" @selected($currentIcon === 'Package')>Package</option>
                            <option value="Users" @selected($currentIcon === 'Users')>Users</option>
                            <option value="Target" @selected($currentIcon === 'Target')>Target</option>
                            <option value="MessageSquare" @selected($currentIcon === 'MessageSquare')>Message Square</option>
                            <option value="FileText" @selected($currentIcon === 'FileText')>File Text</option>
                            <option value="Smartphone" @selected($currentIcon === 'Smartphone')>Smartphone</option>
                            <option value="Layers" @selected($currentIcon === 'Layers')>Layers</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Short Description</label>
                <textarea name="short_description" rows="2" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">{{ old('short_description', $service->short_description) }}</textarea>
            </div>

            <div>
                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Featured Image</label>
                @if ($service->featured_image)
                    <img src="{{ Storage::url($service->featured_image) }}" class="w-32 h-20 object-cover rounded-lg border border-mangrove-100 mb-2">
                @else
                    <div class="image-placeholder rounded-xl h-32 flex items-center justify-center text-mangrove-500 text-xs uppercase tracking-widest mb-2">
                        Image Placeholder
                    </div>
                @endif
                <input type="file" name="featured_image" accept="image/*" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white">
                <p class="text-xs text-mangrove-800/40 mt-1">Leave blank to keep the current image.</p>
            </div>
        </div>

        @for ($i = 1; $i <= 4; $i++)
            <div class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-4">
                <h3 class="font-serif text-lg font-semibold text-mangrove-900">Content Block {{ $i }}</h3>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Block Heading</label>
                    <input type="text" name="block_{{ $i }}_heading" value="{{ old('block_' . $i . '_heading', $service->{'block_' . $i . '_heading'}) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Block Content</label>
                    <div id="editor-block-{{ $i }}" style="min-height: 180px;" class="bg-white border border-mangrove-100 rounded-xl">{!! old('block_' . $i . '_content', $service->{'block_' . $i . '_content'}) !!}</div>
                    <textarea name="block_{{ $i }}_content" id="input-block-{{ $i }}" style="display:none;">{{ old('block_' . $i . '_content', $service->{'block_' . $i . '_content'}) }}</textarea>
                </div>
            </div>
        @endfor

        <div class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-6">
            <h3 class="font-serif text-lg font-semibold text-mangrove-900">Frequently Asked Questions</h3>
            @for ($i = 1; $i <= 3; $i++)
                <div class="grid sm:grid-cols-2 gap-5 pb-5 {{ $i < 3 ? 'border-b border-mangrove-100' : '' }}">
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Question {{ $i }}</label>
                        <input type="text" name="faq_{{ $i }}_question" value="{{ old('faq_' . $i . '_question', $service->{'faq_' . $i . '_question'}) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Answer {{ $i }}</label>
                        <textarea name="faq_{{ $i }}_answer" rows="2" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">{{ old('faq_' . $i . '_answer', $service->{'faq_' . $i . '_answer'}) }}</textarea>
                    </div>
                </div>
            @endfor
        </div>

        <div class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-5">
            <h3 class="font-serif text-lg font-semibold text-mangrove-900">SEO</h3>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">SEO Meta Title</label>
                    <input type="text" name="meta_title" value="{{ old('meta_title', $service->meta_title) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">SEO Meta Description</label>
                    <input type="text" name="meta_description" value="{{ old('meta_description', $service->meta_description) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Focus Keyword</label>
                    <input type="text" name="focus_keyword" value="{{ old('focus_keyword', $service->focus_keyword) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Keywords</label>
                    <input type="text" name="meta_keywords" value="{{ old('meta_keywords', $service->meta_keywords) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Tags</label>
                    <input type="text" name="tags" value="{{ old('tags', $service->tags) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
            </div>
        </div>

        <button type="submit" class="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
            Update Service
        </button>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var Font = Quill.import('formats/font');
            Font.whitelist = ['sans-serif', 'serif', 'monospace', 'poppins', 'playfair', 'roboto', 'lato', 'montserrat'];
            Quill.register(Font, true);

            var toolbarOptions = [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ font: Font.whitelist }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'link'],
                ['clean'],
            ];

            for (var i = 1; i <= 4; i++) {
                (function (index) {
                    var quill = new Quill('#editor-block-' + index, {
                        theme: 'snow',
                        modules: { toolbar: toolbarOptions },
                    });
                    var input = document.getElementById('input-block-' + index);
                    var form = input.closest('form');
                    form.addEventListener('submit', function () {
                        input.value = quill.root.innerHTML;
                    });
                })(i);
            }
        });
    </script>
</x-app-layout>
