<button {{ $attributes->merge(['type' => 'submit', 'class' => 'w-full inline-flex items-center justify-center px-4 py-3.5 bg-mangrove-accent border border-transparent rounded-full font-semibold text-xs text-mangrove-900 uppercase tracking-widest hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-mangrove-accent focus:ring-offset-2 disabled:opacity-50']) }}>
    {{ $slot }}
</button>
