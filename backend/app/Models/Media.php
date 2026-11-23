<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'original_name', 'filename', 'path', 'url', 'disk', 'mime_type',
        'size', 'width', 'height', 'alt_text', 'title', 'caption',
    ];

    protected $casts = [
        'size'   => 'integer',
        'width'  => 'integer',
        'height' => 'integer',
    ];

    public function isImage(): bool
    {
        return str_starts_with($this->mime_type, 'image/');
    }

    public function isVideo(): bool
    {
        return str_starts_with($this->mime_type, 'video/');
    }

    public function humanSize(): string
    {
        $bytes = $this->size;
        if ($bytes < 1024)    return "{$bytes} B";
        if ($bytes < 1048576) return round($bytes / 1024, 1) . ' KB';
        return round($bytes / 1048576, 2) . ' MB';
    }

    public function typeLabel(): string
    {
        return match (true) {
            $this->isImage() => strtoupper(pathinfo($this->filename, PATHINFO_EXTENSION)),
            $this->isVideo() => strtoupper(pathinfo($this->filename, PATHINFO_EXTENSION)),
            default          => 'FILE',
        };
    }

    public function dimensionsLabel(): string
    {
        if ($this->width && $this->height) {
            return "{$this->width} × {$this->height} px";
        }
        return '';
    }
}
