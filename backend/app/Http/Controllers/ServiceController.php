<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('division')->orderBy('sort_order')->paginate(20);

        return view('services.index', compact('services'));
    }

    public function create()
    {
        return view('services.create');
    }

    private function rules(): array
    {
        return [
            'division' => 'required|in:trading,logistics,creative',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'featured_image' => 'nullable|image|max:4096',
            'short_description' => 'nullable|string|max:500',
            'block_1_heading' => 'nullable|string|max:255',
            'block_1_content' => 'nullable|string',
            'block_2_heading' => 'nullable|string|max:255',
            'block_2_content' => 'nullable|string',
            'block_3_heading' => 'nullable|string|max:255',
            'block_3_content' => 'nullable|string',
            'block_4_heading' => 'nullable|string|max:255',
            'block_4_content' => 'nullable|string',
            'faq_1_question' => 'nullable|string|max:255',
            'faq_1_answer' => 'nullable|string',
            'faq_2_question' => 'nullable|string|max:255',
            'faq_2_answer' => 'nullable|string',
            'faq_3_question' => 'nullable|string|max:255',
            'faq_3_answer' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'focus_keyword' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:500',
            'tags' => 'nullable|string|max:500',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate(array_merge($this->rules(), [
            'slug' => 'nullable|string|max:255|unique:services,slug',
        ]));

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('service-images', 'public');
        }

        Service::create($validated);

        return redirect()->route('services.index')->with('status', 'Service created.');
    }

    public function edit(Service $service)
    {
        return view('services.edit', compact('service'));
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate(array_merge($this->rules(), [
            'slug' => 'nullable|string|max:255|unique:services,slug,' . $service->id,
        ]));

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('featured_image')) {
            if ($service->featured_image) {
                Storage::disk('public')->delete($service->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('service-images', 'public');
        }

        $service->update($validated);

        return redirect()->route('services.index')->with('status', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        if ($service->featured_image) {
            Storage::disk('public')->delete($service->featured_image);
        }

        $service->delete();

        return redirect()->route('services.index')->with('status', 'Service deleted.');
    }
}
