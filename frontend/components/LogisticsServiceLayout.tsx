"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight, ChevronDown, Check, ArrowRight,
} from "lucide-react";
import ServiceHeroImage from "./ServiceHeroImage";
import ServiceIcon from "./ServiceIcon";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ContentBlock = {
  heading: string;
  content: string;
};

export type HeroImage = {
  src: string;
  alt: string;
  remote: boolean;
};

export type ServiceStat = {
  value: string;
  label: string;
};

export type ProcessStep = {
  label: string;
  icon?: string; // emoji or short text
};

export type RelatedService = {
  name: string;
  href: string;
};

export type LogisticsServiceConfig = {
  serviceName: string;
  breadcrumbLabel: string;
  heroHeadline: string;
  heroSubheadline?: string;
  highlights: string[];
  stats: ServiceStat[];
  processSteps: ProcessStep[];
  relatedServices: RelatedService[];
  fallbackHeroPath: string;
  quoteLabel: string;
};

type Props = {
  config: LogisticsServiceConfig;
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionBlock({ heading, content, defaultOpen }: { heading: string; content: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-mangrove-100 rounded-2xl overflow-hidden mb-3 transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-mangrove-50 transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="font-serif font-semibold text-base sm:text-lg text-mangrove-900">{heading}</span>
        <ChevronDown
          className={`w-5 h-5 text-mangrove-accent shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={bodyRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? (bodyRef.current?.scrollHeight ?? 1000) : 0 }}
      >
        <div
          className="px-6 pb-6 pt-1 prose-mgt-light text-mangrove-800/80 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

// ─── Process step ─────────────────────────────────────────────────────────────

function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative">
      {/* Desktop */}
      <div className="hidden sm:flex items-start justify-between gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col items-center w-full">
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-mangrove-accent flex items-center justify-center shadow-lg shadow-mangrove-accent/30 z-10">
                  <span className="text-mangrove-900 font-bold text-sm">{i + 1}</span>
                </div>
                {/* Line to next */}
                {i < steps.length - 1 && (
                  <div className="absolute top-6 left-12 w-[calc(100%-0px)] h-0.5 bg-mangrove-100">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-mangrove-accent/40" />
                  </div>
                )}
              </div>
              <span className="mt-3 text-xs font-semibold text-mangrove-900 text-center px-1 leading-tight">{step.label}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1" />}
          </div>
        ))}
      </div>

      {/* Mobile vertical */}
      <div className="flex flex-col gap-0 sm:hidden">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-mangrove-accent flex items-center justify-center shadow-md shadow-mangrove-accent/30 z-10 shrink-0">
                <span className="text-mangrove-900 font-bold text-xs">{i + 1}</span>
              </div>
              {i < steps.length - 1 && <div className="w-0.5 h-6 bg-mangrove-100 my-1" />}
            </div>
            <span className="text-sm font-semibold text-mangrove-900 mt-1.5">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main layout ─────────────────────────────────────────────────────────────

export default function LogisticsServiceLayout({ config, introText, blocks, heroImage, icon }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroSrc = heroImage?.src ?? config.fallbackHeroPath;
  const heroRemote = heroImage?.remote ?? false;
  const heroAlt = heroImage?.alt ?? `${config.serviceName} — Mangroves Global Logistics`;

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">

      {/* ── Fixed Header ─────────────────────────────────────────────────── */}
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

      {/* Mobile drawer */}
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

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {heroImage ? (
            <ServiceHeroImage src={heroSrc} alt={heroAlt} remote={heroRemote} />
          ) : (
            <Image
              src={config.fallbackHeroPath}
              alt={heroAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          {/* Gradient overlay — dark at bottom, transparent top */}
          <div className="absolute inset-0 bg-linear-to-t from-mangrove-900 via-mangrove-900/70 to-mangrove-900/20" />
          {/* Gold atmospheric glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
            style={{ background: "radial-gradient(ellipse at 30% 100%, #d5ad75 0%, transparent 70%)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 lg:px-16 pb-16 sm:pb-20 pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/logistics" className="hover:text-mangrove-accent transition-colors">Logistics</Link>
            <span>/</span>
            <span className="text-white/70">{config.breadcrumbLabel}</span>
          </nav>

          {/* Badge */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-full bg-mangrove-accent/20 border border-mangrove-accent/40 flex items-center justify-center">
              <ServiceIcon name={icon} className="w-4 h-4 text-mangrove-accent" />
            </div>
            <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest">
              {config.serviceName}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-4 max-w-4xl">
            {config.heroHeadline}
          </h1>
          {config.heroSubheadline && (
            <p className="text-mangrove-accent text-lg sm:text-xl font-light mb-6">{config.heroSubheadline}</p>
          )}

          {/* Intro */}
          <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
            {introText}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/logistics#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
            >
              {config.quoteLabel}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#overview"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white hover:border-mangrove-accent hover:text-mangrove-accent transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase"
            >
              Learn More
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 hidden sm:flex flex-col items-center gap-1 opacity-40">
          <span className="text-[9px] text-white uppercase tracking-widest font-semibold">Scroll</span>
          <div className="w-px h-10 bg-white animate-pulse" />
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section id="overview" className="bg-mangrove-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {config.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-mangrove-accent leading-tight">
                  {stat.value}
                </div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="py-20 sm:py-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-14 xl:gap-20">

            {/* Left: Accordion blocks */}
            <div className="lg:col-span-2">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest">Service Detail</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-mangrove-900 font-semibold mt-2 mb-8">
                What We Coordinate
              </h2>

              {blocks.length > 0 ? (
                blocks.map((block, i) => (
                  <AccordionBlock
                    key={block.heading}
                    heading={block.heading}
                    content={block.content}
                    defaultOpen={i === 0}
                  />
                ))
              ) : (
                <p className="text-mangrove-800/60">Service details coming soon.</p>
              )}
            </div>

            {/* Right: Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 space-y-5">

                {/* CTA card */}
                <div className="bg-mangrove-900 text-white rounded-3xl p-7 sm:p-8">
                  <div className="w-10 h-10 rounded-full bg-mangrove-accent/15 border border-mangrove-accent/30 flex items-center justify-center mb-5">
                    <ArrowUpRight className="w-5 h-5 text-mangrove-accent" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-2">{config.quoteLabel}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Tell us your origin, destination, cargo type and timeline — we&apos;ll coordinate from there.
                  </p>
                  <Link
                    href="/logistics#contact"
                    className="block text-center px-6 py-3.5 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
                  >
                    Get in Touch →
                  </Link>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5">
                  {config.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 p-4 rounded-xl bg-mangrove-50 border border-mangrove-100 hover:border-mangrove-accent/40 transition-colors"
                    >
                      <Check className="w-4 h-4 text-mangrove-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-mangrove-800 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Related services */}
                {config.relatedServices.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white border border-mangrove-100">
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-mangrove-800/50 mb-4">
                      Other Logistics Services
                    </h4>
                    <div className="space-y-1">
                      {config.relatedServices.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-mangrove-50 group transition-colors"
                        >
                          <span className="text-sm text-mangrove-800 group-hover:text-mangrove-accent transition-colors">
                            {s.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-mangrove-800/30 group-hover:text-mangrove-accent group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Process flow ─────────────────────────────────────────────────── */}
      <section className="bg-mangrove-50 border-y border-mangrove-100 py-20 sm:py-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest">How It Works</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-mangrove-900 font-semibold mt-2">
              Your Shipment, Step by Step
            </h2>
          </div>
          <ProcessFlow steps={config.processSteps} />
        </div>
      </section>

      {/* ── Hero image (if available from CMS, show as full-width feature) ─ */}
      {heroImage && (
        <section className="relative h-72 sm:h-96 overflow-hidden">
          <ServiceHeroImage src={heroImage.src} alt={heroImage.alt} remote={heroImage.remote} />
          <div className="absolute inset-0 bg-mangrove-900/40 flex items-center justify-center">
            <p className="text-white/70 text-xs uppercase tracking-widest font-semibold">
              {config.serviceName} — Mangroves Global Logistics
            </p>
          </div>
        </section>
      )}

      {/* ── CTA section ──────────────────────────────────────────────────── */}
      <section className="bg-mangrove-900 py-24 sm:py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block text-mangrove-accent text-xs font-semibold uppercase tracking-widest mb-6">
            Ready to Move?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold mb-5 leading-tight">
            Let&apos;s Coordinate Your Shipment
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10">
            Share your cargo details and we&apos;ll handle the coordination — from first quote through to delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/logistics#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
            >
              {config.quoteLabel}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/logistics#services"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 text-white hover:border-mangrove-accent hover:text-mangrove-accent transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase"
            >
              All Logistics Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-mangrove-800 text-white/50 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image
            src="/images/logo/mangroves-global-logo-wordmark.png"
            width={140} height={28}
            className="h-6 sm:h-7 w-auto block"
            alt="Mangroves Global"
          />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
