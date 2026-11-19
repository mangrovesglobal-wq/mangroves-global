"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  FlaskConical, Sprout, HeartPulse, Wind,
  ShieldCheck, Award, Leaf,
  ScanLine, Droplets, Microscope, Eye, MapPin, ArrowUpRight,
} from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const certs = [
  { icon: FlaskConical,  name: "Certificate of Analysis",   short: "COA"           },
  { icon: Sprout,        name: "Phytosanitary Certificate", short: "Phyto"         },
  { icon: HeartPulse,    name: "Official Health Certificate", short: "Health"      },
  { icon: Wind,          name: "Fumigation Certificate",    short: "Fumigation"    },
  { icon: ShieldCheck,   name: "HACCP Certificate",         short: "HACCP"         },
  { icon: Award,         name: "ISO 22000 Certificate",     short: "ISO 22000"     },
  { icon: Leaf,          name: "Organic Certificate",       short: "Organic"       },
];

const steps = [
  { icon: ScanLine,   label: "Farm-Gate Inspection",    desc: "Lot assessment at aggregation point — grade, condition and compliance with spec before dispatch." },
  { icon: Droplets,   label: "Moisture Checks",         desc: "Moisture content verified to protect shelf life and prevent mould risk during container transit." },
  { icon: Eye,        label: "Foreign Matter Screening", desc: "Mechanical and manual screening removes stems, stones and non-conforming material before lot acceptance." },
  { icon: Microscope, label: "Microbiological Testing", desc: "Lab testing against relevant food safety parameters where the commodity and destination market require it." },
  { icon: Award,      label: "Grading & Visual Sort",   desc: "Size, colour and uniformity sorted per commodity grade specification, verified against buyer requirement." },
  { icon: MapPin,     label: "Traceability Record",     desc: "Lot documentation links every shipment back through grading and origin, available to buyers on request." },
];

export default function QualityAssuranceContent() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const metricRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let ySmooth = 0;

    const tick = () => {
      const hero = heroRef.current;
      const box  = textBoxRef.current;
      const met  = metricRef.current;
      if (hero) {
        const scrolled = -hero.getBoundingClientRect().top;
        const heroH    = hero.offsetHeight;
        const progress = Math.max(0, Math.min(1, scrolled / heroH));

        // Lerp toward target for buttery smooth feel
        const targetY = Math.max(0, scrolled) * 0.38;
        ySmooth += (targetY - ySmooth) * 0.09;

        if (box) {
          box.style.transform = `translateY(${ySmooth}px)`;
          box.style.opacity   = String(Math.max(0, 1 - progress * 2.2));
        }
        // Metric strip rises slightly on scroll
        if (met) {
          met.style.transform = `translateY(${Math.max(0, scrolled) * 0.12}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="trading" />

      {/* Scanner animation styles */}
      <style>{`
        @keyframes qa-scan {
          0%   { top: 0%;    opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { top: 100%;  opacity: 0; }
        }
        .qa-scan-line {
          animation: qa-scan 3.2s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes qa-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        .qa-pulse { animation: qa-pulse 1.6s ease-in-out infinite; }
        @keyframes qa-bracket-in {
          from { opacity: 0; transform: scale(1.15); }
          to   { opacity: 1; transform: scale(1); }
        }
        .qa-bracket { animation: qa-bracket-in 1s ease forwards; }
        @keyframes qa-metric-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .qa-metric { opacity: 0; animation: qa-metric-in 0.7s ease forwards; }
        .qa-metric-1 { animation-delay: 0.5s; }
        .qa-metric-2 { animation-delay: 0.75s; }
        .qa-metric-3 { animation-delay: 1.0s; }
      `}</style>

      <main className="pb-24">

        {/* ══════════════════════════════════════════════════════════════
            HERO — scanner / inspection UI aesthetic
        ══════════════════════════════════════════════════════════════ */}
        <div ref={heroRef} className="relative h-[calc(100dvh-5.5rem)] min-h-[580px] mt-22 overflow-hidden bg-mangrove-900">

          {/* Background video */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/Spice_quality_assurance_and_cert…_20261021111644.mp4"
          />


          {/* ── Animated scan line ─────────────────────────────────── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="qa-scan-line absolute left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 20%, rgba(212,175,55,1) 50%, rgba(212,175,55,0.7) 80%, transparent 100%)", boxShadow: "0 0 18px 3px rgba(212,175,55,0.4)" }} />
          </div>

          {/* ── Corner viewfinder brackets ─────────────────────────── */}
          <div className="qa-bracket absolute top-10 left-8 sm:left-14 w-10 h-10 border-t-2 border-l-2 border-mangrove-accent/70" />
          <div className="qa-bracket absolute top-10 right-8 sm:right-14 w-10 h-10 border-t-2 border-r-2 border-mangrove-accent/70" style={{ animationDelay: "0.1s" }} />
          <div className="qa-bracket absolute bottom-10 left-8 sm:left-14 w-10 h-10 border-b-2 border-l-2 border-mangrove-accent/70" style={{ animationDelay: "0.2s" }} />
          <div className="qa-bracket absolute bottom-10 right-8 sm:right-14 w-10 h-10 border-b-2 border-r-2 border-mangrove-accent/70" style={{ animationDelay: "0.3s" }} />

          {/* ── Status badge — top center ──────────────────────────── */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-mangrove-accent/40 bg-mangrove-900/50 backdrop-blur-sm">
            <span className="qa-pulse w-2 h-2 rounded-full bg-mangrove-accent block" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-mangrove-accent font-semibold">Inspection Active</span>
          </div>

          {/* ── Breadcrumb — top left ──────────────────────────────── */}
          <nav className="absolute top-12 left-24 sm:left-28 text-xs hidden sm:flex items-center gap-2 bg-mangrove-900/60 backdrop-blur-sm px-3 py-1 rounded-full" aria-label="Breadcrumb">
            <Link href="/trading" className="text-mangrove-accent/70 hover:text-mangrove-accent transition-colors">Trading</Link>
            <span className="text-mangrove-accent/30">/</span>
            <span className="text-mangrove-accent/90">Quality Assurance</span>
          </nav>

          {/* ── Center headline ────────────────────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div ref={textBoxRef} style={{ willChange: "transform, opacity" }}>
              <div className="bg-mangrove-900/75 backdrop-blur-md rounded-3xl px-10 py-10 max-w-2xl mx-auto space-y-5">
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.3em] block">
                  Structured QA Approach
                </span>
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-mangrove-accent leading-[0.95] tracking-tight">
                  Quality<br />Checked.
                </h1>
                <p className="text-slate-200 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Multiple inspection points between farm and port — not a single box-tick before the container closes.
                </p>
                <Link
                  href="#process"
                  className="inline-flex items-center gap-2 px-7 py-3 border-2 border-mangrove-accent bg-mangrove-accent text-mangrove-900 hover:bg-transparent hover:text-mangrove-accent text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300"
                >
                  View the Process
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Bottom metric strip ────────────────────────────────── */}
          <div ref={metricRef} className="absolute bottom-0 left-0 right-0 border-t border-mangrove-accent/30 bg-mangrove-900/70 backdrop-blur-sm" style={{ willChange: "transform" }}>
            <div className="max-w-3xl mx-auto grid grid-cols-3 divide-x divide-mangrove-accent/20">
              {[
                { value: "99.5%+", label: "Physical Purity Target", cls: "qa-metric qa-metric-1" },
                { value: "6",      label: "Inspection Points",       cls: "qa-metric qa-metric-2" },
                { value: "7",      label: "Export Certifications",   cls: "qa-metric qa-metric-3" },
              ].map(({ value, label, cls }) => (
                <div key={label} className={`${cls} text-center py-5 px-4`}>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-mangrove-accent leading-none mb-1">{value}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-mangrove-accent/50 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-20 py-5">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">The Process</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            QA STEPS — animated numbered grid
        ══════════════════════════════════════════════════════════════ */}
        <section className="px-6 lg:px-20 pt-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-10 space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-mangrove-900">Where Checks Happen</h2>
              <p className="text-mangrove-800/55 text-sm sm:text-base max-w-2xl">
                Inspection starts close to origin and continues through to pre-dispatch verification. Catching an issue early is far cheaper than discovering it after port.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map(({ icon: Icon, label, desc }, i) => (
                <Reveal
                  key={label}
                  delay={(i % 3) * 80}
                  className="group relative p-6 rounded-2xl bg-mangrove-50 border-2 border-mangrove-100 hover:bg-mangrove-900 hover:border-mangrove-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Ghost step number */}
                  <span className="absolute -bottom-3 -right-1 font-serif text-[5rem] font-bold leading-none text-mangrove-900/[0.05] group-hover:text-white/[0.05] select-none transition-colors duration-300 pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-mangrove-900 group-hover:bg-mangrove-accent flex items-center justify-center mb-4 transition-colors duration-300 relative z-10">
                    <Icon className="w-5 h-5 text-mangrove-accent group-hover:text-mangrove-900 transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-mangrove-900 group-hover:text-white mb-1.5 transition-colors duration-300 relative z-10">{label}</h3>
                  <p className="text-xs text-mangrove-800/55 group-hover:text-slate-300 leading-relaxed transition-colors duration-300 relative z-10">{desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-20 py-5">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">What We Check</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            EDITORIAL CHAPTERS — What We Check + Traceability
        ══════════════════════════════════════════════════════════════ */}

        {/* Chapter 01 — What We Check */}
        <div className="border-b border-mangrove-100">
          <Reveal className="flex flex-col lg:flex-row items-start gap-0 px-6 lg:px-0">
            <div className="lg:w-48 shrink-0 lg:pl-20 pt-10 lg:pt-16 pb-2 lg:pb-16 select-none">
              <span className="font-serif text-[5rem] lg:text-[7rem] font-bold leading-none text-mangrove-900/4 block">01</span>
            </div>
            <div className="flex-1 lg:pr-20 pt-2 lg:pt-16 pb-14 lg:pb-16 space-y-5">
              <div className="h-px bg-mangrove-accent w-10 timeline-fill" />
              <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">What We Check For</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-mangrove-900 leading-snug">Five parameters. Every lot.</h3>
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {[
                  { icon: Check, label: "Physical Purity", note: "99.5%+ target, verified against buyer spec" },
                  { icon: Droplets, label: "Moisture Levels", note: "Shelf life and mould-risk protection during transit" },
                  { icon: ScanLine, label: "Foreign Matter", note: "Screened out before lot acceptance into export packaging" },
                  { icon: Eye, label: "Visual & Density Grading", note: "Size, colour, uniformity per commodity grade spec" },
                  { icon: Microscope, label: "Microbiological Testing", note: "Lab testing where commodity and destination require it" },
                ].map(({ icon: Icon, label, note }) => (
                  <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-mangrove-50 border border-mangrove-100 hover:border-mangrove-accent hover:-translate-y-0.5 transition-all duration-200 group">
                    <div className="w-7 h-7 rounded-lg bg-mangrove-900 group-hover:bg-mangrove-accent flex items-center justify-center shrink-0 transition-colors duration-200 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-mangrove-accent group-hover:text-mangrove-900 transition-colors duration-200" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-mangrove-900 block">{label}</span>
                      <span className="text-xs text-mangrove-800/50 leading-relaxed">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chapter 02 — Traceability — dark band */}
        <div className="bg-mangrove-900">
          <Reveal className="flex flex-col lg:flex-row items-start gap-0 px-6 lg:px-0">
            <div className="lg:w-48 shrink-0 lg:pl-20 pt-10 lg:pt-16 pb-2 lg:pb-16 select-none">
              <span className="font-serif text-[5rem] lg:text-[7rem] font-bold leading-none text-white/4 block">02</span>
            </div>
            <div className="flex-1 lg:pr-20 pt-2 lg:pt-16 pb-14 lg:pb-16 space-y-5">
              <div className="h-px bg-mangrove-accent w-10 timeline-fill" />
              <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Traceability</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug">Every lot — traceable back to origin.</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-2xl">
                Each export lot carries documentation linking it back through grading and consolidation to its origin region. If a buyer has a question about a specific shipment, we can trace it back through that chain rather than treating it as an anonymous commodity purchase.
              </p>
              <blockquote className="border-l-2 border-mangrove-accent pl-5 text-slate-400 italic text-sm max-w-lg">
                &ldquo;Not anonymous commodities — documented lots with a clear origin trail.&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-20 py-5">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">Certifications</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            CERTIFICATIONS — single-color gold animated cards
        ══════════════════════════════════════════════════════════════ */}
        <section className="px-6 lg:px-20 pt-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-10 space-y-3">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.25em] block">Certifications Sit With Our Supplier Partners</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-mangrove-900 leading-snug max-w-2xl">
                The documentation that travels with every shipment.
              </h2>
              <p className="text-mangrove-800/60 text-sm sm:text-base leading-relaxed max-w-2xl">
                Mangroves Global Trading FZ LLC is headquartered in Ras Al Khaimah, UAE, and does not hold Indian agricultural export certifications directly. We work exclusively with supplier partners who hold the relevant registrations — including FSSAI, Spice Board India, and APEDA where applicable — and all documentation is provided ahead of export for every shipment. The certificates below apply to the products we source and supply.
              </p>
            </Reveal>

            {/* Certificate cards — single gold color */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {certs.map(({ icon: Icon, name, short }, i) => (
                <Reveal
                  key={name}
                  delay={(i % 4) * 80}
                  className="group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-mangrove-accent/20 bg-mangrove-50 hover:bg-mangrove-900 hover:border-mangrove-accent hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* Radial gold glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)" }} />
                  {/* Icon in gold */}
                  <div className="w-14 h-14 rounded-2xl border-2 border-mangrove-accent/30 group-hover:border-mangrove-accent bg-white group-hover:bg-mangrove-accent flex items-center justify-center mb-4 transition-all duration-300 relative z-10">
                    <Icon className="w-6 h-6 text-mangrove-accent group-hover:text-mangrove-900 transition-colors duration-300" />
                  </div>
                  {/* Short label */}
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-mangrove-accent mb-1 relative z-10">{short}</span>
                  {/* Full name */}
                  <span className="text-xs font-medium text-mangrove-900 group-hover:text-white leading-snug transition-colors duration-300 relative z-10">{name}</span>
                </Reveal>
              ))}

              {/* "Applicable to your shipment?" card */}
              <Reveal
                delay={certs.length * 80}
                className="group relative flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-mangrove-accent/30 hover:border-mangrove-accent bg-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="text-xs text-mangrove-800/50 group-hover:text-mangrove-accent leading-relaxed transition-colors duration-300">
                  Ask which certificates apply to your specific commodity and destination.
                </span>
                <Link
                  href="/trading#contact"
                  className="mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-mangrove-accent hover:gap-2 transition-all duration-200"
                >
                  Ask Us <ArrowUpRight className="w-3 h-3" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-6 lg:px-20 py-5">
          <div className="flex-1 h-px bg-mangrove-100" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent whitespace-nowrap">Trade Inquiry</span>
          <div className="flex-1 h-px bg-mangrove-100" />
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="px-6 lg:px-20 pb-4">
          <div className="max-w-6xl mx-auto">
            <Reveal className="p-8 sm:p-12 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">Ask About a Specific Lot or Grade</h3>
                <p className="text-slate-300 text-sm">Tell us the commodity and grade and we&apos;ll walk you through our QA process for it.</p>
              </div>
              <Link
                href="/trading#contact"
                className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
              >
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
