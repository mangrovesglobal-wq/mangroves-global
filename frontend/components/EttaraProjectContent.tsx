"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const deliverables = [
  "Brand Strategy & Naming",
  "Visual Identity System",
  "Product Label Design",
  "Gift Box Packaging",
  "Business Stationery",
];

export default function EttaraProjectContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-end bg-[#111] overflow-hidden pt-22">
          <div className="absolute inset-0">
            <Image
              src="/images/portfolio/ETTARA/ettara.jpg"
              alt="Ettara brand identity — business cards with silver foil"
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-16 pb-16 w-full" style={{ zIndex: 10 }}>
            <Link
              href="/creative/work"
              className="inline-flex items-center gap-2 text-white/50 hover:text-mangrove-accent transition-colors text-xs tracking-widest uppercase font-semibold mb-10"
              style={{ animation: "wordRise 0.6s cubic-bezier(0.22,1,0.36,1) 300ms both" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </Link>

            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-6 text-[10px] uppercase tracking-[0.32em] font-semibold"
              style={{
                border: "1px solid rgba(242,201,76,0.35)", background: "rgba(242,201,76,0.07)", color: "#F2C94C",
                animation: "wordRise 0.65s cubic-bezier(0.22,1,0.36,1) 450ms both",
              }}>
              Branding &nbsp;✦&nbsp; Packaging
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              style={{ animation: "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) 600ms both" }}
            >
              Ettara
            </h1>
            <p
              className="text-white/55 text-lg sm:text-xl max-w-2xl"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 760ms both" }}
            >
              A premium brand identity for a natural essential oils range — built on the quiet confidence of deep forest green, silver and gold.
            </p>
          </div>
        </section>

        {/* ── PROJECT META ───────────────────────────────────────────────────── */}
        <section className="bg-mangrove-50 border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { label: "Client", value: "Ettara" },
              { label: "Category", value: "Natural Wellness / Oils" },
              { label: "Services", value: "Branding · Packaging" },
              { label: "Identity", value: "Forest Green · Gold · Black" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-widest text-mangrove-800/45 font-semibold mb-1">{label}</p>
                <p className="text-sm font-semibold text-mangrove-900">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECT OVERVIEW ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-16 items-start">
            <Reveal>
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold block mb-4">The Brief</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900 leading-tight mb-6">
                Designing a brand identity as premium as the product inside the bottle.
              </h2>
              <p className="text-mangrove-800/65 leading-relaxed mb-4">
                Ettara — "Yours Naturally" — needed to feel worthy of the shelf it would sit on. The brand had to signal purity, craftsmanship and premium quality at every touchpoint: the product label, the gift box, the business card.
              </p>
              <p className="text-mangrove-800/55 leading-relaxed text-sm">
                The resulting identity uses a deep forest green grounded in nature, with gold and silver foil accents that speak to luxury without shouting it. The custom wordmark is set at a slight angle — an intentional detail that adds energy to what could otherwise read as stiff — applied with silver foil on matte black stationery and clean white typography on the deep green bottle label and packaging.
              </p>
            </Reveal>

            <Reveal>
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold block mb-4">Deliverables</span>
              <ul className="space-y-2.5">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm text-mangrove-800/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-mangrove-accent shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── GALLERY ────────────────────────────────────────────────────────── */}

        {/* Business cards — full width on dark */}
        <div className="bg-[#111] px-6 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/images/portfolio/ETTARA/ettara.jpg"
                  alt="Ettara business cards — matte black with silver foil wordmark"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px)100vw,1200px"
                />
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest mt-3 font-medium">Business Stationery — Silver Foil on Matte Black</p>
            </Reveal>
          </div>
        </div>

        {/* Product label + packaging — 2-col on light */}
        <div className="bg-mangrove-50 px-6 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-2xl overflow-hidden relative bg-white" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/portfolio/ETTARA/ettara-work-1.jpg"
                  alt="Ettara Clove essential oil dropper bottle — amber glass, deep green label"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px)100vw,600px"
                />
              </div>
              <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">Product Label — Clove Essential Oil</p>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl overflow-hidden relative bg-white" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/portfolio/ETTARA/ettara-work-2.jpg"
                  alt="Ettara gift box packaging alongside clear dropper bottle"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px)100vw,600px"
                />
              </div>
              <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">Gift Box Packaging</p>
            </Reveal>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <Reveal>
              <span className="text-mangrove-900/60 text-xs uppercase tracking-widest font-semibold block mb-3">Start a Project</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900">Launching a premium product brand?</h2>
              <p className="text-mangrove-900/60 text-sm mt-3">From the wordmark to the gift box — we build packaging identities that justify a premium price point.</p>
            </Reveal>
            <div className="flex flex-col gap-4 shrink-0">
              <Link href="/creative/contact"
                className="px-8 py-4 bg-mangrove-900 text-mangrove-accent hover:bg-mangrove-800 transition-colors rounded-full font-semibold text-xs tracking-widest uppercase whitespace-nowrap">
                Get in Touch
              </Link>
              <Link href="/creative/work"
                className="inline-flex items-center justify-center gap-2 text-xs tracking-widest font-semibold text-mangrove-900/60 hover:text-mangrove-900 transition-colors uppercase">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
