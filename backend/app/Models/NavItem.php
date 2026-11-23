<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NavItem extends Model
{
    protected $fillable = ['parent_id', 'label', 'href', 'order', 'location', 'is_active', 'opens_blank'];

    protected $casts = ['is_active' => 'boolean', 'opens_blank' => 'boolean'];

    public function children(): HasMany
    {
        return $this->hasMany(NavItem::class, 'parent_id')->orderBy('order');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(NavItem::class, 'parent_id');
    }

    public static function tree(string $location = 'header'): \Illuminate\Database\Eloquent\Collection
    {
        return static::where('location', $location)
            ->where('is_active', true)
            ->whereNull('parent_id')
            ->orderBy('order')
            ->with(['children' => fn($q) => $q->where('is_active', true)->orderBy('order')])
            ->get();
    }
}
