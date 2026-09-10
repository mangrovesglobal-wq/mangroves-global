<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Mangroves Global') }} — Admin</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans text-mangrove-900 antialiased bg-mangrove-50">
    <div class="flex min-h-screen">

        {{-- Sidebar --}}
        <aside class="w-64 bg-mangrove-900 min-h-screen text-white/80 hidden md:block shrink-0">
            <div class="p-6 border-b border-white/10">
                <a href="{{ route('dashboard') }}">
                    <img src="{{ asset('images/logo/mangroves-global-logo-badge.png') }}" class="h-10 w-auto" alt="Mangroves Global">
                </a>
            </div>
            <nav class="p-4 space-y-1 text-sm">
                <a href="{{ route('dashboard') }}"
                   class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('dashboard') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                    Dashboard
                </a>
                <a href="{{ route('quote-requests.index') }}"
                   class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('quote-requests.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                    Quote Requests
                </a>
                <a href="{{ route('blog-posts.index') }}"
                   class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('blog-posts.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                    Blog Posts
                </a>
                <a href="{{ route('services.index') }}"
                   class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('services.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                    Services
                </a>
                <span class="block px-4 py-2.5 rounded-lg text-white/40 cursor-not-allowed">Settings</span>
            </nav>
            <div class="p-4 mt-auto border-t border-white/10 absolute bottom-0 w-64">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full text-left px-4 py-2.5 rounded-lg text-sm hover:bg-white/5">
                        Log Out
                    </button>
                </form>
            </div>
        </aside>

        {{-- Main content --}}
        <div class="flex-1">
            @if (isset($header))
                <header class="px-8 pt-8 flex items-center justify-between">
                    {{ $header }}
                    <div class="w-9 h-9 rounded-full bg-mangrove-accent flex items-center justify-center text-mangrove-900 text-sm font-semibold">
                        {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                    </div>
                </header>
            @endif

            <main class="p-8">
                {{ $slot }}
            </main>
        </div>
    </div>
</body>
</html>
