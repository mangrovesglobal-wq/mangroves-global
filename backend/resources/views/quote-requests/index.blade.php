<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Quote Requests</h2>
            <p class="text-sm text-mangrove-800/50">{{ $quoteRequests->total() }} total submissions</p>
        </div>
    </x-slot>

    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
        @if ($quoteRequests->isEmpty())
            <div class="px-6 py-12 text-sm text-mangrove-800/50 text-center">
                No quote requests yet. They'll appear here as soon as someone submits a form on the website.
            </div>
        @else
            <table class="w-full text-sm">
                <thead class="bg-mangrove-50 text-xs uppercase tracking-widest text-mangrove-800/50">
                    <tr>
                        <th class="px-6 py-3 text-left">Name</th>
                        <th class="px-6 py-3 text-left">Division</th>
                        <th class="px-6 py-3 text-left">Subject</th>
                        <th class="px-6 py-3 text-left">Date</th>
                        <th class="px-6 py-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-mangrove-100">
                    @foreach ($quoteRequests as $quote)
                        <tr class="hover:bg-mangrove-50/60 cursor-pointer" onclick="window.location='{{ route('quote-requests.show', $quote) }}'">
                            <td class="px-6 py-4">
                                <div class="font-medium text-mangrove-900">{{ $quote->name }}</div>
                                <div class="text-xs text-mangrove-800/50">{{ $quote->email }}</div>
                            </td>
                            <td class="px-6 py-4 text-mangrove-800">{{ ucfirst($quote->division) }}</td>
                            <td class="px-6 py-4 text-mangrove-800">{{ $quote->subject ?: '—' }}</td>
                            <td class="px-6 py-4 text-mangrove-800/60">{{ $quote->created_at->format('d M Y') }}</td>
                            <td class="px-6 py-4">
                                <span class="text-xs px-3 py-1 rounded-full
                                    @if($quote->status === 'new') bg-mangrove-accent/20 text-mangrove-800
                                    @elseif($quote->status === 'contacted') bg-mangrove-100 text-mangrove-800/60
                                    @else bg-mangrove-900/10 text-mangrove-900/50 @endif">
                                    {{ ucfirst($quote->status) }}
                                </span>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    <div class="mt-6">
        {{ $quoteRequests->links() }}
    </div>
</x-app-layout>
