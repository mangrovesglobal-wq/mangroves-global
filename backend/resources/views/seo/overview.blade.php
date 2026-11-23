<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">SEO Overview</h2>
            <p class="text-sm text-mangrove-800/50">Health audit across all pages, blog posts and services</p>
        </div>
    </x-slot>

    {{-- Summary cards --}}
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        @php
            $avgScore = $healthItems->avg('score');
            $good  = $healthItems->where('score', '>=', 80)->count();
        @endphp
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Pages Avg Score</div>
            <div class="font-serif text-3xl font-bold {{ $avgScore >= 80 ? 'text-green-600' : ($avgScore >= 50 ? 'text-yellow-600' : 'text-red-500') }}">{{ round($avgScore) }}<span class="text-base font-sans text-mangrove-800/40">/100</span></div>
            <div class="text-xs text-mangrove-800/40 mt-1">{{ $good }} of {{ $healthItems->count() }} pages ≥80</div>
        </div>
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Blog Posts (Missing Meta)</div>
            <div class="font-serif text-3xl font-bold {{ $blogsNoMeta > 0 ? 'text-yellow-600' : 'text-green-600' }}">{{ $blogsNoMeta }} <span class="text-sm font-sans text-mangrove-800/40">of {{ $totalBlogs }}</span></div>
            <div class="text-xs text-mangrove-800/40 mt-1">Published posts without meta title</div>
        </div>
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Services (Missing Meta)</div>
            <div class="font-serif text-3xl font-bold {{ $servicesNoMeta > 0 ? 'text-yellow-600' : 'text-green-600' }}">{{ $servicesNoMeta }} <span class="text-sm font-sans text-mangrove-800/40">of {{ $serviceHealth->where('is_active', true)->count() }}</span></div>
            <div class="text-xs text-mangrove-800/40 mt-1">Active services without meta title</div>
        </div>
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Active Redirects</div>
            <div class="font-serif text-3xl font-bold text-mangrove-900">{{ $redirects }}</div>
            <div class="text-xs text-mangrove-800/40 mt-1"><a href="{{ route('seo.redirects') }}" class="hover:underline text-mangrove-accent">Manage redirects →</a></div>
        </div>
    </div>

    {{-- Page SEO health table --}}
    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between">
            <div class="font-serif font-semibold text-mangrove-900">Page SEO Health</div>
            <span class="text-xs text-mangrove-800/40">{{ $healthItems->count() }} pages registered</span>
        </div>
        <table class="w-full text-sm">
            <thead class="bg-mangrove-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Page</th>
                    <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Score</th>
                    <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Meta Title</th>
                    <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Meta Desc</th>
                    <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">OG Image</th>
                    <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Schema</th>
                    <th class="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-mangrove-100">
                @foreach($healthItems as $item)
                    @php
                        $scoreColor = $item['score'] >= 80 ? 'text-green-600' : ($item['score'] >= 50 ? 'text-yellow-600' : 'text-red-500');
                        $scoreBg    = $item['score'] >= 80 ? 'bg-green-50' : ($item['score'] >= 50 ? 'bg-yellow-50' : 'bg-red-50');
                        $titleStatus = '';
                        if ($item['title_len'] > 0) {
                            $titleStatus = ($item['title_len'] >= 30 && $item['title_len'] <= 60) ? 'good' : ($item['title_len'] > 60 ? 'long' : 'short');
                        }
                        $descStatus = '';
                        if ($item['desc_len'] > 0) {
                            $descStatus = ($item['desc_len'] >= 100 && $item['desc_len'] <= 160) ? 'good' : ($item['desc_len'] > 160 ? 'long' : 'short');
                        }
                    @endphp
                    <tr class="hover:bg-mangrove-50/40">
                        <td class="px-6 py-3">
                            <div class="font-medium text-mangrove-900">{{ $item['title'] }}</div>
                            <div class="text-mangrove-800/40 text-xs font-mono">{{ $item['url'] }}</div>
                        </td>
                        <td class="px-6 py-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full {{ $scoreBg }}">
                                <span class="font-bold text-sm {{ $scoreColor }}">{{ $item['score'] }}</span>
                                <span class="text-xs {{ $scoreColor }}">{{ $item['score'] >= 80 ? 'Good' : ($item['score'] >= 50 ? 'Fair' : 'Poor') }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-3">
                            @if(!$item['has_meta_title'])
                                <span class="text-xs text-red-500 font-semibold">Missing</span>
                            @elseif($titleStatus === 'good')
                                <span class="text-xs text-green-600">{{ $item['title_len'] }} chars ✓</span>
                            @else
                                <span class="text-xs text-yellow-600">{{ $item['title_len'] }} chars ({{ $titleStatus }})</span>
                            @endif
                        </td>
                        <td class="px-6 py-3">
                            @if(!$item['has_meta_desc'])
                                <span class="text-xs text-red-500 font-semibold">Missing</span>
                            @elseif($descStatus === 'good')
                                <span class="text-xs text-green-600">{{ $item['desc_len'] }} chars ✓</span>
                            @else
                                <span class="text-xs text-yellow-600">{{ $item['desc_len'] }} chars ({{ $descStatus }})</span>
                            @endif
                        </td>
                        <td class="px-6 py-3">
                            @if($item['has_og_image'])
                                <span class="text-xs text-green-600">✓ Set</span>
                            @else
                                <span class="text-xs text-red-500 font-semibold">Missing</span>
                            @endif
                        </td>
                        <td class="px-6 py-3">
                            @if($item['has_schema'])
                                <span class="text-xs text-green-600">✓ Set</span>
                            @else
                                <span class="text-xs text-mangrove-800/40">None</span>
                            @endif
                        </td>
                        <td class="px-6 py-3 text-right">
                            <a href="{{ route('seo.edit', $item['key']) }}" class="text-xs text-mangrove-accent font-semibold hover:underline">Edit SEO</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- Blog Posts SEO health table --}}
    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between">
            <div>
                <div class="font-serif font-semibold text-mangrove-900">Blog Posts SEO Health</div>
                <p class="text-xs text-mangrove-800/50 mt-0.5">Each post carries its own meta, OG and schema fields — edit in the blog post admin</p>
            </div>
            <a href="{{ route('blog-posts.create') }}" class="text-xs text-mangrove-accent font-semibold hover:underline">+ New Post</a>
        </div>
        @if($blogHealth->isEmpty())
            <div class="px-6 py-10 text-sm text-mangrove-800/40 text-center">No blog posts yet.</div>
        @else
            <table class="w-full text-sm">
                <thead class="bg-mangrove-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Title / Slug</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Division</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Status</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Score</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Meta Title</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Meta Desc</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">OG Image</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Schema</th>
                        <th class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-mangrove-100">
                    @foreach($blogHealth as $item)
                        @php
                            $scoreColor = $item['score'] >= 80 ? 'text-green-600' : ($item['score'] >= 50 ? 'text-yellow-600' : 'text-red-500');
                            $scoreBg    = $item['score'] >= 80 ? 'bg-green-50' : ($item['score'] >= 50 ? 'bg-yellow-50' : 'bg-red-50');
                            $titleStatus = $item['title_len'] > 0 ? (($item['title_len'] >= 30 && $item['title_len'] <= 60) ? 'good' : ($item['title_len'] > 60 ? 'long' : 'short')) : '';
                            $descStatus  = $item['desc_len'] > 0  ? (($item['desc_len'] >= 100  && $item['desc_len'] <= 160)  ? 'good' : ($item['desc_len'] > 160 ? 'long' : 'short')) : '';
                        @endphp
                        <tr class="hover:bg-mangrove-50/40 {{ $item['status'] === 'draft' ? 'opacity-60' : '' }}">
                            <td class="px-6 py-3">
                                <div class="font-medium text-mangrove-900">{{ Str::limit($item['title'], 50) }}</div>
                                <div class="text-xs text-mangrove-800/40 font-mono">/{{ $item['division'] }}/blog/{{ $item['slug'] }}</div>
                            </td>
                            <td class="px-6 py-3">
                                <span class="text-xs px-2.5 py-1 rounded-full bg-mangrove-50 text-mangrove-800">{{ ucfirst($item['division']) }}</span>
                            </td>
                            <td class="px-6 py-3">
                                <span class="text-xs px-2.5 py-1 rounded-full {{ $item['status'] === 'published' ? 'bg-mangrove-accent/20 text-mangrove-800' : 'bg-mangrove-100 text-mangrove-800/60' }}">{{ ucfirst($item['status']) }}</span>
                            </td>
                            <td class="px-6 py-3">
                                <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full {{ $scoreBg }}">
                                    <span class="font-bold text-sm {{ $scoreColor }}">{{ $item['score'] }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-3">
                                @if(!$item['has_meta_title'])
                                    <span class="text-xs text-red-500 font-semibold">Missing</span>
                                @elseif($titleStatus === 'good')
                                    <span class="text-xs text-green-600">{{ $item['title_len'] }} chars ✓</span>
                                @else
                                    <span class="text-xs text-yellow-600">{{ $item['title_len'] }} chars ({{ $titleStatus }})</span>
                                @endif
                            </td>
                            <td class="px-6 py-3">
                                @if(!$item['has_meta_desc'])
                                    <span class="text-xs text-red-500 font-semibold">Missing</span>
                                @elseif($descStatus === 'good')
                                    <span class="text-xs text-green-600">{{ $item['desc_len'] }} chars ✓</span>
                                @else
                                    <span class="text-xs text-yellow-600">{{ $item['desc_len'] }} chars ({{ $descStatus }})</span>
                                @endif
                            </td>
                            <td class="px-6 py-3">
                                @if($item['has_og_image'])
                                    <span class="text-xs text-green-600">✓ Set</span>
                                @else
                                    <span class="text-xs text-red-500 font-semibold">Missing</span>
                                @endif
                            </td>
                            <td class="px-6 py-3">
                                @if($item['has_schema'])
                                    <span class="text-xs text-green-600">✓ Set</span>
                                @else
                                    <span class="text-xs text-mangrove-800/40">None</span>
                                @endif
                            </td>
                            <td class="px-6 py-3 text-right whitespace-nowrap">
                                <a href="{{ route('blog-posts.edit', $item['id']) }}" class="text-xs text-mangrove-accent font-semibold hover:underline">Edit</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    {{-- Services SEO health table --}}
    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between">
            <div>
                <div class="font-serif font-semibold text-mangrove-900">Services SEO Health</div>
                <p class="text-xs text-mangrove-800/50 mt-0.5">Each service has its own meta, OG, Twitter and schema — edit in the services admin</p>
            </div>
            <a href="{{ route('services.create') }}" class="text-xs text-mangrove-accent font-semibold hover:underline">+ New Service</a>
        </div>
        @if($serviceHealth->isEmpty())
            <div class="px-6 py-10 text-sm text-mangrove-800/40 text-center">No services yet.</div>
        @else
            <table class="w-full text-sm">
                <thead class="bg-mangrove-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Name / Slug</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Division</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Score</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Meta Title</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Meta Desc</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">OG Image</th>
                        <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Schema</th>
                        <th class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-mangrove-100">
                    @foreach($serviceHealth as $item)
                        @php
                            $scoreColor = $item['score'] >= 80 ? 'text-green-600' : ($item['score'] >= 50 ? 'text-yellow-600' : 'text-red-500');
                            $scoreBg    = $item['score'] >= 80 ? 'bg-green-50' : ($item['score'] >= 50 ? 'bg-yellow-50' : 'bg-red-50');
                            $titleStatus = $item['title_len'] > 0 ? (($item['title_len'] >= 30 && $item['title_len'] <= 60) ? 'good' : ($item['title_len'] > 60 ? 'long' : 'short')) : '';
                            $descStatus  = $item['desc_len'] > 0  ? (($item['desc_len'] >= 100  && $item['desc_len'] <= 160)  ? 'good' : ($item['desc_len'] > 160 ? 'long' : 'short')) : '';
                        @endphp
                        <tr class="hover:bg-mangrove-50/40 {{ !$item['is_active'] ? 'opacity-50' : '' }}">
                            <td class="px-6 py-3">
                                <div class="font-medium text-mangrove-900">{{ $item['name'] }}</div>
                                <div class="text-xs text-mangrove-800/40 font-mono">/{{ $item['division'] }}/{{ $item['slug'] }}</div>
                            </td>
                            <td class="px-6 py-3">
                                <span class="text-xs px-2.5 py-1 rounded-full bg-mangrove-50 text-mangrove-800">{{ ucfirst($item['division']) }}</span>
                            </td>
                            <td class="px-6 py-3">
                                <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full {{ $scoreBg }}">
                                    <span class="font-bold text-sm {{ $scoreColor }}">{{ $item['score'] }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-3">
                                @if(!$item['has_meta_title'])
                                    <span class="text-xs text-red-500 font-semibold">Missing</span>
                                @elseif($titleStatus === 'good')
                                    <span class="text-xs text-green-600">{{ $item['title_len'] }} chars ✓</span>
                                @else
                                    <span class="text-xs text-yellow-600">{{ $item['title_len'] }} chars ({{ $titleStatus }})</span>
                                @endif
                            </td>
                            <td class="px-6 py-3">
                                @if(!$item['has_meta_desc'])
                                    <span class="text-xs text-red-500 font-semibold">Missing</span>
                                @elseif($descStatus === 'good')
                                    <span class="text-xs text-green-600">{{ $item['desc_len'] }} chars ✓</span>
                                @else
                                    <span class="text-xs text-yellow-600">{{ $item['desc_len'] }} chars ({{ $descStatus }})</span>
                                @endif
                            </td>
                            <td class="px-6 py-3">
                                @if($item['has_og_image'])
                                    <span class="text-xs text-green-600">✓ Set</span>
                                @else
                                    <span class="text-xs text-red-500 font-semibold">Missing</span>
                                @endif
                            </td>
                            <td class="px-6 py-3">
                                @if($item['has_schema'])
                                    <span class="text-xs text-green-600">✓ Set</span>
                                @else
                                    <span class="text-xs text-mangrove-800/40">None</span>
                                @endif
                            </td>
                            <td class="px-6 py-3 text-right whitespace-nowrap">
                                <a href="{{ route('services.edit', $item['id']) }}" class="text-xs text-mangrove-accent font-semibold hover:underline">Edit</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    {{-- Portfolio note --}}
    <div class="bg-mangrove-50 border border-mangrove-100 rounded-2xl p-6 mb-8">
        <div class="font-serif font-semibold text-mangrove-900 mb-1">Portfolio Projects</div>
        <p class="text-sm text-mangrove-800/60">Portfolio items do not have their own dynamic URLs — each work page (Ettara, Helthee, etc.) is a static route with its own entry in the <strong>Page SEO</strong> table above under <em>creative-work-*</em> keys.</p>
    </div>

    {{-- Quick links --}}
    <div class="grid sm:grid-cols-2 gap-4">
        <a href="{{ route('seo.redirects') }}" class="bg-white border border-mangrove-100 rounded-2xl p-6 hover:border-mangrove-accent hover:shadow-sm transition-all group">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/40 mb-2 group-hover:text-mangrove-accent transition-colors">Redirect Manager</div>
            <div class="font-serif font-semibold text-mangrove-900 text-lg">301 &amp; 302 Redirects</div>
            <div class="mt-2 text-sm text-mangrove-800/60">Manage URL redirects, track hit counts, prevent 404s.</div>
        </a>
        <a href="{{ route('seo.integrations') }}" class="bg-white border border-mangrove-100 rounded-2xl p-6 hover:border-mangrove-accent hover:shadow-sm transition-all group">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/40 mb-2 group-hover:text-mangrove-accent transition-colors">Search Engine Integrations</div>
            <div class="font-serif font-semibold text-mangrove-900 text-lg">GA4, GTM &amp; Verification</div>
            <div class="mt-2 text-sm text-mangrove-800/60">Analytics, pixel IDs, site verification and IndexNow key.</div>
        </a>
    </div>
</x-app-layout>
