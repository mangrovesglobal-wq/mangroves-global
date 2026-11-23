<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'site_name',       'value' => 'Mangroves Global',                        'type' => 'text',  'group' => 'general', 'label' => 'Site Name',           'order' => 1],
            ['key' => 'tagline',         'value' => 'Trading · Logistics · Creative',           'type' => 'text',  'group' => 'general', 'label' => 'Tagline',             'order' => 2],
            ['key' => 'site_logo',       'value' => '/images/logo/mangroves-global-logo-badge.png', 'type' => 'image', 'group' => 'general', 'label' => 'Site Logo (Badge)', 'order' => 3],
            ['key' => 'site_logo_wordmark', 'value' => '/images/logo/mangroves-global-logo-wordmark.png', 'type' => 'image', 'group' => 'general', 'label' => 'Site Logo (Wordmark)', 'order' => 4],

            // Contact
            ['key' => 'contact_email',   'value' => 'hello@mangrovesglobal.com',                'type' => 'email', 'group' => 'contact', 'label' => 'Contact Email',       'order' => 1],
            ['key' => 'contact_phone',   'value' => '+971 50 000 0000',                         'type' => 'text',  'group' => 'contact', 'label' => 'Phone Number',        'order' => 2],
            ['key' => 'address_line1',   'value' => 'Mangroves Global Trading FZ LLC',          'type' => 'text',  'group' => 'contact', 'label' => 'Address Line 1',      'order' => 3],
            ['key' => 'address_line2',   'value' => 'IFZA Business Park, Dubai Silicon Oasis',  'type' => 'text',  'group' => 'contact', 'label' => 'Address Line 2',      'order' => 4],
            ['key' => 'address_city',    'value' => 'Dubai',                                    'type' => 'text',  'group' => 'contact', 'label' => 'City',                'order' => 5],
            ['key' => 'address_country', 'value' => 'United Arab Emirates',                     'type' => 'text',  'group' => 'contact', 'label' => 'Country',             'order' => 6],

            // Social
            ['key' => 'instagram_url',  'value' => '',                                          'type' => 'url',   'group' => 'social',  'label' => 'Instagram URL',       'order' => 1],
            ['key' => 'linkedin_url',   'value' => '',                                          'type' => 'url',   'group' => 'social',  'label' => 'LinkedIn URL',        'order' => 2],
            ['key' => 'facebook_url',   'value' => '',                                          'type' => 'url',   'group' => 'social',  'label' => 'Facebook URL',        'order' => 3],
            ['key' => 'twitter_url',    'value' => '',                                          'type' => 'url',   'group' => 'social',  'label' => 'X (Twitter) URL',     'order' => 4],
            ['key' => 'whatsapp_number','value' => '',                                          'type' => 'text',  'group' => 'social',  'label' => 'WhatsApp Number (intl format)', 'order' => 5],

            // Footer
            ['key' => 'footer_copyright', 'value' => '© 2026 Mangroves Global Trading FZ LLC. All rights reserved.', 'type' => 'text', 'group' => 'footer', 'label' => 'Copyright Text', 'order' => 1],
            ['key' => 'footer_tagline',   'value' => 'Trading · Logistics · Creative',         'type' => 'text',  'group' => 'footer', 'label' => 'Footer Tagline',      'order' => 2],
            ['key' => 'footer_about_text','value' => 'A UAE-based multi-division group operating across commodity trading, freight logistics and digital creative services.', 'type' => 'textarea', 'group' => 'footer', 'label' => 'Footer About Text', 'order' => 3],

            // SEO
            ['key' => 'seo_default_title',       'value' => 'Mangroves Global — Trading, Logistics & Creative, UAE', 'type' => 'text',     'group' => 'seo', 'label' => 'Default Page Title',       'order' => 1],
            ['key' => 'seo_default_description', 'value' => 'Mangroves Global is a UAE-based multi-division group operating across commodity trading, freight & logistics coordination, and digital creative services.', 'type' => 'textarea', 'group' => 'seo', 'label' => 'Default Meta Description', 'order' => 2],
            ['key' => 'google_analytics_id',     'value' => '',                                'type' => 'text',     'group' => 'seo', 'label' => 'Google Analytics ID (G-XXXXXXXX)', 'order' => 3],
            ['key' => 'site_url',                'value' => 'https://mangrovesglobal.com',     'type' => 'url',      'group' => 'seo', 'label' => 'Site URL (canonical)',  'order' => 4],
        ];

        foreach ($settings as $data) {
            SiteSetting::updateOrCreate(['key' => $data['key']], $data);
        }
    }
}
