<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_seo', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->unique();   // home, about, trading, etc.
            $table->string('page_title');           // human label for the admin

            // Core SEO
            $table->string('meta_title', 70)->nullable();
            $table->string('meta_description', 200)->nullable();
            $table->string('focus_keyword', 100)->nullable();
            $table->text('secondary_keywords')->nullable();  // comma-separated

            // Open Graph
            $table->string('og_title', 100)->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('og_type')->default('website'); // website, article, service

            // Twitter Card
            $table->string('twitter_card')->default('summary_large_image');
            $table->string('twitter_title', 100)->nullable();
            $table->text('twitter_description')->nullable();
            $table->string('twitter_image')->nullable();

            // Technical
            $table->string('canonical_url')->nullable();
            $table->string('robots')->default('index,follow');

            // Structured Data
            $table->string('schema_type')->nullable(); // WebPage, Service, FAQPage, etc.
            $table->json('schema_data')->nullable();   // structured data fields
            $table->longText('custom_schema_json')->nullable(); // raw JSON-LD override

            // Sitemap
            $table->boolean('sitemap_include')->default(true);
            $table->decimal('sitemap_priority', 2, 1)->default(0.8);
            $table->string('sitemap_changefreq')->default('monthly');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_seo');
    }
};
