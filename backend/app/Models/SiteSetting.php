<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'group', 'label', 'description', 'is_public', 'order'];

    protected $casts = ['is_public' => 'boolean'];

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    public static function allPublicKeyed(): array
    {
        return static::where('is_public', true)->get()->keyBy('key')->map->value->toArray();
    }

    public static function groupedForAdmin(): array
    {
        return static::orderBy('order')->get()->groupBy('group')->toArray();
    }
}
