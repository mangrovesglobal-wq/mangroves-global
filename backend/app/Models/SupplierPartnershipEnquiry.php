<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierPartnershipEnquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'contact_person',
        'country',
        'city_state',
        'website',
        'email',
        'phone',
        'primary_products',
        'product_categories',
        'grades_specifications',
        'packaging',
        'certifications',
        'export_markets',
        'monthly_capacity',
        'moq',
        'existing_uae_customers',
        'partnership_objective',
        'message',
        'documents',
        'supplier_type',
        'representation_status',
        'assigned_representative',
        'commercial_model',
        'status',
    ];
}
