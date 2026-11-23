<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupplierPartnershipEnquiry;
use Illuminate\Http\Request;

class SupplierPartnershipApiController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city_state' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',

            'primary_products' => 'required|string|max:255',
            'product_categories' => 'nullable|string|max:255',
            'grades_specifications' => 'nullable|string|max:2000',
            'packaging' => 'nullable|string|max:255',
            'certifications' => 'nullable|string|max:255',

            'export_markets' => 'nullable|string|max:255',
            'monthly_capacity' => 'nullable|string|max:255',
            'moq' => 'nullable|string|max:255',
            'existing_uae_customers' => 'nullable|string|max:255',

            'partnership_objective' => 'required|string|max:255',
            'message' => 'nullable|string|max:5000',
            'documents.*' => 'nullable|file|max:8192|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

        $paths = [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $paths[] = $file->store('supplier-documents', 'public');
            }
        }
        $validated['documents'] = $paths ? implode(',', $paths) : null;
        $validated['status'] = 'new';

        $enquiry = SupplierPartnershipEnquiry::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Supplier partnership enquiry received.',
            'id' => $enquiry->id,
        ], 201);
    }
}
