<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Services</h2>
            <p class="text-sm text-mangrove-800/50">{{ $services->total() }} total services</p>
        </div>
    </x-slot>

    @if (session('status'))
        <div class="mb-6 p-4 rounded-xl bg-mangrove-accent/20 text-mangrove-800 text-sm">
            {{ session('status') }}
        </div>
    @endif

    <div class="mb-6">
        <a href="{{ route('services.create') }}" class="inline-flex px-6 py-3 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
            + New Service
        </a>
    </div>

    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
        @if ($services->isEmpty())
            <div class="px-6 py-12 text-sm text-mangrove-800/50 text-center">
                No services yet. Click "New Service" to create your first one.
            </div>
        @else
            <table class="w-full text-sm">
                <thead class="bg-mangrove-50 text-xs uppercase tracking-widest text-mangrove-800/50">
                    <tr>
                        <th class="px-6 py-3 text-left">Name</th>
                        <th class="px-6 py-3 text-left">Division</th>
                        <th class="px-6 py-3 text-left">Order</th>
                        <th class="px-6 py-3 text-left">Status</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-mangrove-100">
                    @foreach ($services as $service)
                        <tr>
                            <td class="px-6 py-4">
                                <div class="font-medium text-mangrove-900">{{ $service->name }}</div>
                                <div class="text-xs text-mangrove-800/50">/{{ $service->slug }}</div>
                            </td>
                            <td class="px-6 py-4 text-mangrove-800">{{ ucfirst($service->division) }}</td>
                            <td class="px-6 py-4 text-mangrove-800/60">{{ $service->sort_order }}</td>
                            <td class="px-6 py-4">
                                <span class="text-xs px-3 py-1 rounded-full {{ $service->is_active ? 'bg-mangrove-accent/20 text-mangrove-800' : 'bg-mangrove-100 text-mangrove-800/60' }}">
                                    {{ $service->is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="{{ route('services.edit', $service) }}" class="text-xs uppercase tracking-widest text-mangrove-accent hover:text-mangrove-900 mr-4">Edit</a>
                                <form method="POST" action="{{ route('services.destroy', $service) }}" class="inline" onsubmit="return confirm('Delete this service? This cannot be undone.');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-xs uppercase tracking-widest text-red-600 hover:text-red-800">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    <div class="mt-6">
        {{ $services->links() }}
    </div>
</x-app-layout>
