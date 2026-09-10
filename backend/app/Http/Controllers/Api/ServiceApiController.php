<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceApiController extends Controller
{
    /**
     * List active services for a given division.
     * GET /api/services?division=logistics
     */
    public function index(Request $request)
    {
        $request->validate([
            'division' => 'required|in:trading,logistics,creative',
        ]);

        $services = Service::where('division', $request->division)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get([
                'name', 'slug', 'icon', 'featured_image',
                'short_description', 'division', 'sort_order',
            ]);

        return response()->json(['data' => $services]);
    }

    /**
     * Show a single active service by division + slug.
     * GET /api/services/{division}/{slug}
     */
    public function show(string $division, string $slug)
    {
        $service = Service::where('division', $division)
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json(['data' => $service]);
    }
}
