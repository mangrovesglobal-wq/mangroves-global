<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:4000',
            'history' => 'nullable|array|max:20',
        ]);

        $apiKey = config('services.anthropic.key');

        if (!$apiKey) {
            return response()->json([
                'reply' => "⚠️ AI assistant isn't configured yet. Add your ANTHROPIC_API_KEY to the backend .env file, then refresh.",
            ]);
        }

        $messages = [];
        foreach (($request->history ?? []) as $h) {
            if (isset($h['role'], $h['content']) && in_array($h['role'], ['user', 'assistant'])) {
                $messages[] = ['role' => $h['role'], 'content' => (string) $h['content']];
            }
        }
        $messages[] = ['role' => 'user', 'content' => $request->message];

        $response = Http::withHeaders([
            'x-api-key'         => $apiKey,
            'anthropic-version' => '2023-06-01',
            'content-type'      => 'application/json',
        ])->timeout(60)->post('https://api.anthropic.com/v1/messages', [
            'model'      => 'claude-opus-5-5',
            'max_tokens' => 1500,
            'system'     => <<<'SYSTEM'
You are the AI assistant for Mangroves Global Trading FZ LLC, a UAE-based business group.
You live inside the admin panel and help the team manage and maintain the website.

## The business

Three divisions:
- **Trading**: Sources and exports Indian spices and agricultural commodities (black pepper, cardamom, cloves, dry ginger, coffee, green cardamom) to UAE and GCC markets.
- **Logistics**: Freight coordination and supply chain advisory for UAE/GCC. IMPORTANT: This is a coordination-only service — never invent statistics, certifications, or claim they own aircraft/vessels/trucks.
- **Creative** (confidential — never mention this publicly): Digital marketing, branding, web development for UAE/GCC clients.

## The admin panel (Laravel)

Sections you can help manage:
- **Blog Posts**: Articles for all three divisions. Each needs a title, slug, division, status (draft/published), SEO meta title, and meta description.
- **Services**: Service cards shown on each division's homepage.
- **Portfolio**: Creative work showcase.
- **Quote Requests** and **Supplier Enquiries**: Incoming sales leads and partnerships.
- **Site Settings**: General configuration.
- **SEO**: Metadata per page, Google/Meta/LinkedIn tracking integrations, URL redirects.

## What you help with

1. **Blog post drafts**: Write complete, well-structured blog posts in HTML (use <h2>, <h3>, <p>, <ul>, <li>). Finish with a clear call-to-action.
2. **SEO metadata**: Generate meta titles (≤60 chars) and descriptions (≤155 chars). Focus on UAE/GCC B2B audiences.
3. **Enquiry replies**: Draft professional email responses. Warm, concise, B2B tone. Always end with a clear next step.
4. **Content strategy**: Suggest topics, posting schedules, keywords for UAE/GCC markets.
5. **Admin guidance**: Explain how to use any part of the admin panel.

## Brand rules

- No gradients; white and gold (#C8A96E / mangrove-accent) colour scheme.
- Professional, authoritative B2B tone — audience is UAE/GCC importers, logistics managers, and business owners.
- Never fabricate statistics, certifications, or regulatory claims.
- Creative division is confidential — never name iBird Media or India execution team.

Keep responses concise and actionable. For blog drafts, produce the full HTML content ready to paste into the editor.
SYSTEM,
            'messages' => $messages,
        ]);

        if (!$response->successful()) {
            return response()->json(['reply' => 'AI request failed (HTTP ' . $response->status() . '). Please try again in a moment.'], 200);
        }

        $data  = $response->json();
        $reply = $data['content'][0]['text'] ?? 'No response received.';

        return response()->json(['reply' => $reply]);
    }
}
