<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NavItem;
use Illuminate\Http\Request;

class NavItemApiController extends Controller
{
    public function index(Request $request)
    {
        $location = $request->query('location', 'header');
        $tree     = NavItem::tree($location);

        return response()->json($tree->map(fn($item) => [
            'id'          => $item->id,
            'label'       => $item->label,
            'href'        => $item->href,
            'opens_blank' => $item->opens_blank,
            'children'    => $item->children->map(fn($child) => [
                'id'          => $child->id,
                'label'       => $child->label,
                'href'        => $child->href,
                'opens_blank' => $child->opens_blank,
            ]),
        ]));
    }
}
