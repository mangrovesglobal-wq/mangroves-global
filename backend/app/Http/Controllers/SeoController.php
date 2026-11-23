<?php

namespace App\Http\Controllers;

use App\Models\PageSeo;
use App\Models\BlogPost;
use App\Models\Service;
use App\Models\Redirect;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SeoController extends Controller
{
    // Pages registered in the SEO system
    public static array $pages = [
        // Global
        'home'                           => ['title' => 'Home',                                'url' => '/'],
        'about'                          => ['title' => 'About Us',                            'url' => '/about'],
        'contact'                        => ['title' => 'Contact',                             'url' => '/contact'],
        'become-a-partner'               => ['title' => 'Become a Supplier Partner',           'url' => '/become-a-partner'],
        // Trading
        'trading'                        => ['title' => 'Trading Division',                    'url' => '/trading'],
        'trading-about'                  => ['title' => 'About — Trading',                     'url' => '/trading/about'],
        'trading-contact'                => ['title' => 'Contact — Trading',                   'url' => '/trading/contact'],
        'trading-become-a-partner'       => ['title' => 'Become a Partner — Trading',          'url' => '/trading/become-a-partner'],
        'trading-commodities'            => ['title' => 'Commodities — Trading',               'url' => '/trading/commodities'],
        'trading-quality-assurance'      => ['title' => 'Quality Assurance — Trading',         'url' => '/trading/quality-assurance'],
        'trading-sourcing-supply'        => ['title' => 'Sourcing & Supply — Trading',         'url' => '/trading/sourcing-supply'],
        'trading-blog'                   => ['title' => 'Trading Insights (Blog)',              'url' => '/trading/blog'],
        'trading-product-black-pepper'   => ['title' => 'Black Pepper — Trading',              'url' => '/trading/products/black-pepper'],
        'trading-product-cloves'         => ['title' => 'Cloves — Trading',                   'url' => '/trading/products/cloves'],
        'trading-product-coffee-beans'   => ['title' => 'Coffee Beans — Trading',             'url' => '/trading/products/coffee-beans'],
        'trading-product-dry-ginger'     => ['title' => 'Dry Ginger — Trading',               'url' => '/trading/products/dry-ginger'],
        'trading-product-green-cardamom' => ['title' => 'Green Cardamom — Trading',           'url' => '/trading/products/green-cardamom'],
        'trading-product-nutmeg-mace'    => ['title' => 'Nutmeg & Mace — Trading',            'url' => '/trading/products/nutmeg-mace'],
        // Logistics
        'logistics'                      => ['title' => 'Logistics Division',                  'url' => '/logistics'],
        'logistics-about'                => ['title' => 'About — Logistics',                   'url' => '/logistics/about'],
        'logistics-blog'                 => ['title' => 'Logistics Insights (Blog)',           'url' => '/logistics/blog'],
        'logistics-air-freight'          => ['title' => 'Air Freight — Logistics',             'url' => '/logistics/air-freight'],
        'logistics-customs-clearance'    => ['title' => 'Customs Clearance — Logistics',      'url' => '/logistics/customs-clearance'],
        'logistics-freight-coordination' => ['title' => 'Freight Coordination — Logistics',   'url' => '/logistics/freight-coordination'],
        'logistics-import-export'        => ['title' => 'Import & Export — Logistics',        'url' => '/logistics/import-export'],
        'logistics-last-mile'            => ['title' => 'Last-Mile Distribution — Logistics', 'url' => '/logistics/last-mile-distribution'],
        'logistics-road-transport'       => ['title' => 'Road Transport — Logistics',         'url' => '/logistics/road-transport'],
        'logistics-sea-freight'          => ['title' => 'Sea Freight — Logistics',            'url' => '/logistics/sea-freight'],
        'logistics-supply-chain'         => ['title' => 'Supply Chain Consulting — Logistics','url' => '/logistics/supply-chain-consulting'],
        'logistics-warehousing'          => ['title' => 'Warehousing & 3PL — Logistics',      'url' => '/logistics/warehousing-3pl'],
        // Creative
        'creative'                       => ['title' => 'Creative Division',                   'url' => '/creative'],
        'creative-about'                 => ['title' => 'About — Creative',                   'url' => '/creative/about'],
        'creative-services'              => ['title' => 'Services — Creative',                'url' => '/creative/services'],
        'creative-work'                  => ['title' => 'Selected Work — Creative',            'url' => '/creative/work'],
        'creative-contact'               => ['title' => 'Contact — Creative',                 'url' => '/creative/contact'],
        'creative-blog'                  => ['title' => 'Creative Insights (Blog)',            'url' => '/creative/blog'],
        'creative-advertising'           => ['title' => 'Advertising — Creative',             'url' => '/creative/advertising'],
        'creative-digital-marketing'     => ['title' => 'Digital Marketing — Creative',       'url' => '/creative/digital-marketing'],
        'creative-branding'              => ['title' => 'Branding — Creative',                'url' => '/creative/branding'],
        'creative-content-production'    => ['title' => 'Content Production — Creative',      'url' => '/creative/content-production'],
        'creative-web-development'       => ['title' => 'Web Development — Creative',         'url' => '/creative/web-development'],
        'creative-work-ettara'           => ['title' => 'Ettara — Portfolio',                 'url' => '/creative/work/ettara'],
        'creative-work-helthee'          => ['title' => 'Helthee — Portfolio',                'url' => '/creative/work/helthee'],
        'creative-work-holiday-basket'   => ['title' => 'Holiday Basket — Portfolio',         'url' => '/creative/work/holiday-basket'],
        'creative-work-strandbio'        => ['title' => 'Strand Biolife — Portfolio',         'url' => '/creative/work/strandbio'],
        'creative-work-zaincart'         => ['title' => 'ZainCart — Portfolio',               'url' => '/creative/work/zaincart'],
    ];

    public function overview()
    {
        $pages       = self::$pages;
        $seoRecords  = PageSeo::whereIn('page_key', array_keys($pages))->get()->keyBy('page_key');
        $redirects   = Redirect::count();

        // Build health items per page
        $healthItems = collect($pages)->map(function ($info, $key) use ($seoRecords) {
            $seo   = $seoRecords->get($key);
            $score = $seo ? $seo->getSeoScore() : 0;
            return [
                'key'    => $key,
                'title'  => $info['title'],
                'url'    => $info['url'],
                'score'  => $score,
                'has_meta_title' => $seo && $seo->meta_title,
                'has_meta_desc'  => $seo && $seo->meta_description,
                'has_og_image'   => $seo && $seo->og_image,
                'has_schema'     => $seo && ($seo->schema_type || $seo->custom_schema_json),
                'title_len'      => $seo ? strlen($seo->meta_title ?? '') : 0,
                'desc_len'       => $seo ? strlen($seo->meta_description ?? '') : 0,
            ];
        });

        // Blog post SEO health
        $blogPosts = BlogPost::orderBy('division')->orderByDesc('published_at')
            ->get(['id', 'title', 'slug', 'division', 'status', 'meta_title', 'meta_description',
                   'focus_keyword', 'og_image', 'twitter_card', 'schema_type', 'custom_schema_json', 'published_at']);

        $blogHealth = $blogPosts->map(function ($post) {
            $titleLen = strlen($post->meta_title ?? '');
            $descLen  = strlen($post->meta_description ?? '');
            $score = 0;
            if ($titleLen >= 30 && $titleLen <= 60) $score += 25; elseif ($titleLen > 0) $score += 10;
            if ($descLen >= 100 && $descLen <= 160)  $score += 25; elseif ($descLen > 0) $score += 10;
            if ($post->focus_keyword)                $score += 15;
            if ($post->og_image)                     $score += 15;
            if ($post->schema_type || $post->custom_schema_json) $score += 10;
            return [
                'id'       => $post->id,
                'title'    => $post->title,
                'slug'     => $post->slug,
                'division' => $post->division,
                'status'   => $post->status,
                'score'    => min($score, 100),
                'has_meta_title' => (bool) $post->meta_title,
                'has_meta_desc'  => (bool) $post->meta_description,
                'has_og_image'   => (bool) $post->og_image,
                'has_schema'     => (bool) ($post->schema_type || $post->custom_schema_json),
                'title_len'      => $titleLen,
                'desc_len'       => $descLen,
            ];
        });

        $totalBlogs  = $blogPosts->where('status', 'published')->count();
        $blogsNoMeta = $blogPosts->where('status', 'published')->filter(fn($b) => !$b['has_meta_title'])->count();

        // Service SEO health
        $services = Service::orderBy('division')->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'division', 'is_active', 'meta_title', 'meta_description',
                   'focus_keyword', 'og_image', 'schema_type', 'custom_schema_json']);

        $serviceHealth = $services->map(function ($svc) {
            $titleLen = strlen($svc->meta_title ?? '');
            $descLen  = strlen($svc->meta_description ?? '');
            $score = 0;
            if ($titleLen >= 30 && $titleLen <= 60) $score += 25; elseif ($titleLen > 0) $score += 10;
            if ($descLen >= 100 && $descLen <= 160)  $score += 25; elseif ($descLen > 0) $score += 10;
            if ($svc->focus_keyword)                 $score += 15;
            if ($svc->og_image)                      $score += 15;
            if ($svc->schema_type || $svc->custom_schema_json) $score += 10;
            return [
                'id'       => $svc->id,
                'name'     => $svc->name,
                'slug'     => $svc->slug,
                'division' => $svc->division,
                'is_active' => $svc->is_active,
                'score'    => min($score, 100),
                'has_meta_title' => (bool) $svc->meta_title,
                'has_meta_desc'  => (bool) $svc->meta_description,
                'has_og_image'   => (bool) $svc->og_image,
                'has_schema'     => (bool) ($svc->schema_type || $svc->custom_schema_json),
                'title_len'      => $titleLen,
                'desc_len'       => $descLen,
            ];
        });

        $servicesNoMeta = $serviceHealth->filter(fn($s) => $s['is_active'] && !$s['has_meta_title'])->count();

        return view('seo.overview', compact(
            'pages', 'healthItems', 'totalBlogs', 'blogsNoMeta',
            'blogHealth', 'serviceHealth', 'servicesNoMeta', 'redirects', 'seoRecords'
        ));
    }

    public function edit(string $pageKey)
    {
        abort_unless(isset(self::$pages[$pageKey]), 404);

        $pageInfo = self::$pages[$pageKey];
        $seo      = PageSeo::firstOrNew(['page_key' => $pageKey], [
            'page_title'       => $pageInfo['title'],
            'robots'           => 'index,follow',
            'twitter_card'     => 'summary_large_image',
            'og_type'          => 'website',
            'sitemap_include'  => true,
            'sitemap_priority' => 0.8,
            'sitemap_changefreq' => 'monthly',
        ]);

        $templates     = PageSeo::schemaTemplates();
        $siteUrl       = config('app.url', 'https://mangrovesglobal.com');
        $autoCanonical = rtrim($siteUrl, '/') . $pageInfo['url'];

        return view('seo.edit', compact('pageKey', 'pageInfo', 'seo', 'templates', 'autoCanonical', 'siteUrl'));
    }

    public function update(Request $request, string $pageKey)
    {
        abort_unless(isset(self::$pages[$pageKey]), 404);

        $data = $request->except(['_token', '_method']);
        $data['sitemap_include'] = $request->boolean('sitemap_include');

        // Handle OG image upload
        if ($request->hasFile('og_image')) {
            $path = $request->file('og_image')->store('seo/' . $pageKey, 'public');
            $data['og_image'] = Storage::url($path);
        }

        // Handle Twitter image upload
        if ($request->hasFile('twitter_image')) {
            $path = $request->file('twitter_image')->store('seo/' . $pageKey, 'public');
            $data['twitter_image'] = Storage::url($path);
        }

        PageSeo::updateOrCreate(['page_key' => $pageKey], $data);

        return redirect()->route('seo.edit', $pageKey)->with('success', 'SEO settings saved successfully.');
    }

    // Search Engine Integrations
    public function integrations()
    {
        $keys = [
            // Analytics & tracking
            'ga4_measurement_id', 'gtm_container_id', 'facebook_pixel_id', 'linkedin_partner_id', 'hotjar_site_id',
            // Search verification
            'google_site_verification', 'bing_site_verification',
            // Indexing
            'indexnow_key',
            // Social profiles (from social group)
            'facebook_url', 'instagram_url', 'linkedin_url', 'twitter_url', 'youtube_url', 'whatsapp_number',
            // OG / Schema
            'default_og_image_url',
            // Business listings
            'google_business_profile_url',
        ];
        $settings = SiteSetting::whereIn('key', $keys)->get()->keyBy('key');
        return view('seo.integrations', compact('settings'));
    }

    public function integrationsUpdate(Request $request)
    {
        $keys = [
            'ga4_measurement_id', 'gtm_container_id', 'facebook_pixel_id', 'linkedin_partner_id', 'hotjar_site_id',
            'google_site_verification', 'bing_site_verification',
            'indexnow_key',
            'facebook_url', 'instagram_url', 'linkedin_url', 'twitter_url', 'youtube_url', 'whatsapp_number',
            'default_og_image_url',
            'google_business_profile_url',
        ];

        foreach ($keys as $key) {
            $setting = SiteSetting::where('key', $key)->first();
            if (!$setting) continue;
            $setting->update(['value' => $request->input($key)]);
        }

        return redirect()->route('seo.integrations')->with('success', 'Search engine integrations saved.');
    }

    // Redirect Manager
    public function redirects()
    {
        $redirects = Redirect::orderByDesc('hit_count')->orderByDesc('updated_at')->paginate(50);
        return view('seo.redirects', compact('redirects'));
    }

    public function redirectStore(Request $request)
    {
        $data = $request->validate([
            'source_path'      => 'required|string|max:500|unique:redirects,source_path',
            'destination_path' => 'required|string|max:500',
            'redirect_type'    => 'required|in:301,302',
            'note'             => 'nullable|string|max:200',
        ]);
        $data['is_active'] = $request->boolean('is_active', true);
        Redirect::create($data);
        return redirect()->route('seo.redirects')->with('success', 'Redirect added.');
    }

    public function redirectUpdate(Request $request, Redirect $redirect)
    {
        $data = $request->validate([
            'source_path'      => 'required|string|max:500|unique:redirects,source_path,' . $redirect->id,
            'destination_path' => 'required|string|max:500',
            'redirect_type'    => 'required|in:301,302',
            'note'             => 'nullable|string|max:200',
        ]);
        $data['is_active'] = $request->boolean('is_active');
        $redirect->update($data);
        return redirect()->route('seo.redirects')->with('success', 'Redirect updated.');
    }

    public function redirectDestroy(Redirect $redirect)
    {
        $redirect->delete();
        return redirect()->route('seo.redirects')->with('success', 'Redirect deleted.');
    }
}
