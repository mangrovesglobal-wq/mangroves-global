"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Check } from "lucide-react";

export default function BrandingContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/5">
        <div className="relative flex items-center h-20 sm:h-24">
          <div className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16" style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}>
            <Link href="/creative">
              <Image src="/images/logo/mangroves-global-logo-badge.png" width={64} height={64} className="h-14 sm:h-16 w-auto block" alt="Mangroves Global" />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <Link href="/creative#services" className="hover:text-mangrove-900 transition-colors">Services</Link>
              <Link href="/creative#work" className="hover:text-mangrove-900 transition-colors">Work</Link>
              <Link href="/creative#industries" className="hover:text-mangrove-900 transition-colors">Industries</Link>
              <Link href="/creative#contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>
          <Link href="/" className="hidden lg:inline-flex items-center mr-4 text-[11px] tracking-widest font-semibold uppercase text-mangrove-900/70 hover:text-mangrove-900">
            Explore Other Businesses
          </Link>
          <Link href="/creative#contact" className="hidden md:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase">
            <span>Build Your Brand</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden mr-6 text-mangrove-900 focus:outline-none" aria-label="Open menu">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[60] flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-mangrove-900" aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <Link href="/creative#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/creative#work" onClick={() => setMobileMenuOpen(false)}>Work</Link>
          <Link href="/creative#industries" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
          <Link href="/creative#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <main className="pt-32 sm:pt-36 pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/creative" className="hover:text-mangrove-accent transition-colors">Creative</Link>
            <span>/</span>
            <span className="text-mangrove-900">Branding &amp; Creative</span>
          </nav>

          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">Branding &amp; Creative</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight mb-6">
            Brand Identity Agency UAE
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-12 max-w-3xl">
            Brand strategy, naming, visual identity and packaging design — building a brand that holds together across every touchpoint, not just a logo.
          </p>

          <article className="prose-mgt-light text-mangrove-800/80">
            <h2>What We Offer</h2>
            <ul>
              <li><strong>Brand strategy</strong> — positioning, tone of voice and brand foundations before any design work starts.</li>
              <li><strong>Naming</strong> — naming projects for new businesses, products or sub-brands.</li>
              <li><strong>Brand identity &amp; visual identity</strong> — logo, colour system, typography and visual language.</li>
              <li><strong>Packaging design</strong> — packaging that reflects brand identity and works commercially on shelf or online.</li>
              <li><strong>Creative direction</strong> — ongoing creative oversight to keep a brand consistent as it grows.</li>
            </ul>

            <h2>Who This Is For</h2>
            <p>
              New businesses building a brand from scratch, and established businesses whose visual identity no longer matches where the business actually is.
            </p>
          </article>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {["Brand strategy before design", "Full visual identity systems", "Packaging design", "Ongoing creative direction"].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-mangrove-50 border border-mangrove-100">
                <Check className="w-5 h-5 text-mangrove-accent shrink-0 mt-0.5" />
                <span className="text-sm text-mangrove-800">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-50 border border-mangrove-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-mangrove-900 mb-2">Build Your Brand</h3>
              <p className="text-mangrove-800/60 text-sm">Tell us about your business and where the brand needs to go.</p>
            </div>
            <Link href="/creative#contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Build Your Brand
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-mangrove-900 text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image src="/images/logo/mangroves-global-logo-wordmark.png" width={140} height={28} className="h-6 sm:h-7 w-auto block" alt="Mangroves Global" />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
