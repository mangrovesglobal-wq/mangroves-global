<x-app-layout>
    <x-slot name="header">
        <div>
            <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">
                <a href="{{ route('page-contents.index') }}" class="hover:text-mangrove-accent">Pages</a>
                <span>/</span>
                <span class="text-mangrove-900">{{ $pageConfig['title'] }}</span>
            </div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">{{ $pageConfig['title'] }}</h2>
            <p class="text-sm text-mangrove-800/50">Route: /{{ $pageKey }}</p>
        </div>
        <a href="{{ route('page-contents.index') }}" class="text-sm text-mangrove-800/60 hover:text-mangrove-900">← All Pages</a>
    </x-slot>

    @if(session('success'))
        <div class="mb-6 px-5 py-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm">
            {{ session('success') }}
        </div>
    @endif

    <form method="POST" action="{{ route('page-contents.update', $pageKey) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="space-y-6">
            @foreach($pageConfig['sections'] as $sectionKey => $section)
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 bg-mangrove-50 border-b border-mangrove-100">
                        <span class="font-serif font-semibold text-mangrove-900">{{ $section['label'] }}</span>
                        <span class="ml-3 text-xs text-mangrove-800/40 font-mono">{{ $sectionKey }}</span>
                    </div>
                    <div class="p-6 grid md:grid-cols-2 gap-5">
                        @foreach($section['fields'] as $field)
                            @php
                                $value = $savedData[$sectionKey][$field['key']] ?? '';
                                $isWide = in_array($field['type'], ['textarea', 'richtext']);
                            @endphp
                            <div class="{{ $isWide ? 'md:col-span-2' : '' }}">
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">
                                    {{ $field['label'] }}
                                    <span class="ml-2 text-mangrove-800/30 normal-case tracking-normal font-normal">({{ $field['type'] }})</span>
                                </label>

                                @if($field['type'] === 'textarea')
                                    <textarea name="sections[{{ $sectionKey }}][{{ $field['key'] }}]" rows="4"
                                        class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">{{ $value }}</textarea>

                                @elseif($field['type'] === 'richtext')
                                    <textarea name="sections[{{ $sectionKey }}][{{ $field['key'] }}]" rows="8"
                                        class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 font-mono focus:outline-none focus:border-mangrove-accent">{{ $value }}</textarea>
                                    <p class="mt-1 text-xs text-mangrove-800/40">Basic HTML allowed: &lt;strong&gt; &lt;em&gt; &lt;br&gt; &lt;ul&gt; &lt;li&gt; &lt;p&gt;</p>

                                @elseif($field['type'] === 'image')
                                    @if($value)
                                        <img src="{{ $value }}" class="h-20 w-auto mb-3 rounded-xl object-cover border border-mangrove-100" alt="">
                                    @endif
                                    <input type="file" name="sections[{{ $sectionKey }}][{{ $field['key'] }}]" accept="image/*"
                                        class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">
                                    @if($value)
                                        <input type="hidden" name="sections[{{ $sectionKey }}][{{ $field['key'] }}]" value="{{ $value }}">
                                    @endif

                                @elseif($field['type'] === 'video')
                                    @if($value)
                                        <video src="{{ $value }}" controls class="w-full h-28 mb-3 rounded-xl object-cover border border-mangrove-100 bg-mangrove-900"></video>
                                        <p class="text-xs text-mangrove-800/40 mb-2">Current: {{ basename($value) }}</p>
                                    @endif
                                    <input type="file" name="sections[{{ $sectionKey }}][{{ $field['key'] }}]" accept="video/*"
                                        class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">
                                    <p class="mt-1 text-xs text-mangrove-800/40">MP4 recommended. Leave blank to keep the current video.</p>
                                    @if($value)
                                        <input type="hidden" name="sections[{{ $sectionKey }}][{{ $field['key'] }}]" value="{{ $value }}">
                                    @endif

                                @else
                                    <input type="{{ $field['type'] === 'url' ? 'url' : 'text' }}"
                                        name="sections[{{ $sectionKey }}][{{ $field['key'] }}]"
                                        value="{{ $value }}"
                                        class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        <div class="mt-6 flex justify-end gap-3">
            <a href="{{ route('page-contents.index') }}" class="px-6 py-3 border border-mangrove-200 text-mangrove-900 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-50">
                Cancel
            </a>
            <button type="submit" class="px-8 py-3 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                Save Page Content
            </button>
        </div>
    </form>
</x-app-layout>
