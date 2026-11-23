@php
    $val = fn ($field, $default = null) => old($field, $project?->{$field} ?? $default);
@endphp

<div class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-6">
    <h3 class="font-serif text-lg font-semibold text-mangrove-900">Basics</h3>

    <div class="grid sm:grid-cols-2 gap-5">
        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Project Title</label>
            <input type="text" name="title" value="{{ $val('title') }}" required placeholder="e.g. Falcon Traders Rebuild" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
        </div>
        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Category</label>
            <input type="text" name="category" value="{{ $val('category') }}" required placeholder="e.g. Branding, Web Development" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
        </div>
    </div>

    <div class="grid sm:grid-cols-3 gap-5">
        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Tile Shape</label>
            <select name="shape" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white">
                <option value="square" @selected($val('shape', 'square') === 'square')>Square</option>
                <option value="tall" @selected($val('shape') === 'tall')>Tall</option>
                <option value="wide" @selected($val('shape') === 'wide')>Wide</option>
            </select>
        </div>
        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Column</label>
            <select name="column_index" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white">
                @for ($i = 0; $i < 4; $i++)
                    <option value="{{ $i }}" @selected((int) $val('column_index', 0) === $i)>Column {{ $i + 1 }}</option>
                @endfor
            </select>
        </div>
        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Order in Column</label>
            <input type="number" name="sort_order" value="{{ $val('sort_order', 0) }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
        </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-5">
        <div>
            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Case Study Link (optional)</label>
            <input type="url" name="link" value="{{ $val('link') }}" placeholder="https://..." class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
        </div>
        <div class="flex items-end gap-5">
            <label class="flex items-center gap-2 border border-mangrove-100 rounded-xl px-4 py-3 text-sm h-[46px] flex-1">
                <input type="checkbox" name="feature_in_hero" value="1" @checked($val('feature_in_hero', false))>
                Float in hero
            </label>
            <label class="flex items-center gap-2 border border-mangrove-100 rounded-xl px-4 py-3 text-sm h-[46px] flex-1">
                <input type="checkbox" name="is_active" value="1" @checked($val('is_active', true))>
                Active
            </label>
        </div>
    </div>
</div>

<div class="bg-white border border-mangrove-100 rounded-2xl p-8 space-y-6">
    <h3 class="font-serif text-lg font-semibold text-mangrove-900">Cover</h3>
    <p class="text-xs text-mangrove-800/50 -mt-4">Upload a photo, or leave it blank and pick a brand tone tile below instead.</p>

    <div>
        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Cover Image (optional)</label>
        @if ($project?->image)
            <img src="{{ Storage::url($project->image) }}" alt="" class="w-full max-w-xs h-32 object-cover rounded-xl border border-mangrove-100 mb-2">
        @endif
        <input type="file" name="image" accept="image/*" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white">
    </div>

    <div>
        <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Brand Tone (used only if no image is uploaded)</label>
        <div class="grid grid-cols-4 gap-3">
            @foreach (['ink' => '#141f1c', 'teal' => '#3a5951', 'gold' => '#d5ad75', 'sand' => '#ece5d8'] as $tone => $hex)
                <label class="flex flex-col items-center gap-2 border border-mangrove-100 rounded-xl px-3 py-3 text-xs cursor-pointer {{ $val('tone') === $tone ? 'ring-2 ring-mangrove-accent' : '' }}">
                    <input type="radio" name="tone" value="{{ $tone }}" class="sr-only" @checked($val('tone') === $tone)>
                    <span class="w-8 h-8 rounded-full border border-mangrove-100" style="background:{{ $hex }};"></span>
                    <span class="uppercase tracking-wide text-mangrove-800/70">{{ $tone }}</span>
                </label>
            @endforeach
        </div>
    </div>
</div>
