<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;

class PageSectionApiController extends Controller
{
    public function show(string $pageKey)
    {
        return response()->json(PageSection::forPage($pageKey));
    }
}
