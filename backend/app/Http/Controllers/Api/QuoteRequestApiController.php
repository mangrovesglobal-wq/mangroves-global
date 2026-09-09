<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;

class QuoteRequestApiController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|in:trading,logistics,creative',
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $validated['status'] = 'new';

        $quoteRequest = QuoteRequest::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Quote request received.',
            'id' => $quoteRequest->id,
        ], 201);
    }
}
