<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'division',
        'title',
        'slug',
        'featured_image',
        'video_url',
        'excerpt',
        'content',
        'meta_title',
        'meta_description',
        'focus_keyword',
        'tags',
        'author',
        'status',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
