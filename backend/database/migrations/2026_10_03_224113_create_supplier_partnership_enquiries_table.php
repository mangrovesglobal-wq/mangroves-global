<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('supplier_partnership_enquiries', function (Blueprint $table) {
            $table->id();

            // Company
            $table->string('company_name');
            $table->string('contact_person');
            $table->string('country');
            $table->string('city_state')->nullable();
            $table->string('website')->nullable();
            $table->string('email');
            $table->string('phone');

            // Products
            $table->string('primary_products');
            $table->string('product_categories')->nullable();
            $table->text('grades_specifications')->nullable();
            $table->string('packaging')->nullable();
            $table->string('certifications')->nullable();

            // Export capability
            $table->string('export_markets')->nullable();
            $table->string('monthly_capacity')->nullable();
            $table->string('moq')->nullable();
            $table->string('existing_uae_customers')->nullable();

            // Objective
            $table->string('partnership_objective');
            $table->text('message')->nullable();
            $table->text('documents')->nullable();

            // CRM fields
            $table->string('supplier_type')->default('represented_supplier');
            $table->string('representation_status')->default('enquiry');
            $table->string('assigned_representative')->nullable();
            $table->string('commercial_model')->nullable();
            $table->string('status')->default('new');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_partnership_enquiries');
    }
};
