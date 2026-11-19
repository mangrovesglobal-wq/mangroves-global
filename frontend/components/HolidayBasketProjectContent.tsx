"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const deliverables = [
  "Logo Design",
  "Brand Identity System",
  "Colour Palette & Typography",
  "Digital Marketing Strategy",
  "Social Media Direction",
];

export default function HolidayBasketProjectContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-end bg-mangrove-900 overflow-hidden pt-22">
          <div className="absolute inset-0">
            <Image
              src="/images/portfolio/holidaybasket/logo-hb.jpg"
              alt="The Holiday Basket logo — HB monogram with aeroplane motif"
              fill
              priority
              className="object-contain object-center opacity-20 scale-110"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-mangrove-900/70" />
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
              Branding &nbsp;✦&nbsp; Digital Marketing
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              style={{ animation: "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) 600ms both" }}
            >
              The Holiday Basket
            </h1>
            <p
              className="text-white/55 text-lg sm:text-xl max-w-2xl"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 760ms both" }}
            >
              A travel-inspired logo and digital marketing strategy for a gifting brand — a playful identity that combines wanderlust with warmth.
            </p>
          </div>
        </section>

        {/* ── PROJECT META ───────────────────────────────────────────────────── */}
        <section className="bg-mangrove-50 border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { label: "Client", value: "The Holiday Basket" },
              { label: "Industry", value: "Travel Gifts & Experiences" },
              { label: "Services", value: "Logo · Digital Marketing" },
              { label: "Identity", value: "HB Monogram · Aeroplane" },
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
                Building a brand identity and go-to-market strategy for a travel gifting concept.
              </h2>
              <p className="text-mangrove-800/65 leading-relaxed mb-4">
                The Holiday Basket needed a visual identity that captured the joy of travel and gift-giving in equal measure. The brief called for a logo that could work across digital channels, packaging and print — instantly recognisable and brimming with personality.
              </p>
              <p className="text-mangrove-800/55 leading-relaxed text-sm">
                The resulting mark pairs a bold "HB" monogram with an aeroplane motif and dashed flight-path arc, set in a palette of mint (#45c2cd), royal blue (#3161ad) and sky blue (#1c96d2). Alongside the logo, we developed a digital marketing strategy that defined the brand's tone of voice, audience targeting and content approach for launch.
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

        {/* Logo — full width on white */}
        <Reveal>
          <div className="px-6 lg:px-16 pb-6 bg-white">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-mangrove-50 flex items-center justify-center p-10 sm:p-16" style={{ aspectRatio: "16/9" }}>
              <img
                src="/images/portfolio/holidaybasket/logo-hb.jpg"
                alt="The Holiday Basket full logo — HB monogram with Holiday Basket wordmark and aeroplane"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">Primary Logo</p>
          </div>
        </Reveal>

        {/* Logo variants — 2-col: FB size + colour codes */}
        <div className="bg-mangrove-50 px-6 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-2xl overflow-hidden bg-white flex items-center justify-center p-8" style={{ aspectRatio: "4/3" }}>
                <img
                  src="/images/portfolio/holidaybasket/logo-hb-fb.jpg"
                  alt="The Holiday Basket social media logo — square FB format"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">Social Media Format</p>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl overflow-hidden bg-white p-8" style={{ aspectRatio: "4/3" }}>
                <img
                  src="/images/portfolio/holidaybasket/logo-hb-colours.jpg"
                  alt="The Holiday Basket brand colour palette — mint, royal blue, sky blue"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">Brand Colour Palette</p>
            </Reveal>
          </div>
        </div>

        {/* Digital marketing strategy callout */}
        <section className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold block mb-4">Digital Marketing Strategy</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900 leading-tight mb-8 max-w-2xl">
                A go-to-market strategy built for discovery and conversion.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { num: "01", title: "Audience Definition", body: "Identified the core audience — travel-enthusiasts and gift-givers — and mapped their discovery touchpoints across social and search." },
                { num: "02", title: "Content Direction", body: "Developed a content framework centred on travel inspiration, gifting occasions and behind-the-scenes storytelling to build brand warmth." },
                { num: "03", title: "Channel Strategy", body: "Prioritised Instagram and Facebook for visual discovery, with a phased approach to paid amplification once organic benchmarks were established." },
              ].map((item, i) => (
                <Reveal key={item.num} delay={i * 100}>
                  <div className="border border-mangrove-100 rounded-2xl p-6">
                    <span className="text-mangrove-accent/50 text-xs tracking-widest font-semibold block mb-3">{item.num}</span>
                    <h3 className="font-serif text-lg font-bold text-mangrove-900 mb-3">{item.title}</h3>
                    <p className="text-mangrove-800/60 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <Reveal>
              <span className="text-mangrove-900/60 text-xs uppercase tracking-widest font-semibold block mb-3">Start a Project</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900">Launching a consumer brand?</h2>
              <p className="text-mangrove-900/60 text-sm mt-3">From the logo to the launch strategy — we build brands that earn attention and drive sales.</p>
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
