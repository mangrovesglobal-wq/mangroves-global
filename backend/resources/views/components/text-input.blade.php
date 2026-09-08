@props(['disabled' => false])

<input @disabled($disabled) {{ $attributes->merge(['class' => 'border-mangrove-100 focus:border-mangrove-accent focus:ring-mangrove-accent rounded-xl shadow-sm w-full text-sm']) }}>
