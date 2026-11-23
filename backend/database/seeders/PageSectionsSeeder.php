<?php

namespace Database\Seeders;

use App\Models\PageSection;
use Illuminate\Database\Seeder;

class PageSectionsSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            // Home
            ['page_key' => 'home', 'section_key' => 'hero', 'data' => [
                'heading'    => 'Trade. Move. Create.',
                'subheading' => 'A UAE-based group operating across commodity trading, freight logistics, and digital creative services.',
                'cta_label'  => 'Explore What We Do',
                'cta_href'   => '#divisions',
            ]],
            ['page_key' => 'home', 'section_key' => 'trading_card', 'data' => [
                'eyebrow'     => 'Trading',
                'heading'     => 'Direct-Source Commodities from India',
                'description' => 'Specialising in Kerala and Indian origin spices — black pepper, cardamom, coffee beans, cloves and more — sourced and represented for UAE wholesale buyers.',
                'link_label'  => 'Explore Trading',
                'link_href'   => '/trading',
            ]],
            ['page_key' => 'home', 'section_key' => 'logistics_card', 'data' => [
                'eyebrow'     => 'Logistics',
                'heading'     => 'UAE Freight & Cargo Coordination',
                'description' => 'Sea freight, air freight, customs coordination, road transport and warehousing — coordinated through qualified UAE freight partners.',
                'link_label'  => 'Explore Logistics',
                'link_href'   => '/logistics',
            ]],
            ['page_key' => 'home', 'section_key' => 'creative_card', 'data' => [
                'eyebrow'     => 'Creative',
                'heading'     => 'Brand & Digital Services for UAE Businesses',
                'description' => 'Branding, digital marketing, advertising, content production and web development — built for businesses operating in the UAE market.',
                'link_label'  => 'Explore Creative',
                'link_href'   => '/creative',
            ]],
            ['page_key' => 'home', 'section_key' => 'contact', 'data' => [
                'heading'    => 'Get in Touch',
                'subheading' => 'Whether you are a buyer, supplier or looking for a business partner in the UAE, we would like to hear from you.',
            ]],

            // About
            ['page_key' => 'about', 'section_key' => 'hero', 'data' => [
                'heading'    => 'About Mangroves Global',
                'subheading' => 'A UAE-based multi-division group built around trade, movement and communication.',
            ]],
            ['page_key' => 'about', 'section_key' => 'story', 'data' => [
                'heading' => 'Who We Are',
                'body'    => 'Mangroves Global is a UAE-registered trading and services group with operations across commodity trading, freight logistics coordination and digital creative services. We work with businesses across the UAE and GCC looking for reliable partners in sourcing, logistics and market presence.',
            ]],
            ['page_key' => 'about', 'section_key' => 'mission', 'data' => [
                'heading' => 'Our Approach',
                'body'    => 'We build long-term commercial relationships based on transparency, reliability and a genuine understanding of the markets we operate in. Our three divisions work independently and together to serve clients across the full trade and business lifecycle.',
            ]],

            // Trading
            ['page_key' => 'trading', 'section_key' => 'hero', 'data' => [
                'heading'    => 'Indian Origin Spices & Commodities for the UAE',
                'subheading' => 'Direct-source wholesale supply of Kerala and Indian spices — black pepper, cardamom, coffee beans, cloves, dry ginger and more.',
            ]],
            ['page_key' => 'trading', 'section_key' => 'intro', 'data' => [
                'heading' => 'Sourced at Origin. Delivered to the UAE.',
                'body'    => 'Mangroves Global Trading sources premium agricultural commodities directly from Indian origin suppliers and represents them to wholesale buyers across the UAE and GCC. Our focus is building reliable, long-term supply relationships — not one-off transactions.',
            ]],
            ['page_key' => 'trading', 'section_key' => 'cta', 'data' => [
                'heading'   => 'Looking for a Reliable Commodity Partner?',
                'body'      => 'Whether you are sourcing spices for wholesale, food processing or redistribution, talk to our trading team.',
                'btn_label' => 'Contact Us',
                'btn_href'  => '/contact',
            ]],

            // Logistics
            ['page_key' => 'logistics', 'section_key' => 'hero', 'data' => [
                'heading'    => 'UAE Freight & Logistics Coordination',
                'subheading' => 'Sea freight, air freight, road transport, customs coordination and warehousing — managed through qualified UAE partners.',
            ]],
            ['page_key' => 'logistics', 'section_key' => 'intro', 'data' => [
                'heading' => 'Coordinated Logistics, UAE-Based.',
                'body'    => 'Mangroves Global Logistics coordinates freight and customs solutions across the UAE for importers, exporters and regional businesses. We work with qualified licensed freight forwarders and customs agents to deliver reliable, end-to-end logistics coordination.',
            ]],
            ['page_key' => 'logistics', 'section_key' => 'cta', 'data' => [
                'heading'   => 'Need Help With Your UAE Freight?',
                'body'      => 'Tell us about your shipment and we will coordinate the right logistics solution.',
                'btn_label' => 'Get a Quote',
                'btn_href'  => '/contact',
            ]],

            // Creative
            ['page_key' => 'creative', 'section_key' => 'hero', 'data' => [
                'heading'    => 'Brand & Digital Services for UAE Businesses',
                'subheading' => 'Branding, digital marketing, content production, advertising and web development — built for the UAE market.',
            ]],
            ['page_key' => 'creative', 'section_key' => 'intro', 'data' => [
                'heading' => 'Creative That Works for the UAE.',
                'body'    => 'Mangroves Global Creative delivers brand and digital services built for businesses operating in the UAE and GCC. From brand identity and digital marketing campaigns to web development and content production, we focus on work that performs in this market.',
            ]],
            ['page_key' => 'creative', 'section_key' => 'cta', 'data' => [
                'heading'   => 'Ready to Elevate Your UAE Brand?',
                'body'      => 'Tell us about your brand and what you are trying to achieve.',
                'btn_label' => 'Get a Quote',
                'btn_href'  => '/contact',
            ]],

            // Become a Partner
            ['page_key' => 'become-a-partner', 'section_key' => 'hero', 'data' => [
                'heading'    => 'Your Dedicated Commercial & Sales Arm in the UAE',
                'subheading' => 'You focus on production. We help you build the market.',
                'body'       => 'Mangroves Global helps established Indian spice producers and food suppliers develop B2B opportunities across the UAE. We provide a local commercial interface for buyer development, sales representation, market communication and regional growth.',
                'cta_label'  => 'Become a Supplier Partner',
            ]],
            ['page_key' => 'become-a-partner', 'section_key' => 'cta_bottom', 'data' => [
                'heading'    => 'You Build the Product. We\'ll Help Build the Market.',
                'subheading' => 'If you are an established Indian producer, processor or exporter looking to develop B2B opportunities in the UAE, introduce your business to Mangroves Global.',
            ]],

            // Contact
            ['page_key' => 'contact', 'section_key' => 'hero', 'data' => [
                'heading'    => 'Get in Touch',
                'subheading' => 'Whether you are a buyer, supplier, logistics client or looking to work with us — we would like to hear from you.',
            ]],
        ];

        foreach ($sections as $data) {
            PageSection::updateOrCreate(
                ['page_key' => $data['page_key'], 'section_key' => $data['section_key']],
                ['data' => $data['data']]
            );
        }
    }
}
