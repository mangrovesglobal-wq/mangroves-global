<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            // 'storage' = Laravel public disk (uploaded, deletable)
            // 'frontend' = Next.js static file (codebase, read-only in admin)
            $table->string('disk', 20)->default('storage')->after('mime_type');
        });
    }

    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn('disk');
        });
    }
};
