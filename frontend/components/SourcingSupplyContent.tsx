"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Network, FileCheck, Truck } from "lucide-react";
import Reveal from "./Reveal";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SourcingSupplyContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="trading" />

      <main className="pt-22 pb-24">

        {/* ══════════════════════════════════════════════════════════════
            HERO — sticky left video, scrolling right text
        ══════════════════════════════════════════════════════════════ */}
        <section className="lg:flex lg:items-start border-b border-mangrove-100">

          {/* ── Left: sticky looping video ───────────────────────────── */}
          <div className="lg:w-[52%] lg:sticky lg:top-22 self-start">
            <div className="relative h-[56vw] lg:h-[calc(100vh-5rem)] overflow-hidden bg-mangrove-900">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                src="/videos/Motion_graphic_for_supply_network_20261021100502.mp4"
              />
              {/* Subtle edge vignette to blend into the page */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset -60px 0 60px -20px rgba(255,255,255,0.08)" }} />
            </div>
          </div>

          {/* ── Right: scrolling text blocks ─────────────────────────── */}
          <div className="lg:w-[48%]">

            {/* Block 1 — Page intro */}
            <div className="min-h-[100vh] flex flex-col justify-center px-8 lg:px-14 py-20 border-b border-mangrove-100">
              <Reveal className="space-y-6">
                <nav className="text-xs text-mangrove-800/45 flex items-center gap-2" aria-label="Breadcrumb">
                  <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Trading</Link>
                  <span>/</span>
                  <span className="text-mangrove-900/70">Sourcing &amp; Supply</span>
                </nav>
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.25em] block">
                  How We Source
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-mangrove-900 leading-[1.1]">
                  Rooted in Origin,<br />Connected to Market.
                </h1>
                <p className="text-mangrove-800/65 text-base sm:text-lg leading-relaxed max-w-md">
                  A short, traceable chain — from farm-gate aggregation in India&apos;s prime growing belts, through structured quality checks, to export-ready lots for UAE and GCC buyers.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/trading/commodities"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-mangrove-900 text-mangrove-accent hover:bg-mangrove-accent hover:text-mangrove-900 transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
                  >
                    View Commodities
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/trading#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-mangrove-900/20 text-mangrove-900 hover:border-mangrove-accent hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
                  >
                    Trade Inquiry
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Block 2 — Farm to Port */}
            <div className="min-h-[100vh] flex flex-col justify-center px-8 lg:px-14 py-20">
              <Reveal className="space-y-6">
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.25em] block">
                  01 — Farm
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-mangrove-900 leading-[1.1]">
                  Sourced Directly.<br />Farm To Port.
                </h2>
                <p className="text-mangrove-800/65 text-base leading-relaxed max-w-md">
                  Relationships with growers and farm-gate aggregators across Kerala, Tamil Nadu, Karnataka and beyond — not open-market resale. Every lot is traceable from harvest to shipment.
                </p>
                <div className="space-y-5 pt-2">
                  {[
                    { step: "01", label: "Farm Procurement",  desc: "Direct from growers and farm-gate aggregators across producing regions." },
                    { step: "02", label: "Quality Inspection", desc: "Multi-point checks on grade, moisture, and physical condition before dispatch." },
                    { step: "03", label: "Port Dispatch",      desc: "Export-ready, documented, and compliant for UAE and GCC import requirements." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <span className="text-mangrove-accent text-xs font-bold tracking-widest shrink-0 mt-0.5">{item.step}</span>
                      <div>
                        <span className="font-semibold text-mangrove-900 text-sm block">{item.label}</span>
                        <span className="text-mangrove-800/55 text-sm leading-relaxed">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/trading/commodities"
                  className="group inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors"
                >
                  Browse Commodities
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ── Divider 1 ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-16 py-5 bg-white">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">Supply Chain</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 — sticky RIGHT video, scrolling LEFT text
        ══════════════════════════════════════════════════════════════ */}
        <section className="lg:flex lg:flex-row-reverse lg:items-start border-b border-mangrove-100">

          {/* ── Right: sticky looping video ──────────────────────────── */}
          <div className="lg:w-[52%] lg:sticky lg:top-22 self-start">
            <div className="relative h-[56vw] lg:h-[calc(100vh-5rem)] overflow-hidden bg-mangrove-900">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                src="/videos/Spices_arranged_on_wood_20261017211011.mp4"
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 60px 0 60px -20px rgba(255,255,255,0.08)" }} />
            </div>
          </div>

          {/* ── Left: scrolling text blocks ──────────────────────────── */}
          <div className="lg:w-[48%]">

            {/* Block 1 — Direct relationships */}
            <div className="min-h-screen flex flex-col justify-center px-8 lg:px-14 py-20 border-b border-mangrove-100">
              <Reveal className="space-y-6">
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.25em] block">
                  02 — Network
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-mangrove-900 leading-[1.1]">
                  Origin-Linked.<br />Not Open Market.
                </h2>
                <p className="text-mangrove-800/65 text-base leading-relaxed max-w-md">
                  We source from established growing regions — Malabar coast for pepper, Idukki for cardamom, Karnataka for coffee — through direct relationships with growers and farm-gate aggregators, rather than buying opportunistically on the open market.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {["Malabar Coast", "Idukki, Kerala", "Tamil Nadu", "Karnataka", "Wayanad"].map((origin) => (
                    <span key={origin} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mangrove-50 border border-mangrove-100 text-xs text-mangrove-900/70 font-medium">
                      <span className="w-1 h-1 rounded-full bg-mangrove-accent" />
                      {origin}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Block 2 — Documented & Flexible */}
            <div className="min-h-screen flex flex-col justify-center px-8 lg:px-14 py-20">
              <Reveal className="space-y-6">
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.25em] block">
                  03 — Execution
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-mangrove-900 leading-[1.1]">
                  Documented.<br />Shipment-Ready.
                </h2>
                <p className="text-mangrove-800/65 text-base leading-relaxed max-w-md">
                  Lot-level records travel with every consignment — traceable from sourcing through grading and export. Orders move on FOB, CIF or CFR terms, structured to match your destination port and logistics arrangement.
                </p>
                <div className="space-y-4 pt-2">
                  {[
                    { icon: FileCheck, label: "Lot-level documentation on every shipment" },
                    { icon: Truck,     label: "FOB, CIF, CFR — matched to your port" },
                    { icon: Network,   label: "Fewer intermediary layers between farm and export" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-mangrove-900 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-mangrove-accent" />
                      </div>
                      <span className="text-sm text-mangrove-800/70">{label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/trading/quality-assurance"
                  className="group inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors"
                >
                  View Quality Assurance
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ── Divider 2 ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-16 py-5 bg-white">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">Our Approach</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            EDITORIAL PROSE — animated chapter layout
        ══════════════════════════════════════════════════════════════ */}

        {/* Chapter 01 — Supply Network */}
        <div className="relative overflow-hidden">
          <Reveal className="flex flex-col lg:flex-row items-start gap-0 border-b border-mangrove-100">
            {/* Chapter number — decorative */}
            <div className="lg:w-56 shrink-0 px-6 lg:px-16 pt-16 lg:pt-20 pb-4 lg:pb-20 select-none">
              <span className="font-serif text-[6rem] lg:text-[9rem] font-bold leading-none text-mangrove-900/[0.04] block">01</span>
            </div>
            {/* Content */}
            <div className="flex-1 px-6 lg:px-0 lg:pr-20 pt-4 lg:pt-20 pb-16 lg:pb-20 space-y-4">
              <div className="h-px bg-mangrove-accent w-12 timeline-fill" />
              <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Our Supply Network</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-mangrove-900 leading-snug">
                Built on ground-level relationships, not open-market resale.
              </h3>
              <p className="text-mangrove-800/65 leading-relaxed text-sm sm:text-base max-w-2xl">
                Trading&apos;s sourcing network centres on direct relationships with growers and farm-gate aggregators across India&apos;s key spice and agricultural belts — including the Malabar coast for pepper, Idukki for cardamom, and comparable regions for the other commodities we supply. We work with supplier partners on the ground rather than buying opportunistically on the open market.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Chapter 02 — Farm Gate to Export Lot — dark accent band */}
        <div className="bg-mangrove-900 relative overflow-hidden">
          <Reveal className="flex flex-col lg:flex-row items-start gap-0">
            <div className="lg:w-56 shrink-0 px-6 lg:px-16 pt-16 lg:pt-20 pb-4 lg:pb-20 select-none">
              <span className="font-serif text-[6rem] lg:text-[9rem] font-bold leading-none text-white/[0.04] block">02</span>
            </div>
            <div className="flex-1 px-6 lg:px-0 lg:pr-20 pt-4 lg:pt-20 pb-16 lg:pb-20 space-y-4">
              <div className="h-px bg-mangrove-accent w-12 timeline-fill" />
              <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">From Farm Gate to Export Lot</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug">
                A consistent, well-documented path from aggregation to shipment.
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-2xl">
                Each commodity passes through a consistent path: aggregation near the point of origin, initial grading, consolidation into export-ready lots, and quality verification ahead of shipment. See our{" "}
                <Link href="/trading/quality-assurance" className="text-mangrove-accent hover:underline">Quality Assurance</Link>
                {" "}process for detail. Keeping this path short and well-documented is what lets us quote realistic lead times and hold to them.
              </p>
              {/* Pull quote */}
              <blockquote className="mt-6 border-l-2 border-mangrove-accent pl-5 text-slate-400 italic text-sm max-w-lg">
                &ldquo;Short chain. Clear records. Realistic timelines.&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </div>

        {/* Chapter 03 — Supply Continuity */}
        <div className="relative overflow-hidden">
          <Reveal className="flex flex-col lg:flex-row items-start gap-0 border-b border-mangrove-100">
            <div className="lg:w-56 shrink-0 px-6 lg:px-16 pt-16 lg:pt-20 pb-4 lg:pb-20 select-none">
              <span className="font-serif text-[6rem] lg:text-[9rem] font-bold leading-none text-mangrove-900/[0.04] block">03</span>
            </div>
            <div className="flex-1 px-6 lg:px-0 lg:pr-20 pt-4 lg:pt-20 pb-16 lg:pb-20 space-y-4">
              <div className="h-px bg-mangrove-accent w-12 timeline-fill" />
              <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Supply Continuity</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-mangrove-900 leading-snug">
                Multiple regions per commodity — so one harvest gap doesn&apos;t stop your supply.
              </h3>
              <p className="text-mangrove-800/65 leading-relaxed text-sm sm:text-base max-w-2xl">
                Indian agricultural commodities are seasonal, and availability varies by harvest. We maintain relationships across multiple growing regions and supplier partners per commodity specifically so a single region&apos;s harvest timing doesn&apos;t leave buyers without supply options — we&apos;ll tell you directly if a specific grade or origin is out of season rather than substitute silently.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Chapter 04 — Working With Us */}
        <div className="relative overflow-hidden border-b border-mangrove-100">
          <Reveal className="flex flex-col lg:flex-row items-start gap-0">
            <div className="lg:w-56 shrink-0 px-6 lg:px-16 pt-16 lg:pt-20 pb-4 lg:pb-20 select-none">
              <span className="font-serif text-[6rem] lg:text-[9rem] font-bold leading-none text-mangrove-900/[0.04] block">04</span>
            </div>
            <div className="flex-1 px-6 lg:px-0 lg:pr-20 pt-4 lg:pt-20 pb-16 lg:pb-20 space-y-4">
              <div className="h-px bg-mangrove-accent w-12 timeline-fill" />
              <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Working With Us on Supply</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-mangrove-900 leading-snug">
                Plan ahead — we work with your buying cycle, not against it.
              </h3>
              <p className="text-mangrove-800/65 leading-relaxed text-sm sm:text-base max-w-2xl">
                For recurring or volume orders, we can discuss indicative seasonal availability windows and lead times ahead of your planning cycle. Reach out through our commercial desk with your expected commodity, volume and destination port.
              </p>
              <Link
                href="/trading#contact"
                className="group inline-flex items-center gap-2 mt-2 px-7 py-3.5 bg-mangrove-900 text-mangrove-accent hover:bg-mangrove-accent hover:text-mangrove-900 transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
              >
                Start the Conversation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Divider 3 ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-16 py-5 bg-white">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">Trade Inquiry</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ── CTA banner ───────────────────────────────────────────────── */}
        <div className="px-6 lg:px-16 pt-16 pb-24">
        <div className="max-w-5xl mx-auto">
          <Reveal className="p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Discuss Your Supply Requirements</h3>
              <p className="text-slate-300 text-sm">Tell us the commodity, volume and timeline you&apos;re planning around.</p>
            </div>
            <Link href="/trading#contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Talk to Our Team
            </Link>
          </Reveal>
        </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
