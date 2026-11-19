"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Sprout, ShieldCheck, FileText, Anchor } from "lucide-react";
import Reveal from "./Reveal";
import GroupAboutSection from "./GroupAboutSection";

const philosophy = [
  {
    icon: Sprout,
    title: "Direct Farm-Level Sourcing",
    desc: "Source closer to the farm to ensure absolute authenticity, origin purity, and complete lot traceability from harvest to export.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Quality Inspections",
    desc: "Verify quality before movement through structured multi-point inspections, grading, and laboratory analysis.",
  },
  {
    icon: FileText,
    title: "Disciplined Export Compliance",
    desc: "Manage trade documentation professionally for smooth customs clearance and strict global export compliance.",
  },
  {
    icon: Anchor,
    title: "End-to-End Delivery Integrity",
    desc: "Deliver with absolute commercial integrity from origin dispatch to destination port, offering flexible Incoterms.",
  },
];

export default function TradingAboutContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/5">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/trading">
              <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-14 sm:h-16 w-auto block" alt="Mangroves Global" />
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <Link href="/trading" className="hover:text-mangrove-900 transition-colors">Home</Link>
              <Link href="/trading/about" className="text-mangrove-900">About</Link>
              <Link href="/trading/commodities" className="hover:text-mangrove-900 transition-colors">Commodities</Link>
              <Link href="/trading/sourcing-supply" className="hover:text-mangrove-900 transition-colors">Sourcing &amp; Supply</Link>
              <Link href="/trading/quality-assurance" className="hover:text-mangrove-900 transition-colors">Quality Assurance</Link>
              <Link href="/trading/blog" className="hover:text-mangrove-900 transition-colors">Insights</Link>
              <Link href="/trading#contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 lg:hidden"></div>
          <Link
            href="/trading#contact"
            className="hidden lg:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
          >
            <span>Trade Inquiry</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden mr-6 text-mangrove-900 focus:outline-none" aria-label="Open menu">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-60 flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-mangrove-900" aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/trading/about" onClick={() => setMobileMenuOpen(false)} className="text-mangrove-accent">About Us</Link>
          <Link href="/trading/commodities" onClick={() => setMobileMenuOpen(false)}>Commodities</Link>
          <Link href="/trading/sourcing-supply" onClick={() => setMobileMenuOpen(false)}>Sourcing &amp; Supply</Link>
          <Link href="/trading/quality-assurance" onClick={() => setMobileMenuOpen(false)}>Quality Assurance</Link>
          <Link href="/trading/blog" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
          <Link href="/trading#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <main className="pt-20 sm:pt-24">

        {/* Group-level section — generic across all divisions */}
        <GroupAboutSection currentDivision="trading" />

        {/* Gold divider — "Trading Division" label extends outward on scroll */}
        <div className="px-6 lg:px-16 py-6 bg-white">
          <Reveal>
            <div className="max-w-7xl mx-auto flex items-center gap-5">
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill" />
              <span className="text-mangrove-accent text-[11px] uppercase tracking-[0.3em] font-semibold whitespace-nowrap shrink-0">
                Trading Division
              </span>
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill-right" />
            </div>
          </Reveal>
        </div>

        {/* Division-specific about content */}
        <div className="pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Trading</Link>
            <span>/</span>
            <span className="text-mangrove-900">About</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block">
                About The Company
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight">
                Connecting Farmlands to UAE &amp; GCC Trade Gateways.
              </h1>
              <p className="text-mangrove-800/70 leading-relaxed text-sm sm:text-base">
                Mangroves Global Trading FZ LLC was established to bridge UAE and GCC buyers directly with authentic Indian agricultural origins. Headquartered in the UAE—one of the world&apos;s most strategic trade hubs—and backed by deep agricultural roots in India, we ensure transparent, efficient, and seamless trade execution.
              </p>
              <div className="pt-4">
                <div className="flex items-center space-x-4 text-xs tracking-wider text-slate-300">
                  <div className="px-4 py-3 rounded-lg bg-mangrove-900">
                    <span className="block font-semibold text-mangrove-accent">Origin Sourcing</span>
                    <span className="text-slate-300">Kerala &amp; Pan-India</span>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-mangrove-900">
                    <span className="block font-semibold text-mangrove-accent">Commercial Gateway</span>
                    <span className="text-slate-300">Ras Al Khaimah, UAE</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-mangrove-100">
                <Image
                  src="/trading/images/premium-indian-spices-uae.jpg"
                  alt="Flat lay of premium Indian spices — cloves, dried chillies, turmeric, cardamom, cinnamon and cumin — sourced by Mangroves Global for UAE and GCC buyers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7 space-y-8">
              <h2 className="text-xl font-serif text-mangrove-900 mb-6 border-b border-mangrove-100 pb-4">
                Our Core Operating Philosophy
              </h2>
              <div className="space-y-6">
                {philosophy.map(({ icon: Icon, title, desc }, i) => (
                  <Reveal
                    key={title}
                    delay={i * 70}
                    className="p-8 rounded-2xl bg-mangrove-50 border-2 border-mangrove-100 hover:bg-mangrove-900 hover:border-mangrove-900 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 rounded-xl bg-mangrove-900 text-mangrove-accent flex items-center justify-center shrink-0 group-hover:bg-mangrove-accent group-hover:text-mangrove-900 transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-mangrove-900 group-hover:text-white mb-2 transition-colors duration-300">{title}</h3>
                        <p className="text-mangrove-800/60 group-hover:text-slate-300 text-sm leading-relaxed transition-colors duration-300">{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Want to See What We Trade?</h3>
              <p className="text-slate-300 text-sm">Browse our export-grade commodity portfolio for UAE and GCC buyers.</p>
            </div>
            <Link href="/trading/commodities" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              View Commodities
            </Link>
          </Reveal>
        </div>
        </div>
      </main>

      <footer className="bg-mangrove-accent text-mangrove-900/80 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image src="/images/logo/mangroves-global-logo-wordmark.png" width={1200} height={289} className="h-6 sm:h-7 w-auto block" alt="Mangroves Global" />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-900 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-900 transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
