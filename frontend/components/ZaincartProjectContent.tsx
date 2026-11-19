"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const deliverables = [
  "Brand Identity & Logo",
  "E-Commerce Website Design",
  "Mobile App UI Design",
  "Category & Product Page Templates",
  "Colour System & Typography",
];

export default function ZaincartProjectContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-end bg-mangrove-900 overflow-hidden pt-22">
          <div className="absolute inset-0">
            <Image
              src="/images/portfolio/Zaincart/work-zain-1.jpg"
              alt="ZainCart e-commerce app on mobile"
              fill
              priority
              className="object-cover opacity-30"
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
              Branding &nbsp;✦&nbsp; E-Commerce
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              style={{ animation: "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) 600ms both" }}
            >
              ZainCart
            </h1>
            <p
              className="text-white/55 text-lg sm:text-xl max-w-2xl"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 760ms both" }}
            >
              Brand identity and e-commerce platform for a Qatar-based multi-category shopping destination — from fresh groceries to fashion, all in one app.
            </p>
          </div>
        </section>

        {/* ── PROJECT META ───────────────────────────────────────────────────── */}
        <section className="bg-mangrove-50 border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { label: "Client", value: "ZainCart" },
              { label: "Market", value: "Doha, Qatar" },
              { label: "Services", value: "Branding · Website · App" },
              { label: "Category", value: "E-Commerce / Retail" },
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
                Building a cohesive brand and digital platform for Qatar's multi-category shopping experience.
              </h2>
              <p className="text-mangrove-800/65 leading-relaxed mb-4">
                ZainCart needed a brand and digital platform that could hold together a wide product range — fresh groceries, meat and fish, fashion and accessories — under a single, trustworthy identity. The challenge was to create something energetic and commercial without feeling cluttered.
              </p>
              <p className="text-mangrove-800/55 leading-relaxed text-sm">
                The resulting identity uses a bold orange accent to signal energy and value, anchored by clean white space to keep the browsing experience uncluttered. The website and mobile app were designed with category-first navigation, optimised product listing templates and a consistent UI system that scales across hundreds of SKUs.
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

        {/* Website mockup — full width */}
        <Reveal>
          <div className="px-6 lg:px-16 pb-6 bg-white">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden relative bg-mangrove-50" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/portfolio/Zaincart/work-zain-1.jpg"
                alt="ZainCart grocery e-commerce homepage on mobile device"
                fill
                className="object-contain p-4 sm:p-10"
                sizes="(max-width:1024px)100vw,1200px"
              />
            </div>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">Website — Grocery Homepage</p>
          </div>
        </Reveal>

        {/* App UI — full width on dark background */}
        <div className="bg-mangrove-900 px-6 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="rounded-2xl overflow-hidden relative flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/images/portfolio/Zaincart/work-zain-2.jpg"
                  alt="ZainCart mobile app — Fashion category page with product listings in QAR"
                  fill
                  className="object-contain p-4 sm:p-10"
                  sizes="(max-width:1024px)100vw,1200px"
                />
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest mt-3 font-medium">Mobile App — Fashion Category</p>
            </Reveal>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <Reveal>
              <span className="text-mangrove-900/60 text-xs uppercase tracking-widest font-semibold block mb-3">Start a Project</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900">Building an e-commerce platform?</h2>
              <p className="text-mangrove-900/60 text-sm mt-3">From brand identity to full UX design — we build digital retail experiences that convert browsers into buyers.</p>
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
