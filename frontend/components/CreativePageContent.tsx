"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import CreativeHeroVisual from "./CreativeHeroVisual";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";
import HeroSocialBar from "@/components/HeroSocialBar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

// Back → Front  |  anchor: "cover"=sky fill  "top"=clouds  "bottom"=ground elements
// offset: extra px pushed DOWN from natural anchor at rest (layers start lower → travel further up = more evident parallax)
// travel is capped at maxScroll*0.4 so layers never fully exit the viewport
const PARALLAX_LAYERS = [
  { src: "/images/Digital Marketing agency/layer-bg.png", speed: 0.00, anchor: "cover",  offset: 0  }, // sky gradient — fills full section
  { src: "/images/Digital Marketing agency/layer-0.png",  speed: 0.06, anchor: "top",    offset: 30 }, // cloud / mist streaks
  { src: "/images/Digital Marketing agency/layer-1.png",  speed: 0.18, anchor: "bottom", offset: 50 }, // mountain peak
  { src: "/images/Digital Marketing agency/layer-2.png",  speed: 0.32, anchor: "bottom", offset: 50 }, // distant pale hills
  { src: "/images/Digital Marketing agency/layer-3.png",  speed: 0.48, anchor: "bottom", offset: 36 }, // gradient rocky cliffs
  { src: "/images/Digital Marketing agency/layer-4.png",  speed: 0.65, anchor: "bottom", offset: 24 }, // medium green hills
  { src: "/images/Digital Marketing agency/layer-5.png",  speed: 0.82, anchor: "bottom", offset: 12 }, // dark trees on rocks
  { src: "/images/Digital Marketing agency/layer-6.png",  speed: 1.00, anchor: "bottom", offset: 0  }, // dark foreground pines — fastest
];

function cmsImage(filename: string, alt: string) {
  return { src: `${API_BASE_URL}/storage/service-images/${filename}`, alt, remote: true as const };
}

const workTeaser = [
  { src: "/images/portfolio/strandbio/03.jpg", alt: "Strand Biolife brand identity — outdoor billboard", label: "Branding", title: "Strand Biolife", href: "/creative/work/strandbio" },
  { src: "/images/portfolio/ETTARA/ettara.jpg", alt: "Ettara brand identity — silver foil business cards on matte black", label: "Branding · Packaging", title: "Ettara", href: "/creative/work/ettara" },
  { src: "/images/portfolio/Zaincart/work-zain-1.jpg", alt: "ZainCart e-commerce app on mobile", label: "Web Development", title: "ZainCart", href: "/creative/work/zaincart" },
];

const serviceGroups = [
  {
    title: "Advertising & Communication",
    items: ["Campaign Strategy", "Advertising Campaigns", "Communication Strategy", "Campaign Execution"],
    slug: "advertising",
    icon: "/images/icons/advertising-icon.png",
  },
  {
    title: "Digital Marketing",
    items: ["Digital Strategy", "SEO", "Social Media Marketing", "Paid Digital Advertising", "Analytics & Reporting"],
    slug: "digital-marketing",
    icon: "/images/icons/digital-marketing-icon.png",
  },
  {
    title: "Branding & Creative",
    items: ["Brand Strategy", "Naming", "Visual Identity", "Packaging Design"],
    slug: "branding",
    icon: "/images/icons/branding-icon.png",
  },
  {
    title: "Content & Production",
    items: ["Copywriting", "Product & Corporate Photography", "Video Content", "Motion Graphics"],
    slug: "content-production",
    icon: "/images/icons/content-production-icon.png",
  },
  {
    title: "Web & Digital Experiences",
    items: ["Corporate Websites", "Landing Pages", "UI/UX", "CMS Development"],
    slug: "web-development",
    icon: "/images/icons/web-development-icon.png",
  },
];

const whyItems = [
  { title: "Strategic Thinking", desc: "Every campaign begins with a clear objective." },
  { title: "Creative Execution", desc: "Ideas converted into useful business communication." },
  { title: "Business Understanding", desc: "Marketing that supports commercial goals." },
  { title: "Integrated Capability", desc: "Strategy, creative, digital and communication working together." },
  { title: "Flexible Engagement", desc: "Project-based, campaign-based or ongoing support." },
];



export default function CreativePageContent({ heroLayerSrcs }: { heroLayerSrcs?: string[] } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "#home" ? pathname === "/creative" : pathname === href || pathname.startsWith(href + "/");

  const layerRefs   = useRef<Array<HTMLImageElement | null>>([]);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);

  const activeLayers = PARALLAX_LAYERS.map((layer, i) =>
    heroLayerSrcs?.[i] ? { ...layer, src: heroLayerSrcs[i] } : layer  // empty string falls through to default
  );

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      const textEl  = heroTextRef.current;
      if (!wrapper) return;

      const rect      = wrapper.getBoundingClientRect();
      const scrolled  = Math.max(0, -rect.top);
      const maxScroll = wrapper.offsetHeight - window.innerHeight;
      const progress  = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;

      // Cap travel to 40% of the scroll range so terrain layers never fully exit the viewport
      const travel = maxScroll * 0.4;
      const vh     = window.innerHeight;

      // Parallax layers — offset pushes them down at rest; speed drives upward travel on scroll
      activeLayers.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (el) el.style.transform = `translateY(${layer.offset - layer.speed * travel * progress}px)`;
      });

      // Fixed text: fades out at 60% scroll progress so parallax plays cleanly before next section
      if (textEl) {
        const inView = rect.top < vh && rect.bottom > 0;
        if (!inView) {
          textEl.style.opacity       = "0";
          textEl.style.pointerEvents = "none";
        } else {
          const opacity = progress > 0.48
            ? Math.max(0, 1 - (progress - 0.48) / 0.18)
            : 1;
          textEl.style.opacity       = String(opacity);
          textEl.style.pointerEvents = opacity > 0.2 ? "auto" : "none";
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      {/* ── DIVISION HEADER ── */}
      <header className="fixed top-0 left-0 w-full z-50" style={{ height: 88 }}>
        <div className="absolute inset-x-0 bg-mangrove-accent" style={{ top: 22, height: 44 }}>
          <div className="hidden lg:flex h-full max-w-screen-2xl mx-auto">
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Home","#home"],["About","/creative/about"],["Services","/creative/services"],["Portfolio","/creative/work"]].map(([l,h])=>(
                <a key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className={`absolute -bottom-0.75 left-0 h-[1.5px] bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full ${isActive(h) ? "w-full" : "w-0"}`} />
                </a>
              ))}
            </nav>
            <div style={{ width: 210, flexShrink: 0 }} />
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Blog","/creative/blog"],["Contact","/creative/contact"],["Explore Other Businesses","/"]].map(([l,h])=>(
                <a key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className={`absolute -bottom-0.75 left-0 h-[1.5px] bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full ${isActive(h) ? "w-full" : "w-0"}`} />
                </a>
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
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 bg-mangrove-900 flex items-center justify-center group" style={{ top: 0, height: 88, width: 210, clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)", zIndex: 1 }}>
          <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-17.5 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-95" alt="Mangroves Global" priority />
        </Link>
      </header>

      <div aria-hidden className={`fixed inset-0 z-59 bg-mangrove-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)} />
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
          {[["Home","#home"],["About","/creative/about"],["Services","/creative/services"],["Portfolio","/creative/work"],["Blog","/creative/blog"],["Contact","/creative/contact"],["Explore Other Businesses","/"]].map(([label,href])=>(
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
              className={`group flex items-center justify-between px-6 py-4 font-serif text-xl border-b border-mangrove-50 hover:bg-mangrove-50/60 hover:text-mangrove-accent hover:pl-9 transition-all duration-200 ${isActive(href) ? "text-mangrove-accent pl-9" : "text-mangrove-900"}`}>
              {label}
              <span className={`text-base group-hover:text-mangrove-accent group-hover:translate-x-1 transition-all duration-200 ${isActive(href) ? "text-mangrove-accent" : "text-mangrove-300"}`}>→</span>
            </a>
          ))}
        </nav>
      </aside>

      <main>
        {/* ── STICKY PARALLAX WRAPPER ──────────────────────────────────────────────
            200vh height gives one full viewport of scroll to animate through.
            The inner section is sticky so it stays visible the whole time.      */}
        <div ref={wrapperRef} style={{ height: "200vh", background: "#0D1A10" }}>
        <section
          className="sticky top-0 overflow-hidden"
          style={{ height: "100svh", minHeight: "500px", zIndex: 3, background: "#0D1A10" }}
          aria-label="Hero"
        >
          {/* ── All parallax layers — back to front ── */}
          {activeLayers.map((layer, i) => {
            const base: React.CSSProperties = {
              position: "absolute",
              left: 0,
              willChange: "transform",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: i + 1,
            };

            let specific: React.CSSProperties;
            if (layer.anchor === "cover") {
              specific = { top: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" };
            } else if (layer.anchor === "top") {
              // Clouds: start offset px below the top so they visibly travel upward
              specific = { top: 0, width: "100%", height: "auto" };
            } else {
              // Terrain layers: pin bottom; offset shifts them down, parallax pulls them up
              specific = { bottom: 0, width: "100%", height: "auto" };
            }

            return (
              <img
                key={layer.src}
                ref={(el: HTMLImageElement | null) => { layerRefs.current[i] = el; }}
                src={layer.src}
                alt=""
                aria-hidden
                style={{ ...base, ...specific }}
              />
            );
          })}

          {/* Top fade — blends the dark section top with the fixed navbar edge */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "160px",
              background: "linear-gradient(to bottom, #0D1A10 0%, #0D1A10 40%, transparent 100%)",
              zIndex: 11,
              pointerEvents: "none",
            }}
          />

          {/* Ground fill — solid dark forest-green base seals gaps between tree trunks
              where the golden mountain layer would otherwise bleed through */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "300px",
              background: "linear-gradient(to bottom, transparent 0%, #0D1A10 38%)",
              zIndex: 9,
              pointerEvents: "none",
            }}
          />

          {/* Subtle vignette — lifts white text off the bright sky */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

        </section>
        </div>{/* end sticky parallax wrapper */}

        {/* ── FIXED text + CTA — sits above the parallax, truly static for full scroll ── */}
        <div
          ref={heroTextRef}
          className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ zIndex: 50, pointerEvents: "auto" }}
          aria-hidden={false}
        >
          <div
            className="inline-flex items-center px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] mb-6 font-semibold backdrop-blur-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.45)",
              background: "rgba(0,0,0,0.22)",
              color: "#F2C94C",
            }}
          >
            Performance Marketing &amp; Digital Advertising
          </div>
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[1.08] mb-8"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 24px rgba(0,0,0,0.50), 0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Performance Marketing
            <br />
            <span style={{ color: "#F2C94C", fontWeight: 400 }}>&amp; Digital Ad Positioning.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/creative/contact"
              className="px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase text-center transition-all duration-300 shadow-lg"
              style={{ background: "#F2C94C", color: "#1C2B1E" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F2C94C"; }}
            >
              Start a Project
            </a>
            <Link
              href="/creative/services"
              className="px-8 py-4 rounded-full font-medium text-xs tracking-widest uppercase text-center transition-all duration-300 backdrop-blur-sm"
              style={{ border: "1.5px solid rgba(255,255,255,0.65)", color: "#ffffff" }}
            >
              Explore Our Services
            </Link>
          </div>
          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-8 animate-pulse" style={{ background: "rgba(255,255,255,0.5)" }} />
          </div>

          {/* Social icons — bottom-left of hero */}
          <div className="absolute left-6 lg:left-10 bottom-8">
            <HeroSocialBar />
          </div>
        </div>


        {/* ── INTRO — contained video beside/above the text ── */}
        <section
          id="about"
          className="py-28 px-6 lg:px-16 bg-white"
          style={{ position: "relative", zIndex: 2, marginTop: "-100svh" }}
        >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Contained video */}
            <div
              className="w-full lg:w-1/2 shrink-0 overflow-hidden rounded-2xl shadow-xl"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src="/videos/Animating_corporate_marketing_wo…_20261024110142.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Text content beside the video */}
            <Reveal className="lg:w-1/2">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Introduction</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-4 mb-5 leading-tight">
                Creative Thinking.<br />
                <span className="text-mangrove-accent">Strategic Execution.</span>
              </h2>
              <p className="text-mangrove-800/65 leading-relaxed text-base">
                We combine strategy, creativity and digital execution to help businesses stay consistent across every channel — with marketing built around measurable objectives, not just content for its own sake.
              </p>
              <Link
                href="/creative/about"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 text-xs tracking-widest font-semibold uppercase group"
              >
                About Us
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── MARQUEE DIVIDER 1 ── */}
        <div
          className="overflow-x-clip border-y border-mangrove-accent/15 bg-mangrove-900 py-3.5"
          style={{ position: "relative", zIndex: 2 }}
          aria-hidden
        >
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 32s linear infinite", willChange: "transform" }}
          >
            {[
              "LOGO DESIGN","WEB DEVELOPMENT","DIGITAL MARKETING","BRAND STRATEGY",
              "AD POSITIONING","CONTENT PRODUCTION","CAMPAIGN MANAGEMENT","UI/UX DESIGN",
              "LOGO DESIGN","WEB DEVELOPMENT","DIGITAL MARKETING","BRAND STRATEGY",
              "AD POSITIONING","CONTENT PRODUCTION","CAMPAIGN MANAGEMENT","UI/UX DESIGN",
            ].map((w, i) => (
              <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.32em] text-mangrove-accent/55 px-9">
                {w}&nbsp;&nbsp;<span className="text-mangrove-accent/30">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div
          className="bg-white border-b border-mangrove-100 py-14 px-6 lg:px-16"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Reveal className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: "200+", label: "Brands Served" },
              { num: "5",    label: "Countries Active" },
              { num: "12+",  label: "Service Verticals" },
              { num: "8+",   label: "Years of Craft" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-serif text-5xl sm:text-6xl font-bold text-mangrove-accent leading-none mb-2">{num}</div>
                <div className="text-[11px] uppercase tracking-widest text-mangrove-800/50 font-semibold">{label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* ── SERVICES ── */}
        <section
          id="services"
          className="py-24 px-6 lg:px-16 bg-mangrove-50"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Angled top edge */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }} />
          <div className="max-w-6xl mx-auto relative">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Services</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">What we do</h2>
              </div>
              <Link href="/creative/services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors group">
                View All Services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {serviceGroups.map((group, i) => (
                <Reveal key={group.title} delay={(i % 5) * 70}>
                <Link
                  href={`/creative/${group.slug}`}
                  className="group block p-6 rounded-2xl border border-mangrove-100 bg-white
                             hover:border-mangrove-accent hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)]
                             transition-all duration-300"
                >
                  <Image src={group.icon} alt="" width={40} height={40} className="w-10 h-10 mb-4 object-contain group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-base font-semibold text-mangrove-900 mb-3 group-hover:text-mangrove-accent transition-colors duration-300">{group.title}</h3>
                  <ul className="text-xs text-mangrove-800/60 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ── */}
        <section
          className="py-24 px-6 lg:px-16 bg-mangrove-900 text-white relative overflow-hidden"
          style={{ zIndex: 2 }}
        >
          {/* Subtle diagonal grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #F2C94C 0, #F2C94C 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }}
          />
          <div className="max-w-6xl mx-auto relative">
            <Reveal className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Why Mangroves Global</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-3">Why businesses work with us</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {whyItems.map((item, i) => (
                <Reveal key={item.title} delay={(i % 5) * 70}>
                  <div className="group border border-white/8 rounded-xl p-5 hover:border-mangrove-accent/40 hover:bg-white/5 transition-all duration-300">
                    <h3 className="font-serif text-white font-semibold mb-2 group-hover:text-mangrove-accent transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-white/55">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE DIVIDER 2 — reversed direction ── */}
        <div
          className="overflow-x-clip border-y border-mangrove-100 bg-white py-3.5"
          style={{ position: "relative", zIndex: 2 }}
          aria-hidden
        >
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 38s linear infinite reverse", willChange: "transform" }}
          >
            {[
              "STRATEGY","VISUAL IDENTITY","STORYTELLING","GROWTH","CAMPAIGNS",
              "DIGITAL PRESENCE","POSITIONING","BRANDING","STRATEGY","VISUAL IDENTITY",
              "STORYTELLING","GROWTH","CAMPAIGNS","DIGITAL PRESENCE","POSITIONING","BRANDING",
            ].map((w, i) => (
              <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.32em] text-mangrove-900/25 px-9">
                {w}&nbsp;&nbsp;<span className="text-mangrove-accent/40">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── WORK ── */}
        <section
          id="work"
          className="py-24 px-6 lg:px-16 bg-white"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Selected Work</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Recent projects</h2>
              </div>
              <Link
                href="/creative/work"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors group"
              >
                View Full Portfolio
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {workTeaser.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                <Link
                  href={item.href}
                  className="group block rounded-2xl overflow-hidden border border-mangrove-100
                             hover:border-mangrove-accent hover:-translate-y-2
                             hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
                             transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-mangrove-accent uppercase tracking-widest font-semibold mb-1">{item.label}</div>
                    <h3 className="font-serif text-lg font-bold text-mangrove-900 mb-2 group-hover:text-mangrove-accent transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-mangrove-800/50 group-hover:text-mangrove-900 transition-colors">
                      View case study <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </p>
                  </div>
                </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
