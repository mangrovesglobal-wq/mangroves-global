<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'division',
        'name',
        'slug',
        'icon',
        'featured_image',
        'short_description',
        'block_1_heading', 'block_1_content',
        'block_2_heading', 'block_2_content',
        'block_3_heading', 'block_3_content',
        'block_4_heading', 'block_4_content',
        'faq_1_question', 'faq_1_answer',
        'faq_2_question', 'faq_2_answer',
        'faq_3_question', 'faq_3_answer',
        'meta_title',
        'meta_description',
        'focus_keyword',
        'meta_keywords',
        'tags',
        'og_title',
        'og_description',
        'og_image',
        'twitter_card',
        'twitter_title',
        'twitter_description',
        'twitter_image',
        'canonical_url',
        'robots',
        'schema_type',
        'custom_schema_json',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
