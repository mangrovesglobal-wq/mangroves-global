<x-app-layout>
    <x-slot name="header">
        <div>
            <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">
                <a href="{{ route('seo.overview') }}" class="hover:text-mangrove-accent">SEO</a>
                <span>/</span>
                <span class="text-mangrove-900">{{ $pageInfo['title'] }}</span>
            </div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">{{ $pageInfo['title'] }} — SEO</h2>
            <p class="text-sm text-mangrove-800/50">{{ $pageInfo['url'] }}</p>
        </div>
        <a href="{{ route('seo.overview') }}" class="text-sm text-mangrove-800/60 hover:text-mangrove-900">← SEO Overview</a>
    </x-slot>

    @if(session('success'))
        <div class="mb-6 px-5 py-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium">
            {{ session('success') }}
        </div>
    @endif

    {{-- Alpine component defined in a script block to avoid HTML-attribute escaping of PHP values --}}
    <script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('seoEditor', () => ({
            metaTitle:       @json($seo->meta_title ?? ''),
            metaDesc:        @json($seo->meta_description ?? ''),
            focusKw:         @json($seo->focus_keyword ?? ''),
            ogTitle:         @json($seo->og_title ?? ''),
            ogDesc:          @json($seo->og_description ?? ''),
            ogImageUrl:      @json($seo->og_image ?? ''),
            twitterTitle:    @json($seo->twitter_title ?? ''),
            twitterDesc:     @json($seo->twitter_description ?? ''),
            twitterImageUrl: @json($seo->twitter_image ?? ''),
            canonicalUrl:    @json($seo->canonical_url ?? $autoCanonical),
            schemaType:      @json($seo->schema_type ?? ''),
            schemaJson:      @json($seo->custom_schema_json ?? ''),
            activeTab:       'basic',
            schemaTemplates: @json($templates),

            get titleLen() { return this.metaTitle.length; },
            get descLen()  { return this.metaDesc.length; },

            get ogTitleDisplay() { return this.ogTitle || this.metaTitle || 'No title set'; },
            get ogDescDisplay()  { return this.ogDesc  || this.metaDesc  || 'No description set.'; },

            get titleStatus() {
                const l = this.titleLen;
                if (l === 0) return { label: 'Empty — required', color: 'text-red-500', bar: 'bg-red-400', pct: 0 };
                if (l < 30)  return { label: l + ' / 60 — too short', color: 'text-yellow-600', bar: 'bg-yellow-400', pct: Math.round(l / 60 * 100) };
                if (l > 60)  return { label: l + ' / 60 — too long!', color: 'text-red-500',    bar: 'bg-red-400',    pct: 100 };
                return              { label: l + ' / 60 — perfect ✓', color: 'text-green-600',  bar: 'bg-green-400',  pct: Math.round(l / 60 * 100) };
            },
            get descStatus() {
                const l = this.descLen;
                if (l === 0)  return { label: 'Empty — required', color: 'text-red-500',    bar: 'bg-red-400',    pct: 0 };
                if (l < 100)  return { label: l + ' / 160 — too short', color: 'text-yellow-600', bar: 'bg-yellow-400', pct: Math.round(l / 160 * 100) };
                if (l > 160)  return { label: l + ' / 160 — too long!', color: 'text-red-500',    bar: 'bg-red-400',    pct: 100 };
                return               { label: l + ' / 160 — perfect ✓', color: 'text-green-600',  bar: 'bg-green-400',  pct: Math.round(l / 160 * 100) };
            },

            get seoScore() {
                let s = 0;
                const tl = this.titleLen, dl = this.descLen;
                if (tl >= 30 && tl <= 60) s += 25; else if (tl > 0) s += 10;
                if (dl >= 100 && dl <= 160) s += 25; else if (dl > 0) s += 10;
                if (this.focusKw.length > 0)      s += 15;
                if (this.ogImageUrl.length > 0)   s += 15;
                if (this.ogTitle.length > 0 || this.metaTitle.length > 0) s += 10;
                if (this.schemaType.length > 0 || this.schemaJson.length > 10) s += 10;
                return Math.min(s, 100);
            },
            get scoreColor() {
                return this.seoScore >= 80 ? 'text-green-600' : (this.seoScore >= 50 ? 'text-yellow-600' : 'text-red-500');
            },
            get scoreLabel() {
                return this.seoScore >= 80 ? 'Good' : (this.seoScore >= 50 ? 'Needs Work' : 'Poor');
            },
            get scoreBg() {
                return this.seoScore >= 80 ? '#16a34a' : (this.seoScore >= 50 ? '#ca8a04' : '#ef4444');
            },

            loadSchemaTemplate(type) {
                if (this.schemaTemplates[type]) {
                    this.schemaJson = JSON.stringify(Object.assign({ '@@context': 'https://schema.org' }, this.schemaTemplates[type]), null, 2);
                }
            },
            handleOgImageChange(e) {
                const file = e.target.files[0];
                if (file) this.ogImageUrl = URL.createObjectURL(file);
            },
            handleTwitterImageChange(e) {
                const file = e.target.files[0];
                if (file) this.twitterImageUrl = URL.createObjectURL(file);
            },
        }));
    });
    </script>

    <div x-data="seoEditor" class="grid lg:grid-cols-3 gap-6">

        {{-- ── LEFT COLUMN: form ── --}}
        <div class="lg:col-span-2 space-y-5">

            {{-- Tab bar --}}
            <div class="flex gap-1 border-b border-mangrove-100 overflow-x-auto">
                @foreach([
                    ['basic',   'Basic SEO'],
                    ['og',      'Open Graph'],
                    ['twitter', 'Twitter Card'],
                    ['tech',    'Technical'],
                    ['schema',  'Schema / JSON-LD'],
                    ['sitemap', 'Sitemap'],
                ] as [$t, $l])
                <button type="button" @click="activeTab = '{{ $t }}'"
                    :class="activeTab === '{{ $t }}' ? 'border-b-2 border-mangrove-900 text-mangrove-900 font-semibold' : 'text-mangrove-800/50 hover:text-mangrove-900'"
                    class="px-4 py-3 text-xs uppercase tracking-widest whitespace-nowrap transition-colors shrink-0">
                    {{ $l }}
                </button>
                @endforeach
            </div>

            <form method="POST" action="{{ route('seo.update', $pageKey) }}" enctype="multipart/form-data" class="space-y-5">
                @csrf @method('PUT')

                {{-- ── BASIC SEO ── --}}
                <div x-show="activeTab === 'basic'" class="space-y-5">

                    <div class="bg-white border border-mangrove-100 rounded-2xl p-6 space-y-5">
                        {{-- Meta Title --}}
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label class="text-xs uppercase tracking-wider text-mangrove-800/60">Meta Title <span class="text-mangrove-accent">*</span></label>
                                <span :class="titleStatus.color" class="text-xs font-medium" x-text="titleStatus.label"></span>
                            </div>
                            <input type="text" name="meta_title" x-model="metaTitle" maxlength="70"
                                placeholder="Page title for Google search results (50–60 characters)"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                            <div class="mt-1.5 h-1.5 bg-mangrove-100 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-300" :class="titleStatus.bar" :style="'width:' + titleStatus.pct + '%'"></div>
                            </div>
                        </div>

                        {{-- Meta Description --}}
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label class="text-xs uppercase tracking-wider text-mangrove-800/60">Meta Description <span class="text-mangrove-accent">*</span></label>
                                <span :class="descStatus.color" class="text-xs font-medium" x-text="descStatus.label"></span>
                            </div>
                            <textarea name="meta_description" x-model="metaDesc" rows="3" maxlength="200"
                                placeholder="Brief page summary for search engines (150–160 characters)"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent resize-none"></textarea>
                            <div class="mt-1.5 h-1.5 bg-mangrove-100 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-300" :class="descStatus.bar" :style="'width:' + descStatus.pct + '%'"></div>
                            </div>
                        </div>

                        {{-- Focus Keyword --}}
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Focus Keyword</label>
                            <input type="text" name="focus_keyword" x-model="focusKw"
                                placeholder="Primary keyword this page targets (e.g. black pepper supplier UAE)"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                        </div>

                        {{-- Secondary Keywords --}}
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Secondary Keywords <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">(comma-separated)</span></label>
                            <input type="text" name="secondary_keywords" value="{{ $seo->secondary_keywords }}"
                                placeholder="wholesale spices dubai, spice importer uae, ..."
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                        </div>
                    </div>
                </div>

                {{-- ── OPEN GRAPH ── --}}
                <div x-show="activeTab === 'og'" class="space-y-5">
                    <div class="bg-white border border-mangrove-100 rounded-2xl p-6 space-y-5">
                        <p class="text-xs text-mangrove-800/50 leading-relaxed">Controls how this page looks when shared on Facebook, LinkedIn, WhatsApp, and other platforms. If left blank, meta title/description are used as fallback.</p>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">OG Title <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">(fallback: Meta Title)</span></label>
                            <input type="text" name="og_title" x-model="ogTitle" maxlength="100"
                                placeholder="Leave blank to use Meta Title"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">OG Description <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">(fallback: Meta Description)</span></label>
                            <textarea name="og_description" x-model="ogDesc" rows="3"
                                placeholder="Leave blank to use Meta Description"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent resize-none"></textarea>
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">
                                OG Image <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">Recommended: 1200×630 px</span>
                            </label>
                            <template x-if="ogImageUrl">
                                <img :src="ogImageUrl" class="h-28 w-auto mb-3 rounded-xl object-cover border border-mangrove-100" alt="">
                            </template>
                            <input type="file" name="og_image" accept="image/*" @change="handleOgImageChange($event)"
                                class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">
                            @if($seo->og_image)
                                <input type="hidden" name="og_image_keep" value="{{ $seo->og_image }}">
                            @endif
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">OG Type</label>
                            <select name="og_type" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                <option value="website" @selected(($seo->og_type ?? 'website') === 'website')>website (default)</option>
                                <option value="article" @selected($seo->og_type === 'article')>article</option>
                                <option value="service" @selected($seo->og_type === 'service')>service</option>
                            </select>
                        </div>
                    </div>
                </div>

                {{-- ── TWITTER CARD ── --}}
                <div x-show="activeTab === 'twitter'" class="space-y-5">
                    <div class="bg-white border border-mangrove-100 rounded-2xl p-6 space-y-5">
                        <p class="text-xs text-mangrove-800/50 leading-relaxed">Twitter (X) card meta tags. If left blank, OG tags are used as fallback automatically.</p>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Card Type</label>
                            <select name="twitter_card" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                <option value="summary_large_image" @selected(($seo->twitter_card ?? 'summary_large_image') === 'summary_large_image')>summary_large_image (Recommended — large image preview)</option>
                                <option value="summary" @selected($seo->twitter_card === 'summary')>summary (Small square thumbnail)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Twitter Title <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">(fallback: OG Title)</span></label>
                            <input type="text" name="twitter_title" x-model="twitterTitle" maxlength="100"
                                placeholder="Leave blank to use OG Title"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Twitter Description <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">(fallback: OG Description)</span></label>
                            <textarea name="twitter_description" x-model="twitterDesc" rows="3"
                                placeholder="Leave blank to use OG Description"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent resize-none"></textarea>
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Twitter Image <span class="text-mangrove-800/30 normal-case tracking-normal font-normal">Recommended: 1200×600 px</span></label>
                            <template x-if="twitterImageUrl">
                                <img :src="twitterImageUrl" class="h-24 w-auto mb-3 rounded-xl object-cover border border-mangrove-100" alt="">
                            </template>
                            <input type="file" name="twitter_image" accept="image/*" @change="handleTwitterImageChange($event)"
                                class="w-full text-sm text-mangrove-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-mangrove-accent/20 file:text-mangrove-900 file:text-xs file:tracking-widest file:uppercase">
                            @if($seo->twitter_image)
                                <input type="hidden" name="twitter_image_keep" value="{{ $seo->twitter_image }}">
                            @endif
                        </div>
                    </div>
                </div>

                {{-- ── TECHNICAL ── --}}
                <div x-show="activeTab === 'tech'" class="space-y-5">
                    <div class="bg-white border border-mangrove-100 rounded-2xl p-6 space-y-5">

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Canonical URL</label>
                            <input type="text" name="canonical_url" x-model="canonicalUrl"
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm font-mono text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                            <p class="mt-1 text-xs text-mangrove-800/40">Auto-suggested: {{ $autoCanonical }}</p>
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Robots Directive</label>
                            <select name="robots" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                <option value="index,follow"     @selected(($seo->robots ?? 'index,follow') === 'index,follow')>index, follow — Default (recommended for public pages)</option>
                                <option value="noindex,follow"   @selected($seo->robots === 'noindex,follow')>noindex, follow — Exclude page from search, follow its links</option>
                                <option value="index,nofollow"   @selected($seo->robots === 'index,nofollow')>index, nofollow — Index page, don't follow its links</option>
                                <option value="noindex,nofollow" @selected($seo->robots === 'noindex,nofollow')>noindex, nofollow — Fully exclude from Google</option>
                            </select>
                        </div>
                    </div>
                </div>

                {{-- ── SCHEMA / JSON-LD ── --}}
                <div x-show="activeTab === 'schema'" class="space-y-5">
                    <div class="bg-white border border-mangrove-100 rounded-2xl p-6 space-y-5">
                        <p class="text-xs text-mangrove-800/50 leading-relaxed">Structured data helps Google show rich results (FAQs, breadcrumbs, service cards). Select a template to auto-fill or write custom JSON-LD.</p>

                        <div>
                            <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Schema Type / Template</label>
                            <div class="flex gap-3">
                                <select name="schema_type" x-model="schemaType" class="flex-1 border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                    <option value="">— None —</option>
                                    @foreach(array_keys($templates) as $type)
                                        <option value="{{ $type }}" @selected($seo->schema_type === $type)>{{ $type }}</option>
                                    @endforeach
                                    <option value="Custom" @selected($seo->schema_type === 'Custom')>Custom (use editor below)</option>
                                </select>
                                <button type="button" @click="loadSchemaTemplate(schemaType)"
                                    class="px-5 py-2.5 bg-mangrove-50 border border-mangrove-100 rounded-xl text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:bg-mangrove-accent/20 transition-colors whitespace-nowrap">
                                    Load Template
                                </button>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label class="text-xs uppercase tracking-wider text-mangrove-800/60">JSON-LD Editor</label>
                                <span class="text-xs text-mangrove-800/30">Rendered as &lt;script type="application/ld+json"&gt;</span>
                            </div>
                            <textarea name="custom_schema_json" x-model="schemaJson" rows="14" spellcheck="false"
                                placeholder='{&#10;  "@@context": "https://schema.org",&#10;  "@@type": "WebPage",&#10;  "name": "...",&#10;  "description": "..."&#10;}'
                                class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm font-mono text-mangrove-900 focus:outline-none focus:border-mangrove-accent bg-mangrove-50/50 leading-relaxed"></textarea>
                        </div>
                    </div>
                </div>

                {{-- ── SITEMAP ── --}}
                <div x-show="activeTab === 'sitemap'" class="space-y-5">
                    <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
                        <div class="grid sm:grid-cols-3 gap-5">
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Include in Sitemap</label>
                                <label class="flex items-center gap-3 mt-2 cursor-pointer">
                                    <input type="hidden" name="sitemap_include" value="0">
                                    <input type="checkbox" name="sitemap_include" value="1" {{ ($seo->sitemap_include ?? true) ? 'checked' : '' }}
                                        class="w-5 h-5 rounded accent-mangrove-accent">
                                    <span class="text-sm text-mangrove-900">Yes, include</span>
                                </label>
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Priority <span class="font-normal normal-case tracking-normal text-mangrove-800/30">(0.1 – 1.0)</span></label>
                                <select name="sitemap_priority" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                    @foreach([1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.3, 0.1] as $p)
                                        <option value="{{ $p }}" @selected(($seo->sitemap_priority ?? 0.8) == $p)>
                                            {{ $p }}{{ $p == 1.0 ? ' — Homepage' : ($p == 0.9 ? ' — Key pages' : ($p == 0.8 ? ' — Main pages' : ($p == 0.7 ? ' — Secondary' : ''))) }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Change Frequency</label>
                                <select name="sitemap_changefreq" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                    @foreach(['always','hourly','daily','weekly','monthly','yearly','never'] as $f)
                                        <option value="{{ $f }}" @selected(($seo->sitemap_changefreq ?? 'monthly') === $f)>{{ ucfirst($f) }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Save button --}}
                <div class="flex justify-end gap-3 pt-2">
                    <a href="{{ route('seo.overview') }}" class="px-6 py-3 border border-mangrove-200 text-mangrove-900 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-50 transition-colors">
                        Cancel
                    </a>
                    <button type="submit" class="px-8 py-3 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                        Save SEO Settings
                    </button>
                </div>
            </form>
        </div>

        {{-- ── RIGHT COLUMN: live previews + score ── --}}
        <div class="space-y-5">

            {{-- SEO Score --}}
            <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
                <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">SEO Score</div>
                <div class="flex items-center gap-4 mb-5">
                    <div class="relative w-20 h-20 shrink-0">
                        <svg viewBox="0 0 36 36" class="w-20 h-20" style="transform: rotate(-90deg)">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f1ee" stroke-width="3"/>
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke-width="3"
                                :stroke="scoreBg"
                                stroke-linecap="round"
                                stroke-dasharray="100 100"
                                :stroke-dashoffset="100 - seoScore"
                                style="transition: stroke-dashoffset 0.5s ease"/>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="font-bold text-xl" :class="scoreColor" x-text="seoScore"></span>
                        </div>
                    </div>
                    <div>
                        <div class="font-serif text-lg font-semibold text-mangrove-900" x-text="scoreLabel"></div>
                        <div class="text-xs text-mangrove-800/50 mt-1">out of 100 points</div>
                    </div>
                </div>

                <div class="space-y-2 text-sm border-t border-mangrove-100 pt-4">
                    <div class="flex items-center gap-2">
                        <span class="text-base" :class="titleLen >= 30 && titleLen <= 60 ? 'text-green-500' : 'text-mangrove-200'">●</span>
                        <span class="text-mangrove-800/70 flex-1">Title 30–60 chars</span>
                        <span class="font-semibold text-xs" :class="titleLen >= 30 && titleLen <= 60 ? 'text-green-600' : 'text-mangrove-800/30'" x-text="titleLen >= 30 && titleLen <= 60 ? '+25' : (titleLen > 0 ? '+10' : '0')"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-base" :class="descLen >= 100 && descLen <= 160 ? 'text-green-500' : 'text-mangrove-200'">●</span>
                        <span class="text-mangrove-800/70 flex-1">Description 100–160 chars</span>
                        <span class="font-semibold text-xs" :class="descLen >= 100 && descLen <= 160 ? 'text-green-600' : 'text-mangrove-800/30'" x-text="descLen >= 100 && descLen <= 160 ? '+25' : (descLen > 0 ? '+10' : '0')"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-base" :class="focusKw.length > 0 ? 'text-green-500' : 'text-mangrove-200'">●</span>
                        <span class="text-mangrove-800/70 flex-1">Focus keyword set</span>
                        <span class="font-semibold text-xs" :class="focusKw.length > 0 ? 'text-green-600' : 'text-mangrove-800/30'" x-text="focusKw.length > 0 ? '+15' : '0'"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-base" :class="ogImageUrl.length > 0 ? 'text-green-500' : 'text-mangrove-200'">●</span>
                        <span class="text-mangrove-800/70 flex-1">OG image uploaded</span>
                        <span class="font-semibold text-xs" :class="ogImageUrl.length > 0 ? 'text-green-600' : 'text-mangrove-800/30'" x-text="ogImageUrl.length > 0 ? '+15' : '0'"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-base" :class="ogTitle.length > 0 || metaTitle.length > 0 ? 'text-green-500' : 'text-mangrove-200'">●</span>
                        <span class="text-mangrove-800/70 flex-1">OG / Meta title present</span>
                        <span class="font-semibold text-xs" :class="ogTitle.length > 0 || metaTitle.length > 0 ? 'text-green-600' : 'text-mangrove-800/30'" x-text="ogTitle.length > 0 || metaTitle.length > 0 ? '+10' : '0'"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-base" :class="schemaType.length > 0 || schemaJson.length > 10 ? 'text-green-500' : 'text-mangrove-200'">●</span>
                        <span class="text-mangrove-800/70 flex-1">Structured data (schema)</span>
                        <span class="font-semibold text-xs" :class="schemaType.length > 0 || schemaJson.length > 10 ? 'text-green-600' : 'text-mangrove-800/30'" x-text="schemaType.length > 0 || schemaJson.length > 10 ? '+10' : '0'"></span>
                    </div>
                </div>
            </div>

            {{-- SERP Preview --}}
            <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
                <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-3">Google Search Preview</div>
                <div class="bg-white rounded-xl border border-gray-200 p-4 font-sans">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-5 h-5 rounded-full bg-mangrove-accent flex items-center justify-center text-[8px] font-bold text-mangrove-900 shrink-0">M</div>
                        <div class="min-w-0">
                            <div class="text-xs text-gray-800 font-medium truncate">Mangroves Global</div>
                            <div class="text-xs text-gray-500 font-mono truncate">mangrovesglobal.com › {{ ltrim($pageInfo['url'], '/') }}</div>
                        </div>
                    </div>
                    <div class="text-blue-700 text-base font-medium leading-tight hover:underline cursor-pointer truncate"
                        x-text="metaTitle || 'No title set — add a meta title'"></div>
                    <div class="text-gray-600 text-sm mt-1 leading-snug" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
                        x-text="metaDesc || 'No description set — add a meta description to control what Google shows here.'"></div>
                </div>
            </div>

            {{-- OG / Social Share Preview --}}
            <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
                <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-3">Social Share Preview</div>
                <div class="rounded-xl overflow-hidden border border-gray-200">
                    <div class="bg-mangrove-50 overflow-hidden" style="aspect-ratio: 1.91/1">
                        <template x-if="ogImageUrl">
                            <img :src="ogImageUrl" class="w-full h-full object-cover" alt="">
                        </template>
                        <template x-if="!ogImageUrl">
                            <div class="w-full h-full flex flex-col items-center justify-center text-mangrove-800/30 text-sm p-4">
                                <div class="text-3xl mb-2">🖼</div>
                                <div>No OG image — upload one</div>
                                <div class="text-xs mt-1">Recommended: 1200 × 630 px</div>
                            </div>
                        </template>
                    </div>
                    <div class="p-3 bg-gray-50 border-t border-gray-200">
                        <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">mangrovesglobal.com</div>
                        <div class="font-semibold text-gray-900 text-sm leading-tight truncate" x-text="ogTitleDisplay"></div>
                        <div class="text-xs text-gray-500 mt-1 leading-snug" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" x-text="ogDescDisplay"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
