<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $rows = [
            // Analytics & tracking pixels
            [
                'key'         => 'facebook_pixel_id',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'Facebook Pixel ID',
                'description' => 'Meta/Facebook Pixel — format: 15-digit number. Tracks page views, leads, and conversions from Facebook/Instagram ads.',
                'is_public'   => true,
                'order'       => 70,
            ],
            [
                'key'         => 'linkedin_partner_id',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'LinkedIn Insight Tag Partner ID',
                'description' => 'LinkedIn Campaign Manager — format: 7-digit number. Enables B2B conversion tracking and audience retargeting.',
                'is_public'   => true,
                'order'       => 80,
            ],
            [
                'key'         => 'hotjar_site_id',
                'value'       => null,
                'type'        => 'text',
                'group'       => 'seo_integrations',
                'label'       => 'Hotjar Site ID',
                'description' => 'Hotjar — format: 7-digit number. Records session heatmaps, scroll maps, and visitor recordings.',
                'is_public'   => true,
                'order'       => 90,
            ],
            // Open Graph
            [
                'key'         => 'default_og_image_url',
                'value'       => null,
                'type'        => 'url',
                'group'       => 'seo_integrations',
                'label'       => 'Default Open Graph Image URL',
                'description' => 'Full URL to a 1200×630px image shown when a page is shared on social media without its own OG image.',
                'is_public'   => true,
                'order'       => 100,
            ],
            // YouTube (extends the existing social group)
            [
                'key'         => 'youtube_url',
                'value'       => null,
                'type'        => 'url',
                'group'       => 'social',
                'label'       => 'YouTube Channel URL',
                'description' => 'Full URL to the YouTube channel. Used in Schema markup and footer social links.',
                'is_public'   => true,
                'order'       => 50,
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
            'facebook_pixel_id',
            'linkedin_partner_id',
            'hotjar_site_id',
            'default_og_image_url',
            'youtube_url',
        ])->delete();
    }
};
