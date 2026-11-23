<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Search Engine Integrations</h2>
            <p class="text-sm text-mangrove-800/50">Paste your tracking IDs and verification codes here — no code edits needed</p>
        </div>
    </x-slot>

    @if(session('success'))
        <div class="mb-6 px-5 py-3.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium flex items-center gap-3">
            <svg class="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            {{ session('success') }}
        </div>
    @endif

    {{-- Intro banner --}}
    <div class="mb-6 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3.5">
        <svg class="w-5 h-5 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <div class="text-sm text-amber-800 leading-relaxed">
            <strong class="font-semibold">How this page works:</strong> Each section below connects your website to a different outside service. You simply copy a code or ID from that service and paste it in the box — the website adds it automatically. You only need to fill in the services you use. Hover the <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-200 text-amber-700 text-[9px] font-extrabold">?</span> icons for quick help on any field.
        </div>
    </div>

    {{-- Tab nav --}}
    <div class="flex gap-1 mb-8 border-b border-mangrove-100">
        <a href="{{ route('seo.overview') }}" class="px-4 py-2.5 text-sm text-mangrove-800/60 hover:text-mangrove-900 border-b-2 border-transparent -mb-px">Overview</a>
        <a href="{{ route('seo.integrations') }}" class="px-4 py-2.5 text-sm font-semibold text-mangrove-900 border-b-2 border-mangrove-900 -mb-px">Integrations</a>
        <a href="{{ route('seo.redirects') }}" class="px-4 py-2.5 text-sm text-mangrove-800/60 hover:text-mangrove-900 border-b-2 border-transparent -mb-px">Redirects</a>
    </div>

    @php
        function seoFieldActive($settings, string $key): bool {
            $s = $settings->get($key);
            return $s && !empty($s->value);
        }
        function seoFieldVal($settings, string $key): string {
            return old($key, $settings->get($key)?->value ?? '');
        }
    @endphp

    {{-- Reusable tooltip macro --}}
    @php
        function tipIcon(string $text): string {
            $escaped = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
            return '
            <span class="relative group/tip inline-flex items-center ml-1.5 cursor-help">
                <span class="w-[17px] h-[17px] inline-flex items-center justify-center rounded-full bg-mangrove-100 text-mangrove-400 text-[9px] font-extrabold select-none">?</span>
                <span class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 z-50 w-72 p-3.5 bg-mangrove-900 text-white text-xs rounded-2xl opacity-0 invisible scale-95 group-hover/tip:opacity-100 group-hover/tip:visible group-hover/tip:scale-100 transition-all duration-200 shadow-2xl leading-relaxed whitespace-normal">' . $escaped . '</span>
            </span>';
        }
    @endphp

    <form id="main-integrations-form" method="POST" action="{{ route('seo.integrations.update') }}" class="pb-24">
        @csrf
        @method('PUT')

        {{-- ── SECTION: Analytics & Tracking ──────────────────────────────────── --}}
        <div class="mb-2">
            <div class="flex items-center gap-1.5 px-1 mb-2">
                <span class="text-[10px] uppercase tracking-widest font-semibold text-mangrove-800/40">Analytics &amp; Conversion Tracking</span>
                {!! tipIcon('These tools count every visit to your website and track when visitors take actions like filling a form or clicking a button. The data appears in dashboards so you can see what\'s working.') !!}
            </div>
            <div class="mb-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                <svg class="w-4 h-4 text-blue-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <p class="text-xs text-blue-700 leading-relaxed"><strong>Recommended setup:</strong> Use <strong>Google Tag Manager (GTM)</strong> as your single container — it fires GA4, the Facebook Pixel, and other tags without separate code installs. If you use GTM, leave the GA4 field blank (GTM handles it). If you don't use GTM, fill in GA4 directly.</p>
            </div>
            <div class="space-y-4">

                {{-- Google Analytics 4 --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0Zm-9.5-7.5v8h-3V15h3v-2.5H9l3.5-8ZM14 15v-2.5h1.5v-5H17V15h-3Z"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Google Analytics 4</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Track visitors, sessions, and goals</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'ga4_measurement_id'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Measurement ID</label>
                            {!! tipIcon('A code starting with "G-" followed by letters and numbers. You\'ll find it in Google Analytics → Admin (bottom left) → Data Streams → click your website → copy the Measurement ID at the top.') !!}
                        </div>
                        <input type="text" name="ga4_measurement_id" value="{{ seoFieldVal($settings, 'ga4_measurement_id') }}" placeholder="G-XXXXXXXXXX"
                               class="w-full max-w-sm px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">analytics.google.com</span> &rarr; Admin &rarr; Data Streams &rarr; Measurement ID. <strong class="text-mangrove-800/70">Leave blank when using GTM</strong> — it fires GA4 itself.</p>
                    </div>
                </div>

                {{-- Google Tag Manager --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Google Tag Manager</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Manage GA4, pixels, and other tags without code deploys</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'gtm_container_id'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Container ID</label>
                            {!! tipIcon('A code starting with "GTM-" — think of GTM as a remote control for all your tracking scripts. You manage everything in one place and push changes without touching the website code.') !!}
                        </div>
                        <input type="text" name="gtm_container_id" value="{{ seoFieldVal($settings, 'gtm_container_id') }}" placeholder="GTM-XXXXXXX"
                               class="w-full max-w-sm px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">tagmanager.google.com</span> &rarr; Admin &rarr; Container ID. Recommended: use GTM and fire GA4 through it. If GTM is set, the GA4 field above is ignored automatically.</p>
                    </div>
                </div>

                {{-- Facebook Pixel --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Meta (Facebook) Pixel</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Track conversions and retarget visitors from Facebook &amp; Instagram ads</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'facebook_pixel_id'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Pixel ID</label>
                            {!! tipIcon('A 15-digit number. Only needed if you run Facebook or Instagram ads — it tells Meta which visitors came from your ads so you can measure results and show ads to people who visited your site.') !!}
                        </div>
                        <input type="text" name="facebook_pixel_id" value="{{ seoFieldVal($settings, 'facebook_pixel_id') }}" placeholder="123456789012345"
                               class="w-full max-w-sm px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">business.facebook.com</span> &rarr; Events Manager &rarr; your Pixel &rarr; Settings &rarr; Pixel ID (15-digit number).</p>
                    </div>
                </div>

                {{-- LinkedIn Insight Tag --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">LinkedIn Insight Tag</div>
                                <div class="text-xs text-mangrove-800/40 truncate">B2B conversion tracking and audience retargeting from LinkedIn Ads</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'linkedin_partner_id'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Partner ID</label>
                            {!! tipIcon('Only needed if you run LinkedIn Ads. It\'s a 7-digit number that lets LinkedIn tell you which site visitors came from your ads on the platform.') !!}
                        </div>
                        <input type="text" name="linkedin_partner_id" value="{{ seoFieldVal($settings, 'linkedin_partner_id') }}" placeholder="1234567"
                               class="w-full max-w-sm px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">linkedin.com/campaignmanager</span> &rarr; Account Assets &rarr; Insight Tag. The 7-digit number inside <span class="font-mono bg-mangrove-50 px-1 rounded">_linkedin_partner_id = "..."</span> in the script snippet.</p>
                    </div>
                </div>

                {{-- Hotjar --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Hotjar</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Heatmaps, session recordings, and scroll depth analysis</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'hotjar_site_id'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Site ID</label>
                            {!! tipIcon('Hotjar shows you heatmaps (where people click and scroll) and recordings of real user sessions. The Site ID is a 7-digit number from your Hotjar account.') !!}
                        </div>
                        <input type="text" name="hotjar_site_id" value="{{ seoFieldVal($settings, 'hotjar_site_id') }}" placeholder="1234567"
                               class="w-full max-w-sm px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">hotjar.com</span> &rarr; Sites &rarr; your site &rarr; Tracking Code — the number after <span class="font-mono bg-mangrove-50 px-1 rounded">hjid:</span> in the script snippet.</p>
                    </div>
                </div>

            </div>
        </div>

        {{-- ── SECTION: Search Engine Verification ──────────────────────────────── --}}
        <div class="mt-8 mb-2">
            <div class="flex items-center gap-1.5 px-1 mb-2">
                <span class="text-[10px] uppercase tracking-widest font-semibold text-mangrove-800/40">Search Engine Verification</span>
                {!! tipIcon('These codes prove to Google and Bing that you own this website, unlocking access to detailed reports about how your pages appear in search results.') !!}
            </div>
            <div class="mb-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                <svg class="w-4 h-4 text-blue-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <p class="text-xs text-blue-700 leading-relaxed">These are verification-only codes — they don't change how your site looks or behaves. Each is a long string of random characters. Copy only the code value, not the full HTML tag around it.</p>
            </div>
            <div class="space-y-4">

                {{-- Google Search Console --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Google Search Console</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Monitor indexing, crawl errors, Core Web Vitals, and search rankings</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'google_site_verification'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Site Verification Code</label>
                            {!! tipIcon('Go to search.google.com/search-console → Add Property → enter your domain → choose "HTML tag" verification → copy only the content="..." value (the long code inside the quotes, not the entire &lt;meta&gt; line).') !!}
                        </div>
                        <input type="text" name="google_site_verification" value="{{ seoFieldVal($settings, 'google_site_verification') }}" placeholder="abc123def456..."
                               class="w-full max-w-lg px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">search.google.com/search-console</span> &rarr; Settings &rarr; Ownership verification &rarr; HTML tag method. Copy only the <span class="font-mono bg-mangrove-50 px-1 rounded">content="..."</span> value — not the full <span class="font-mono bg-mangrove-50 px-1 rounded">&lt;meta&gt;</span> tag.</p>
                    </div>
                </div>

                {{-- Bing Webmaster --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Bing Webmaster Tools</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Bing + Yahoo indexing, crawl data, and keyword research</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'bing_site_verification'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Site Verification Code</label>
                            {!! tipIcon('Go to bing.com/webmasters → Add Site → verification → choose "Meta Tag" → copy only the content="..." value from the msvalidate.01 tag (not the whole line).') !!}
                        </div>
                        <input type="text" name="bing_site_verification" value="{{ seoFieldVal($settings, 'bing_site_verification') }}" placeholder="ABCDEF1234567890..."
                               class="w-full max-w-lg px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">bing.com/webmasters</span> &rarr; Settings &rarr; Site Verification &rarr; Meta Tag. Copy only the <span class="font-mono bg-mangrove-50 px-1 rounded">content="..."</span> value from the <span class="font-mono bg-mangrove-50 px-1 rounded">msvalidate.01</span> tag.</p>
                    </div>
                </div>

            </div>
        </div>

        {{-- ── SECTION: Instant Indexing ──────────────────────────────────────── --}}
        <div class="mt-8 mb-2">
            <div class="flex items-center gap-1.5 px-1 mb-2">
                <span class="text-[10px] uppercase tracking-widest font-semibold text-mangrove-800/40">Instant Indexing</span>
                {!! tipIcon('Normally search engines discover new pages on their own timetable — this can take days or weeks. IndexNow lets you notify Bing, Yandex, and others the moment a page is published, so it appears in search faster.') !!}
            </div>
            <div class="space-y-4">

                {{-- IndexNow --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">IndexNow</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Instantly notify Bing, Yandex, and others when pages change</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'indexnow_key'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">API Key</label>
                            <span class="ml-2 text-[10px] font-normal text-mangrove-800/40 normal-case tracking-normal px-1.5 py-0.5 bg-mangrove-50 rounded">private — not exposed publicly</span>
                            {!! tipIcon('This key is a secret password between your website and search engines. It is kept on the server only and never sent to browsers. Generate it in Bing Webmaster Tools — it\'s a long random string.') !!}
                        </div>
                        <input type="text" name="indexnow_key" value="{{ seoFieldVal($settings, 'indexnow_key') }}" placeholder="a1b2c3d4e5f6..."
                               class="w-full max-w-lg px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">bing.com/webmasters</span> &rarr; Settings &rarr; IndexNow &rarr; Generate Key. After saving: create <span class="font-mono bg-mangrove-50 px-1 rounded">public/{key}.txt</span> containing just the key on one line.</p>
                    </div>
                </div>

            </div>
        </div>

        {{-- ── SECTION: Social Profiles ──────────────────────────────────────────── --}}
        <div class="mt-8 mb-2">
            <div class="flex items-center gap-1.5 px-1 mb-2">
                <span class="text-[10px] uppercase tracking-widest font-semibold text-mangrove-800/40">Social Media Profiles</span>
                {!! tipIcon('These URLs tell Google, Facebook, and LinkedIn that these social accounts belong to your business. They appear in search results, link previews, and the footer/icon bar on every page of the website.') !!}
            </div>
            <div class="mb-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                <svg class="w-4 h-4 text-blue-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <p class="text-xs text-blue-700 leading-relaxed">Paste the full URL of each official page. These automatically appear in the social icon bar in the hero section and footer of every page on the website, and are included in Google's Knowledge Graph so your brand appears correctly in search.</p>
            </div>

            @php
                $socialCards = [
                    [
                        'key'         => 'facebook_url',
                        'name'        => 'Facebook',
                        'desc'        => 'Your official Facebook business page',
                        'placeholder' => 'https://www.facebook.com/mangrovesglobal',
                        'color'       => 'text-blue-600',
                        'bg'          => 'bg-blue-50',
                        'type'        => 'url',
                        'tip'         => 'Go to your Facebook Page, click "About" in the left panel, then copy the URL from your browser address bar. It should look like facebook.com/YourPageName.',
                        'icon'        => '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
                    ],
                    [
                        'key'         => 'instagram_url',
                        'name'        => 'Instagram',
                        'desc'        => 'Your official Instagram business profile',
                        'placeholder' => 'https://www.instagram.com/mangrovesglobal',
                        'color'       => 'text-pink-500',
                        'bg'          => 'bg-pink-50',
                        'type'        => 'url',
                        'tip'         => 'Go to your Instagram profile in a browser, then copy the URL from the address bar. It should look like instagram.com/YourHandle.',
                        'icon'        => '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>',
                    ],
                    [
                        'key'         => 'linkedin_url',
                        'name'        => 'LinkedIn',
                        'desc'        => 'Your official LinkedIn company page',
                        'placeholder' => 'https://www.linkedin.com/company/mangroves-global',
                        'color'       => 'text-sky-600',
                        'bg'          => 'bg-sky-50',
                        'type'        => 'url',
                        'tip'         => 'Go to your LinkedIn Company Page, click the three dots "..." → Copy link. It should look like linkedin.com/company/your-company-name.',
                        'icon'        => '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
                    ],
                    [
                        'key'         => 'twitter_url',
                        'name'        => 'X (Twitter)',
                        'desc'        => 'Your official X / Twitter profile',
                        'placeholder' => 'https://x.com/mangrovesglobal',
                        'color'       => 'text-mangrove-900',
                        'bg'          => 'bg-mangrove-50',
                        'type'        => 'url',
                        'tip'         => 'Go to your X (Twitter) profile in a browser and copy the URL. It should look like x.com/YourHandle. Twitter and X are the same platform — X is the new name.',
                        'icon'        => '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
                    ],
                    [
                        'key'         => 'youtube_url',
                        'name'        => 'YouTube',
                        'desc'        => 'Your official YouTube channel',
                        'placeholder' => 'https://www.youtube.com/@mangrovesglobal',
                        'color'       => 'text-red-500',
                        'bg'          => 'bg-red-50',
                        'type'        => 'url',
                        'tip'         => 'Go to your YouTube channel page in a browser and copy the URL. It should look like youtube.com/@YourChannelName. Only needed if you have a YouTube channel.',
                        'icon'        => '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
                    ],
                    [
                        'key'         => 'whatsapp_number',
                        'name'        => 'WhatsApp Business',
                        'desc'        => 'Business phone number for WhatsApp',
                        'placeholder' => '+971501234567',
                        'color'       => 'text-green-600',
                        'bg'          => 'bg-green-50',
                        'type'        => 'tel',
                        'tip'         => 'Enter your WhatsApp Business phone number in international format — always start with + then the country code (971 for UAE). Example: +971 50 123 4567. No spaces, no dashes. This is used to generate a direct "Chat on WhatsApp" link on the contact page.',
                        'icon'        => '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>',
                    ],
                ];
            @endphp

            <div class="grid sm:grid-cols-2 gap-4">
                @foreach($socialCards as $card)
                    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                        <div class="px-5 py-4 border-b border-mangrove-100 flex items-center justify-between gap-3">
                            <div class="flex items-center gap-2.5 min-w-0">
                                <div class="w-8 h-8 rounded-lg {{ $card['bg'] }} flex items-center justify-center shrink-0">
                                    <svg class="w-3.5 h-3.5 {{ $card['color'] }}" viewBox="0 0 24 24" fill="currentColor">{!! $card['icon'] !!}</svg>
                                </div>
                                <div class="min-w-0">
                                    <div class="font-serif font-semibold text-mangrove-900 text-sm">{{ $card['name'] }}</div>
                                    <div class="text-[11px] text-mangrove-800/40 truncate">{{ $card['desc'] }}</div>
                                </div>
                            </div>
                            @if(seoFieldActive($settings, $card['key']))
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Set</span>
                            @else
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-[11px] shrink-0">Empty</span>
                            @endif
                        </div>
                        <div class="px-5 py-4">
                            <div class="flex items-center mb-1.5">
                                <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">
                                    {{ $card['key'] === 'whatsapp_number' ? 'Phone Number' : 'Profile URL' }}
                                </label>
                                {!! tipIcon($card['tip']) !!}
                            </div>
                            <input
                                type="{{ $card['type'] }}"
                                name="{{ $card['key'] }}"
                                value="{{ seoFieldVal($settings, $card['key']) }}"
                                placeholder="{{ $card['placeholder'] }}"
                                class="w-full px-3.5 py-2.5 border border-mangrove-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent"
                            >
                            @if(seoFieldActive($settings, $card['key']) && $card['type'] === 'url')
                                <a href="{{ seoFieldVal($settings, $card['key']) }}" target="_blank" rel="noopener" class="mt-1.5 inline-flex items-center gap-1 text-[11px] text-mangrove-accent hover:underline">
                                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                    View profile &rarr;
                                </a>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- ── SECTION: Open Graph & Schema ────────────────────────────────────── --}}
        <div class="mt-8 mb-2">
            <div class="flex items-center gap-1.5 px-1 mb-2">
                <span class="text-[10px] uppercase tracking-widest font-semibold text-mangrove-800/40">Open Graph &amp; Schema Markup</span>
                {!! tipIcon('Open Graph controls what image, title and description appear when someone shares a link to your website on Facebook, WhatsApp, LinkedIn or iMessage. Schema Markup is hidden code that helps Google understand your business details.') !!}
            </div>
            <div class="space-y-4">

                {{-- Default OG Image --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Default Share Image</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Fallback image shown when sharing any page on social media</div>
                            </div>
                        </div>
                        @if(seoFieldActive($settings, 'default_og_image_url'))
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Image URL</label>
                            {!! tipIcon('When someone shares a link to your website (on WhatsApp, LinkedIn, etc.) this is the image that appears in the preview card. It should be 1200 x 630 pixels — roughly the size of a phone screen turned sideways. Upload it to your media library and paste the full URL here.') !!}
                        </div>
                        <input type="url" name="default_og_image_url" value="{{ seoFieldVal($settings, 'default_og_image_url') }}" placeholder="https://mangrovesglobal.com/og-default.jpg"
                               class="w-full max-w-xl px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Upload a <strong class="text-mangrove-800/70">1200 &times; 630 px</strong> image (JPG or PNG, under 1 MB) and paste the full URL. This is the image Facebook, LinkedIn, and WhatsApp show when a page link is shared and no page-specific image has been set.</p>
                        @if(seoFieldActive($settings, 'default_og_image_url'))
                            <div class="mt-3 w-48 rounded-lg overflow-hidden border border-mangrove-100">
                                <img src="{{ seoFieldVal($settings, 'default_og_image_url') }}" alt="OG image preview" class="w-full h-auto object-cover" loading="lazy" onerror="this.parentElement.style.display='none'">
                            </div>
                        @endif
                    </div>
                </div>

            </div>
        </div>

        {{-- ── SECTION: Business Listings ───────────────────────────────────────── --}}
        <div class="mt-8 mb-2">
            <div class="flex items-center gap-1.5 px-1 mb-2">
                <span class="text-[10px] uppercase tracking-widest font-semibold text-mangrove-800/40">Business Listings</span>
                {!! tipIcon('These links connect your website to your verified business listings on Google Maps and other directories. When correctly set up, your business appears on maps and in "near me" search results with your address, phone, and hours.') !!}
            </div>
            <div class="space-y-4">

                {{-- Google Business Profile --}}
                <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
                    <div class="px-6 py-4 border-b border-mangrove-100 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-serif font-semibold text-mangrove-900">Google Business Profile</div>
                                <div class="text-xs text-mangrove-800/40 truncate">Local SEO — appear in Google Maps and "near me" searches</div>
                            </div>
                        </div>
                        @php $gbp = $settings->get('google_business_profile_url') @endphp
                        @if($gbp && $gbp->value)
                            <a href="{{ $gbp->value }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors shrink-0">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active &nearr;
                            </a>
                        @else
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mangrove-50 text-mangrove-800/40 text-xs shrink-0">Not configured</span>
                        @endif
                    </div>
                    <div class="px-6 py-5">
                        <div class="flex items-center mb-1.5">
                            <label class="text-xs font-semibold text-mangrove-900 uppercase tracking-wider">Profile URL</label>
                            {!! tipIcon('Go to business.google.com → click your business → click the Share button at the top right → copy the link. It will look like g.page/YourBusinessName or a maps.google.com/... link.') !!}
                        </div>
                        <input type="url" name="google_business_profile_url" value="{{ seoFieldVal($settings, 'google_business_profile_url') }}" placeholder="https://g.page/mangrovesglobal"
                               class="w-full max-w-xl px-4 py-2.5 border border-mangrove-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-accent/40 focus:border-mangrove-accent">
                        <p class="mt-2 text-xs text-mangrove-800/50">Get from: <span class="font-mono bg-mangrove-50 px-1 rounded">business.google.com</span> &rarr; your profile &rarr; Share button &rarr; copy the link. Used to link to your business reviews page and in Schema markup.</p>
                    </div>
                </div>

            </div>
        </div>

    </form>

    {{-- ── Sticky Save Bar ─────────────────────────────────────────────────── --}}
    <div class="fixed bottom-0 left-0 right-0 z-30 border-t border-mangrove-100 bg-white/90 backdrop-blur-md px-6 py-4 md:ml-64">
        <div class="max-w-4xl flex items-center justify-between gap-6">
            <p class="text-xs text-mangrove-800/50 leading-relaxed hidden sm:block">
                Changes go live after the next frontend cache refresh (up to 1&nbsp;hour) or a new deployment.
            </p>
            <button
                type="submit"
                form="main-integrations-form"
                class="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-mangrove-900 text-white rounded-xl font-semibold text-sm hover:bg-mangrove-800 transition-colors shadow-lg shadow-mangrove-900/20"
            >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save All Integrations
            </button>
        </div>
    </div>

</x-app-layout>
