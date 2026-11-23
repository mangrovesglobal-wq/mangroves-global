<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('og_title', 100)->nullable()->after('focus_keyword');
            $table->text('og_description')->nullable()->after('og_title');
            $table->string('og_image')->nullable()->after('og_description');
            $table->string('twitter_card')->default('summary_large_image')->after('og_image');
            $table->string('twitter_title', 100)->nullable()->after('twitter_card');
            $table->text('twitter_description')->nullable()->after('twitter_title');
            $table->string('twitter_image')->nullable()->after('twitter_description');
            $table->string('canonical_url')->nullable()->after('twitter_image');
            $table->string('robots')->default('index,follow')->after('canonical_url');
            $table->string('schema_type')->nullable()->after('robots');
            $table->longText('custom_schema_json')->nullable()->after('schema_type');
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['og_title','og_description','og_image','twitter_card','twitter_title','twitter_description','twitter_image','canonical_url','robots','schema_type','custom_schema_json']);
        });
    }
};
