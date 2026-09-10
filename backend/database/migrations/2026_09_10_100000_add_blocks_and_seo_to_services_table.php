<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('featured_image')->nullable()->after('icon');

            $table->string('block_1_heading')->nullable();
            $table->longText('block_1_content')->nullable();
            $table->string('block_2_heading')->nullable();
            $table->longText('block_2_content')->nullable();
            $table->string('block_3_heading')->nullable();
            $table->longText('block_3_content')->nullable();
            $table->string('block_4_heading')->nullable();
            $table->longText('block_4_content')->nullable();

            $table->string('faq_1_question')->nullable();
            $table->text('faq_1_answer')->nullable();
            $table->string('faq_2_question')->nullable();
            $table->text('faq_2_answer')->nullable();
            $table->string('faq_3_question')->nullable();
            $table->text('faq_3_answer')->nullable();

            $table->string('focus_keyword')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->string('tags')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'featured_image',
                'block_1_heading', 'block_1_content',
                'block_2_heading', 'block_2_content',
                'block_3_heading', 'block_3_content',
                'block_4_heading', 'block_4_content',
                'faq_1_question', 'faq_1_answer',
                'faq_2_question', 'faq_2_answer',
                'faq_3_question', 'faq_3_answer',
                'focus_keyword', 'meta_keywords', 'tags',
            ]);
        });
    }
};
