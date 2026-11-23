<x-app-layout>
    <x-slot name="header">
        <div>
            <a href="{{ route('portfolio.index') }}" class="text-xs uppercase tracking-widest text-mangrove-accent">&larr; Back to Portfolio</a>
            <h2 class="font-serif text-2xl font-semibold text-mangrove-900 mt-2">Edit Portfolio Project</h2>
        </div>
    </x-slot>

    @if ($errors->any())
        <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
            <ul class="list-disc pl-5">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('portfolio.update', $project) }}" enctype="multipart/form-data" class="space-y-6">
        @csrf
        @method('PUT')
        @include('portfolio._form', ['project' => $project])

        <button type="submit" class="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
            Save Changes
        </button>
    </form>
</x-app-layout>
