<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Page Content</h2>
            <p class="text-sm text-mangrove-800/50">Edit hero text, section headings and CTAs for each page</p>
        </div>
    </x-slot>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @foreach($pages as $key => $title)
            <a href="{{ route('page-contents.show', $key) }}"
                class="bg-white border border-mangrove-100 rounded-2xl p-6 hover:border-mangrove-accent hover:shadow-sm transition-all group">
                <div class="text-xs uppercase tracking-widest text-mangrove-800/40 mb-2 group-hover:text-mangrove-accent transition-colors">/{{ $key }}</div>
                <div class="font-serif font-semibold text-mangrove-900 text-lg">{{ $title }}</div>
                <div class="mt-3 text-xs text-mangrove-accent font-semibold">Edit content →</div>
            </a>
        @endforeach
    </div>
</x-app-layout>
