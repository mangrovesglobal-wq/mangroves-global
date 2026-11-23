<?php

namespace Database\Seeders;

use App\Models\NavItem;
use Illuminate\Database\Seeder;

class NavItemsSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing to avoid duplicates on re-run
        NavItem::query()->delete();

        // --- Header nav ---
        $home = NavItem::create(['label' => 'Home',                   'href' => '/',                    'order' => 0, 'location' => 'header', 'is_active' => true]);
        $about = NavItem::create(['label' => 'About Us',              'href' => '/about',               'order' => 1, 'location' => 'header', 'is_active' => true]);
        $partner = NavItem::create(['label' => 'Become a Supplier Partner', 'href' => '/become-a-partner', 'order' => 2, 'location' => 'header', 'is_active' => true]);
        $insights = NavItem::create(['label' => 'Insights',           'href' => null,                   'order' => 3, 'location' => 'header', 'is_active' => true]);
        $contact = NavItem::create(['label' => 'Contact',             'href' => '/contact',             'order' => 4, 'location' => 'header', 'is_active' => true]);

        // Insights children (dropdown)
        NavItem::create(['label' => 'Trading Insights',   'href' => '/trading/blog',   'order' => 0, 'location' => 'header', 'parent_id' => $insights->id, 'is_active' => true]);
        NavItem::create(['label' => 'Logistics Insights', 'href' => '/logistics/blog', 'order' => 1, 'location' => 'header', 'parent_id' => $insights->id, 'is_active' => true]);
        NavItem::create(['label' => 'Creative Insights',  'href' => '/creative/blog',  'order' => 2, 'location' => 'header', 'parent_id' => $insights->id, 'is_active' => true]);

        // --- Footer links ---
        NavItem::create(['label' => 'Home',                      'href' => '/',                      'order' => 0, 'location' => 'footer', 'is_active' => true]);
        NavItem::create(['label' => 'About Us',                  'href' => '/about',                 'order' => 1, 'location' => 'footer', 'is_active' => true]);
        NavItem::create(['label' => 'Trading',                   'href' => '/trading',               'order' => 2, 'location' => 'footer', 'is_active' => true]);
        NavItem::create(['label' => 'Logistics',                 'href' => '/logistics',             'order' => 3, 'location' => 'footer', 'is_active' => true]);
        NavItem::create(['label' => 'Become a Supplier Partner', 'href' => '/become-a-partner',      'order' => 4, 'location' => 'footer', 'is_active' => true]);
        NavItem::create(['label' => 'Contact',                   'href' => '/contact',               'order' => 5, 'location' => 'footer', 'is_active' => true]);
        NavItem::create(['label' => 'Privacy Policy',            'href' => '/privacy',               'order' => 6, 'location' => 'footer', 'is_active' => true]);
    }
}
