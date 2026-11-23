<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;

class SiteSettingApiController extends Controller
{
    public function index()
    {
        return response()->json(SiteSetting::allPublicKeyed());
    }

    public function seoIntegrations()
    {
        $keys = [
            'ga4_measurement_id', 'gtm_container_id', 'facebook_pixel_id', 'linkedin_partner_id', 'hotjar_site_id',
            'google_site_verification', 'bing_site_verification',
            'facebook_url', 'instagram_url', 'linkedin_url', 'twitter_url', 'youtube_url', 'whatsapp_number',
            'default_og_image_url', 'google_business_profile_url',
        ];
        $settings = SiteSetting::whereIn('key', $keys)->get()->pluck('value', 'key');
        return response()->json($settings);
    }
}
