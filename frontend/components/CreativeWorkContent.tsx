"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceHeroImage from "./ServiceHeroImage";
import Reveal from "./Reveal";

const industries = [
  "Food & FMCG", "Trading & Distribution", "Logistics", "Real Estate",
  "Retail", "Professional Services", "Hospitality", "E-Commerce",
];

export type PhotoTile = {
  kind: "photo";
  image: { src: string; alt: string; remote: boolean };
  category: string;
  title: string;
  shape?: "tall" | "wide";
  link?: string;
};

export type ToneTile = {
  kind: "tone";
  tone: "ink" | "teal" | "gold" | "sand";
  category: string;
  title: string;
};

export type Tile = PhotoTile | ToneTile;

type HeroFloat = { src: string; alt: string };

type Props = {
  columns: Tile[][];
  heroFloats: HeroFloat[];
};

const FILTERS = [
  "All",
  "Branding",
  "Digital Marketing",
  "Web Development",
  "Content Production",
  "Advertising",
];

// ── Per-row reveal hook ────────────────────────────────────────────────────
function useRowReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "0px 0px 120px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Photo project row ──────────────────────────────────────────────────────
function PhotoRow({ tile, index }: { tile: PhotoTile; index: number }) {
  const { ref, visible } = useRowReveal();
  const isEven = index % 2 === 0;
  const numStr = String(index + 1).padStart(2, "0");
  const dur = 900;
  const ease = "cubic-bezier(0.22,1,0.36,1)";

  const inner = (
    <div
      className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-0 py-7 lg:py-10 ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* ── Text column ── */}
      <div
        className={`flex-1 flex flex-col justify-center ${isEven ? "lg:pr-12" : "lg:pl-12"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0)"
            : `translateX(${isEven ? "-40px" : "40px"})`,
          transition: `opacity ${dur}ms ${ease}, transform ${dur}ms ${ease}`,
        }}
      >
        {/* Decorative number */}
        <span
          aria-hidden
          className="font-serif font-black leading-none select-none block mb-0"
          style={{
            fontSize: "clamp(44px,6vw,80px)",
            color: "#F2C94C",
            opacity: 0.13,
            lineHeight: 1,
          }}
        >
          {numStr}
        </span>

        {/* Category */}
        <span
          className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent block"
          style={{ marginTop: "-0.4em", marginBottom: "0.5rem" }}
        >
          {tile.category}
        </span>

        {/* Title */}
        <h2
          className="font-serif font-bold text-mangrove-900 leading-tight mb-3"
          style={{ fontSize: "clamp(20px,2.4vw,32px)" }}
        >
          {tile.title}
        </h2>

        {/* CTA */}
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-mangrove-800/40 group-hover:text-mangrove-accent transition-colors duration-300">
          View case study{" "}
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </span>
      </div>

      {/* ── Image column ── */}
      <div
        className="w-full lg:w-[50%] shrink-0 rounded-xl overflow-hidden"
        style={{
          clipPath: visible
            ? "inset(0 0% 0 0 round 12px)"
            : isEven
            ? "inset(0 100% 0 0 round 12px)"
            : "inset(0 0 0 100% round 12px)",
          transition: `clip-path 1.05s cubic-bezier(0.77,0,0.175,1) 0.18s`,
        }}
      >
        <div
          className="w-full relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          style={{ aspectRatio: "16/9" }}
        >
          <ServiceHeroImage
            src={tile.image.src}
            alt={tile.image.alt}
            remote={tile.image.remote}
          />
        </div>
      </div>
    </div>
  );

  return (
    <article
      ref={ref}
      className="border-t border-mangrove-100 group relative"
    >
      {tile.link ? <Link href={tile.link}>{inner}</Link> : inner}
    </article>
  );
}

// ── Tone placeholder row ───────────────────────────────────────────────────
const toneBg: Record<ToneTile["tone"], string> = {
  ink: "#0D1A10", teal: "#1A3A2A", gold: "#F2C94C", sand: "#ECE5D8",
};
const toneText: Record<ToneTile["tone"], string> = {
  ink: "#ffffff", teal: "#ffffff", gold: "#1C2B1E", sand: "#1C2B1E",
};

function ToneRow({ tile, index }: { tile: ToneTile; index: number }) {
  const { ref, visible } = useRowReveal();
  const numStr = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 0;
  const dur = 900;
  const ease = "cubic-bezier(0.22,1,0.36,1)";

  return (
    <article ref={ref} className="border-t border-mangrove-100">
      <div
        className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-0 py-7 lg:py-10 ${
          !isEven ? "lg:flex-row-reverse" : ""
        }`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: `opacity ${dur}ms ${ease}, transform ${dur}ms ${ease}`,
        }}
      >
        {/* Text column */}
        <div className={`flex-1 flex flex-col justify-center ${isEven ? "lg:pr-12" : "lg:pl-12"}`}>
          <span
            aria-hidden
            className="font-serif font-black leading-none select-none block"
            style={{ fontSize: "clamp(44px,6vw,80px)", color: "#F2C94C", opacity: 0.13, lineHeight: 1 }}
          >
            {numStr}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent block"
            style={{ marginTop: "-0.4em", marginBottom: "0.5rem" }}
          >
            {tile.category}
          </span>
          <h2
            className="font-serif font-bold text-mangrove-900 leading-tight mb-3"
            style={{ fontSize: "clamp(20px,2.4vw,32px)" }}
          >
            {tile.title}
          </h2>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-mangrove-800/30">
            Case study in progress
          </span>
        </div>

        {/* Placeholder panel */}
        <div
          className="w-full lg:w-[50%] shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ aspectRatio: "16/9", background: toneBg[tile.tone] }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${toneText[tile.tone]}0d 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />
          <span
            className="font-serif font-black select-none"
            style={{ fontSize: "clamp(64px,12vw,160px)", color: toneText[tile.tone], opacity: 0.06, lineHeight: 1 }}
          >
            {numStr}
          </span>
          <span
            className="absolute bottom-5 right-6 text-[10px] uppercase tracking-widest font-semibold"
            style={{ color: tile.tone === "gold" || tile.tone === "sand" ? "#1C2B1E" : "#F2C94C", opacity: 0.5 }}
          >
            {tile.category}
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function CreativeWorkContent({ columns }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const mouseRef    = useRef({ x: -999, y: -999 });

  const allTiles = columns.flat();
  const filtered =
    activeFilter === "All"
      ? allTiles
      : allTiles.filter((t) =>
          t.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
          activeFilter.toLowerCase().includes(t.category.toLowerCase().split(" ")[0])
        );

  // Hero particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = canvas;
    let animId: number;
    const N = 80, LINK = 130;
    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const pts: P[] = [];
    function resize() { c.width = c.offsetWidth; c.height = c.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < N; i++)
      pts.push({ x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.5, a: Math.random() * 0.4 + 0.1 });
    function frame() {
      ctx!.clearRect(0, 0, c.width, c.height);
      const m = mouseRef.current;
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx!.beginPath(); ctx!.moveTo(pts[i].x, pts[i].y); ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.strokeStyle = `rgba(242,201,76,${(1 - d / LINK) * 0.18})`; ctx!.lineWidth = 0.6; ctx!.stroke();
          }
        }
      pts.forEach((p) => {
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(242,201,76,${p.a})`; ctx!.fill();
        const mdx = m.x - p.x, mdy = m.y - p.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 110) { p.x -= (mdx / md) * 1.5; p.y -= (mdy / md) * 1.5; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; } if (p.x > c.width) { p.x = c.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; } if (p.y > c.height) { p.y = c.height; p.vy *= -1; }
      });
      animId = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[80vh] flex flex-col justify-center bg-mangrove-900 overflow-hidden pt-22"
          onMouseMove={handleHeroMouseMove}
        >
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
            backgroundImage: "radial-gradient(circle, rgba(242,201,76,0.06) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
          <div aria-hidden className="absolute left-0 top-0 bottom-0 w-px pointer-events-none" style={{ zIndex: 2,
            background: "linear-gradient(to bottom, transparent, rgba(242,201,76,0.3) 40%, rgba(242,201,76,0.3) 60%, transparent)" }} />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-16 py-16 w-full" style={{ zIndex: 10 }}>
            <nav
              className="text-xs text-white/35 mb-8 flex items-center gap-2"
              style={{ animation: "wordRise 0.6s cubic-bezier(0.22,1,0.36,1) 200ms both" }}
            >
              <Link href="/creative" className="hover:text-mangrove-accent transition-colors">Creative</Link>
              <span>/</span>
              <span className="text-white/60">Work</span>
            </nav>

            <div
              className="inline-flex items-center px-3.5 py-1.5 rounded-full mb-7 text-[10px] uppercase tracking-[0.3em] font-semibold"
              style={{ border: "1px solid rgba(242,201,76,0.3)", color: "#F2C94C", background: "rgba(242,201,76,0.07)",
                animation: "wordRise 0.65s cubic-bezier(0.22,1,0.36,1) 320ms both" }}
            >
              {allTiles.filter(t => t.kind === "photo").length} Projects &nbsp;✦&nbsp; UAE Creative Work
            </div>

            <h1 className="font-serif font-bold leading-[1.05] tracking-tighter mb-8" style={{ fontSize: "clamp(56px,10vw,120px)" }}>
              {(["Bragging", "Rights."] as const).map((word, i) => (
                <span key={word} className="block" style={{ overflow: "hidden" }}>
                  <span className="block" style={{
                    animation: "wordRise 0.9s cubic-bezier(0.22,1,0.36,1) both",
                    animationDelay: `${460 + i * 200}ms`,
                    color: i === 1 ? "#F2C94C" : "#ffffff",
                  }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="text-white/45 text-base sm:text-lg max-w-lg leading-relaxed mb-10"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 880ms both" }}
            >
              Brand identity, digital campaigns, content and web builds — for UAE businesses that needed their marketing to actually perform.
            </p>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2" style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 1020ms both" }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-250 hover:scale-105"
                  style={{
                    background: activeFilter === f ? "#F2C94C" : "rgba(255,255,255,0.06)",
                    color:      activeFilter === f ? "#1C2B1E" : "rgba(255,255,255,0.5)",
                    border:     activeFilter === f ? "none"    : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Marquee ─────────────────────────────────────────────────────── */}
        <div className="overflow-x-clip border-y border-mangrove-accent/15 bg-mangrove-900 py-3" aria-hidden>
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite", willChange: "transform" }}>
            {["BRANDING","WEB DEVELOPMENT","DIGITAL MARKETING","CONTENT PRODUCTION","ADVERTISING",
              "BRANDING","WEB DEVELOPMENT","DIGITAL MARKETING","CONTENT PRODUCTION","ADVERTISING",
              "BRANDING","WEB DEVELOPMENT","DIGITAL MARKETING","CONTENT PRODUCTION","ADVERTISING",
            ].map((w, i) => (
              <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.32em] text-mangrove-accent/50 px-8">
                {w}&nbsp;&nbsp;<span className="text-mangrove-accent/25">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Sequential project list ──────────────────────────────────────── */}
        <section className="bg-white py-10 sm:py-14 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">

            {/* Count / clear-filter line */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-mangrove-100">
              <span className="text-xs text-mangrove-800/35 uppercase tracking-widest font-semibold">
                {activeFilter === "All" ? `${filtered.length} projects` : `${filtered.length} in ${activeFilter}`}
              </span>
              {activeFilter !== "All" && (
                <button onClick={() => setActiveFilter("All")} className="text-xs text-mangrove-accent hover:underline tracking-widest uppercase font-semibold">
                  Clear filter
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="py-28 text-center text-mangrove-800/30 font-serif text-xl italic">
                No projects in this category yet — check back soon.
              </div>
            ) : (
              <div>
                {filtered.map((tile, i) =>
                  tile.kind === "photo" ? (
                    <PhotoRow key={`${tile.title}-${i}`} tile={tile} index={i} />
                  ) : (
                    <ToneRow key={`${tile.title}-${i}`} tile={tile} index={i} />
                  )
                )}
                <div className="border-t border-mangrove-100" />
              </div>
            )}
          </div>
        </section>

        {/* ── Industries ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-50 border-t border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-xl mb-10">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Industries</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Who we work with</h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {industries.map((ind, i) => (
                <Reveal key={ind} delay={(i % 8) * 50}>
                  <div className="p-4 rounded-xl border border-mangrove-100 bg-white text-xs font-medium text-mangrove-900 text-center
                                  hover:border-mangrove-accent hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
                    {ind}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-900">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold block mb-3">Start Your Project</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Want work like this for your brand?
              </h2>
              <p className="text-white/45 text-sm">Tell us what you&apos;re building — we&apos;ll put together the right team.</p>
            </div>
            <Link
              href="/creative/contact"
              className="shrink-0 relative overflow-hidden px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{ background: "#F2C94C", color: "#1C2B1E", animation: "pulseRing 2.5s ease-in-out 2s infinite" }}
            >
              <span className="relative z-10">Start a Project</span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)", backgroundSize: "200% 100%", animation: "ctaShimmer 2.2s linear 1s infinite" }}
              />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
