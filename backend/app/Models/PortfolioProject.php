<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'image',
        'tone',
        'shape',
        'column_index',
        'sort_order',
        'link',
        'feature_in_hero',
        'is_active',
    ];

    protected $casts = [
        'feature_in_hero' => 'boolean',
        'is_active' => 'boolean',
        'column_index' => 'integer',
        'sort_order' => 'integer',
    ];
}
