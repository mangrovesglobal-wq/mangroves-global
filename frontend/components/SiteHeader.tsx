"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Layout constants (tweak here) ───────────────────────── */
const SHIELD_W = 210;   // px — trapezoid width at top
const BAR_TOP  = 22;    // px — gold bar starts
const BAR_H    = 44;    // px — gold bar height
const TOTAL_H  = 88;    // px — full header height

const LEFT_NAV  = [
  { label: "Trading",   href: "/trading" },
  { label: "Logistics", href: "/logistics" },
  { label: "Creative",  href: "/creative" },
];


type Props = { transparent?: boolean };

export default function SiteHeader({ transparent: _t = false }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ════════════════════════ HEADER ════════════════════════ */}
      <header className="fixed top-0 left-0 w-full z-50" style={{ height: TOTAL_H }}>

        {/* ── Gold bar ─────────────────────────────────────────── */}
        <div
          className="absolute inset-x-0 bg-mangrove-accent"
          style={{ top: BAR_TOP, height: BAR_H }}
        >
          {/* Desktop layout */}
          <div className="hidden lg:flex h-full max-w-screen-2xl mx-auto">

            {/* LEFT — division links */}
            <nav className="flex-1 flex items-center justify-evenly px-6 xl:px-12">
              {LEFT_NAV.map((l) => (
                <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
              ))}
            </nav>

            {/* center spacer — same width as the shield so links never go behind it */}
            <div style={{ width: SHIELD_W, flexShrink: 0 }} />

            {/* RIGHT — site links */}
            <nav className="flex-1 flex items-center justify-evenly px-6 xl:px-12">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/become-a-partner">Partner with Us</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
          </div>

          {/* Mobile: animated hamburger right side */}
          <div className="lg:hidden flex h-full items-center justify-end px-5">
            <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </div>

        {/* ── Trapezoid shield ─────────────────────────────────── */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 bg-mangrove-900 flex items-center justify-center group"
          style={{
            top:      0,
            height:   TOTAL_H,
            width:    SHIELD_W,
            clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)",
            zIndex:   1,
          }}
        >
          <Image
            src="/images/logo/mangroves-global-logo-badge.png"
            width={898}
            height={900}
            className="h-17.5 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-95"
            alt="Mangroves Global"
            priority
          />
        </Link>

      </header>


      {/* ════════════════════════ MOBILE MENU ════════════════════════ */}

      {/* Backdrop — fades in */}
      <div
        aria-hidden
        className={`fixed inset-0 z-59 bg-mangrove-900/40 backdrop-blur-sm transition-opacity duration-400 ease-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Panel — slides in from the right */}
      <aside
        className={`fixed top-0 right-0 h-full z-60 flex flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "min(100vw, 340px)" }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-mangrove-100 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo/mangroves-global-logo-badge.png"
              width={898} height={900}
              className="h-10 w-auto"
              alt="Mangroves Global"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-mangrove-700 hover:bg-mangrove-50 hover:text-mangrove-900 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2">

          {[
            { label: "Trading",        href: "/trading" },
            { label: "Logistics",      href: "/logistics" },
            { label: "Creative",       href: "/creative" },
            { label: "About Us",       href: "/about" },
            { label: "Partner with Us", href: "/become-a-partner" },
            { label: "Contact",        href: "/contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center justify-between px-6 py-4 font-serif text-xl text-mangrove-900 border-b border-mangrove-50 hover:bg-mangrove-50/60 hover:text-mangrove-accent hover:pl-9 transition-all duration-200"
            >
              {item.label}
              <span className="text-mangrove-300 text-base group-hover:text-mangrove-accent group-hover:translate-x-1 transition-all duration-200">
                →
              </span>
            </Link>
          ))}

          {/* CTA */}
          <div className="px-6 pt-6 pb-2">
            <Link
              href="/become-a-partner"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-6 py-3.5 bg-mangrove-900 text-mangrove-accent text-[11px] tracking-widest font-bold uppercase rounded-full hover:bg-mangrove-800 active:scale-95 transition-all duration-200"
            >
              Become a Supplier Partner
            </Link>
          </div>

        </nav>
      </aside>
    </>
  );
}


/* ── Shared sub-components ───────────────────────────────── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
      {children}
      {/* animated underline */}
      <span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 ease-out group-hover:w-full" />
    </Link>
  );
}

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col justify-center items-center w-9 h-9 focus:outline-none"
      aria-label="Toggle menu"
    >
      <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ease-out ${open ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`} />
      <span className={`absolute block h-0.5 bg-mangrove-900 rounded-full transition-all duration-300 ease-out ${open ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
      <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ease-out ${open ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`} />
    </button>
  );
}
