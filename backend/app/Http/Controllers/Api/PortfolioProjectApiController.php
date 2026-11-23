<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;

class PortfolioProjectApiController extends Controller
{
    /**
     * List active portfolio projects, grouped for the Creative work grid.
     * GET /api/portfolio-projects
     */
    public function index()
    {
        $projects = PortfolioProject::where('is_active', true)
            ->orderBy('column_index')
            ->orderBy('sort_order')
            ->get([
                'id', 'title', 'category', 'image', 'tone', 'shape',
                'column_index', 'sort_order', 'link', 'feature_in_hero',
            ]);

        return response()->json(['data' => $projects]);
    }
}
