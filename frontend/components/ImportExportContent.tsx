"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "./Reveal";

export default function ImportExportContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50" style={{ height: 88 }}>
        <div className="absolute inset-x-0 bg-mangrove-accent" style={{ top: 22, height: 44 }}>
          <div className="hidden lg:flex h-full max-w-screen-2xl mx-auto">
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Home","/logistics"],["About","/logistics#corridor"],["Services","/logistics#services"],["Contact","/logistics#contact"]].map(([l,h])=>(
                <Link key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <div style={{ width: 210, flexShrink: 0 }} />
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Import & Export","/logistics/import-export"],["Blog","/logistics/blog"],["Explore Other Businesses","/"]].map(([l,h])=>(
                <Link key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>
          <div className="lg:hidden flex h-full items-center justify-end px-5">
            <button onClick={() => setMobileMenuOpen((v) => !v)} className="relative flex flex-col justify-center items-center w-9 h-9 focus:outline-none" aria-label="Toggle menu">
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute block h-0.5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
        <Link href="/logistics" className="absolute left-1/2 -translate-x-1/2 bg-mangrove-900 flex items-center justify-center group" style={{ top: 0, height: 88, width: 210, clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)", zIndex: 1 }}>
          <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-17.5 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-95" alt="Mangroves Global" priority />
        </Link>
      </header>

      <div aria-hidden className={`fixed inset-0 z-59 bg-mangrove-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`fixed top-0 right-0 h-full z-60 flex flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} style={{ width: "min(100vw, 340px)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-mangrove-100 shrink-0">
          <Link href="/logistics" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-10 w-auto" alt="Mangroves Global" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full text-mangrove-700 hover:bg-mangrove-50 transition-colors" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {[["Home","/logistics"],["About","/logistics#corridor"],["Services","/logistics#services"],["Import & Export","/logistics/import-export"],["Blog","/logistics/blog"],["Contact","/logistics#contact"],["Explore Other Businesses","/"]].map(([label,href])=>(
            <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-between px-6 py-4 font-serif text-xl text-mangrove-900 border-b border-mangrove-50 hover:bg-mangrove-50/60 hover:text-mangrove-accent hover:pl-9 transition-all duration-200">
              {label}
              <span className="text-mangrove-300 text-base group-hover:text-mangrove-accent group-hover:translate-x-1 transition-all duration-200">→</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="pb-24">
        {/* HERO */}
        <section className="relative h-[86vh] min-h-150 sm:min-h-160 overflow-hidden">
          <Image
            src="/images/mangroves-global-import-export-dp-world-port.jpg"
            alt="Port terminal in Dubai with container cranes, trucks and the city skyline, representing Mangroves Global's import and export coordination across the UAE"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-mangrove-900/60" />
          <div className="hero-blob absolute -top-16 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-mangrove-accent/50" aria-hidden="true" />
          <div className="hero-blob b2 absolute bottom-0 right-0 w-80 h-80 sm:w-md sm:h-112 bg-mangrove-accent/35" aria-hidden="true" />

          <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-16 pt-32 sm:pt-36 pb-14 sm:pb-20">
            <div className="max-w-5xl mx-auto w-full">
              <nav className="reveal text-xs text-white/60 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
                <Link href="/logistics" className="hover:text-white transition-colors">Logistics</Link>
                <span>/</span>
                <span className="text-white">Import &amp; Export</span>
              </nav>

              <span className="reveal block text-mangrove-accent text-xs font-semibold uppercase tracking-widest" style={{ animationDelay: "80ms" }}>
                Import &amp; Export Coordination
              </span>
              <h1
                className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mt-3 mb-6 max-w-3xl"
                style={{ animationDelay: "160ms" }}
              >
                Moving Goods In and Out of the UAE
              </h1>
              <p className="reveal text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl" style={{ animationDelay: "240ms" }}>
                Whether you&apos;re bringing goods into the UAE or shipping out to the GCC and beyond, we coordinate the freight, documentation and customs steps in between — so one shipment doesn&apos;t mean five separate vendors.
              </p>
              <div className="reveal flex flex-wrap gap-4 mt-9" style={{ animationDelay: "320ms" }}>
                <Link
                  href="/logistics#contact"
                  className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
                >
                  Talk to Our Team
                </Link>
                <Link
                  href="#industries"
                  className="px-8 py-4 border border-white/40 text-white hover:bg-white/10 transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
                >
                  Who We Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 lg:px-16 pt-16">
          <Reveal>
          <article className="prose-mgt-light text-mangrove-800/80">
            <h2>Importing Into the UAE</h2>
            <p>
              Bringing goods into the UAE involves freight booking, import documentation, and customs clearance at the port or airport of entry. We coordinate this end to end through our <Link href="/logistics/sea-freight">sea freight</Link>, <Link href="/logistics/air-freight">air freight</Link> and <Link href="/logistics/customs-clearance">customs clearance</Link> partner networks, matching the mode and route to your cargo and timeline, then handing off to <Link href="/logistics/warehousing-3pl">warehousing</Link> or <Link href="/logistics/road-transport">onward transport</Link> as needed.
            </p>

            <h2>Exporting From the UAE</h2>
            <p>
              For goods moving out of the UAE — to the GCC, to origin markets, or further afield — we coordinate export documentation, freight booking and customs formalities on the outbound side, through the same partner network used for imports.
            </p>

            <h2>Why Coordinate Through One Point</h2>
            <p>
              Import and export shipments usually touch several specialists — a freight forwarder, a customs broker, sometimes a warehouse or inland transporter. Coordinating all of it through one point of contact means fewer handoffs, and one place to get a status update instead of chasing multiple vendors.
            </p>

            <h2>What We Don&apos;t Do</h2>
            <p>
              We don&apos;t operate our own customs brokerage, fleet or bonded warehouse. Every shipment is coordinated through appropriately licensed partners — we handle the planning and the single point of contact, not the physical movement itself.
            </p>
          </article>
          </Reveal>

          <div id="industries" className="mt-12 pt-12 border-t border-mangrove-100 scroll-mt-28">
            <Reveal>
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold block mb-3">Industries We Support</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mangrove-900 mb-6">
                Who We Coordinate Import &amp; Export For
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Food & Spices", "Agriculture & Commodities", "Textiles & Garments", "Furniture", "Building Materials", "Consumer Products"].map((ind, i) => (
                <Reveal key={ind} delay={(i % 6) * 60} className="p-5 rounded-xl border border-mangrove-100 bg-mangrove-50 text-sm font-medium text-mangrove-900 text-center">
                  {ind}
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {["Import & export coordination", "Customs documentation support", "Single point of contact", "UAE, GCC & India corridor coverage"].map((item, i) => (
              <Reveal key={item} delay={(i % 4) * 60} className="flex items-start gap-3 p-4 rounded-xl bg-mangrove-50 border border-mangrove-100">
                <Check className="w-5 h-5 text-mangrove-accent shrink-0 mt-0.5" />
                <span className="text-sm text-mangrove-800">{item}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-50 border border-mangrove-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-mangrove-900 mb-2">Planning an Import or Export Shipment?</h3>
              <p className="text-mangrove-800/60 text-sm">Tell us the direction, cargo and timeline, and we&apos;ll coordinate the rest.</p>
            </div>
            <Link href="/logistics#contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Talk to Our Team
            </Link>
          </Reveal>
        </div>
      </main>

      <footer className="bg-mangrove-900 text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image src="/images/logo/mangroves-global-logo-wordmark.png" width={1200} height={289} className="h-6 sm:h-7 w-auto block" alt="Mangroves Global" />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
