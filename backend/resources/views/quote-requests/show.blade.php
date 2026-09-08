<x-app-layout>
    <x-slot name="header">
        <div>
            <a href="{{ route('quote-requests.index') }}" class="text-xs uppercase tracking-widest text-mangrove-accent">&larr; Back to Quote Requests</a>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900 mt-2">{{ $quoteRequest->name }}</h2>
            <p class="text-sm text-mangrove-800/50">Submitted {{ $quoteRequest->created_at->format('d M Y, g:ia') }}</p>
        </div>
    </x-slot>

    @if (session('status'))
        <div class="mb-6 p-4 rounded-xl bg-mangrove-accent/20 text-mangrove-800 text-sm">
            {{ session('status') }}
        </div>
    @endif

    <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white border border-mangrove-100 rounded-2xl p-8">
            <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">Message</h3>
            <p class="text-mangrove-900 leading-relaxed whitespace-pre-line mb-8">{{ $quoteRequest->message }}</p>

            <div class="grid sm:grid-cols-2 gap-6 pt-6 border-t border-mangrove-100 text-sm">
                <div>
                    <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Email</div>
                    <a href="mailto:{{ $quoteRequest->email }}" class="text-mangrove-900 hover:text-mangrove-accent">{{ $quoteRequest->email }}</a>
                </div>
                <div>
                    <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Phone</div>
                    <div class="text-mangrove-900">{{ $quoteRequest->phone ?: '—' }}</div>
                </div>
                <div>
                    <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Company</div>
                    <div class="text-mangrove-900">{{ $quoteRequest->company ?: '—' }}</div>
                </div>
                <div>
                    <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Division</div>
                    <div class="text-mangrove-900">{{ ucfirst($quoteRequest->division) }}</div>
                </div>
            </div>
        </div>

        <div class="bg-white border border-mangrove-100 rounded-2xl p-8 h-fit">
            <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">Status</h3>
            <form method="POST" action="{{ route('quote-requests.update-status', $quoteRequest) }}" class="space-y-4">
                @csrf
                @method('PATCH')
                <select name="status" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                    <option value="new" @selected($quoteRequest->status === 'new')>New</option>
                    <option value="contacted" @selected($quoteRequest->status === 'contacted')>Contacted</option>
                    <option value="closed" @selected($quoteRequest->status === 'closed')>Closed</option>
                </select>
                <button type="submit" class="w-full py-3 bg-mangrove-accent text-mangrove-900 rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors">
                    Update Status
                </button>
            </form>
        </div>
    </div>
</x-app-layout>
