<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [

            // ── TRADING 1 ──────────────────────────────────────────────────────
            [
                'division'         => 'trading',
                'title'            => 'Wholesale Spice Suppliers in UAE — Black Pepper, Cardamom & Cloves in Bulk',
                'slug'             => 'wholesale-spice-suppliers-uae-black-pepper-cardamom-cloves',
                'featured_image'   => 'blog/spices-wholesale-uae.jpg',
                'excerpt'          => 'Looking for a trusted wholesale spice supplier in Dubai or the UAE? Mangroves Global supplies premium black pepper, cardamom, cloves and more to businesses across the GCC — directly sourced from India\'s spice belt.',
                'meta_title'       => 'Wholesale Spice Suppliers in UAE | Black Pepper, Cardamom & Cloves | Mangroves Global',
                'meta_description' => 'Looking for a wholesale spice supplier in Dubai or UAE? Mangroves Global supplies premium black pepper, cardamom, cloves and more to businesses across the GCC. Request a quote today.',
                'focus_keyword'    => 'wholesale spice supplier UAE',
                'tags'             => 'spices,wholesale,UAE,Dubai,GCC,black pepper,cardamom,trading',
                'author'           => 'Mangroves Global Trading',
                'status'           => 'published',
                'published_at'     => now()->subDays(2),
                'content'          => '<p>When it comes to sourcing premium quality spices for your business in the UAE, finding a reliable <strong>wholesale spice supplier in Dubai</strong> is critical. Whether you run a food manufacturing facility, a restaurant group, a hotel chain, or a retail distribution business, the quality and consistency of your spice supply directly impacts your product and your reputation.</p>

<p><strong>Mangroves Global</strong> is a UAE-based commodity trading company specialising in the wholesale supply of <strong>Indian spices</strong> to businesses across Dubai, Abu Dhabi, Sharjah, Qatar, Bahrain, and the wider GCC region. We work directly with established growers and processing facilities in Kerala, Karnataka, and Tamil Nadu — the heartland of India\'s spice belt — to bring you traceable, graded, premium spices at competitive wholesale prices.</p>

<h2>Our Wholesale Spice Range</h2>

<p>We supply a carefully selected range of high-demand spices, all graded to meet international quality standards:</p>

<ul>
  <li><strong>Black Pepper</strong> — Malabar and Tellicherry grades, available in whole, cracked, and ground form. The backbone of any spice portfolio, our black pepper is sorted and cleaned before shipment.</li>
  <li><strong>Green Cardamom</strong> — Premium bold cardamom pods sourced from the Idukki highlands of Kerala. Prized for their intense aroma and high oil content.</li>
  <li><strong>Cloves</strong> — Whole cloves with high eugenol content, sourced from Kerala\'s coastal growing regions.</li>
  <li><strong>Dry Ginger</strong> — Sun-dried, cleaned ginger pieces and powder, ideal for F&amp;B manufacturing and retail packaging.</li>
  <li><strong>Nutmeg and Mace</strong> — Whole nutmeg and dried mace sourced from south Indian growing regions, supplied to confectionery, beverage, and spice blend manufacturers.</li>
  <li><strong>Coffee Beans</strong> — Arabica and Robusta green coffee beans from certified estates in Coorg and Chikmagalur.</li>
</ul>

<h2>Why Businesses in the UAE Choose Mangroves Global</h2>

<p>The UAE is the GCC\'s hub for spice re-export — Dubai\'s Spice Souk and its port-linked trading ecosystem make it the natural gateway for Indian commodity flows into the Middle East, East Africa, and Europe. We understand this market deeply.</p>

<ul>
  <li><strong>Direct sourcing</strong> — We work directly with farmers and processing cooperatives, cutting out intermediaries and passing the savings on to our buyers.</li>
  <li><strong>Consistent grading</strong> — Every batch is graded, cleaned, and inspected before dispatch. No surprises on delivery.</li>
  <li><strong>Flexible order quantities</strong> — We accommodate bulk container loads as well as smaller LCL shipments for businesses scaling their procurement.</li>
  <li><strong>Documentation support</strong> — We handle phytosanitary certificates, certificates of origin, quality certificates, and all export documentation required for UAE customs clearance.</li>
  <li><strong>Competitive pricing</strong> — Our direct-source model means we consistently offer market-competitive pricing on all commodities.</li>
</ul>

<h2>Spice Trading in Dubai: What You Need to Know</h2>

<p>Dubai\'s strategic location, world-class port infrastructure at Jebel Ali, and trade-friendly policies make it one of the world\'s most efficient <strong>spice trading hubs</strong>. Importers benefit from quick customs clearance, bonded warehouse facilities, and easy re-export capabilities to 200+ global markets.</p>

<p>As a <strong>spice trading company based in the UAE</strong>, Mangroves Global is positioned to service your procurement needs whether you are importing for direct consumption within the UAE, for regional distribution across the GCC, or for further re-export to international markets.</p>

<h2>Start Your Wholesale Spice Order</h2>

<p>If you are a food manufacturer, hotel group, supermarket chain, restaurant supplier, or trading company looking for a trusted <strong>bulk spice supplier in Dubai</strong>, we would be glad to discuss your requirements. Contact our trading team with your specifications — commodity type, grade, quantity, and destination — and we will respond with competitive pricing within 48 hours.</p>',
            ],

            // ── TRADING 2 ──────────────────────────────────────────────────────
            [
                'division'         => 'trading',
                'title'            => 'Kerala Spices for UAE and GCC Businesses — Direct Source from India\'s Spice Belt',
                'slug'             => 'kerala-spices-uae-gcc-direct-source-india',
                'featured_image'   => 'blog/kerala-spices-india-uae.jpg',
                'excerpt'          => 'India\'s Kerala produces the world\'s finest cardamom, black pepper, and cloves. Mangroves Global connects UAE and GCC businesses directly to Kerala\'s growing districts for consistent, graded supply at competitive prices.',
                'meta_title'       => 'Kerala Spices Supplier UAE & GCC | Direct Source India | Mangroves Global',
                'meta_description' => 'Source premium Kerala spices direct from India\'s spice belt to your UAE or GCC business. Mangroves Global offers wholesale cardamom, black pepper, cloves and more with full documentation support.',
                'focus_keyword'    => 'Kerala spices supplier UAE',
                'tags'             => 'Kerala,spices,cardamom,black pepper,India,UAE,GCC,sourcing',
                'author'           => 'Mangroves Global Trading',
                'status'           => 'published',
                'published_at'     => now()->subDays(5),
                'content'          => '<p>India\'s southern state of Kerala has been the world\'s spice basket for over two thousand years. The humid highland climate of Idukki, Wayanad, and the Malabar coast produces some of the world\'s finest cardamom, black pepper, cloves, and ginger — spices integral to cuisines, pharmaceuticals, perfumery, and food manufacturing operations across the globe.</p>

<p>For UAE businesses — from importers to food processors to trading houses — accessing these <strong>Kerala spices</strong> at the right price, quality, and consistency is a commercial priority. <strong>Mangroves Global</strong>, headquartered in the UAE, maintains direct sourcing relationships in Kerala\'s major growing districts, allowing us to offer genuine farm-to-port supply to clients across Dubai, Sharjah, Abu Dhabi, Qatar, Bahrain, Oman, and Kuwait.</p>

<h2>Kerala: The World\'s Spice Heartland</h2>

<p>Kerala accounts for a significant share of India\'s total spice exports. Here is why sourcing from Kerala matters for GCC businesses:</p>

<ul>
  <li><strong>Green Cardamom</strong> from Idukki\'s highland estates is recognised globally as the highest quality "true cardamom." Kerala produces over 70% of India\'s cardamom output. Demand from the GCC — where cardamom is essential to coffee, sweets, and hospitality culture — makes this a critical procurement commodity.</li>
  <li><strong>Black Pepper</strong> from the Malabar coast — the original "black gold" that drove centuries of global trade — is characterised by its bold piperine content and consistent grade. UAE re-exporters value Malabar pepper for its global market recognition.</li>
  <li><strong>Cloves</strong>, <strong>nutmeg</strong>, and <strong>mace</strong> from Kerala\'s coastal strips are sought by flavour houses, spice blend manufacturers, and F&amp;B businesses worldwide.</li>
  <li><strong>Dry Ginger</strong> from Kerala is prized for its fibre-free, high-oleoresin profile, making it ideal for extract production and culinary applications.</li>
</ul>

<h2>The Mangroves Global Sourcing Advantage</h2>

<p>Many UAE importers rely on intermediary traders or shipping agents who do not maintain direct contacts in India\'s producing regions. This creates quality variability, inflated pricing, and documentation delays. We operate differently.</p>

<p>Our team maintains active procurement relationships in Kerala\'s major <strong>spice-producing districts</strong>. When you place an order with Mangroves Global, your commodity is sourced directly from the growing region, graded at a licensed processing facility, and shipped on your required schedule — backed by full origin certification, phytosanitary documentation, and quality inspection reports.</p>

<h2>Who We Supply to in the UAE and GCC</h2>

<ul>
  <li>Food and beverage manufacturers in UAE industrial zones (Jebel Ali, KIZAD, SAIF Zone)</li>
  <li>Hotel and hospitality groups requiring large-volume, consistent-grade spice supply</li>
  <li>Supermarket and hypermarket chains sourcing branded and private-label spice products</li>
  <li>Spice processors and re-packers operating in Dubai\'s free zones</li>
  <li>Trading companies re-exporting to East Africa, Europe, and Southeast Asia via Jebel Ali Port</li>
</ul>

<h2>Import Kerala Spices to UAE — Start Today</h2>

<p>Tell us the commodity, grade, volume, and your delivery requirement. Our <strong>Indian spice trading team</strong> will respond with a competitive offer backed by quality samples and full documentation support. Mangroves Global — connecting Kerala\'s spice belt directly to your UAE and GCC business.</p>',
            ],

            // ── LOGISTICS 1 ──────────────────────────────────────────────────
            [
                'division'         => 'logistics',
                'title'            => 'Sea Freight from Dubai — Cargo Shipping Services for UAE Importers and Exporters',
                'slug'             => 'sea-freight-dubai-cargo-shipping-uae',
                'featured_image'   => 'blog/sea-freight-cargo-dubai.jpg',
                'excerpt'          => 'Need sea freight coordination from Dubai? Mangroves Global arranges FCL and LCL sea freight shipments for UAE businesses importing and exporting across the GCC, Asia, Europe and beyond — with full documentation support.',
                'meta_title'       => 'Sea Freight Services Dubai UAE | Import & Export Cargo Shipping | Mangroves Global',
                'meta_description' => 'Sea freight coordination from Dubai for UAE importers and exporters. FCL and LCL shipments, documentation, customs clearance support. Mangroves Global Logistics.',
                'focus_keyword'    => 'sea freight Dubai',
                'tags'             => 'sea freight,Dubai,logistics,cargo,shipping,UAE,FCL,LCL,Jebel Ali',
                'author'           => 'Mangroves Global Logistics',
                'status'           => 'published',
                'published_at'     => now()->subDays(3),
                'content'          => '<p>Dubai\'s Jebel Ali Port is one of the world\'s largest and busiest container terminals — the 9th biggest globally by volume, handling over 14 million TEUs annually. For businesses across the UAE, Jebel Ali is the natural gateway for sea freight imports from Asia, exports to Africa and Europe, and intra-GCC cargo movements.</p>

<p><strong>Mangroves Global Logistics</strong> provides sea freight coordination services for UAE-based importers and exporters, managing the full journey of your cargo from origin to final destination — including booking, documentation, customs clearance, and last-mile delivery.</p>

<h2>FCL vs LCL Sea Freight: Which Is Right for Your Cargo?</h2>

<p>Understanding the difference between <strong>Full Container Load (FCL)</strong> and <strong>Less than Container Load (LCL)</strong> is the first step in planning your sea freight shipment from Dubai.</p>

<ul>
  <li><strong>FCL (Full Container Load)</strong> — Your cargo fills an entire 20ft or 40ft container. Best for large volume shipments, high-value goods that require segregation, or cargo with specific handling requirements. Generally faster transit and lower per-unit cost at scale.</li>
  <li><strong>LCL (Less than Container Load)</strong> — Your cargo is consolidated with other shippers\' goods. Ideal for smaller volumes that do not justify a full container. More flexible and cost-effective for businesses that ship regularly in moderate quantities.</li>
</ul>

<p>Our logistics team will assess your cargo volume, commodity type, and destination to recommend the most cost-effective and reliable option for each shipment.</p>

<h2>Key Sea Freight Corridors from Dubai</h2>

<p>Mangroves Global coordinates <strong>sea freight shipments</strong> on the UAE\'s most active trade corridors:</p>

<ul>
  <li><strong>Dubai to India</strong> — High-frequency sailings from Jebel Ali to JNPT (Mumbai), Chennai, Mundra, and Cochin. Typical transit: 4–8 days depending on port and service.</li>
  <li><strong>Dubai to GCC</strong> — Feeder services connecting Dubai to Dammam (Saudi Arabia), Shuwaikh (Kuwait), Hamad Port (Qatar), and Khalifa Port (Bahrain).</li>
  <li><strong>Dubai to East Africa</strong> — Regular sailings to Mombasa, Dar es Salaam, and Djibouti, serving growing UAE–East Africa trade flows.</li>
  <li><strong>Dubai to Southeast Asia</strong> — Services to Singapore, Port Klang, Bangkok, and Ho Chi Minh City on major shipping lines.</li>
  <li><strong>Dubai to Europe</strong> — Weekly sailings to Rotterdam, Felixstowe, Hamburg, and Genoa, with transit times of 18–25 days.</li>
</ul>

<h2>What\'s Included in Our Sea Freight Service</h2>

<ul>
  <li>Freight booking and space confirmation on preferred carriers</li>
  <li>Bill of Lading (BL) issuance and management</li>
  <li>Certificate of Origin and commercial documentation support</li>
  <li>UAE Customs export clearance coordination</li>
  <li>Destination clearance liaison and delivery coordination</li>
  <li>Cargo tracking and shipment status updates</li>
</ul>

<h2>Cargo Shipping from Dubai: Regulatory Requirements</h2>

<p>All <strong>sea freight exports from the UAE</strong> require a shipping bill or customs export declaration, a commercial invoice, packing list, and — for certain commodities — additional certificates such as phytosanitary certificates, HALAL certificates, or certificates of conformity. Our team is experienced in preparing and coordinating all required documentation across a wide range of commodity types.</p>

<h2>Get a Sea Freight Quote Today</h2>

<p>Share your shipment details — origin, destination, cargo type, dimensions, and required delivery date — and our <strong>Dubai sea freight team</strong> will provide a competitive rate and estimated transit time within 24 hours. Mangroves Global Logistics: coordinating cargo across the UAE\'s trade corridors.</p>',
            ],

            // ── LOGISTICS 2 ──────────────────────────────────────────────────
            [
                'division'         => 'logistics',
                'title'            => 'UAE Customs Clearance — A Complete Guide for Businesses Importing into Dubai',
                'slug'             => 'uae-customs-clearance-guide-importing-dubai',
                'featured_image'   => 'blog/customs-trucks-uae.jpg',
                'excerpt'          => 'Importing goods into Dubai for the first time? This complete guide to UAE customs clearance covers documentation requirements, duty rates, free zone procedures, and how Mangroves Global can support your import process.',
                'meta_title'       => 'UAE Customs Clearance Guide | Importing into Dubai | Mangroves Global Logistics',
                'meta_description' => 'A complete guide to UAE customs clearance for importers. Learn about documentation, duties, free zone procedures, and how to clear cargo through Dubai ports efficiently.',
                'focus_keyword'    => 'customs clearance UAE',
                'tags'             => 'customs clearance,UAE,Dubai,import,export,Jebel Ali,free zone,documentation',
                'author'           => 'Mangroves Global Logistics',
                'status'           => 'published',
                'published_at'     => now()->subDays(7),
                'content'          => '<p>For businesses importing goods into the UAE, understanding the <strong>customs clearance process in Dubai</strong> is essential to avoiding delays, unexpected costs, and compliance issues. The UAE operates one of the most sophisticated and technology-driven customs systems in the world — but navigating it efficiently requires knowing the documentation requirements, duty structures, and procedural nuances that differ by commodity type, origin, and import purpose.</p>

<p>This guide covers what businesses need to know about <strong>UAE customs clearance</strong> — and how Mangroves Global Logistics can support your import operations from start to finish.</p>

<h2>Key UAE Customs Authorities</h2>

<p>Customs in the UAE is administered at two levels:</p>

<ul>
  <li><strong>Federal Customs Authority (FCA)</strong> — The national body that sets customs policy, implements the GCC Common Customs Law, and monitors compliance across all emirates.</li>
  <li><strong>Dubai Customs</strong> — The emirate-level authority managing customs operations at Dubai\'s ports and airports, including Jebel Ali Port, Port Rashid, and Dubai International Airport. Dubai Customs has consistently ranked among the world\'s fastest for cargo clearance.</li>
</ul>

<h2>Required Documents for Customs Clearance in UAE</h2>

<p>Standard documentation required to clear most commercial imports through Dubai:</p>

<ul>
  <li><strong>Commercial Invoice</strong> — Must include full description of goods, unit price, total value, country of origin, and HS code.</li>
  <li><strong>Packing List</strong> — Detailed breakdown of contents, weights (gross and net), and dimensions per package.</li>
  <li><strong>Bill of Lading or Air Waybill</strong> — The original or telex-released transport document from the carrier.</li>
  <li><strong>Certificate of Origin</strong> — Required for all commercial shipments, particularly for preferential duty treatment under GCC agreements with partner countries.</li>
  <li><strong>Import Permit</strong> — Required for restricted commodities including food products, pharmaceuticals, chemicals, and certain consumer goods.</li>
  <li><strong>Phytosanitary Certificate</strong> — Mandatory for all agricultural produce, spices, fresh and dried food products.</li>
  <li><strong>HALAL Certificate</strong> — Required for meat, poultry, and certain food products consumed by UAE\'s majority Muslim population.</li>
</ul>

<h2>GCC Common External Tariff and UAE Import Duties</h2>

<p>The UAE applies the <strong>GCC Common External Tariff</strong> which sets a standard 5% import duty on most goods. However, there are exceptions:</p>

<ul>
  <li>Tobacco products are subject to 100% duty</li>
  <li>Alcohol carries a 50% duty rate</li>
  <li>Certain food staples and essential commodities are exempt (0% duty)</li>
  <li>Goods imported into UAE Free Zones (Jebel Ali Free Zone, SAIF Zone, etc.) are exempt from customs duty until they enter the UAE domestic market</li>
</ul>

<h2>Free Zone Imports: A Strategic Advantage</h2>

<p>Dubai\'s free zones — including <strong>Jebel Ali Free Zone (JAFZA)</strong>, Dubai Airport Free Zone (DAFZA), and Dubai Multi Commodities Centre (DMCC) — offer duty-free import and storage for goods that will be re-exported. This makes Dubai the GCC\'s leading re-export hub, with businesses storing and trading commodities without incurring local duties unless goods are released into the UAE domestic market.</p>

<h2>How Mangroves Global Supports Your UAE Customs Clearance</h2>

<p>Our logistics team coordinates customs clearance as part of our end-to-end freight coordination service. We work with experienced UAE customs agents to ensure your documentation is complete, accurate, and submitted through the correct channel — minimising the risk of delays, re-inspection, or penalties.</p>

<p>Whether you are importing spices, general merchandise, industrial goods, or consumer products, our team will guide you through the requirements specific to your commodity and origin country.</p>

<h2>Start Your Import Clearance Today</h2>

<p>Share your shipment details and commodity information with our <strong>UAE logistics team</strong>. We will confirm the documentation requirements, estimated duty obligations, and expected clearance timeline for your import — so you can plan your supply chain with confidence.</p>',
            ],

            // ── CREATIVE 1 ──────────────────────────────────────────────────
            [
                'division'         => 'creative',
                'title'            => 'Brand Identity Design in Dubai — Why Every UAE Business Needs Professional Branding',
                'slug'             => 'brand-identity-design-dubai-uae-business-branding',
                'featured_image'   => 'blog/brand-identity-dubai.jpg',
                'excerpt'          => 'In a market as competitive as Dubai, your brand is your first impression, your credibility signal, and your sales tool — all at once. Here\'s why professional brand identity design is a commercial necessity for UAE businesses.',
                'meta_title'       => 'Brand Identity Design Dubai | Professional Branding UAE | Mangroves Global Creative',
                'meta_description' => 'Professional brand identity design for UAE businesses. From logo design to full visual identity systems, our Dubai creative team builds brands that command attention and drive sales.',
                'focus_keyword'    => 'brand identity design Dubai',
                'tags'             => 'branding,Dubai,UAE,brand identity,logo design,visual identity,creative agency',
                'author'           => 'Mangroves Global Creative',
                'status'           => 'published',
                'published_at'     => now()->subDays(1),
                'content'          => '<p>Dubai is one of the world\'s most commercially dynamic cities — a market where businesses from over 200 nationalities compete for the same customers, the same contracts, and the same shelf space. In an environment this competitive, your <strong>brand identity</strong> is not a luxury. It is your first impression, your credibility signal, and your most persistent sales tool all at once.</p>

<p>Yet many UAE businesses — particularly SMEs, startups, and regional brands entering the market — underinvest in brand identity design, treating it as a cosmetic exercise rather than a strategic foundation. The result is predictable: inconsistent visuals, forgettable names, and a brand that does not hold up under scrutiny when it reaches a corporate procurement officer, an investor, or a customer comparing options online.</p>

<h2>What Is Brand Identity Design?</h2>

<p><strong>Brand identity design</strong> is the full visual and verbal system that represents your business to the world. It goes far beyond a logo. A complete brand identity system includes:</p>

<ul>
  <li><strong>Logo design</strong> — The primary mark that identifies your business across all touchpoints. A well-designed logo works at any size, in any colour, and communicates your business category and positioning at a glance.</li>
  <li><strong>Colour palette</strong> — Your brand colours carry meaning. Research consistently shows that colour accounts for up to 85% of a customer\'s first purchase decision. The right palette builds recognition and communicates brand character.</li>
  <li><strong>Typography system</strong> — The fonts you use communicate personality — authoritative, innovative, friendly, premium. Typography consistency across all materials creates a coherent brand voice.</li>
  <li><strong>Business stationery</strong> — Business cards, letterheads, and email signatures are the tactile extension of your brand. In the UAE\'s relationship-driven business culture, a premium business card still carries significant weight.</li>
  <li><strong>Brand guidelines</strong> — A document that governs how your brand assets are used, ensuring consistency whether a design is produced in-house or by an external supplier.</li>
</ul>

<h2>Why Brand Identity Matters More in Dubai</h2>

<p>The UAE\'s business culture is built on trust, relationships, and reputation. Before a procurement decision is made, before a contract is signed, before a referral is given — your brand is being assessed. Here is what a strong <strong>brand identity in the UAE</strong> achieves for your business:</p>

<ul>
  <li><strong>Credibility with corporate clients</strong> — Government tenders, free zone licensing, and enterprise client pitches all involve visual scrutiny. A polished brand signals an established, professional organisation.</li>
  <li><strong>Differentiation in a crowded market</strong> — Dubai\'s market in almost every sector is saturated. A distinctive brand identity makes your business memorable and easier to refer.</li>
  <li><strong>Premium pricing power</strong> — Brands that look premium can charge premium prices. A strong visual identity is a direct input to your pricing strategy.</li>
  <li><strong>Digital presence</strong> — A consistent brand identity across your website, LinkedIn, Instagram, and Google Business Profile dramatically improves your digital marketing performance and ad recall.</li>
</ul>

<h2>Our Brand Identity Process</h2>

<p>At Mangroves Global Creative, we design brand identities for UAE businesses across a wide range of sectors — from professional services and healthcare to F&amp;B, real estate, logistics, and retail. Our process:</p>

<ol>
  <li><strong>Discovery</strong> — We start by understanding your business, your customers, your competitors, and your growth ambitions. Brand strategy precedes visual design.</li>
  <li><strong>Concept development</strong> — We develop multiple distinct design directions, each grounded in a strategic rationale, not personal preference.</li>
  <li><strong>Refinement</strong> — Your chosen direction is refined to completion, tested across all key applications, and prepared for production.</li>
  <li><strong>Brand guidelines delivery</strong> — You receive a complete brand guidelines document and all source files, ensuring your identity remains consistent as your business grows.</li>
</ol>

<h2>Start Your Branding Project in Dubai</h2>

<p>Whether you are launching a new UAE business, rebranding an existing one, or preparing for a funding round or expansion, our <strong>Dubai creative team</strong> will build you a brand identity that commands attention and drives commercial outcomes. Get in touch to discuss your branding project.</p>',
            ],

        ];

        foreach ($posts as $data) {
            BlogPost::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );
        }

        $this->command->info('✓ 5 SEO blog posts seeded successfully.');
    }
}
