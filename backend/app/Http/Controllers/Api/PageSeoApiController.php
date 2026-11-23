<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSeo;

class PageSeoApiController extends Controller
{
    public function show(string $pageKey)
    {
        $seo = PageSeo::where('page_key', $pageKey)->first();
        if (!$seo) return response()->json(null);

        return response()->json([
            'meta_title'       => $seo->meta_title,
            'meta_description' => $seo->meta_description,
            'canonical_url'    => $seo->canonical_url,
            'robots'           => $seo->robots ?? 'index,follow',
            'og_title'         => $seo->og_title ?? $seo->meta_title,
            'og_description'   => $seo->og_description ?? $seo->meta_description,
            'og_image'         => $seo->og_image,
            'og_type'          => $seo->og_type ?? 'website',
            'twitter_card'     => $seo->twitter_card ?? 'summary_large_image',
            'twitter_title'    => $seo->twitter_title ?? $seo->og_title ?? $seo->meta_title,
            'twitter_description' => $seo->twitter_description ?? $seo->og_description ?? $seo->meta_description,
            'twitter_image'    => $seo->twitter_image ?? $seo->og_image,
            'schema_type'      => $seo->schema_type,
            'custom_schema_json' => $seo->custom_schema_json,
        ]);
    }
}
