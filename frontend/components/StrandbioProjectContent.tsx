"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const images = [
  { src: "/images/portfolio/strandbio/01.jpg", alt: "Strand Biolife business cards — navy and white dual-sided identity", caption: "Business Identity" },
  { src: "/images/portfolio/strandbio/02.jpg", alt: "Strand Biolife pole banners — Caring Ahead tagline", caption: "Outdoor Signage" },
  { src: "/images/portfolio/strandbio/03.jpg", alt: "Strand Biolife oncology billboard campaign", caption: "Campaign Advertising" },
  { src: "/images/portfolio/strandbio/06.jpg", alt: "Strand Biolife clinical brochures — Prenatal and Postnatal Cytogenetics", caption: "Clinical Collateral" },
  { src: "/images/portfolio/strandbio/07.jpg", alt: "Strand Biolife staff ID card — Molecular Diagnostics", caption: "Staff Identity" },
  { src: "/images/portfolio/strandbio/08.jpg", alt: "Strand Biolife branded lab coat", caption: "Uniforms" },
  { src: "/images/portfolio/strandbio/09.jpg", alt: "Strand Biolife branded framed poster", caption: "Brand Interiors" },
  { src: "/images/portfolio/strandbio/11.jpg", alt: "Strand Biolife FISH panels brochure and branded folder", caption: "Medical Literature" },
  { src: "/images/portfolio/strandbio/12.jpg", alt: "Strand Biolife shipping boxes and reagent bottle label packaging", caption: "Packaging" },
];

const deliverables = [
  "Brand Strategy & Positioning",
  "Visual Identity System",
  "Business Stationery",
  "Outdoor Advertising",
  "Clinical Brochures & Literature",
  "Staff ID & Uniform Design",
  "Packaging & Labelling",
  "Brand Interior Collateral",
  "Website Design & Development",
];

export default function StrandbioProjectContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-end bg-mangrove-900 overflow-hidden pt-22">
          {/* Background hero image */}
          <div className="absolute inset-0">
            <Image
              src="/images/portfolio/strandbio/03.jpg"
              alt="Strand Biolife oncology billboard"
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-mangrove-900/60" />
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-6 lg:px-16 pb-16 w-full" style={{ zIndex: 10 }}>
            {/* Back link */}
            <Link
              href="/creative/work"
              className="inline-flex items-center gap-2 text-white/50 hover:text-mangrove-accent transition-colors text-xs tracking-widest uppercase font-semibold mb-10"
              style={{ animation: "wordRise 0.6s cubic-bezier(0.22,1,0.36,1) 300ms both" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </Link>

            {/* Category badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-6 text-[10px] uppercase tracking-[0.32em] font-semibold"
              style={{
                border: "1px solid rgba(242,201,76,0.35)", background: "rgba(242,201,76,0.07)", color: "#F2C94C",
                animation: "wordRise 0.65s cubic-bezier(0.22,1,0.36,1) 450ms both",
              }}>
              Branding &nbsp;✦&nbsp; Visual Identity
            </div>

            {/* Title */}
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              style={{ animation: "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) 600ms both" }}
            >
              Strand Biolife
            </h1>
            <p
              className="text-white/55 text-lg sm:text-xl max-w-2xl"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 760ms both" }}
            >
              A complete brand identity system for a healthcare diagnostics company — from strategy and visual identity to clinical literature, uniforms and packaging.
            </p>
          </div>
        </section>

        {/* ── PROJECT META ───────────────────────────────────────────────────── */}
        <section className="bg-mangrove-50 border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { label: "Client", value: "Strand Biolife" },
              { label: "Industry", value: "Healthcare / Diagnostics" },
              { label: "Services", value: "Branding · Website" },
              { label: "Tagline", value: "Caring Ahead" },
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
                Building a trusted identity for a diagnostics brand entering a credibility-driven market.
              </h2>
              <p className="text-mangrove-800/65 leading-relaxed mb-4">
                Strand Biolife operates in molecular diagnostics, oncology and cytogenetics — a space where the brand must communicate scientific precision and patient-first care in equal measure. The brief required a complete brand identity system: a distinctive mark, a consistent visual language, and collateral that holds up across clinical environments, outdoor advertising and digital touchpoints.
              </p>
              <p className="text-mangrove-800/55 leading-relaxed text-sm">
                The resulting identity uses a deep navy palette anchored by a geometric hourglass-X mark — representing time, precision and progress. The tagline "Caring Ahead" ties the clinical rigour to a human commitment to patient outcomes.
              </p>
            </Reveal>

            {/* Deliverables list */}
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

        {/* Row 1 — Business cards full width */}
        <Reveal>
          <div className="px-6 lg:px-16 pb-6 bg-white">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/7" }}>
              <Image src="/images/portfolio/strandbio/01.jpg" alt={images[0].alt} fill className="object-cover" sizes="(max-width:1024px)100vw,1200px" />
            </div>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">{images[0].caption}</p>
          </div>
        </Reveal>

        {/* Row 2 — Pole banners + Billboard side by side */}
        <div className="px-6 lg:px-16 pb-6 bg-white">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
            {[images[1], images[2]].map((img) => (
              <Reveal key={img.src}>
                <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:640px)100vw,600px" />
                </div>
                <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">{img.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Dark divider section */}
        <div className="bg-mangrove-900 py-20 px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-10">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Clinical & Staff Identity</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">Every touchpoint, consistent.</h2>
            </Reveal>
            {/* Row 3 — Clinical brochures + ID card + lab coat */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[images[3], images[4], images[5]].map((img) => (
                <Reveal key={img.src}>
                  <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:640px)100vw,400px" />
                  </div>
                  <p className="text-xs text-white/35 uppercase tracking-widest mt-3 font-medium">{img.caption}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4 — Framed poster full width */}
        <Reveal>
          <div className="px-6 lg:px-16 py-6 bg-white">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/7" }}>
              <Image src="/images/portfolio/strandbio/09.jpg" alt={images[6].alt} fill className="object-cover" sizes="(max-width:1024px)100vw,1200px" />
            </div>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">{images[6].caption}</p>
          </div>
        </Reveal>

        {/* Row 5 — Literature + Packaging side by side */}
        <div className="px-6 lg:px-16 pb-16 bg-white">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
            {[images[7], images[8]].map((img) => (
              <Reveal key={img.src}>
                <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:640px)100vw,600px" />
                </div>
                <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">{img.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <Reveal>
              <span className="text-mangrove-900/60 text-xs uppercase tracking-widest font-semibold block mb-3">Start a Project</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900">Need a brand built from the ground up?</h2>
              <p className="text-mangrove-900/60 text-sm mt-3">We work with businesses across the UAE — from naming and strategy through to full identity rollout.</p>
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
