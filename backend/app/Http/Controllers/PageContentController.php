<?php

namespace App\Http\Controllers;

use App\Models\PageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PageContentController extends Controller
{
    // Schema defining every editable page and its sections/fields
    public static array $schema = [
        'home' => [
            'title' => 'Home Page',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Banner',
                    'fields' => [
                        ['key' => 'heading',     'label' => 'Main Heading',    'type' => 'text'],
                        ['key' => 'subheading',  'label' => 'Subheading',      'type' => 'textarea'],
                        ['key' => 'image',       'label' => 'Hero Background Image', 'type' => 'image'],
                        ['key' => 'cta_label',   'label' => 'CTA Button Text', 'type' => 'text'],
                        ['key' => 'cta_href',    'label' => 'CTA Button URL',  'type' => 'url'],
                    ],
                ],
                'trading_card' => [
                    'label' => 'Trading Division Card',
                    'fields' => [
                        ['key' => 'eyebrow',    'label' => 'Eyebrow Label',  'type' => 'text'],
                        ['key' => 'heading',    'label' => 'Card Heading',   'type' => 'text'],
                        ['key' => 'description','label' => 'Description',    'type' => 'textarea'],
                        ['key' => 'link_label', 'label' => 'Link Text',      'type' => 'text'],
                        ['key' => 'link_href',  'label' => 'Link URL',       'type' => 'url'],
                    ],
                ],
                'logistics_card' => [
                    'label' => 'Logistics Division Card',
                    'fields' => [
                        ['key' => 'eyebrow',    'label' => 'Eyebrow Label',  'type' => 'text'],
                        ['key' => 'heading',    'label' => 'Card Heading',   'type' => 'text'],
                        ['key' => 'description','label' => 'Description',    'type' => 'textarea'],
                        ['key' => 'link_label', 'label' => 'Link Text',      'type' => 'text'],
                        ['key' => 'link_href',  'label' => 'Link URL',       'type' => 'url'],
                    ],
                ],
                'creative_card' => [
                    'label' => 'Creative Division Card',
                    'fields' => [
                        ['key' => 'eyebrow',    'label' => 'Eyebrow Label',  'type' => 'text'],
                        ['key' => 'heading',    'label' => 'Card Heading',   'type' => 'text'],
                        ['key' => 'description','label' => 'Description',    'type' => 'textarea'],
                        ['key' => 'link_label', 'label' => 'Link Text',      'type' => 'text'],
                        ['key' => 'link_href',  'label' => 'Link URL',       'type' => 'url'],
                    ],
                ],
                'features_bar' => [
                    'label' => 'Features / Tagline Bar',
                    'fields' => [
                        ['key' => 'tagline', 'label' => 'Tagline Text', 'type' => 'text'],
                    ],
                ],
                'contact' => [
                    'label' => 'Contact Section',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Section Heading', 'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading',      'type' => 'textarea'],
                    ],
                ],
            ],
        ],

        'about' => [
            'title' => 'About Page',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Banner',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Heading',    'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading', 'type' => 'textarea'],
                        ['key' => 'image',      'label' => 'Hero Image', 'type' => 'image'],
                    ],
                ],
                'story' => [
                    'label' => 'Our Story',
                    'fields' => [
                        ['key' => 'heading', 'label' => 'Section Heading', 'type' => 'text'],
                        ['key' => 'body',    'label' => 'Body Text',       'type' => 'richtext'],
                    ],
                ],
                'mission' => [
                    'label' => 'Mission Statement',
                    'fields' => [
                        ['key' => 'heading', 'label' => 'Heading', 'type' => 'text'],
                        ['key' => 'body',    'label' => 'Body',    'type' => 'richtext'],
                    ],
                ],
            ],
        ],

        'trading' => [
            'title' => 'Trading Division',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Banner',
                    'fields' => [
                        ['key' => 'heading',      'label' => 'Heading',           'type' => 'text'],
                        ['key' => 'subheading',   'label' => 'Subheading',        'type' => 'textarea'],
                        ['key' => 'video',        'label' => 'Hero Video',        'type' => 'video'],
                        ['key' => 'video_poster', 'label' => 'Video Poster Image','type' => 'image'],
                    ],
                ],
                'intro' => [
                    'label' => 'Introduction',
                    'fields' => [
                        ['key' => 'heading', 'label' => 'Heading', 'type' => 'text'],
                        ['key' => 'body',    'label' => 'Body',    'type' => 'richtext'],
                    ],
                ],
                'cta' => [
                    'label' => 'Call-to-Action Strip',
                    'fields' => [
                        ['key' => 'heading',   'label' => 'CTA Heading',   'type' => 'text'],
                        ['key' => 'body',      'label' => 'CTA Body',      'type' => 'textarea'],
                        ['key' => 'btn_label', 'label' => 'Button Label',  'type' => 'text'],
                        ['key' => 'btn_href',  'label' => 'Button URL',    'type' => 'url'],
                    ],
                ],
            ],
        ],

        'logistics' => [
            'title' => 'Logistics Division',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Banner',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Heading',    'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading', 'type' => 'textarea'],
                        ['key' => 'image',      'label' => 'Hero Image', 'type' => 'image'],
                    ],
                ],
                'intro' => [
                    'label' => 'Introduction',
                    'fields' => [
                        ['key' => 'heading', 'label' => 'Heading', 'type' => 'text'],
                        ['key' => 'body',    'label' => 'Body',    'type' => 'richtext'],
                    ],
                ],
                'cta' => [
                    'label' => 'Call-to-Action Strip',
                    'fields' => [
                        ['key' => 'heading',   'label' => 'CTA Heading',  'type' => 'text'],
                        ['key' => 'body',      'label' => 'CTA Body',     'type' => 'textarea'],
                        ['key' => 'btn_label', 'label' => 'Button Label', 'type' => 'text'],
                        ['key' => 'btn_href',  'label' => 'Button URL',   'type' => 'url'],
                    ],
                ],
            ],
        ],

        'creative' => [
            'title' => 'Creative Division',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Parallax Layers',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Heading',    'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading', 'type' => 'textarea'],
                        ['key' => 'layer_bg',   'label' => 'Layer Background (sky fill)',   'type' => 'image'],
                        ['key' => 'layer_0',    'label' => 'Layer 0 (cloud/mist streaks)',  'type' => 'image'],
                        ['key' => 'layer_1',    'label' => 'Layer 1 (mountain peak)',       'type' => 'image'],
                        ['key' => 'layer_2',    'label' => 'Layer 2 (distant pale hills)',  'type' => 'image'],
                        ['key' => 'layer_3',    'label' => 'Layer 3 (rocky cliffs)',        'type' => 'image'],
                        ['key' => 'layer_4',    'label' => 'Layer 4 (medium green hills)',  'type' => 'image'],
                        ['key' => 'layer_5',    'label' => 'Layer 5 (dark trees on rocks)', 'type' => 'image'],
                        ['key' => 'layer_6',    'label' => 'Layer 6 (foreground pines)',    'type' => 'image'],
                    ],
                ],
                'intro' => [
                    'label' => 'Introduction',
                    'fields' => [
                        ['key' => 'heading', 'label' => 'Heading', 'type' => 'text'],
                        ['key' => 'body',    'label' => 'Body',    'type' => 'richtext'],
                    ],
                ],
                'cta' => [
                    'label' => 'Call-to-Action Strip',
                    'fields' => [
                        ['key' => 'heading',   'label' => 'CTA Heading',  'type' => 'text'],
                        ['key' => 'body',      'label' => 'CTA Body',     'type' => 'textarea'],
                        ['key' => 'btn_label', 'label' => 'Button Label', 'type' => 'text'],
                        ['key' => 'btn_href',  'label' => 'Button URL',   'type' => 'url'],
                    ],
                ],
            ],
        ],

        'become-a-partner' => [
            'title' => 'Become a Supplier Partner',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Banner',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Heading',        'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading',     'type' => 'textarea'],
                        ['key' => 'body',       'label' => 'Hero Body Text', 'type' => 'textarea'],
                        ['key' => 'cta_label',  'label' => 'CTA Button Text','type' => 'text'],
                    ],
                ],
                'cta_bottom' => [
                    'label' => 'Bottom Call-to-Action',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Heading',    'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading', 'type' => 'textarea'],
                    ],
                ],
            ],
        ],

        'contact' => [
            'title' => 'Contact Page',
            'sections' => [
                'hero' => [
                    'label' => 'Hero / Banner',
                    'fields' => [
                        ['key' => 'heading',    'label' => 'Heading',    'type' => 'text'],
                        ['key' => 'subheading', 'label' => 'Subheading', 'type' => 'textarea'],
                    ],
                ],
            ],
        ],
    ];

    public function index()
    {
        $pages = collect(self::$schema)->map(fn($p) => $p['title']);
        return view('page-contents.index', compact('pages'));
    }

    public function show(string $pageKey)
    {
        if (!isset(self::$schema[$pageKey])) {
            abort(404);
        }

        $pageConfig = self::$schema[$pageKey];
        $savedData   = PageSection::forPage($pageKey);

        return view('page-contents.show', compact('pageKey', 'pageConfig', 'savedData'));
    }

    public function update(Request $request, string $pageKey)
    {
        if (!isset(self::$schema[$pageKey])) {
            abort(404);
        }

        $schema   = self::$schema[$pageKey];
        $sections = $request->input('sections', []);
        $files    = $request->allFiles();

        foreach ($schema['sections'] as $sectionKey => $sectionConfig) {
            $data = $sections[$sectionKey] ?? [];

            // Handle image and video uploads for this section
            foreach ($sectionConfig['fields'] as $field) {
                if (in_array($field['type'], ['image', 'video']) && isset($files['sections'][$sectionKey][$field['key']])) {
                    $file  = $files['sections'][$sectionKey][$field['key']];
                    $path  = $file->store('pages/' . $pageKey, 'public');
                    $data[$field['key']] = Storage::url($path);
                }
            }

            PageSection::updateOrCreate(
                ['page_key' => $pageKey, 'section_key' => $sectionKey],
                ['data' => $data]
            );
        }

        return redirect()->route('page-contents.show', $pageKey)->with('success', 'Page content saved.');
    }
}
