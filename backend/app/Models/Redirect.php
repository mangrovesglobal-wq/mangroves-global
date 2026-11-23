<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Redirect extends Model
{
    protected $fillable = [
        'source_path', 'destination_path', 'redirect_type',
        'is_active', 'hit_count', 'note',
    ];

    protected $casts = ['is_active' => 'boolean', 'hit_count' => 'integer'];
}
