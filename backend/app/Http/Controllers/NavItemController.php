<?php

namespace App\Http\Controllers;

use App\Models\NavItem;
use Illuminate\Http\Request;

class NavItemController extends Controller
{
    public function index()
    {
        $headerItems = NavItem::where('location', 'header')
            ->orderBy('order')
            ->with(['children' => fn($q) => $q->orderBy('order')])
            ->get();

        $footerItems = NavItem::where('location', 'footer')
            ->whereNull('parent_id')
            ->orderBy('order')
            ->with(['children' => fn($q) => $q->orderBy('order')])
            ->get();

        $allParents = NavItem::whereNull('parent_id')->orderBy('label')->get();

        return view('navigation.index', compact('headerItems', 'footerItems', 'allParents'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label'       => 'required|string|max:100',
            'href'        => 'nullable|string|max:500',
            'parent_id'   => 'nullable|exists:nav_items,id',
            'location'    => 'required|in:header,footer',
            'order'       => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
            'opens_blank' => 'nullable|boolean',
        ]);

        $data['is_active']   = $request->boolean('is_active', true);
        $data['opens_blank'] = $request->boolean('opens_blank', false);
        $data['order']       = $request->input('order', NavItem::where('location', $data['location'])->max('order') + 1);

        NavItem::create($data);

        return redirect()->route('navigation.index')->with('success', 'Nav item added.');
    }

    public function update(Request $request, NavItem $navItem)
    {
        $data = $request->validate([
            'label'       => 'required|string|max:100',
            'href'        => 'nullable|string|max:500',
            'parent_id'   => 'nullable|exists:nav_items,id',
            'location'    => 'required|in:header,footer',
            'order'       => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
            'opens_blank' => 'nullable|boolean',
        ]);

        $data['is_active']   = $request->boolean('is_active');
        $data['opens_blank'] = $request->boolean('opens_blank');

        $navItem->update($data);

        return redirect()->route('navigation.index')->with('success', 'Nav item updated.');
    }

    public function destroy(NavItem $navItem)
    {
        $navItem->delete();
        return redirect()->route('navigation.index')->with('success', 'Nav item deleted.');
    }

    public function reorder(Request $request)
    {
        $request->validate(['items' => 'required|array']);
        foreach ($request->input('items') as $index => $id) {
            NavItem::where('id', $id)->update(['order' => $index]);
        }
        return response()->json(['ok' => true]);
    }
}
