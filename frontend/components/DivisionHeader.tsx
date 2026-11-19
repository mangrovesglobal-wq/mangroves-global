"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { buildSocialItems } from "@/lib/socialItems";
import { useSocialLinks } from "@/lib/socialLinksContext";

/* ── Layout constants (must match SiteHeader) ─────────────── */
const SHIELD_W = 210;
const BAR_TOP  = 22;
const BAR_H    = 44;
const TOTAL_H  = 88;

/* ── Per-division nav config ──────────────────────────────── */
const NAV: Record<string, { left: [string, string][]; right: [string, string][] }> = {
  trading: {
    left: [
      ["Home",        "/trading"],
      ["About",       "/trading/about"],
      ["Commodities", "/trading/commodities"],
      ["Contact",     "/trading/contact"],
    ],
    right: [
      ["Sourcing & Supply",      "/trading/sourcing-supply"],
      ["Quality Assurance",      "/trading/quality-assurance"],
      ["Blog",                   "/trading/blog"],
      ["Explore Other Businesses", "/"],
    ],
  },
  logistics: {
    left: [
      ["Home",    "/logistics"],
      ["About",   "/logistics/about"],
      ["Services","/logistics"],
      ["Contact", "/logistics"],
    ],
    right: [
      ["Import & Export",         "/logistics/import-export"],
      ["Blog",                    "/logistics/blog"],
      ["Explore Other Businesses","/"],
    ],
  },
  creative: {
    left: [
      ["Home",      "/creative"],
      ["About",     "/creative/about"],
      ["Services",  "/creative/services"],
      ["Portfolio", "/creative/work"],
    ],
    right: [
      ["Blog",                    "/creative/blog"],
      ["Contact",                 "/creative/contact"],
      ["Explore Other Businesses","/"],
    ],
  },
};

type Division = "trading" | "logistics" | "creative";
type Props = { division: Division };

export default function DivisionHeader({ division }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cfg = NAV[division];
  const socialLinks = useSocialLinks();
  const socialItems = buildSocialItems(socialLinks);
  const allLinks = [...cfg.left, ...cfg.right];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50" style={{ height: TOTAL_H }}>

        {/* Gold bar */}
        <div className="absolute inset-x-0 bg-mangrove-accent" style={{ top: BAR_TOP, height: BAR_H }}>

          {/* Desktop */}
          <div className="hidden lg:flex h-full max-w-screen-2xl mx-auto">
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {cfg.left.map(([label, href]) => (
                <NavLink key={label} href={href}>{label}</NavLink>
              ))}
            </nav>
            <div style={{ width: SHIELD_W, flexShrink: 0 }} />
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {cfg.right.map(([label, href]) => (
                <NavLink key={label} href={href}>{label}</NavLink>
              ))}
            </nav>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex h-full items-center justify-end px-5">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="relative flex flex-col justify-center items-center w-9 h-9 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute block h-0.5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>

        {/* Shield */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 bg-mangrove-900 flex items-center justify-center group"
          style={{ top: 0, height: TOTAL_H, width: SHIELD_W, clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)", zIndex: 1 }}
        >
          <Image
            src="/images/logo/mangroves-global-logo-badge.png"
            width={898} height={900}
            className="h-17.5 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-95"
            alt="Mangroves Global"
            priority
          />
        </Link>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden
        className={`fixed inset-0 z-59 bg-mangrove-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Fixed vertical social strip — desktop only, mid-left */}
      <div className="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 flex-col gap-2.5 z-40">
        {socialItems.map((item) => (
          <a
            key={item.ariaLabel}
            href={item.href}
            aria-label={item.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-7 h-7 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.18)" }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: item.color }}
            />
            <img src={item.svgUrl} alt="" aria-hidden className="relative z-10 w-3.5 h-3.5" />
          </a>
        ))}
      </div>

      {/* Slide-in panel */}
      <aside
        className={`fixed top-0 right-0 h-full z-60 flex flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: "min(100vw, 340px)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-mangrove-100 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-10 w-auto" alt="Mangroves Global" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full text-mangrove-700 hover:bg-mangrove-50 transition-colors" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {allLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center justify-between px-6 py-4 font-serif text-xl text-mangrove-900 border-b border-mangrove-50 hover:bg-mangrove-50/60 hover:text-mangrove-accent hover:pl-9 transition-all duration-200"
            >
              {label}
              <span className="text-mangrove-300 text-base group-hover:text-mangrove-accent group-hover:translate-x-1 transition-all duration-200">→</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
      {children}
      <span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
    </Link>
  );
}
