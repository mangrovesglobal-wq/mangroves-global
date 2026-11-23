<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Navigation</h2>
            <p class="text-sm text-mangrove-800/50">Manage header and footer menu items</p>
        </div>
    </x-slot>

    @if(session('success'))
        <div class="mb-6 px-5 py-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm">
            {{ session('success') }}
        </div>
    @endif

    <div x-data="{ tab: 'header', editId: null, editData: {} }">

        {{-- Tabs --}}
        <div class="flex gap-1 mb-6 border-b border-mangrove-100">
            <button @click="tab='header'" :class="tab==='header' ? 'border-b-2 border-mangrove-900 text-mangrove-900 font-semibold' : 'text-mangrove-800/50'"
                class="px-5 py-3 text-sm uppercase tracking-widest transition-colors">Header Nav</button>
            <button @click="tab='footer'" :class="tab==='footer' ? 'border-b-2 border-mangrove-900 text-mangrove-900 font-semibold' : 'text-mangrove-800/50'"
                class="px-5 py-3 text-sm uppercase tracking-widest transition-colors">Footer Links</button>
        </div>

        {{-- Header nav --}}
        <div x-show="tab === 'header'" x-cloak>
            <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-mangrove-100 font-serif font-semibold text-mangrove-900 flex items-center justify-between">
                    <span>Header Navigation Items</span>
                    <span class="text-xs font-sans text-mangrove-800/50 font-normal">Order = display order (0 first)</span>
                </div>
                <table class="w-full text-sm">
                    <thead class="bg-mangrove-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Label</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">URL / Href</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Parent</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Order</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Active</th>
                            <th class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-mangrove-100">
                        @forelse($headerItems as $item)
                            <tr class="{{ $item->parent_id ? 'bg-mangrove-50/40' : '' }}">
                                <td class="px-6 py-3 font-medium text-mangrove-900">
                                    {{ $item->parent_id ? '↳ ' : '' }}{{ $item->label }}
                                </td>
                                <td class="px-6 py-3 text-mangrove-800/60 font-mono text-xs">{{ $item->href ?? '— dropdown —' }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60">{{ $item->parent?->label ?? '—' }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60">{{ $item->order }}</td>
                                <td class="px-6 py-3">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs {{ $item->is_active ? 'bg-green-100 text-green-700' : 'bg-mangrove-100 text-mangrove-500' }}">
                                        {{ $item->is_active ? 'Active' : 'Hidden' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-right flex gap-2 justify-end">
                                    <button @click="editId = {{ $item->id }}; editData = {{ json_encode(['label'=>$item->label,'href'=>$item->href,'parent_id'=>$item->parent_id,'order'=>$item->order,'location'=>$item->location,'is_active'=>$item->is_active,'opens_blank'=>$item->opens_blank]) }}"
                                        class="text-xs text-mangrove-accent font-semibold hover:underline">Edit</button>
                                    <form method="POST" action="{{ route('navigation.destroy', $item) }}" class="inline"
                                        onsubmit="return confirm('Delete this nav item and all its children?')">
                                        @csrf @method('DELETE')
                                        <button class="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @foreach($item->children as $child)
                            <tr class="bg-mangrove-50/40">
                                <td class="px-6 py-3 text-mangrove-900 pl-10">↳ {{ $child->label }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60 font-mono text-xs">{{ $child->href }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60">{{ $item->label }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60">{{ $child->order }}</td>
                                <td class="px-6 py-3">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs {{ $child->is_active ? 'bg-green-100 text-green-700' : 'bg-mangrove-100 text-mangrove-500' }}">
                                        {{ $child->is_active ? 'Active' : 'Hidden' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-right flex gap-2 justify-end">
                                    <button @click="editId = {{ $child->id }}; editData = {{ json_encode(['label'=>$child->label,'href'=>$child->href,'parent_id'=>$child->parent_id,'order'=>$child->order,'location'=>$child->location,'is_active'=>$child->is_active,'opens_blank'=>$child->opens_blank]) }}"
                                        class="text-xs text-mangrove-accent font-semibold hover:underline">Edit</button>
                                    <form method="POST" action="{{ route('navigation.destroy', $child) }}" class="inline"
                                        onsubmit="return confirm('Delete this nav item?')">
                                        @csrf @method('DELETE')
                                        <button class="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        @empty
                            <tr><td colspan="6" class="px-6 py-8 text-center text-sm text-mangrove-800/40">No header nav items yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        {{-- Footer links --}}
        <div x-show="tab === 'footer'" x-cloak>
            <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-mangrove-100 font-serif font-semibold text-mangrove-900">Footer Links</div>
                <table class="w-full text-sm">
                    <thead class="bg-mangrove-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Label</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">URL</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Order</th>
                            <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-mangrove-800/50">Active</th>
                            <th class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-mangrove-100">
                        @forelse($footerItems as $item)
                            <tr>
                                <td class="px-6 py-3 font-medium text-mangrove-900">{{ $item->label }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60 font-mono text-xs">{{ $item->href }}</td>
                                <td class="px-6 py-3 text-mangrove-800/60">{{ $item->order }}</td>
                                <td class="px-6 py-3">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs {{ $item->is_active ? 'bg-green-100 text-green-700' : 'bg-mangrove-100 text-mangrove-500' }}">
                                        {{ $item->is_active ? 'Active' : 'Hidden' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-right flex gap-2 justify-end">
                                    <button @click="editId = {{ $item->id }}; editData = {{ json_encode(['label'=>$item->label,'href'=>$item->href,'parent_id'=>$item->parent_id,'order'=>$item->order,'location'=>$item->location,'is_active'=>$item->is_active,'opens_blank'=>$item->opens_blank]) }}"
                                        class="text-xs text-mangrove-accent font-semibold hover:underline">Edit</button>
                                    <form method="POST" action="{{ route('navigation.destroy', $item) }}" class="inline"
                                        onsubmit="return confirm('Delete this footer link?')">
                                        @csrf @method('DELETE')
                                        <button class="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="5" class="px-6 py-8 text-center text-sm text-mangrove-800/40">No footer links yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        {{-- Add new item --}}
        <div class="bg-white border border-mangrove-100 rounded-2xl p-6 mb-6">
            <h3 class="font-serif font-semibold text-mangrove-900 mb-4">Add Nav Item</h3>
            <form method="POST" action="{{ route('navigation.store') }}" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                @csrf
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Label *</label>
                    <input name="label" required placeholder="e.g. About Us"
                        class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">URL / Href</label>
                    <input name="href" placeholder="/about"
                        class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Location *</label>
                    <select name="location" required class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent bg-white">
                        <option value="header">Header</option>
                        <option value="footer">Footer</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Parent (dropdown)</label>
                    <select name="parent_id" class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent bg-white">
                        <option value="">— top level —</option>
                        @foreach($allParents as $parent)
                            <option value="{{ $parent->id }}">{{ $parent->label }} ({{ $parent->location }})</option>
                        @endforeach
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Display Order</label>
                    <input name="order" type="number" value="0"
                        class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                </div>
                <div class="flex items-end gap-4 pb-0.5">
                    <label class="flex items-center gap-2 text-sm text-mangrove-900 cursor-pointer mt-auto pb-2.5">
                        <input type="hidden" name="is_active" value="0">
                        <input type="checkbox" name="is_active" value="1" checked class="rounded accent-mangrove-accent w-4 h-4">
                        Active
                    </label>
                    <label class="flex items-center gap-2 text-sm text-mangrove-900 cursor-pointer mt-auto pb-2.5">
                        <input type="hidden" name="opens_blank" value="0">
                        <input type="checkbox" name="opens_blank" value="1" class="rounded accent-mangrove-accent w-4 h-4">
                        Open in new tab
                    </label>
                </div>
                <div class="flex items-end sm:col-span-2 lg:col-span-1">
                    <button type="submit" class="w-full px-6 py-2.5 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800 transition-colors">
                        Add Item
                    </button>
                </div>
            </form>
        </div>

        {{-- Edit modal --}}
        <div x-show="editId !== null" x-cloak
            class="fixed inset-0 bg-mangrove-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                <h3 class="font-serif font-semibold text-mangrove-900 text-lg mb-5">Edit Nav Item</h3>
                <template x-if="editId !== null">
                    <form method="POST" :action="`/navigation/${editId}`" class="space-y-4">
                        @csrf
                        <input type="hidden" name="_method" value="PATCH">
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Label *</label>
                                <input name="label" :value="editData.label" required
                                    class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mangrove-accent">
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">URL / Href</label>
                                <input name="href" :value="editData.href"
                                    class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mangrove-accent">
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Location</label>
                                <select name="location" class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                    <option value="header" :selected="editData.location === 'header'">Header</option>
                                    <option value="footer" :selected="editData.location === 'footer'">Footer</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Parent</label>
                                <select name="parent_id" class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-mangrove-accent">
                                    <option value="">— top level —</option>
                                    @foreach($allParents as $parent)
                                        <option value="{{ $parent->id }}" :selected="editData.parent_id == {{ $parent->id }}">{{ $parent->label }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-1.5">Order</label>
                                <input name="order" type="number" :value="editData.order"
                                    class="w-full border border-mangrove-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mangrove-accent">
                            </div>
                            <div class="flex items-end gap-4 pb-0.5">
                                <label class="flex items-center gap-2 text-sm cursor-pointer mt-auto pb-2.5">
                                    <input type="hidden" name="is_active" value="0">
                                    <input type="checkbox" name="is_active" value="1" :checked="editData.is_active" class="rounded accent-mangrove-accent w-4 h-4">
                                    Active
                                </label>
                                <label class="flex items-center gap-2 text-sm cursor-pointer mt-auto pb-2.5">
                                    <input type="hidden" name="opens_blank" value="0">
                                    <input type="checkbox" name="opens_blank" value="1" :checked="editData.opens_blank" class="rounded accent-mangrove-accent w-4 h-4">
                                    New tab
                                </label>
                            </div>
                        </div>
                        <div class="flex gap-3 pt-2">
                            <button type="submit" class="flex-1 py-2.5 bg-mangrove-900 text-mangrove-accent rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-800">
                                Save Changes
                            </button>
                            <button type="button" @click="editId = null"
                                class="flex-1 py-2.5 border border-mangrove-200 text-mangrove-900 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-mangrove-50">
                                Cancel
                            </button>
                        </div>
                    </form>
                </template>
            </div>
        </div>
    </div>
</x-app-layout>
