"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { tradingProducts } from "@/lib/tradingProducts";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

/* ── Per-product accent colours (used for tab underlines & pills) ───── */
const PRODUCT_ACCENT: Record<string, string> = {
  "black-pepper":   "#4A3728",
  "cloves":         "#6B2F1A",
  "nutmeg-mace":    "#B8610A",
  "green-cardamom": "#2A6040",
  "dry-ginger":     "#9B6A1A",
  "coffee-beans":   "#3D1C0A",
};

/* ── SEO taglines ──────────────────────────────────────────────────── */
const TAGLINES: Record<string, string> = {
  "black-pepper":   "The King of Spices — Sourced from Malabar's Coastal Farms",
  "cloves":         "High Eugenol Oil, Handpicked from Kerala's Spice Forests",
  "nutmeg-mace":    "Dual-Spice Excellence — Whole Nutmeg & Crimson Mace Arils",
  "green-cardamom": "Bold 6–8mm Pods from Idukki's Western Ghats, Kerala",
  "dry-ginger":     "Sun-Dried Pungency, Zero Fillers — India's Finest Ginger",
  "coffee-beans":   "High-Altitude Shade-Grown Beans, Export Grade AA & Peaberry",
};

const INTERVAL_MS = 5000;

export default function CommoditiesContent() {
  const [filter, setFilter] = useState<"all" | "spices" | "beverages">("all");
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const filteredProducts =
    filter === "all" ? tradingProducts : tradingProducts.filter(p => p.category === filter);

  const goTo = useCallback((i: number) => {
    if (i === active) return;
    setPrevActive(active);
    setActive(i);
    setAnimKey(k => k + 1);
    setTimerKey(k => k + 1);
    setTimeout(() => setPrevActive(null), 500); // remove after exit clears (imgOut 0.38s + txt 0.08+0.34=0.42s)
  }, [active]);

  /* Auto-advance */
  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % tradingProducts.length;
        setPrevActive(prev);
        setAnimKey(k => k + 1);
        setTimeout(() => setPrevActive(null), 500);
        return next;
      });
      setTimerKey(k => k + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [timerKey]);

  const cur = tradingProducts[active];
  const accent = PRODUCT_ACCENT[cur.slug];

  return (
    <>
      <style>{`
        /* ════════════════════════════════════════════════════════
           CIRCULATING PUSH FLOW:
           new image enters from left AT THE SAME TIME old exits right
           → feels like new product physically pushes old one out
           EXIT  image: 0s    0.42s  → RIGHT (+420px)
           EXIT  text:  0.06s 0.36s  → RIGHT (+260px, follows image)
           ENTER image: 0.04s 0.72s  ← LEFT  (-420px, overlaps exit = push feel)
           ENTER texts: stagger 0.26s 0.36s 0.44s 0.52s 0.60s ← LEFT
        ════════════════════════════════════════════════════════ */

        @keyframes imgOut {
          0%   { opacity:1; transform: translateX(0)     scale(1);    }
          100% { opacity:0; transform: translateX(420px) scale(0.86); }
        }
        @keyframes txtOut {
          0%   { opacity:1; transform: translateX(0); }
          100% { opacity:0; transform: translateX(260px); }
        }
        @keyframes imgIn {
          0%   { opacity:0; transform: translateX(-420px) scale(0.86); }
          100% { opacity:1; transform: translateX(0)      scale(1);    }
        }
        @keyframes txtIn {
          0%   { opacity:0; transform: translateX(-220px); }
          100% { opacity:1; transform: translateX(0); }
        }
        @keyframes btnIn {
          0%   { opacity:0; transform: translateX(-180px) scale(0.92); }
          100% { opacity:1; transform: translateX(0)      scale(1);    }
        }
        @keyframes cmdProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* EXIT — image first, text right behind */
        .img-fly-out { animation: imgOut 0.42s 0.00s cubic-bezier(0.6,0,0.9,0.4) both; }
        .txt-fly-out { animation: txtOut 0.36s 0.06s cubic-bezier(0.6,0,0.9,0.4) both; }

        /* ENTER — image at 0.04s (overlaps exit = push), texts staggered after */
        .img-fly-in    { animation: imgIn 0.72s 0.04s cubic-bezier(0.16,1,0.3,1) both; }
        .txt-fly-in    { animation: txtIn 0.62s 0.26s cubic-bezier(0.16,1,0.3,1) both; }
        .txt-fly-in-d1 { animation: txtIn 0.62s 0.36s cubic-bezier(0.16,1,0.3,1) both; }
        .txt-fly-in-d2 { animation: txtIn 0.62s 0.44s cubic-bezier(0.16,1,0.3,1) both; }
        .txt-fly-in-d3 { animation: txtIn 0.62s 0.52s cubic-bezier(0.16,1,0.3,1) both; }
        .btn-fly-in    { animation: btnIn 0.62s 0.60s cubic-bezier(0.16,1,0.3,1) both; }

        .cmd-progress-bar {
          animation: cmdProgress ${INTERVAL_MS}ms linear forwards;
          transform-origin: left center;
        }
      `}</style>

      <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
        <DivisionHeader division="trading" />

        {/* ══════════════════════════════════════════════════════
            HERO — Delassus-style, white + charcoal/gold
        ══════════════════════════════════════════════════════ */}
        <section
          className="relative mt-22 overflow-hidden border-b border-mangrove-100"
          style={{
            height: "calc(100vh - 5.5rem)",
            background: "linear-gradient(to right, #FBF5E0 0%, #FFFFFF 58%)",
          }}
        >
          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-700"
            style={{ backgroundColor: accent }}
          />

          {/* ── EXIT — whole slide exits to RIGHT (image leads) ──── */}
          {prevActive !== null && (
            <div className="absolute inset-0 flex items-center px-10 sm:px-16 lg:px-24 pointer-events-none" style={{ zIndex: 5 }}>
              <div className="flex items-center gap-12 lg:gap-16 max-w-6xl mx-auto w-full">
                {/* Text LEFT exits right */}
                <div className="txt-fly-out flex-1 space-y-4 min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.35em] font-semibold text-mangrove-accent">
                    {TAGLINES[tradingProducts[prevActive].slug]}
                  </span>
                  <h1 className="font-serif font-bold text-mangrove-900 leading-none" style={{ fontSize: "clamp(2.8rem,9vw,8rem)" }}>
                    {tradingProducts[prevActive].name}
                  </h1>
                </div>
                {/* Image RIGHT exits right first */}
                <div className="img-fly-out shrink-0 hidden md:block" style={{ width: 300, height: 300, position: "relative" }}>
                  <Image src={tradingProducts[prevActive].icon} alt="" fill className="object-contain drop-shadow-xl" aria-hidden />
                </div>
              </div>
            </div>
          )}

          {/* ── ENTER — image enters from LEFT first, text follows ─ */}
          <div className="absolute inset-0 flex flex-col justify-between px-10 sm:px-16 lg:px-24 py-10" style={{ zIndex: 10 }}>

            {/* Breadcrumb */}
            <nav className="text-xs text-mangrove-800/40 flex items-center gap-2">
              <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Trading</Link>
              <span>/</span>
              <Link href="/trading/commodities" className="hover:text-mangrove-accent transition-colors">Commodities</Link>
              <span>/</span>
              <span key={`bc-${animKey}`} className="txt-fly-in text-mangrove-900/70">{cur.name}</span>
            </nav>

            {/* Text LEFT, Image RIGHT — balanced two halves, image leads from left */}
            <div className="flex items-center gap-12 lg:gap-16 flex-1 py-6 max-w-6xl mx-auto w-full">

              {/* Text block — LEFT half */}
              <div className="flex-1 space-y-5 min-w-0">
                {/* Tagline */}
                <span
                  key={`tag-${animKey}`}
                  className="txt-fly-in block text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold text-mangrove-accent"
                >
                  {TAGLINES[cur.slug]}
                </span>

                {/* Giant product name */}
                <h1
                  key={`name-${animKey}`}
                  className="txt-fly-in-d1 font-serif font-bold text-mangrove-900 leading-none"
                  style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)" }}
                >
                  {cur.name}
                </h1>

                {/* Thin gold rule */}
                <div
                  key={`rule-${animKey}`}
                  className="txt-fly-in-d2 h-px w-16 bg-mangrove-accent"
                />

                {/* Grades */}
                <p
                  key={`grades-${animKey}`}
                  className="txt-fly-in-d3 text-xs sm:text-sm text-mangrove-800/60 leading-relaxed max-w-sm"
                >
                  {cur.grades}
                </p>

                {/* CTA — own animation for visibility */}
                <div key={`cta-${animKey}`} className="btn-fly-in flex items-center gap-4 pt-2">
                  <Link
                    href={`/trading/products/${cur.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-mangrove-900 text-mangrove-accent hover:bg-mangrove-accent hover:text-mangrove-900 transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
                  >
                    Discover {cur.name} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <span
                    className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full border"
                    style={{ color: accent, borderColor: `${accent}50`, backgroundColor: `${accent}10` }}
                  >
                    {cur.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Product image — RIGHT half, leads the entrance from left */}
              <div
                key={`icon-${animKey}`}
                className="img-fly-in shrink-0 hidden md:flex items-center justify-center"
                style={{ width: 300, height: 300, position: "relative" }}
              >
                <Image
                  src={cur.icon}
                  alt={cur.iconAlt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority={active === 0}
                />
              </div>

            </div>

            {/* Bottom bar — product tabs + progress */}
            <div className="space-y-3">
              <div className="flex items-end justify-between gap-4">
                {/* Product tabs */}
                <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none flex-1 pb-1">
                  {tradingProducts.map((p, i) => (
                    <button
                      key={p.slug}
                      onClick={() => goTo(i)}
                      className="shrink-0 flex flex-col items-start gap-1.5 group"
                    >
                      <span
                        className={`text-[11px] sm:text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                          i === active ? "text-mangrove-900" : "text-mangrove-900/30"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span
                        className="block h-px transition-all duration-500"
                        style={{
                          width: i === active ? "100%" : "0%",
                          backgroundColor: accent,
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Counter */}
                <span className="shrink-0 text-[11px] tabular-nums text-mangrove-800/30 font-medium">
                  {String(active + 1).padStart(2, "0")} / {String(tradingProducts.length).padStart(2, "0")}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-px bg-mangrove-100 w-full">
                <div
                  key={`progress-${timerKey}`}
                  className="cmd-progress-bar h-full"
                  style={{ backgroundColor: accent }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PRODUCT GRID
        ══════════════════════════════════════════════════════ */}
        <div className="sticky top-20 sm:top-24 z-30 bg-white/95 backdrop-blur-md border-b border-mangrove-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "spices", "beverages"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold border transition-all duration-200 ${
                    filter === cat
                      ? "border-mangrove-900 bg-mangrove-900 text-mangrove-accent"
                      : "border-mangrove-100 bg-transparent text-mangrove-800/60 hover:border-mangrove-900 hover:text-mangrove-900"
                  }`}
                >
                  {cat === "all" ? "All Commodities" : cat === "spices" ? "Spices" : "Coffee"}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-mangrove-800/40 shrink-0 font-medium tabular-nums">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <main className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-10">

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 70}>
                  <Link
                    href={`/trading/products/${p.slug}`}
                    className="group block rounded-2xl border-2 border-mangrove-100 overflow-hidden bg-white hover:border-mangrove-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Icon panel */}
                    <div className="relative h-36 sm:h-44 flex items-center justify-center bg-mangrove-50 group-hover:bg-mangrove-50/70 transition-colors duration-300">
                      <div className="relative" style={{ width: 90, height: 90 }}>
                        <Image
                          src={p.icon}
                          alt={p.iconAlt}
                          fill
                          sizes="90px"
                          className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                        />
                      </div>
                      <span className="absolute top-2.5 left-2.5 bg-mangrove-900/10 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase text-mangrove-900/50">
                        {p.categoryLabel}
                      </span>
                      {/* Tagline overlay on hover */}
                      <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                        <p className="text-[9px] text-mangrove-accent font-medium px-3 py-2 text-center leading-tight bg-mangrove-900/90 backdrop-blur-sm">
                          {TAGLINES[p.slug]}
                        </p>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-4">
                      <h2 className="font-serif text-[15px] sm:text-base font-bold text-mangrove-900 group-hover:text-mangrove-accent transition-colors leading-snug mb-1">{p.name}</h2>
                      <p className="text-mangrove-accent text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-2 leading-tight">{p.grades}</p>
                      <p className="text-mangrove-800/55 text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                      <div className="flex items-center justify-between pt-2.5 border-t border-mangrove-100">
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-mangrove-800/45 font-medium">
                          <span className="w-1 h-1 rounded-full bg-mangrove-accent inline-block" />{p.highlight}
                        </span>
                        <span className="text-mangrove-accent text-sm group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Origin strip */}
            <Reveal className="mt-14 grid sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-3xl bg-mangrove-50 border border-mangrove-100 items-center">
              <div className="space-y-3">
                <span className="text-mangrove-accent text-[10px] uppercase tracking-widest font-semibold">Origin &amp; Quality</span>
                <h3 className="font-serif text-xl text-mangrove-900 leading-snug">Sourced from India&apos;s Prime Spice Regions</h3>
                <p className="text-mangrove-800/60 text-sm leading-relaxed">Each commodity is sourced from established growing belts — Malabar for pepper, Idukki for cardamom, Kerala for cloves — then inspected and graded to export standard before movement to the UAE.</p>
                <Link href="/trading/sourcing-supply" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-mangrove-900 hover:text-mangrove-accent transition-colors">
                  View Sourcing Process <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="relative h-48 sm:h-full min-h-40 rounded-2xl overflow-hidden">
                <Image src="/images/star-anise-cinnamon-sticks.jpg" alt="Star anise and cinnamon sticks — Indian spice origins" fill className="object-cover" />
              </div>
            </Reveal>

            {/* CTA banner */}
            <Reveal className="mt-6 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">Looking for a Specific Grade or Volume?</h3>
                <p className="text-slate-300 text-sm">Tell our commercial desk what you need and we&apos;ll come back with specifications and pricing.</p>
              </div>
              <Link href="/trading/contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
                Talk to Our Team
              </Link>
            </Reveal>

          </div>
        </main>

        <SiteFooter />

      </div>
    </>
  );
}
