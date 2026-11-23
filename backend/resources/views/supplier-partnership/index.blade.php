<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Supplier Partnership Enquiries</h2>
            <p class="text-sm text-mangrove-800/50">{{ $enquiries->total() }} total submissions &middot; Trading &rarr; Be Our Partner</p>
        </div>
    </x-slot>

    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
        @if ($enquiries->isEmpty())
            <div class="px-6 py-12 text-sm text-mangrove-800/50 text-center">
                No supplier partnership enquiries yet. They'll appear here as soon as a supplier submits the form.
            </div>
        @else
            <table class="w-full text-sm">
                <thead class="bg-mangrove-50 text-xs uppercase tracking-widest text-mangrove-800/50">
                    <tr>
                        <th class="px-6 py-3 text-left">Company</th>
                        <th class="px-6 py-3 text-left">Country</th>
                        <th class="px-6 py-3 text-left">Primary Products</th>
                        <th class="px-6 py-3 text-left">Objective</th>
                        <th class="px-6 py-3 text-left">Date</th>
                        <th class="px-6 py-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-mangrove-100">
                    @foreach ($enquiries as $enquiry)
                        <tr class="hover:bg-mangrove-50/60 cursor-pointer" onclick="window.location='{{ route('supplier-partnership.show', $enquiry) }}'">
                            <td class="px-6 py-4">
                                <div class="font-medium text-mangrove-900">{{ $enquiry->company_name }}</div>
                                <div class="text-xs text-mangrove-800/50">{{ $enquiry->contact_person }}</div>
                            </td>
                            <td class="px-6 py-4 text-mangrove-800">{{ $enquiry->country }}</td>
                            <td class="px-6 py-4 text-mangrove-800">{{ $enquiry->primary_products }}</td>
                            <td class="px-6 py-4 text-mangrove-800">{{ $enquiry->partnership_objective }}</td>
                            <td class="px-6 py-4 text-mangrove-800/60">{{ $enquiry->created_at->format('d M Y') }}</td>
                            <td class="px-6 py-4">
                                <span class="text-xs px-3 py-1 rounded-full
                                    @if($enquiry->status === 'new') bg-mangrove-accent/20 text-mangrove-800
                                    @elseif($enquiry->status === 'contacted') bg-mangrove-100 text-mangrove-800/60
                                    @elseif($enquiry->status === 'qualified') bg-green-100 text-green-800
                                    @else bg-mangrove-900/10 text-mangrove-900/50 @endif">
                                    {{ ucfirst($enquiry->status) }}
                                </span>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    <div class="mt-6">
        {{ $enquiries->links() }}
    </div>
</x-app-layout>
