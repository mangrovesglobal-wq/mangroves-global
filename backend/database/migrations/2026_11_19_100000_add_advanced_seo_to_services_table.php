<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('og_title', 255)->nullable()->after('focus_keyword');
            $table->string('og_description', 500)->nullable()->after('og_title');
            $table->string('og_image', 500)->nullable()->after('og_description');
            $table->string('twitter_card', 50)->nullable()->after('og_image');
            $table->string('twitter_title', 255)->nullable()->after('twitter_card');
            $table->string('twitter_description', 500)->nullable()->after('twitter_title');
            $table->string('twitter_image', 500)->nullable()->after('twitter_description');
            $table->string('canonical_url', 500)->nullable()->after('twitter_image');
            $table->string('robots', 100)->nullable()->after('canonical_url');
            $table->string('schema_type', 100)->nullable()->after('robots');
            $table->text('custom_schema_json')->nullable()->after('schema_type');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'og_title', 'og_description', 'og_image',
                'twitter_card', 'twitter_title', 'twitter_description', 'twitter_image',
                'canonical_url', 'robots', 'schema_type', 'custom_schema_json',
            ]);
        });
    }
};
