"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { ArrowUpRight } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import HeroSocialBar from "@/components/HeroSocialBar";

const marketRates = [
  { label: "8mm+", value: "Dhs 170-162" },
  { label: "8mm", value: "Dhs 164-153" },
  { label: "7.5mm", value: "Dhs 156-147" },
  { label: "7-8mm", value: "Dhs 149-140" },
  { label: "7mm", value: "Dhs 143-134" },
  { label: "6-7mm", value: "Dhs 133-124" },
  { label: "6mm", value: "Dhs 125-117" },
  { label: "BULK", value: "Dhs 146-132" },
];

export default function TradingPageContent({ heroVideo, heroPoster }: { heroVideo?: string; heroPoster?: string } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroStickyRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroC1Ref = useRef<HTMLDivElement>(null);
  const heroC2Ref = useRef<HTMLDivElement>(null);
  const heroC3Ref = useRef<HTMLDivElement>(null);
  const heroC4Ref = useRef<HTMLDivElement>(null);
  const heroProgressRef = useRef<HTMLDivElement>(null);
  const heroHintRef = useRef<HTMLDivElement>(null);

  const HERO_VIDEO_START = 3;

  // Scroll-driven hero: a tall section with a `position: sticky` inner viewport
  // (not a JS-simulated pin), progress recomputed from scratch every animation
  // frame from actual layout geometry, and an eased (lerp) approach to the
  // target so motion stays smooth regardless of how choppy real scroll events
  // are. This avoids the asymmetric up/down + seek-stutter issues a
  // scroll-event-driven tween can have on a pinned video.
  useEffect(() => {
    const section = heroSectionRef.current;
    const sticky = heroStickyRef.current;
    const video = heroVideoRef.current;
    const copies = [heroC1Ref.current, heroC2Ref.current, heroC3Ref.current, heroC4Ref.current];
    if (!section || !sticky || !video || copies.some((c) => !c)) return;
    const copyEls = copies as HTMLDivElement[];

    // Each stage's resting transform (its own centering/anchoring) before the
    // scroll-driven reveal offset is layered on top of it.
    const baseTransforms = ["translateY(calc(-50% + 48px))", "", "translateY(-50%)", "translateY(-50%)"];

    // [fadeInStart, fadeInEnd, holdEnd, fadeOutEnd] as fractions of total scroll progress.
    const windows: [number, number, number, number][] = [
      [-1, -0.5, 0.18, 0.28],
      [0.28, 0.36, 0.46, 0.54],
      [0.54, 0.62, 0.74, 0.84],
      [0.84, 0.92, 2, 3],
    ];
    const windowOpacity = (a: number, b: number, c: number, d: number, x: number) =>
      x <= a || x >= d ? 0 : x < b ? (x - a) / (b - a) : x <= c ? 1 : 1 - (x - c) / (d - c);

    function getProgress() {
      const total = section!.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      const rect = section!.getBoundingClientRect();
      return Math.min(1, Math.max(0, -rect.top / total));
    }

    let target = 0;
    let current = 0;
    let duration = 0;
    let lastSeekTime = -1;
    let rafId = 0;
    const EASE = 0.07;

    function applyUI(p: number) {
      copyEls.forEach((el, i) => {
        const o = windowOpacity(...windows[i], p);
        const y = (1 - o) * 24;
        el.style.opacity = String(o);
        el.style.transform = `${baseTransforms[i]} translateY(${y}px)`.trim();
      });
      if (heroProgressRef.current) heroProgressRef.current.style.width = `${p * 100}%`;
      if (heroHintRef.current) heroHintRef.current.style.opacity = p > 0.02 ? "0" : "0.7";
    }

    function tick() {
      if (!video) return;
      target = getProgress();
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 1e-4) current = target;

      if (duration > 0) {
        const t = HERO_VIDEO_START + current * (duration - 0.05 - HERO_VIDEO_START);
        if (Math.abs(t - lastSeekTime) > 1 / 120 && !video.seeking) {
          video.currentTime = t;
          lastSeekTime = t;
        }
      }

      applyUI(current);
      rafId = requestAnimationFrame(tick);
    }

    function onMetadata() {
      if (!video) return;
      duration = video.duration;
      video.pause();
      video.currentTime = HERO_VIDEO_START;
      rafId = requestAnimationFrame(tick);
    }

    if (video.readyState >= 1 && video.duration) {
      onMetadata();
    } else {
      video.addEventListener("loadedmetadata", onMetadata, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);


  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      {/* ── DIVISION HEADER ── */}
      <header className="fixed top-0 left-0 w-full z-50" style={{ height: 88 }}>
        {/* Gold bar */}
        <div className="absolute inset-x-0 bg-mangrove-accent" style={{ top: 22, height: 44 }}>
          {/* Desktop */}
          <div className="hidden lg:flex h-full max-w-screen-2xl mx-auto">
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Home","#home"],["About","/trading/about"],["Commodities","/trading/commodities"],["Contact","/trading/contact"]].map(([l,h])=>(
                <a key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
            <div style={{ width: 210, flexShrink: 0 }} />
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Sourcing & Supply","/trading/sourcing-supply"],["Quality Assurance","/trading/quality-assurance"],["Blog","/trading/blog"],["Explore Other Businesses","/"]].map(([l,h])=>(
                <a key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>
          {/* Mobile hamburger */}
          <div className="lg:hidden flex h-full items-center justify-end px-5">
            <button onClick={() => setMobileMenuOpen((v) => !v)} className="relative flex flex-col justify-center items-center w-9 h-9 focus:outline-none" aria-label="Toggle menu">
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute block h-0.5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
        {/* Shield */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 bg-mangrove-900 flex items-center justify-center group" style={{ top: 0, height: 88, width: 210, clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)", zIndex: 1 }}>
          <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-17.5 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-95" alt="Mangroves Global" priority />
        </Link>
      </header>

      {/* Mobile backdrop */}
      <div aria-hidden className={`fixed inset-0 z-59 bg-mangrove-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)} />
      {/* Mobile panel */}
      <aside className={`fixed top-0 right-0 h-full z-60 flex flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} style={{ width: "min(100vw, 340px)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-mangrove-100 shrink-0">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-10 w-auto" alt="Mangroves Global" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full text-mangrove-700 hover:bg-mangrove-50 transition-colors" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {[["Home","#home"],["About","/trading/about"],["Commodities","/trading/commodities"],["Sourcing & Supply","/trading/sourcing-supply"],["Quality Assurance","/trading/quality-assurance"],["Blog","/trading/blog"],["Contact","/trading/contact"],["Explore Other Businesses","/"]].map(([label,href])=>(
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-between px-6 py-4 font-serif text-xl text-mangrove-900 border-b border-mangrove-50 hover:bg-mangrove-50/60 hover:text-mangrove-accent hover:pl-9 transition-all duration-200">
              {label}
              <span className="text-mangrove-300 text-base group-hover:text-mangrove-accent group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="pt-22">
        {/* HERO */}
        <section ref={heroSectionRef} id="home" className="relative h-[420vh] bg-mangrove-900 -mt-22">
          <div
            ref={heroStickyRef}
            className="sticky w-full overflow-hidden bg-mangrove-900"
            style={{ top: 0, height: "100dvh" }}
          >
            <video
              ref={heroVideoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo ?? "/videos/kerala-cardamom-estate-hero.mp4"}
              poster={heroPoster ?? "/images/trading-hero-video-poster.jpg"}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-mangrove-900/60" />

            {/* C1 — Intro */}
            <div
              ref={heroC1Ref}
              className="pointer-events-none absolute left-6 right-6 lg:left-16 lg:right-16 text-center flex flex-col items-center"
              style={{ top: "50%", transform: "translateY(calc(-50% + 48px))" }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-mangrove-accent/50 bg-white/90 backdrop-blur-md text-mangrove-900 text-xs uppercase tracking-widest mb-8">
                <span>UAE Headquartered • Exporting Indian Spices to the GCC</span>
              </div>
              <h1
                className="font-serif leading-none mb-8"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white/80 tracking-tight">Rooted in Nature,</span>
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold text-mangrove-accent tracking-tight leading-none">Connecting Globally.</span>
              </h1>
              <p className="max-w-2xl text-white/85 text-base sm:text-lg md:text-xl font-light leading-relaxed">
                Supplying UAE and GCC buyers with reliable, origin-linked Indian agricultural commodities through transparent sourcing, disciplined quality control, and export-ready trade execution.
              </p>
            </div>

            {/* C2 — Source */}
            <div
              ref={heroC2Ref}
              className="trading-hero-stage pointer-events-none absolute left-6 right-6 lg:left-16 lg:right-16 bottom-[14vh] max-w-xl"
            >
              <span className="text-mangrove-accent text-xs uppercase tracking-[0.25em] font-semibold block mb-4">01 — Source</span>
              <h2
                className="font-serif leading-none mb-4"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                <span className="block text-base sm:text-xl font-light text-white/50 uppercase tracking-[0.18em] mb-2">Directly From</span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold text-white">Farm To Port.</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                A short, traceable supply chain from Indian growing regions to UAE and GCC buyers.
              </p>
              <Link
                href="/trading/sourcing-supply"
                className="group pointer-events-auto inline-flex items-center text-xs uppercase tracking-widest font-semibold text-white hover:text-mangrove-accent transition-colors"
              >
                See How We Source
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>

            {/* C3 — Quality */}
            <div
              ref={heroC3Ref}
              className="trading-hero-stage pointer-events-none absolute left-6 right-6 lg:left-16 lg:right-16 top-1/2 text-right flex flex-col items-end"
              style={{ transform: "translateY(-50%)" }}
            >
              <span className="text-mangrove-accent text-xs uppercase tracking-[0.25em] font-semibold block mb-4">02 — Quality</span>
              <h2
                className="font-serif leading-none mb-4"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                <span className="block text-4xl sm:text-6xl lg:text-7xl font-normal italic text-mangrove-accent tracking-tight">Signature Quality</span>
                <span className="block text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-1">In Every Batch.</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Structured multi-point inspection, lot by lot, before anything ships.
              </p>
              <Link
                href="/trading/quality-assurance"
                className="group pointer-events-auto inline-flex items-center text-xs uppercase tracking-widest font-semibold text-white hover:text-mangrove-accent transition-colors"
              >
                Our Quality Process
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>

            {/* C4 — Partner */}
            <div
              ref={heroC4Ref}
              className="trading-hero-stage pointer-events-none absolute left-6 right-6 lg:left-16 lg:right-16 top-1/2 text-center flex flex-col items-center"
              style={{ transform: "translateY(-50%)" }}
            >
              <span className="text-mangrove-accent text-xs uppercase tracking-[0.25em] font-semibold block mb-4">03 — Partner</span>
              <h2
                className="font-serif leading-none mb-6"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                <span className="block text-xs sm:text-sm font-semibold text-mangrove-accent uppercase tracking-[0.3em] mb-3">Partnered To Help You</span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">Establish In<br/>The Market.</span>
              </h2>
              <Link
                href="/trading/become-a-partner"
                className="pointer-events-auto px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
              >
                Become a Supplier Partner
              </Link>
            </div>

            {/* Scroll hint */}
            <div
              ref={heroHintRef}
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-7 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-opacity duration-300"
            >
              Scroll
            </div>

            {/* Social icons — bottom-left of sticky hero */}
            <div className="absolute left-6 lg:left-10 bottom-7 z-10">
              <HeroSocialBar />
            </div>

            {/* Progress bar */}
            <div className="absolute left-0 bottom-0 h-0.75 w-full bg-white/10">
              <div ref={heroProgressRef} className="h-full bg-mangrove-accent" style={{ width: "0%" }} />
            </div>
          </div>
        </section>

        {/* Market rate ticker */}
        <section className="relative bg-mangrove-accent overflow-hidden" aria-label="Today's market rates">
          <div className="flex items-stretch">
            <div
              className="relative shrink-0 flex items-center bg-mangrove-800 pl-6 pr-12"
              style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
            >
              <span className="relative z-10 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-mangrove-accent whitespace-nowrap">
                Market Rate
              </span>
            </div>
            <div className="flex-1 min-w-0 py-2 pl-6 pr-4 overflow-x-auto">
              <div className="text-mangrove-900 font-extrabold text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap">
                Indian Green Cardamom
              </div>
              <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold text-mangrove-900 whitespace-nowrap mt-0.5">
                {marketRates.map((rate, i) => (
                  <span key={rate.label} className="inline-flex items-center gap-1.5">
                    <span className="font-bold">{rate.label}:</span>
                    <span className="font-extrabold">{rate.value}</span>
                    {i < marketRates.length - 1 && <span className="opacity-40 ml-4">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About — white section, text left, 3 bottles in dark panel right */}
        <section id="about" className="py-20 sm:py-32 px-6 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <Reveal className="space-y-6">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">About The Company</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-snug">
                Connecting Farmlands<br />to UAE &amp; GCC Trade Gateways.
              </h2>
              <p className="text-mangrove-800/60 leading-relaxed max-w-md">
                Mangroves Global Trading FZ LLC bridges UAE and GCC buyers directly with authentic Indian agricultural origins — direct farm sourcing, structured quality inspections, and disciplined export compliance under one roof.
              </p>
              <Link
                href="/trading/about"
                className="group inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors"
              >
                Learn About Us
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </Reveal>

            {/* Bottles floating on white — height-based sizing keeps all 3 within the panel */}
            <Reveal className="w-full">
              <div className="relative w-full overflow-hidden h-[360px] sm:h-[420px] bg-white">
                {/* Black pepper — left, shorter */}
                <img
                  src="/images/Bottles/Bottle Black pepper.png"
                  draggable="false"
                  alt=""
                  className="bottle-float absolute left-[8%] bottom-0 h-[50%] w-auto select-none mix-blend-multiply"
                  style={{ "--r": "-7deg", animationDuration: "6.4s", animationDelay: "0s", filter: "invert(1) sepia(1) saturate(2) brightness(1.85)" } as React.CSSProperties}
                />
                {/* Cardamom — centre, tallest, top-anchored with breathing room for float animation */}
                <img
                  src="/images/Bottles/Bottle Cradamom.png"
                  draggable="false"
                  alt=""
                  className="bottle-float absolute left-1/2 -translate-x-1/2 top-[5%] h-[72%] w-auto select-none mix-blend-multiply"
                  style={{ "--r": "2deg", animationDuration: "8s", animationDelay: "-3s", filter: "invert(1) sepia(1) saturate(2) brightness(1.85)" } as React.CSSProperties}
                />
                {/* Coffee bean — right, mid-height */}
                <img
                  src="/images/Bottles/Bottle Coffee Bean.png"
                  draggable="false"
                  alt=""
                  className="bottle-float absolute right-[8%] bottom-[2%] h-[46%] w-auto select-none mix-blend-multiply opacity-85"
                  style={{ "--r": "9deg", animationDuration: "9.5s", animationDelay: "-5.5s", filter: "invert(1) sepia(1) saturate(2) brightness(1.85)" } as React.CSSProperties}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Golden scroll divider */}
        <div className="px-6 lg:px-16 py-6 bg-white">
          <Reveal>
            <div className="max-w-7xl mx-auto flex items-center gap-5">
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill" />
              <span className="text-mangrove-accent text-[11px] uppercase tracking-[0.3em] font-semibold whitespace-nowrap shrink-0">
                Mangroves Global · Trading
              </span>
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill-right" />
            </div>
          </Reveal>
        </div>

        {/* Sourcing & Supply — white section, 3 bottles in dark panel left, text right */}
        <section className="py-20 sm:py-32 px-6 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Bottles floating on white — same height-based sizing as About panel */}
            <Reveal className="w-full">
              <div className="relative w-full overflow-hidden h-[360px] sm:h-[420px] bg-white">
                {/* Cinnamon — left, shorter */}
                <img
                  src="/images/Bottles/Bottle Cinnamon.png"
                  draggable="false"
                  alt=""
                  className="bottle-float absolute left-[8%] bottom-0 h-[50%] w-auto select-none mix-blend-multiply"
                  style={{ "--r": "6deg", animationDuration: "7s", animationDelay: "-1s", filter: "invert(1) sepia(1) saturate(2) brightness(1.85)" } as React.CSSProperties}
                />
                {/* Ginger — centre, tallest, top-anchored */}
                <img
                  src="/images/Bottles/Bottle Ginger.png"
                  draggable="false"
                  alt=""
                  className="bottle-float absolute left-1/2 -translate-x-1/2 top-[5%] h-[72%] w-auto select-none mix-blend-multiply"
                  style={{ "--r": "-3deg", animationDuration: "8.5s", animationDelay: "-4s", filter: "invert(1) sepia(1) saturate(2) brightness(1.85)" } as React.CSSProperties}
                />
                {/* Clove — right, mid-height */}
                <img
                  src="/images/Bottles/Bottle Clove.png"
                  draggable="false"
                  alt=""
                  className="bottle-float absolute right-[8%] bottom-[2%] h-[46%] w-auto select-none mix-blend-multiply opacity-85"
                  style={{ "--r": "-8deg", animationDuration: "6.8s", animationDelay: "-2.5s", filter: "invert(1) sepia(1) saturate(2) brightness(1.85)" } as React.CSSProperties}
                />
              </div>
            </Reveal>

            {/* Text + 3-step sourcing chain */}
            <Reveal className="space-y-6">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">How We Source</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-snug">
                Sourcing &amp; Supply —<br />Direct From Origin
              </h2>
              <p className="text-mangrove-800/60 leading-relaxed max-w-md">
                A short, traceable chain — from grower and farm-gate aggregation in India, through our sourcing network, to export-ready lots for UAE and GCC buyers.
              </p>

              <div className="space-y-5 pt-2">
                {([
                  { step: "01", label: "Farm Procurement", desc: "Direct from growers and farm-gate aggregators across producing regions." },
                  { step: "02", label: "Quality Inspection", desc: "Multi-point checks on grade, moisture, and physical condition before dispatch." },
                  { step: "03", label: "Port Dispatch", desc: "Export-ready, documented, and compliant for UAE and GCC import requirements." },
                ] as const).map((item) => (
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
                href="/trading/sourcing-supply"
                className="group inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors"
              >
                See How We Source
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Quality — short teaser */}
        <section id="quality" className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <Reveal className="max-w-3xl mx-auto text-center">
            <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Structured QA Approach</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-mangrove-900 mt-4 leading-snug">
              Quality Control Priorities
            </h2>
            <p className="text-mangrove-800/60 leading-relaxed mt-6 max-w-xl mx-auto">
              From initial farm grading to port dispatch, our structured multi-tier inspection protocols guarantee export-ready consistency for UAE and GCC buyers.
            </p>
            <Link href="/trading/quality-assurance" className="group inline-flex items-center mt-8 text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors">
              Our Quality Process
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </Reveal>
        </section>

        {/* Supplier partnership CTA */}
        <section className="py-16 px-6 lg:px-16 bg-white">
          <Reveal className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-mangrove-900">
            <div>
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold block mb-2">For Producers &amp; Exporters</span>
              <h3 className="font-serif text-2xl text-white mb-2">Are You a Supplier Looking to Enter the UAE?</h3>
              <p className="text-slate-300 text-sm max-w-lg">Mangroves Global can act as your local commercial and sales arm in the UAE.</p>
            </div>
            <Link href="/trading/become-a-partner" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Become a Supplier Partner
            </Link>
          </Reveal>
        </section>

        {/* ── Contact redirect CTA ────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16 border-t border-mangrove-800/30 bg-mangrove-900">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Reveal className="space-y-6">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.3em] block">Commercial Desk</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Ready to Start a Trade Conversation?
              </h2>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
                Tell us the commodity, grade, volume and destination port. Our team responds within one business day.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  href="/trading/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
                >
                  Send a Trade Inquiry
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+971541242100"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-mangrove-accent/40 text-mangrove-accent hover:border-mangrove-accent transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
                >
                  +971 54 1242 100
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
