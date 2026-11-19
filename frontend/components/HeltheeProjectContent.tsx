"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const images = [
  {
    src: "/images/portfolio/healthee/branding in biomedical in Dubai helthee.jpg",
    alt: "Helthee Care Clinic business cards — magenta and white brand identity",
    caption: "Business Identity",
  },
  {
    src: "/images/portfolio/healthee/work-healthee-2.jpg",
    alt: "Helthee Care Clinic branded medical vial label",
    caption: "Medical Labelling",
  },
  {
    src: "/images/portfolio/healthee/work-healthee-3.jpg",
    alt: "Helthee Care Clinic pill bottle packaging in magenta",
    caption: "Product Packaging",
  },
];

const deliverables = [
  "Brand Strategy & Naming",
  "Visual Identity System",
  "Business Stationery",
  "Medical & Product Labelling",
  "Pharmaceutical Packaging",
  "Website Design & Development",
];

export default function HeltheeProjectContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-end bg-mangrove-900 overflow-hidden pt-22">
          <div className="absolute inset-0">
            <Image
              src="/images/portfolio/healthee/branding in biomedical in Dubai helthee.jpg"
              alt="Helthee Care Clinic brand identity"
              fill
              priority
              className="object-cover opacity-35"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-mangrove-900/65" />
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
              Helthee Care Clinic
            </h1>
            <p
              className="text-white/55 text-lg sm:text-xl max-w-2xl"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 760ms both" }}
            >
              A warm, clinically credible brand identity for a modern care clinic — built around a distinctive ECG wordmark and a bold magenta palette that stands apart in a category defined by blue and white.
            </p>
          </div>
        </section>

        {/* ── PROJECT META ───────────────────────────────────────────────────── */}
        <section className="bg-mangrove-50 border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { label: "Client", value: "Helthee Care Clinic" },
              { label: "Industry", value: "Healthcare / Clinic" },
              { label: "Services", value: "Branding · Website" },
              { label: "Identity", value: "ECG Wordmark · Magenta" },
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
                Designing a clinical brand that feels warm, modern and immediately trustworthy.
              </h2>
              <p className="text-mangrove-800/65 leading-relaxed mb-4">
                Helthee Care Clinic needed a brand that broke from the generic blue-and-white healthcare aesthetic without losing clinical credibility. The brief called for an identity that could carry across stationery, medical labelling and pharmaceutical packaging — all touchpoints where the brand had to signal both care and precision.
              </p>
              <p className="text-mangrove-800/55 leading-relaxed text-sm">
                The resulting identity centres on a bespoke ECG-integrated wordmark — the pulse line woven directly into the letterform — set in a distinctive magenta that reads approachable and confident. Applied across business stationery, product labels and pharmaceutical packaging, the brand holds up at every scale.
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

        {/* Business cards — full width */}
        <Reveal>
          <div className="px-6 lg:px-16 pb-6 bg-white">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/portfolio/healthee/branding in biomedical in Dubai helthee.jpg"
                alt={images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,1200px"
              />
            </div>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-3 font-medium">{images[0].caption}</p>
          </div>
        </Reveal>

        {/* Vial + Packaging — side by side on dark background */}
        <div className="bg-mangrove-50 px-6 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            {[images[1], images[2]].map((img) => (
              <Reveal key={img.src}>
                <div className="rounded-2xl overflow-hidden relative bg-white" style={{ aspectRatio: "4/3" }}>
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
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900">Building a brand for a healthcare business?</h2>
              <p className="text-mangrove-900/60 text-sm mt-3">We understand what clinical brands need to communicate — and how to do it in a way that stands out.</p>
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
