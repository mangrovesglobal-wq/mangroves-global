<x-app-layout>
    <x-slot name="header">
        <div>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900">Portfolio</h2>
            <p class="text-sm text-mangrove-800/50">{{ $projects->total() }} total projects &middot; Creative &rarr; Work grid</p>
        </div>
    </x-slot>

    @if (session('status'))
        <div class="mb-6 p-4 rounded-xl bg-mangrove-accent/20 text-mangrove-800 text-sm">
            {{ session('status') }}
        </div>
    @endif

    <div class="mb-6">
        <a href="{{ route('portfolio.create') }}" class="inline-flex px-6 py-3 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
            + New Project
        </a>
    </div>

    <div class="bg-white border border-mangrove-100 rounded-2xl overflow-hidden">
        @if ($projects->isEmpty())
            <div class="px-6 py-12 text-sm text-mangrove-800/50 text-center">
                No portfolio projects yet. Click "New Project" to add the first tile to the work grid.
            </div>
        @else
            <table class="w-full text-sm">
                <thead class="bg-mangrove-50 text-xs uppercase tracking-widest text-mangrove-800/50">
                    <tr>
                        <th class="px-6 py-3 text-left">Tile</th>
                        <th class="px-6 py-3 text-left">Title</th>
                        <th class="px-6 py-3 text-left">Category</th>
                        <th class="px-6 py-3 text-left">Column</th>
                        <th class="px-6 py-3 text-left">Order</th>
                        <th class="px-6 py-3 text-left">Hero</th>
                        <th class="px-6 py-3 text-left">Status</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-mangrove-100">
                    @foreach ($projects as $project)
                        <tr>
                            <td class="px-6 py-4">
                                @if ($project->image)
                                    <img src="{{ Storage::url($project->image) }}" alt="" class="w-12 h-12 rounded-lg object-cover border border-mangrove-100">
                                @else
                                    <div class="w-12 h-12 rounded-lg border border-mangrove-100 flex items-center justify-center text-[9px] uppercase tracking-wide text-mangrove-800/50"
                                         style="background:{{ ['ink' => '#141f1c', 'teal' => '#3a5951', 'gold' => '#d5ad75', 'sand' => '#ece5d8'][$project->tone] ?? '#f2f6f5' }}; color:{{ in_array($project->tone, ['gold','sand']) ? '#141f1c' : '#fff' }};">
                                        {{ $project->tone ?? '—' }}
                                    </div>
                                @endif
                            </td>
                            <td class="px-6 py-4">
                                <div class="font-medium text-mangrove-900">{{ $project->title }}</div>
                                <div class="text-xs text-mangrove-800/50 uppercase tracking-wide">{{ $project->shape }}</div>
                            </td>
                            <td class="px-6 py-4 text-mangrove-800">{{ $project->category }}</td>
                            <td class="px-6 py-4 text-mangrove-800/60">{{ $project->column_index + 1 }}</td>
                            <td class="px-6 py-4 text-mangrove-800/60">{{ $project->sort_order }}</td>
                            <td class="px-6 py-4">
                                @if ($project->feature_in_hero)
                                    <span class="text-xs px-3 py-1 rounded-full bg-mangrove-accent/20 text-mangrove-800">Floating</span>
                                @else
                                    <span class="text-xs text-mangrove-800/30">&mdash;</span>
                                @endif
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-xs px-3 py-1 rounded-full {{ $project->is_active ? 'bg-mangrove-accent/20 text-mangrove-800' : 'bg-mangrove-100 text-mangrove-800/60' }}">
                                    {{ $project->is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="{{ route('portfolio.edit', $project) }}" class="text-xs uppercase tracking-widest text-mangrove-accent hover:text-mangrove-900 mr-4">Edit</a>
                                <form method="POST" action="{{ route('portfolio.destroy', $project) }}" class="inline" onsubmit="return confirm('Delete this project? This cannot be undone.');">
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
        {{ $projects->links() }}
    </div>
</x-app-layout>
