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
        <aside class="w-64 bg-mangrove-900 shrink-0 text-white/80 hidden md:block"
               style="height:100vh; position:sticky; top:0;">
            <div style="display:flex; flex-direction:column; height:100%;">

                {{-- Logo --}}
                <div class="p-6 border-b border-white/10" style="flex-shrink:0;">
                    <a href="{{ route('dashboard') }}">
                        <img src="{{ asset('images/logo/mangroves-global-logo-badge.png') }}" class="h-10 w-auto" alt="Mangroves Global">
                    </a>
                </div>

                {{-- Scrollable nav --}}
                <nav class="p-4 space-y-5 text-sm" style="flex:1; overflow-y:auto;">

                    <a href="{{ route('dashboard') }}"
                       class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('dashboard') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                        Dashboard
                    </a>

                    {{-- Site --}}
                    <div>
                        <div class="px-4 pb-1 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Site</div>
                        <div class="space-y-0.5">
                            <a href="{{ route('site-settings.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('site-settings.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Site Settings
                            </a>
                            <a href="{{ route('navigation.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('navigation.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Navigation
                            </a>
                            <a href="{{ route('page-contents.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('page-contents.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Page Content
                            </a>
                        </div>
                    </div>

                    {{-- Content --}}
                    <div>
                        <div class="px-4 pb-1 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Content</div>
                        <div class="space-y-0.5">
                            <a href="{{ route('blog-posts.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('blog-posts.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Blog Posts
                            </a>
                            <a href="{{ route('services.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('services.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Services
                            </a>
                            <a href="{{ route('portfolio.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('portfolio.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Portfolio
                            </a>
                            <a href="{{ route('media.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('media.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Media Library
                            </a>
                        </div>
                    </div>

                    {{-- SEO --}}
                    <div>
                        <div class="px-4 pb-1 text-[10px] uppercase tracking-widest text-white/30 font-semibold">SEO</div>
                        <div class="space-y-0.5">
                            <a href="{{ route('seo.overview') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('seo.overview') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                SEO Overview
                            </a>
                            <a href="{{ route('seo.integrations') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('seo.integrations*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Integrations
                            </a>
                            <a href="{{ route('seo.redirects') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('seo.redirects*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Redirects
                            </a>
                        </div>
                    </div>

                    {{-- Enquiries --}}
                    <div>
                        <div class="px-4 pb-1 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Enquiries</div>
                        <div class="space-y-0.5">
                            <a href="{{ route('quote-requests.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('quote-requests.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Quote Requests
                            </a>
                            <a href="{{ route('supplier-partnership.index') }}"
                               class="block px-4 py-2.5 rounded-lg {{ request()->routeIs('supplier-partnership.*') ? 'bg-mangrove-accent text-mangrove-900 font-semibold' : 'hover:bg-white/5' }}">
                                Supplier Enquiries
                            </a>
                        </div>
                    </div>

                </nav>

                {{-- Logout — always at the bottom --}}
                <div class="p-4 border-t border-white/10" style="flex-shrink:0;">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="w-full text-left px-4 py-2.5 rounded-lg text-sm hover:bg-white/5">
                            Log Out
                        </button>
                    </form>
                </div>

            </div>
        </aside>

        {{-- Main content --}}
        <div class="flex-1 min-w-0">
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

    {{-- ── Claude AI Assistant (full-height side panel, overlays page) ── --}}
    <style>
        /* Floating trigger button */
        #ai-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9998;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.20);
            transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        #ai-btn:hover  { transform: scale(1.08); box-shadow: 0 8px 28px rgba(0,0,0,0.26); }
        #ai-btn:active { transform: scale(0.95); }

        /* Backdrop — click to close */
        #ai-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9998;
            background: rgba(0,0,0,0.28);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        #ai-backdrop.ai-open { opacity: 1; pointer-events: auto; }

        /* Side panel — slides in from the right, full height */
        #ai-panel {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 380px;
            max-width: 100vw;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            background: #fff;
            box-shadow: -6px 0 40px rgba(0,0,0,0.14);
            transform: translateX(100%);
            transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #ai-panel.ai-open { transform: translateX(0); }

        #ai-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        @keyframes ai-bounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-5px); }
        }
    </style>

    {{-- Backdrop (click to close) --}}
    <div id="ai-backdrop" onclick="aiToggle()"></div>

    {{-- Floating trigger button (hides when panel is open) --}}
    <button id="ai-btn" onclick="aiToggle()" title="Open AI Assistant"
            style="background: var(--color-mangrove-accent, #C8A96E); color: #1a2a1e;">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        </svg>
    </button>

    {{-- Full-height side panel --}}
    <div id="ai-panel" aria-hidden="true" aria-label="AI Assistant">

        {{-- Header --}}
        <div style="background:#1a2a1e; padding:14px 18px; display:flex; align-items:center; gap:12px; flex-shrink:0;">
            <div style="width:34px;height:34px;border-radius:50%;background:var(--color-mangrove-accent,#C8A96E);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1a2a1e" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
            </div>
            <div style="flex:1;">
                <div style="font-size:13px;font-weight:600;color:#fff;">AI Assistant</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.45);">Powered by Claude</div>
            </div>
            <button onclick="aiToggle()" aria-label="Close"
                    style="background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.4);padding:4px;border-radius:8px;display:flex;align-items:center;justify-content:center;"
                    onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        {{-- Messages --}}
        <div id="ai-messages">
            {{-- Welcome bubble --}}
            <div style="display:flex;gap:8px;align-items:flex-start;">
                <div style="width:26px;height:26px;border-radius:50%;background:rgba(200,169,110,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#C8A96E" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                    </svg>
                </div>
                <div style="background:#f7f6f3;border:1px solid #e8e3d8;border-radius:16px;border-top-left-radius:4px;padding:12px 14px;font-size:13px;color:#1a2a1e;line-height:1.6;max-width:88%;">
                    Hi! I can help you manage Mangroves Global.<br><br>
                    ✍️ Write blog posts<br>
                    🔍 Generate SEO metadata<br>
                    📧 Draft enquiry replies<br>
                    💡 Answer site questions
                </div>
            </div>
            {{-- Quick prompts --}}
            <div id="ai-qp" style="display:flex;flex-wrap:wrap;gap:6px;padding-left:34px;">
                <button onclick="aiQP(this,'Write a blog post about UAE spice import trends for the trading division')"
                        style="font-size:11px;padding:5px 10px;border-radius:20px;border:1px solid #e0d9cc;background:#fff;color:#3a4a3e;cursor:pointer;">
                    Spice export blog
                </button>
                <button onclick="aiQP(this,'Generate an SEO title and meta description for the logistics services page')"
                        style="font-size:11px;padding:5px 10px;border-radius:20px;border:1px solid #e0d9cc;background:#fff;color:#3a4a3e;cursor:pointer;">
                    SEO meta · Logistics
                </button>
                <button onclick="aiQP(this,'Draft a professional reply to a quote enquiry for black pepper export')"
                        style="font-size:11px;padding:5px 10px;border-radius:20px;border:1px solid #e0d9cc;background:#fff;color:#3a4a3e;cursor:pointer;">
                    Draft quote reply
                </button>
            </div>
        </div>

        {{-- Input bar --}}
        <div style="flex-shrink:0;padding:12px 14px;border-top:1px solid #ede9e1;background:#fff;">
            <div style="display:flex;gap:8px;align-items:flex-end;">
                <textarea id="ai-input" rows="1"
                          placeholder="Ask me anything…"
                          oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,100)+'px'"
                          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();aiSend()}"
                          style="flex:1;resize:none;border-radius:12px;border:1px solid #d9d2c5;padding:9px 13px;font-size:13px;color:#1a2a1e;font-family:inherit;line-height:1.5;overflow:hidden;outline:none;transition:border-color 0.15s;"
                          onfocus="this.style.borderColor='#C8A96E'" onblur="this.style.borderColor='#d9d2c5'"></textarea>
                <button id="ai-send-btn" onclick="aiSend()"
                        style="width:38px;height:38px;border-radius:10px;border:none;background:var(--color-mangrove-accent,#C8A96E);color:#1a2a1e;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;align-self:flex-end;transition:opacity 0.15s;">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5"/>
                    </svg>
                </button>
            </div>
            <p style="font-size:10px;color:rgba(26,42,30,0.3);text-align:center;margin:6px 0 0;">AI may make mistakes — verify important content.</p>
        </div>
    </div>

    <script>
    (function () {
        var hist    = [];
        var open    = false;
        var busy    = false;

        window.aiToggle = function () {
            open = !open;
            var panel    = document.getElementById('ai-panel');
            var backdrop = document.getElementById('ai-backdrop');
            var btn      = document.getElementById('ai-btn');
            if (open) {
                panel.classList.add('ai-open');
                backdrop.classList.add('ai-open');
                panel.setAttribute('aria-hidden', 'false');
                btn.style.opacity = '0';
                btn.style.pointerEvents = 'none';
                setTimeout(function () { document.getElementById('ai-input').focus(); }, 350);
            } else {
                panel.classList.remove('ai-open');
                backdrop.classList.remove('ai-open');
                panel.setAttribute('aria-hidden', 'true');
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }
        };

        window.aiQP = function (btn, text) {
            document.getElementById('ai-input').value = text;
            var qp = document.getElementById('ai-qp');
            if (qp) qp.style.display = 'none';
            document.getElementById('ai-input').focus();
        };

        window.aiSend = function () {
            if (busy) return;
            var inp = document.getElementById('ai-input');
            var msg = inp.value.trim();
            if (!msg) return;

            var qp = document.getElementById('ai-qp');
            if (qp) qp.style.display = 'none';

            addMsg('user', msg);
            hist.push({ role: 'user', content: msg });
            inp.value = '';
            inp.style.height = 'auto';

            var tid = addTyping();
            busy = true;
            document.getElementById('ai-send-btn').style.opacity = '0.45';

            fetch('{{ route("ai.chat") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ message: msg, history: hist.slice(-12) }),
            })
            .then(function (r) { return r.json(); })
            .then(function (d) {
                rmTyping(tid);
                var reply = d.reply || d.error || 'Something went wrong. Please try again.';
                addMsg('ai', reply);
                if (d.reply) hist.push({ role: 'assistant', content: d.reply });
            })
            .catch(function () {
                rmTyping(tid);
                addMsg('ai', 'Connection error — please try again.');
            })
            .finally(function () {
                busy = false;
                document.getElementById('ai-send-btn').style.opacity = '1';
            });
        };

        function addMsg(role, text) {
            var box = document.getElementById('ai-messages');
            var row = document.createElement('div');
            var safe = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');

            if (role === 'ai') {
                row.style.cssText = 'display:flex;gap:8px;align-items:flex-start;';
                row.innerHTML =
                    '<div style="width:26px;height:26px;border-radius:50%;background:rgba(200,169,110,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">' +
                        '<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#C8A96E" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>' +
                    '</div>' +
                    '<div style="background:#f7f6f3;border:1px solid #e8e3d8;border-radius:16px;border-top-left-radius:4px;padding:10px 13px;font-size:13px;color:#1a2a1e;line-height:1.6;max-width:88%;overflow-x:auto;">' + safe + '</div>';
            } else {
                row.style.cssText = 'display:flex;justify-content:flex-end;';
                row.innerHTML =
                    '<div style="background:var(--color-mangrove-accent,#C8A96E);border-radius:16px;border-top-right-radius:4px;padding:10px 13px;font-size:13px;color:#1a2a1e;line-height:1.6;max-width:88%;">' + safe + '</div>';
            }
            box.appendChild(row);
            box.scrollTop = box.scrollHeight;
        }

        function addTyping() {
            var id  = 'ai-t-' + Date.now();
            var box = document.getElementById('ai-messages');
            var row = document.createElement('div');
            row.id  = id;
            row.style.cssText = 'display:flex;gap:8px;align-items:flex-start;';
            row.innerHTML =
                '<div style="width:26px;height:26px;border-radius:50%;background:rgba(200,169,110,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">' +
                    '<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#C8A96E" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>' +
                '</div>' +
                '<div style="background:#f7f6f3;border:1px solid #e8e3d8;border-radius:16px;border-top-left-radius:4px;padding:10px 14px;display:flex;gap:4px;align-items:center;">' +
                    '<span style="width:6px;height:6px;border-radius:50%;background:#C8A96E;display:inline-block;animation:ai-bounce 1s infinite 0ms;"></span>' +
                    '<span style="width:6px;height:6px;border-radius:50%;background:#C8A96E;display:inline-block;animation:ai-bounce 1s infinite 150ms;"></span>' +
                    '<span style="width:6px;height:6px;border-radius:50%;background:#C8A96E;display:inline-block;animation:ai-bounce 1s infinite 300ms;"></span>' +
                '</div>';
            box.appendChild(row);
            box.scrollTop = box.scrollHeight;
            return id;
        }

        function rmTyping(id) {
            var el = document.getElementById(id);
            if (el) el.remove();
        }
    })();
    </script>
</body>
</html>
