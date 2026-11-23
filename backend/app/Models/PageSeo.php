<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSeo extends Model
{
    protected $table = 'page_seo';

    protected $fillable = [
        'page_key','page_title',
        'meta_title','meta_description','focus_keyword','secondary_keywords',
        'og_title','og_description','og_image','og_type',
        'twitter_card','twitter_title','twitter_description','twitter_image',
        'canonical_url','robots',
        'schema_type','schema_data','custom_schema_json',
        'sitemap_include','sitemap_priority','sitemap_changefreq',
    ];

    protected $casts = [
        'schema_data'      => 'array',
        'sitemap_include'  => 'boolean',
        'sitemap_priority' => 'float',
    ];

    public function getSeoScore(): int
    {
        $score = 0;
        $titleLen = strlen($this->meta_title ?? '');
        $descLen  = strlen($this->meta_description ?? '');

        // Title (25 pts)
        if ($titleLen >= 30 && $titleLen <= 60) $score += 25;
        elseif ($titleLen > 0) $score += 10;

        // Description (25 pts)
        if ($descLen >= 100 && $descLen <= 160) $score += 25;
        elseif ($descLen > 0) $score += 10;

        // Focus keyword (15 pts)
        if ($this->focus_keyword) $score += 15;

        // OG image (15 pts)
        if ($this->og_image) $score += 15;

        // OG title/description (10 pts)
        if ($this->og_title || $this->og_description) $score += 10;

        // Structured data (10 pts)
        if ($this->schema_type || $this->custom_schema_json) $score += 10;

        return min($score, 100);
    }

    public static function findOrNewForPage(string $pageKey, string $pageTitle = ''): self
    {
        return static::firstOrNew(['page_key' => $pageKey], ['page_title' => $pageTitle]);
    }

    public static function schemaTemplates(): array
    {
        return [
            'WebPage' => [
                '@type'       => 'WebPage',
                'name'        => '',
                'description' => '',
                'url'         => '',
                'isPartOf'    => ['@type' => 'WebSite', 'name' => 'Mangroves Global', 'url' => 'https://mangrovesglobal.com'],
            ],
            'Service' => [
                '@type'       => 'Service',
                'name'        => '',
                'description' => '',
                'provider'    => ['@type' => 'Organization', 'name' => 'Mangroves Global Trading FZ LLC'],
                'areaServed'  => ['United Arab Emirates', 'GCC'],
            ],
            'FAQPage' => [
                '@type'      => 'FAQPage',
                'mainEntity' => [
                    ['@type' => 'Question', 'name' => 'Your question here?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Your answer here.']],
                ],
            ],
            'LocalBusiness' => [
                '@type'           => 'LocalBusiness',
                'name'            => 'Mangroves Global Trading FZ LLC',
                'url'             => 'https://mangrovesglobal.com',
                'address'         => ['@type' => 'PostalAddress', 'addressCountry' => 'AE', 'addressLocality' => 'Dubai'],
                'contactPoint'    => ['@type' => 'ContactPoint', 'contactType' => 'customer service', 'email' => 'hello@mangrovesglobal.com'],
            ],
            'Organization' => [
                '@type'  => 'Organization',
                'name'   => 'Mangroves Global Trading FZ LLC',
                'url'    => 'https://mangrovesglobal.com',
                'logo'   => 'https://mangrovesglobal.com/images/logo/mangroves-global-logo-badge.png',
                'sameAs' => [],
            ],
        ];
    }
}
