<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Dashboard</h2>
            <p class="text-sm text-mangrove-800/50">Welcome back, {{ auth()->user()->name }}</p>
        </div>
    </x-slot>

    <div class="grid sm:grid-cols-3 gap-5 mb-8">
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">New Quote Requests</div>
            <div class="font-serif text-3xl font-bold text-mangrove-900">{{ \App\Models\QuoteRequest::where('status', 'new')->count() }}</div>
        </div>
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Published Blog Posts</div>
            <div class="font-serif text-3xl font-bold text-mangrove-900">{{ \App\Models\BlogPost::where('status', 'published')->count() }}</div>
        </div>
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6">
            <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Active Services</div>
            <div class="font-serif text-3xl font-bold text-mangrove-900">{{ \App\Models\Service::where('is_active', true)->count() }}</div>
        </div>
    </div>

    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-mangrove-100 font-serif font-semibold text-mangrove-900">Recent Quote Requests</div>
        <div class="divide-y divide-mangrove-100">
            @forelse (\App\Models\QuoteRequest::latest()->take(5)->get() as $quote)
                <div class="px-6 py-4 flex items-center justify-between text-sm">
                    <div>
                        <div class="font-medium text-mangrove-900">{{ $quote->name }}{{ $quote->company ? ' — ' . $quote->company : '' }}</div>
                        <div class="text-mangrove-800/50 text-xs">{{ ucfirst($quote->division) }}{{ $quote->subject ? ' — ' . $quote->subject : '' }}</div>
                    </div>
                    <span class="text-xs px-3 py-1 rounded-full bg-mangrove-accent/20 text-mangrove-800">{{ ucfirst($quote->status) }}</span>
                </div>
            @empty
                <div class="px-6 py-8 text-sm text-mangrove-800/50 text-center">
                    No quote requests yet.
                </div>
            @endforelse
        </div>
    </div>
</x-app-layout>
