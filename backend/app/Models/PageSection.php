<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    protected $fillable = ['page_key', 'section_key', 'data'];

    protected $casts = ['data' => 'array'];

    public static function forPage(string $pageKey): array
    {
        return static::where('page_key', $pageKey)
            ->get()
            ->keyBy('section_key')
            ->map->data
            ->toArray();
    }

    public static function getField(string $pageKey, string $sectionKey, string $fieldKey, mixed $default = null): mixed
    {
        $section = static::where('page_key', $pageKey)->where('section_key', $sectionKey)->first();
        return $section ? ($section->data[$fieldKey] ?? $default) : $default;
    }
}
