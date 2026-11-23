<x-app-layout>
    <x-slot name="header">
        <div>
            <a href="{{ route('supplier-partnership.index') }}" class="text-xs uppercase tracking-widest text-mangrove-accent">&larr; Back to Supplier Enquiries</a>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900 mt-2">{{ $enquiry->company_name }}</h2>
            <p class="text-sm text-mangrove-800/50">Submitted {{ $enquiry->created_at->format('d M Y, g:ia') }}</p>
        </div>
    </x-slot>

    @if (session('status'))
        <div class="mb-6 p-4 rounded-xl bg-mangrove-accent/20 text-mangrove-800 text-sm">
            {{ session('status') }}
        </div>
    @endif

    <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white border border-mangrove-100 rounded-2xl p-8">
                <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">Company</h3>
                <div class="grid sm:grid-cols-2 gap-6 text-sm">
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Contact Person</div><div class="text-mangrove-900">{{ $enquiry->contact_person }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Country</div><div class="text-mangrove-900">{{ $enquiry->country }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">City / State</div><div class="text-mangrove-900">{{ $enquiry->city_state ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Website</div><div class="text-mangrove-900">{{ $enquiry->website ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Email</div><a href="mailto:{{ $enquiry->email }}" class="text-mangrove-900 hover:text-mangrove-accent">{{ $enquiry->email }}</a></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Phone / WhatsApp</div><div class="text-mangrove-900">{{ $enquiry->phone }}</div></div>
                </div>
            </div>

            <div class="bg-white border border-mangrove-100 rounded-2xl p-8">
                <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">Products</h3>
                <div class="grid sm:grid-cols-2 gap-6 text-sm">
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Primary Products</div><div class="text-mangrove-900">{{ $enquiry->primary_products }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Product Categories</div><div class="text-mangrove-900">{{ $enquiry->product_categories ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Packaging</div><div class="text-mangrove-900">{{ $enquiry->packaging ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Certifications</div><div class="text-mangrove-900">{{ $enquiry->certifications ?: '—' }}</div></div>
                </div>
                @if ($enquiry->grades_specifications)
                    <div class="mt-4 pt-4 border-t border-mangrove-100">
                        <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Grades / Specifications</div>
                        <p class="text-mangrove-900 whitespace-pre-line">{{ $enquiry->grades_specifications }}</p>
                    </div>
                @endif
            </div>

            <div class="bg-white border border-mangrove-100 rounded-2xl p-8">
                <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">Export Capability</h3>
                <div class="grid sm:grid-cols-2 gap-6 text-sm">
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Export Markets</div><div class="text-mangrove-900">{{ $enquiry->export_markets ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Monthly / Annual Capacity</div><div class="text-mangrove-900">{{ $enquiry->monthly_capacity ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">MOQ</div><div class="text-mangrove-900">{{ $enquiry->moq ?: '—' }}</div></div>
                    <div><div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">Existing UAE Customers</div><div class="text-mangrove-900">{{ $enquiry->existing_uae_customers ?: '—' }}</div></div>
                </div>
            </div>

            <div class="bg-white border border-mangrove-100 rounded-2xl p-8">
                <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-4">Objective &amp; Message</h3>
                <div class="text-sm mb-4"><span class="text-xs uppercase tracking-widest text-mangrove-800/50 mr-2">Objective:</span><span class="text-mangrove-900 font-medium">{{ $enquiry->partnership_objective }}</span></div>
                <p class="text-mangrove-900 leading-relaxed whitespace-pre-line">{{ $enquiry->message ?: 'No additional message provided.' }}</p>

                @if ($enquiry->documents)
                    <div class="mt-6 pt-6 border-t border-mangrove-100">
                        <div class="text-xs uppercase tracking-widest text-mangrove-800/50 mb-2">Attached Documents</div>
                        <div class="flex flex-wrap gap-3">
                            @foreach (explode(',', $enquiry->documents) as $doc)
                                <a href="{{ Storage::url($doc) }}" target="_blank" class="text-xs px-3 py-1.5 rounded-full border border-mangrove-100 text-mangrove-800 hover:border-mangrove-accent">
                                    {{ basename($doc) }}
                                </a>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>
        </div>

        <div class="bg-white border border-mangrove-100 rounded-2xl p-8 h-fit space-y-5">
            <h3 class="text-xs uppercase tracking-widest text-mangrove-800/50">CRM Status</h3>
            <form method="POST" action="{{ route('supplier-partnership.update-status', $enquiry) }}" class="space-y-4">
                @csrf
                @method('PATCH')
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Status</label>
                    <select name="status" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                        <option value="new" @selected($enquiry->status === 'new')>New</option>
                        <option value="contacted" @selected($enquiry->status === 'contacted')>Contacted</option>
                        <option value="qualified" @selected($enquiry->status === 'qualified')>Qualified</option>
                        <option value="closed" @selected($enquiry->status === 'closed')>Closed</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Assigned Representative</label>
                    <input type="text" name="assigned_representative" value="{{ $enquiry->assigned_representative }}" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Commercial Model</label>
                    <select name="commercial_model" class="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm">
                        <option value="" @selected(!$enquiry->commercial_model)>&mdash; Not yet determined &mdash;</option>
                        <option value="representation" @selected($enquiry->commercial_model === 'representation')>Representation</option>
                        <option value="market_development" @selected($enquiry->commercial_model === 'market_development')>Market Development</option>
                        <option value="trade_supply" @selected($enquiry->commercial_model === 'trade_supply')>Trade &amp; Supply</option>
                    </select>
                </div>
                <button type="submit" class="w-full py-3 bg-mangrove-accent text-mangrove-900 rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors">
                    Save
                </button>
            </form>
        </div>
    </div>
</x-app-layout>
