<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SiteSettingController extends Controller
{
    public function index()
    {
        $grouped = SiteSetting::orderBy('order')->get()->groupBy('group');
        return view('site-settings.index', compact('grouped'));
    }

    public function update(Request $request)
    {
        $settings = $request->except(['_token', '_method']);

        foreach ($settings as $key => $value) {
            $setting = SiteSetting::where('key', $key)->first();
            if (!$setting) continue;

            if ($setting->type === 'image' && $request->hasFile($key)) {
                $file  = $request->file($key);
                $path  = $file->store('settings', 'public');
                $value = Storage::url($path);
            }

            $setting->update(['value' => $value]);
        }

        // Handle image uploads (file inputs have the same key)
        foreach ($request->allFiles() as $key => $file) {
            $setting = SiteSetting::where('key', $key)->first();
            if (!$setting) continue;
            $path  = $file->store('settings', 'public');
            $setting->update(['value' => Storage::url($path)]);
        }

        return redirect()->route('site-settings.index')->with('success', 'Settings saved successfully.');
    }
}
