<?php

namespace App\Http\Controllers;

use App\Models\SupplierPartnershipEnquiry;
use Illuminate\Http\Request;

class SupplierPartnershipController extends Controller
{
    public function index()
    {
        $enquiries = SupplierPartnershipEnquiry::latest()->paginate(15);

        return view('supplier-partnership.index', compact('enquiries'));
    }

    public function show(SupplierPartnershipEnquiry $supplierPartnership)
    {
        return view('supplier-partnership.show', ['enquiry' => $supplierPartnership]);
    }

    public function updateStatus(Request $request, SupplierPartnershipEnquiry $supplierPartnership)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,qualified,closed',
            'assigned_representative' => 'nullable|string|max:255',
            'commercial_model' => 'nullable|string|max:255',
        ]);

        $supplierPartnership->update($validated);

        return redirect()->route('supplier-partnership.show', $supplierPartnership)->with('status', 'Enquiry updated.');
    }
}
