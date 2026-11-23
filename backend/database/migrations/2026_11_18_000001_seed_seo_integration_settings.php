<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $rows = [
            [
                'key'         => 'ga4_measurement_id',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'GA4 Measurement ID',
                'description' => 'Google Analytics 4 — format: G-XXXXXXXXXX. Leave blank when using GTM (avoids double-counting).',
                'is_public'   => true,
                'order'       => 10,
            ],
            [
                'key'         => 'gtm_container_id',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'GTM Container ID',
                'description' => 'Google Tag Manager — format: GTM-XXXXXXX. When set, GTM fires GA4 (do not set both).',
                'is_public'   => true,
                'order'       => 20,
            ],
            [
                'key'         => 'google_site_verification',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'Google Search Console Verification',
                'description' => 'Paste only the content="…" value from the HTML meta tag, not the full tag.',
                'is_public'   => true,
                'order'       => 30,
            ],
            [
                'key'         => 'bing_site_verification',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'Bing Webmaster Verification',
                'description' => 'Paste only the content="…" value from the msvalidate.01 meta tag.',
                'is_public'   => true,
                'order'       => 40,
            ],
            [
                'key'         => 'indexnow_key',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'IndexNow Key',
                'description' => 'Generate from Bing Webmaster Tools → IndexNow. Also create public/{key}.txt containing just the key.',
                'is_public'   => false,
                'order'       => 50,
            ],
            [
                'key'         => 'google_business_profile_url',
                'value'       => null,
                'type'        => 'url',
                'group'       => 'seo_integrations',
                'label'       => 'Google Business Profile URL',
                'description' => 'Full URL to the Google Business Profile listing.',
                'is_public'   => true,
                'order'       => 60,
            ],
        ];

        foreach ($rows as $row) {
            DB::table('site_settings')->upsert(
                array_merge($row, ['created_at' => now(), 'updated_at' => now()]),
                ['key'],
                ['type', 'group', 'label', 'description', 'is_public', 'order', 'updated_at']
            );
        }
    }

    public function down(): void
    {
        DB::table('site_settings')->whereIn('key', [
            'ga4_measurement_id',
            'gtm_container_id',
            'google_site_verification',
            'bing_site_verification',
            'indexnow_key',
            'google_business_profile_url',
        ])->delete();
    }
};
