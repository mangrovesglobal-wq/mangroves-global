<?php

namespace App\Http\Controllers;

use App\Models\QuoteRequest;
use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    public function index()
    {
        $quoteRequests = QuoteRequest::latest()->paginate(15);

        return view('quote-requests.index', compact('quoteRequests'));
    }

    public function show(QuoteRequest $quoteRequest)
    {
        return view('quote-requests.show', compact('quoteRequest'));
    }

    public function updateStatus(Request $request, QuoteRequest $quoteRequest)
    {
        $request->validate([
            'status' => 'required|in:new,contacted,closed',
        ]);

        $quoteRequest->update(['status' => $request->status]);

        return redirect()->route('quote-requests.show', $quoteRequest)->with('status', 'Status updated.');
    }
}
