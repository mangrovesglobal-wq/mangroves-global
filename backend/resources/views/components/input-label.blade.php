@props(['value'])

<label {{ $attributes->merge(['class' => 'block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2']) }}>
    {{ $value ?? $slot }}
</label>
