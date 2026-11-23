<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Site Settings</h2>
            <p class="text-sm text-mangrove-800/50">Global settings for header, footer, contact info and more</p>
        </div>
    </x-slot>

    @if(session('success'))
        <div class="mb-6 px-5 py-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm">
            {{ session('success') }}
        </div>
    @endif

    {{-- Tab navigation --}}
    <div x-data="{ tab: '{{ $grouped->keys()->first() ?? 'general' }}' }">
        <div class="flex gap-1 mb-6 border-b border-mangrove-100 overflow-x-auto">
            @foreach($grouped as $group => $settings)
                <button
                    @click="tab = '{{ $group }}'"
                    :class="tab === '{{ $group }}' ? 'border-b-2 border-mangrove-900 text-mangrove-900 font-semibold' : 'text-mangrove-800/50 hover:text-mangrove-900'"
                    class="px-5 py-3 text-sm uppercase tracking-widest whitespace-nowrap transition-colors">
                    {{ ucfirst($group) }}
                </button>
            @endforeach
        </div>

        <form method="POST" action="{{ route('site-settings.update') }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            @foreach($grouped as $group => $settings)
                <div x-show="tab === '{{ $group }}'" x-cloak>
                    <div class="grid md:grid-cols-2 gap-5">
                        @foreach($settings as $setting)
                            <div class="{{ in_array($setting->type, ['textarea', 'richtext']) ? 'md:col-span-2' : '' }} bg-white border border-mangrove-100 rounded-2xl p-5">
                                <label for="s_{{ $setting->key }}" class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">
                                    {{ $setting->label }}
                                </label>
                                @if($setting->description)
                                    <p class="text-xs text-mangrove-800/40 mb-2">{{ $setting->description }}</p>
                                @endif

                                @if($setting->type === 'textarea')
                                    <textarea id="s_{{ $setting->key }}" name="{{ $setting->key }}" rows="4"
                                        class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">{{ $setting->value }}</textarea>

                                @elseif($setting->type === 'image')
                                    @if($setting->value)
                                        <img src="{{ $setting->value }}" class="h-16 w-auto mb-3 rounded-lg object-contain border border-mangrove-100 p-1" alt="">
                                    @endif
                                    <input id="s_{{ $setting->key }}" name="{{ $setting->key }}" type="file" accept="image/*"
                                        class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">

                                @elseif($setting->type === 'boolean')
                                    <label class="inline-flex items-center gap-3 cursor-pointer mt-1">
                                        <input type="hidden" name="{{ $setting->key }}" value="0">
                                        <input id="s_{{ $setting->key }}" name="{{ $setting->key }}" type="checkbox" value="1"
                                            {{ $setting->value ? 'checked' : '' }}
                                            class="w-5 h-5 rounded accent-mangrove-accent">
                                        <span class="text-sm text-mangrove-900">Enabled</span>
                                    </label>

                                @else
                                    <input id="s_{{ $setting->key }}" name="{{ $setting->key }}"
                                        type="{{ $setting->type === 'email' ? 'email' : ($setting->type === 'url' ? 'url' : 'text') }}"
                                        value="{{ $setting->value }}"
                                        class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                                @endif
                            </div>
                        @endforeach
                    </div>

                    <div class="mt-6 flex justify-end">
                        <button type="submit" class="px-8 py-3 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                            Save {{ ucfirst($group) }} Settings
                        </button>
                    </div>
                </div>
            @endforeach
        </form>
    </div>

    <script>
        // Alpine.js is already in the layout via app.js, nothing else needed
    </script>
</x-app-layout>
