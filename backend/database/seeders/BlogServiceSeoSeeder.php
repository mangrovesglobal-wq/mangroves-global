<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\Service;

class BlogServiceSeoSeeder extends Seeder
{
    private const BASE = 'https://mangrovesglobal.com';
    private const STO  = self::BASE . '/storage/';

    public function run(): void
    {
        $this->seedBlogPosts();
        $this->seedServices();
    }

    // ─── Blog Posts ───────────────────────────────────────────────────────────

    private function seedBlogPosts(): void
    {
        $data = [
            // id => [meta_title, meta_description, og_image_path (storage-relative)]

            // Trading
            1 => [
                'meta_title'       => "Choosing High-Quality Cardamom in UAE | Buyer's Guide",
                'meta_description' => "Learn how to choose premium green cardamom in the UAE. Grading tips, origin secrets and quality checks from Mangroves Global Trading.",
                'og_image'         => self::STO . 'blog-images/U43tAKg5RrOQJ6lCsoDMn4gUNWMVW7jo0Xlx7gNS.jpg',
            ],
            2 => [
                'meta_title'       => 'Wholesale Spice Suppliers UAE | Black Pepper & Cardamom',
                'meta_description' => "Looking for a wholesale spice supplier in UAE? Mangroves Global supplies premium black pepper, cardamom, cloves and more to GCC businesses.",
                'og_image'         => self::STO . 'blog/spices-wholesale-uae.jpg',
            ],
            3 => [
                'meta_title'       => 'Kerala Spices Supplier UAE & GCC | Direct from India',
                'meta_description' => "Source premium Kerala spices direct from India's spice belt to your UAE or GCC business. Wholesale cardamom, pepper and cloves with full docs.",
                'og_image'         => self::STO . 'blog/kerala-spices-india-uae.jpg',
            ],
            12 => [
                'meta_title'       => 'Black Pepper Wholesale UAE | Malabar & Tellicherry',
                'meta_description' => "Wholesale black pepper supplier in UAE. Malabar and Tellicherry grades sourced direct from Kerala. FCL and LCL, full documentation supported.",
                'og_image'         => self::STO . 'blog/black-pepper-kerala-uae.jpg',
            ],
            13 => [
                'meta_title'       => 'Green Cardamom Wholesale UAE | Idukki Supplier Dubai',
                'meta_description' => "Premium green cardamom wholesale in UAE. Idukki bold grade pods sourced direct from Kerala for GCC hotels, food manufacturers and spice traders.",
                'og_image'         => self::STO . 'blog/green-cardamom-wholesale-uae.jpg',
            ],
            14 => [
                'meta_title'       => 'Green Coffee Beans Wholesale UAE | Indian Arabica',
                'meta_description' => "Wholesale green coffee beans from India — Arabica and Robusta. Supply to UAE and GCC roasters, café chains and commodity traders.",
                'og_image'         => self::STO . 'blog/green-coffee-beans-india-uae.jpg',
            ],
            15 => [
                'meta_title'       => 'Wholesale Cloves Supplier UAE Dubai | Kerala Cloves',
                'meta_description' => "Premium wholesale cloves in UAE and Dubai. Kerala cloves with high eugenol content for food manufacturers, pharma and spice traders in the GCC.",
                'og_image'         => self::STO . 'blog/cloves-wholesale-dubai.jpg',
            ],
            16 => [
                'meta_title'       => 'Dry Ginger Wholesale UAE | Kerala Dried Ginger Dubai',
                'meta_description' => "Wholesale dry ginger supplier in UAE and Dubai. Kerala dried ginger for food manufacturers, beverage companies and spice processors in the GCC.",
                'og_image'         => self::STO . 'blog/dry-ginger-wholesale-uae.jpg',
            ],

            // Logistics
            4 => [
                'meta_title'       => 'Sea Freight Dubai UAE | Import & Export Cargo Shipping',
                'meta_description' => "Sea freight coordination from Dubai for UAE importers. FCL and LCL shipments, documentation and customs clearance support. Mangroves Global.",
                'og_image'         => self::STO . 'blog/sea-freight-cargo-dubai.jpg',
            ],
            5 => [
                'meta_title'       => 'UAE Customs Clearance Guide | Importing into Dubai',
                'meta_description' => "Complete guide to UAE customs clearance for importers. Documentation, duties, free zone procedures and how to clear cargo through Dubai ports.",
                'og_image'         => self::STO . 'blog/customs-trucks-uae.jpg',
            ],

            // Creative
            6 => [
                'meta_title'       => 'Brand Identity Design Dubai | Branding Agency UAE',
                'meta_description' => "Professional brand identity design for UAE businesses. Logo design to full visual identity systems — creative team in Dubai. Mangroves Global.",
                'og_image'         => self::STO . 'blog/brand-identity-dubai.jpg',
            ],
            7 => [
                'meta_title'       => 'Digital Marketing Agency Dubai | UAE Business Growth',
                'meta_description' => "Mangroves Global Creative, a digital marketing agency in Dubai helping UAE businesses grow through SEO, paid ads, social media and content strategy.",
                'og_image'         => self::STO . 'blog/digital-marketing-analytics-dubai.jpg',
            ],
            8 => [
                'meta_title'       => 'Social Media Marketing UAE | Instagram & LinkedIn Dubai',
                'meta_description' => "Expert social media marketing for UAE businesses. Build brand presence on Instagram, LinkedIn and TikTok that generates real leads and sales.",
                'og_image'         => self::STO . 'blog/social-media-content-creator-uae.jpg',
            ],
            9 => [
                'meta_title'       => 'Content Production Dubai | Video & Photography UAE',
                'meta_description' => "Professional video and brand photography in Dubai. Content that elevates UAE brands and drives measurable sales outcomes. Mangroves Creative.",
                'og_image'         => self::STO . 'blog/video-production-dubai.jpg',
            ],
            10 => [
                'meta_title'       => 'Website Design Dubai | Web Development UAE Business',
                'meta_description' => "Professional website design and development for UAE businesses — fast, conversion-optimised websites built by Mangroves Creative, Dubai.",
                'og_image'         => self::STO . 'blog/web-development-uae.jpg',
            ],
            11 => [
                'meta_title'       => 'Advertising Agency Dubai | Campaign Strategy UAE',
                'meta_description' => "Strategic advertising campaigns for UAE businesses. Multi-channel campaigns in Dubai reaching the right audience with measurable results.",
                'og_image'         => self::STO . 'blog/advertising-agency-team-dubai.jpg',
            ],
        ];

        foreach ($data as $id => $fields) {
            BlogPost::where('id', $id)->update(array_merge($fields, [
                'twitter_card'  => 'summary_large_image',
                'twitter_image' => $fields['og_image'],
                'schema_type'   => 'BlogPosting',
            ]));
        }

        $this->command->info('Blog posts SEO updated: ' . count($data) . ' records.');
    }

    // ─── Services ─────────────────────────────────────────────────────────────

    private function seedServices(): void
    {
        $data = [
            // ── Creative ──────────────────────────────────────────────────────
            8 => [
                'meta_title'       => 'Advertising Agency UAE | Campaign Strategy Dubai',
                'meta_description' => "Advertising campaigns and communication strategy for UAE businesses. Multi-channel, objective-first campaigns that reach the right audience.",
                'og_image'         => self::STO . 'service-images/advertising-campaign-strategy.jpg',
            ],
            9 => [
                'meta_title'       => 'Digital Marketing Agency UAE | SEO & Paid Media',
                'meta_description' => "SEO, social media marketing, paid digital advertising and analytics for UAE businesses. Digital marketing built around measurable objectives.",
                'og_image'         => self::STO . 'service-images/digital-marketing-strategy-team.jpg',
            ],
            10 => [
                'meta_title'       => 'Brand Identity Agency UAE | Branding & Creative',
                'meta_description' => "Brand strategy, naming, visual identity and packaging design for UAE businesses. Building brands that hold together across every touchpoint.",
                'og_image'         => self::STO . 'service-images/branding-visual-identity-strategy.jpg',
            ],
            11 => [
                'meta_title'       => 'Content & Production Services UAE | Video & Copy',
                'meta_description' => "Copywriting, photography, video and motion graphics for UAE businesses — content for campaigns, websites and social channels.",
                'og_image'         => self::STO . 'service-images/content-production-studio.jpg',
            ],
            12 => [
                'meta_title'       => 'Web Development UAE | Corporate Websites Dubai',
                'meta_description' => "Corporate websites, landing pages, UI/UX and CMS development for UAE businesses. Conversion-focused, SEO-structured, mobile-first builds.",
                'og_image'         => self::STO . 'service-images/web-development-team.jpg',
            ],

            // ── Logistics ─────────────────────────────────────────────────────
            2 => [
                'meta_title'       => 'Sea Freight UAE | FCL & LCL Cargo Coordination',
                'meta_description' => "FCL and LCL sea freight coordination between India, the UAE and the GCC — port-to-port through door-to-door. Request a sea freight quote.",
                'og_image'         => self::BASE . '/images/sea-freight-container-port-network.jpg',
            ],
            3 => [
                'meta_title'       => 'Air Freight UAE | India–UAE Cargo Coordination',
                'meta_description' => "Time-sensitive air freight between India, the UAE and the GCC — urgent cargo, samples and high-value shipments. Request an air freight quote.",
                'og_image'         => self::BASE . '/images/air-freight-cargo-plane-port.jpg',
            ],
            4 => [
                'meta_title'       => 'Customs Clearance Coordination UAE | Dubai Ports',
                'meta_description' => "Customs documentation and clearance coordination for UAE and GCC shipments, working alongside licensed customs brokers at Dubai and UAE ports.",
                'og_image'         => self::BASE . '/images/customs-clearance-cargo-ship-uae.jpg',
            ],
            5 => [
                'meta_title'       => 'Road Transport UAE | GCC Cross-Border Logistics',
                'meta_description' => "Road transportation coordination across UAE and into the GCC through qualified partners — container, FTL and inter-emirate delivery.",
                'og_image'         => self::BASE . '/images/road-transport-trucks-uae-gcc.jpg',
            ],
            6 => [
                'meta_title'       => 'Supply Chain Consulting UAE | Logistics Services',
                'meta_description' => "Logistics cost audits, route optimisation and distribution planning for UAE and GCC businesses. Request a supply chain consultation.",
                'og_image'         => self::BASE . '/images/supply-chain-network-coordination.jpg',
            ],
            7 => [
                'meta_title'       => 'Warehousing & 3PL Coordination Dubai UAE',
                'meta_description' => "Warehouse and 3PL capacity coordination in the UAE — storage, inventory handling, pick & pack and distribution through our logistics network.",
                'og_image'         => self::BASE . '/images/warehousing-3pl-storage-uae.jpg',
            ],
            13 => [
                'meta_title'       => 'Freight Coordination UAE | Sea or Air Guidance',
                'meta_description' => "Not sure whether to ship by sea or air? We help UAE and GCC businesses compare options, then coordinate the right freight mode end-to-end.",
                'og_image'         => self::BASE . '/images/aerial-view-container-cargo-ship-sea.jpg',
            ],
            14 => [
                'meta_title'       => 'Last-Mile Distribution UAE | Delivery Coordination',
                'meta_description' => "UAE-wide last-mile delivery coordination — multiple drop points, delivery scheduling and proof of delivery through qualified transport partners.",
                'og_image'         => self::BASE . '/images/commercial-trucks-lined-up-logistics-hub-sunset.jpg',
            ],
        ];

        foreach ($data as $id => $fields) {
            Service::where('id', $id)->update(array_merge($fields, [
                'twitter_card'  => 'summary_large_image',
                'twitter_image' => $fields['og_image'],
                'schema_type'   => 'Service',
            ]));
        }

        $this->command->info('Services SEO updated: ' . count($data) . ' records.');
    }
}
