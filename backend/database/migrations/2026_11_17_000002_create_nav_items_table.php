<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nav_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('label');
            $table->string('href')->nullable();
            $table->integer('order')->default(0);
            $table->string('location')->default('header'); // header, footer
            $table->boolean('is_active')->default(true);
            $table->boolean('opens_blank')->default(false);
            $table->timestamps();
            $table->foreign('parent_id')->references('id')->on('nav_items')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nav_items');
    }
};
