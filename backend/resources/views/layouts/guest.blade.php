<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Mangroves Global') }} — Admin</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans text-mangrove-900 antialiased">
    <div class="min-h-screen flex flex-col items-center pt-10 sm:justify-center sm:pt-0 bg-mangrove-50">
        <div class="mb-6">
            <a href="/">
                <img src="{{ asset('images/logo/mangroves-global-logo-badge.png') }}" class="h-16 w-auto" alt="Mangroves Global">
            </a>
        </div>

        <div class="w-full sm:max-w-md mt-2 px-8 py-8 bg-white border border-mangrove-100 rounded-3xl shadow-sm">
            <h1 class="font-serif text-2xl font-semibold text-mangrove-900 mb-1 text-center">Admin Login</h1>
            <p class="text-sm text-mangrove-800/50 text-center mb-8">Mangroves Global Content Management</p>

            {{ $slot }}
        </div>
    </div>
</body>
</html>
