<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioProjectController extends Controller
{
    public function index()
    {
        $projects = PortfolioProject::orderBy('column_index')->orderBy('sort_order')->paginate(20);

        return view('portfolio.index', compact('projects'));
    }

    public function create()
    {
        return view('portfolio.create');
    }

    private function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|max:4096',
            'tone' => 'nullable|in:ink,teal,gold,sand',
            'shape' => 'required|in:square,tall,wide',
            'column_index' => 'required|integer|min:0|max:3',
            'sort_order' => 'nullable|integer',
            'link' => 'nullable|url|max:255',
            'feature_in_hero' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());

        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['feature_in_hero'] = $request->has('feature_in_hero');
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('portfolio-images', 'public');
        }

        PortfolioProject::create($validated);

        return redirect()->route('portfolio.index')->with('status', 'Project created.');
    }

    public function edit(PortfolioProject $portfolio)
    {
        return view('portfolio.edit', ['project' => $portfolio]);
    }

    public function update(Request $request, PortfolioProject $portfolio)
    {
        $validated = $request->validate($this->rules());

        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['feature_in_hero'] = $request->has('feature_in_hero');
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if ($portfolio->image) {
                Storage::disk('public')->delete($portfolio->image);
            }
            $validated['image'] = $request->file('image')->store('portfolio-images', 'public');
        }

        $portfolio->update($validated);

        return redirect()->route('portfolio.index')->with('status', 'Project updated.');
    }

    public function destroy(PortfolioProject $portfolio)
    {
        if ($portfolio->image) {
            Storage::disk('public')->delete($portfolio->image);
        }

        $portfolio->delete();

        return redirect()->route('portfolio.index')->with('status', 'Project deleted.');
    }
}
