<x-app-layout>
    <x-slot name="header">
        <div>
            <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-mangrove-800/50 mb-1">
                <a href="{{ route('seo.overview') }}" class="hover:text-mangrove-accent">SEO</a>
                <span>/</span>
                <span class="text-mangrove-900">Redirects</span>
            </div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Redirect Manager</h2>
            <p class="text-sm text-mangrove-800/50">301 permanent and 302 temporary URL redirects</p>
        </div>
    </x-slot>

    @if(session('success'))
        <div class="mb-6 px-5 py-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium">
            {{ session('success') }}
        </div>
    @endif

    <div x-data="{ editId: null, editData: {} }">

        {{-- Add redirect --}}
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6 mb-6">
            <h3 class="font-serif font-semibold text-mangrove-900 mb-4">Add Redirect</h3>
            <form method="POST" action="{{ route('seo.redirects.store') }}" class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                @csrf
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Source Path <span class="text-mangrove-accent">*</span></label>
                    <input name="source_path" required placeholder="/old-url"
                        class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm font-mono text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Destination <span class="text-mangrove-accent">*</span></label>
                    <input name="destination_path" required placeholder="/new-url or https://..."
                        class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm font-mono text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Type</label>
                    <select name="redirect_type" class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                        <option value="301">301 Permanent</option>
                        <option value="302">302 Temporary</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Note (optional)</label>
                    <input name="note" placeholder="e.g. Old service page"
                        class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                </div>
                <div>
                    <button type="submit" class="w-full px-6 py-2.5 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                        Add Redirect
                    </button>
                </div>
            </form>
        </div>

        {{-- Redirects table --}}
        <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-mangrove-100 font-serif font-semibold text-mangrove-900 flex items-center justify-between">
                <span>All Redirects</span>
                <span class="text-xs font-sans text-mangrove-800/50 font-normal">{{ $redirects->total() }} total</span>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-mangrove-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Source</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">→ Destination</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Type</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Hits</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Status</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Note</th>
                            <th class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-mangrove-100">
                        @forelse($redirects as $r)
                            <tr class="hover:bg-mangrove-50/40">
                                <td class="px-6 py-3 font-mono text-mangrove-900 text-xs">{{ $r->source_path }}</td>
                                <td class="px-6 py-3 font-mono text-mangrove-800/60 text-xs">{{ $r->destination_path }}</td>
                                <td class="px-6 py-3">
                                    <span class="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold {{ $r->redirect_type === 301 ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700' }}">
                                        {{ $r->redirect_type }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-mangrove-800/60">{{ number_format($r->hit_count) }}</td>
                                <td class="px-6 py-3">
                                    <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs {{ $r->is_active ? 'bg-green-100 text-green-700' : 'bg-mangrove-100 text-mangrove-500' }}">
                                        {{ $r->is_active ? 'Active' : 'Paused' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-mangrove-800/60 text-xs">{{ $r->note ?? '—' }}</td>
                                <td class="px-6 py-3 text-right flex gap-2 justify-end">
                                    <button @click="editId = {{ $r->id }}; editData = {{ json_encode(['source_path'=>$r->source_path,'destination_path'=>$r->destination_path,'redirect_type'=>$r->redirect_type,'is_active'=>$r->is_active,'note'=>$r->note]) }}"
                                        class="text-xs text-mangrove-accent font-semibold hover:underline">Edit</button>
                                    <form method="POST" action="{{ route('seo.redirects.destroy', $r) }}" class="inline" onsubmit="return confirm('Delete this redirect?')">
                                        @csrf @method('DELETE')
                                        <button class="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="7" class="px-6 py-10 text-center text-sm text-mangrove-800/40">No redirects yet. Add one above.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            @if($redirects->hasPages())
                <div class="px-6 py-4 border-t border-mangrove-100">{{ $redirects->links() }}</div>
            @endif
        </div>

        {{-- Edit modal --}}
        <div x-show="editId !== null" x-cloak
            class="fixed inset-0 bg-mangrove-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                <h3 class="font-serif font-semibold text-mangrove-900 text-lg mb-5">Edit Redirect</h3>
                <template x-if="editId !== null">
                    <form method="POST" :action="`/seo/redirects/${editId}`" class="space-y-4">
                        @csrf
                        <input type="hidden" name="_method" value="PATCH">
                        <div class="grid gap-4">
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Source Path</label>
                                <input name="source_path" :value="editData.source_path" required
                                    class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-mangrove-accent">
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Destination</label>
                                <input name="destination_path" :value="editData.destination_path" required
                                    class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-mangrove-accent">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Type</label>
                                    <select name="redirect_type" class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                        <option value="301" :selected="editData.redirect_type == 301">301 Permanent</option>
                                        <option value="302" :selected="editData.redirect_type == 302">302 Temporary</option>
                                    </select>
                                </div>
                                <div class="flex items-end pb-2.5">
                                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="hidden" name="is_active" value="0">
                                        <input type="checkbox" name="is_active" value="1" :checked="editData.is_active" class="rounded accent-mangrove-accent w-4 h-4">
                                        Active
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Note</label>
                                <input name="note" :value="editData.note"
                                    class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mangrove-accent">
                            </div>
                        </div>
                        <div class="flex gap-3 pt-2">
                            <button type="submit" class="flex-1 py-2.5 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold">Save</button>
                            <button type="button" @click="editId = null" class="flex-1 py-2.5 border border-mangrove-200 text-mangrove-900 rounded-full text-xs uppercase tracking-widest font-semibold">Cancel</button>
                        </div>
                    </form>
                </template>
            </div>
        </div>
    </div>
</x-app-layout>
