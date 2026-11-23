"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2, AlertTriangle,
  MapPin, Phone, Mail, Clock,
  PackageCheck, Globe2, ShieldCheck, ArrowUpRight,
} from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

/* ── Slide timing (fraction of total scroll 0→1) ─────────────────────
   2 slides. Location + footer are real sections below the wrapper.    */
const WINDOWS: [number, number, number, number][] = [
  [0.00, 0.00, 0.38, 0.48],   // Slide 1 — Hero (full opacity from start)
  [0.42, 0.52, 1.00, 1.00],   // Slide 2 — Combined (holds to end)
];

function slideOpacity(progress: number, w: [number, number, number, number]): number {
  const [fi, ps, pe, fo] = w;
  if (progress < fi) return 0;
  if (pe === fo && progress >= pe) return 1;
  if (progress >= fo) return 0;
  if (ps === fi || progress <= ps) return ps === fi ? 1 : (progress - fi) / (ps - fi);
  if (progress <= pe) return 1;
  return 1 - (progress - pe) / (fo - pe);
}

const reasons = [
  { icon: PackageCheck, title: "Direct from Origin",    desc: "Traceable supply from Indian growing regions — not spot-market resale." },
  { icon: Globe2,       title: "UAE & GCC Expertise",   desc: "Ras Al Khaimah base — UAE import documentation and trade-lane timing." },
  { icon: ShieldCheck,  title: "Documented Every Step", desc: "COA, phytosanitary and fumigation certificates with every consignment." },
];

export default function TradingContactContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [activeSlide, setActiveSlide] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const slideRefs  = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const oSmooth = [1, 0];
    const EASE = 0.08;

    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const scrolled    = -wrapper.getBoundingClientRect().top;
        const totalScroll = wrapper.offsetHeight - window.innerHeight;
        const progress    = Math.max(0, Math.min(1, scrolled / totalScroll));

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }

        WINDOWS.forEach((w, i) => {
          const target = slideOpacity(progress, w);
          oSmooth[i]  += (target - oSmooth[i]) * EASE;
          const ref    = slideRefs[i].current;
          if (ref) {
            ref.style.opacity      = String(Math.max(0, oSmooth[i]));
            ref.style.pointerEvents = oSmooth[i] > 0.4 ? "auto" : "none";
            const drift = (1 - Math.min(oSmooth[i], 1)) * (target >= oSmooth[i] ? 18 : -18);
            ref.style.transform    = `translateY(${drift}px)`;
          }
        });

        setActiveSlide(oSmooth[0] >= oSmooth[1] ? 0 : 1);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";
    try {
      const res = await fetch(`${API_BASE_URL}/api/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          division: "trading",
          name:     data.get("name"),
          company:  data.get("company"),
          email:    data.get("email"),
          subject:  data.get("commodity"),
          message:  data.get("message"),
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) { setFormStatus("success"); form.reset(); }
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  }

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="trading" />

      {/* ══════════════════════════════════════════════════════════
          SCROLL PRESENTATION — 2 slides
      ══════════════════════════════════════════════════════════ */}
      <div ref={wrapperRef} className="bg-mangrove-900" style={{ height: "400vh" }}>
        <div className="sticky top-22 overflow-hidden" style={{ height: "calc(100vh - 5.5rem)" }}>

          {/* Progress dots */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
            {["Intro", "Inquiry"].map((label, i) => (
              <div key={label} className="flex items-center gap-2" title={label}>
                <span className="text-[9px] uppercase tracking-widest text-mangrove-900/30 hidden xl:block">{label}</span>
                <span className={`block w-1.5 rounded-full transition-all duration-500 ${activeSlide === i ? "h-8 bg-white" : "h-2.5 bg-white/20"}`} />
              </div>
            ))}
          </div>

          {/* ── SLIDE 1 — Hero ──────────────────────────────────── */}
          <div ref={slideRefs[0]} className="absolute inset-0 lg:grid lg:grid-cols-2 bg-white" style={{ willChange: "opacity, transform" }}>
            {/* Left */}
            <div className="flex flex-col justify-center px-6 lg:px-20 h-full border-r border-mangrove-100">
              <div className="max-w-lg space-y-5">
                <nav className="text-xs text-mangrove-800/45 flex items-center gap-2">
                  <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Trading</Link>
                  <span>/</span><span className="text-mangrove-900/70">Contact</span>
                </nav>
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-[0.28em] block">Commercial Desk — Mangroves Global Trading</span>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-mangrove-900 leading-none">
                  Source.<br />Ship.<br /><span className="text-mangrove-accent">Sorted.</span>
                </h1>
                <div className="h-px bg-mangrove-accent w-16" />
                <p className="text-mangrove-800/65 text-base leading-relaxed">India-origin premium spices and agricultural commodities, export-ready for UAE and GCC buyers.</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight * 0.6, behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-7 py-3.5 bg-mangrove-900 text-mangrove-accent hover:bg-mangrove-accent hover:text-mangrove-900 transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase">
                    Send a Trade Inquiry <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a href="tel:+971541242100" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-mangrove-900/20 text-mangrove-900 hover:border-mangrove-accent hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase">Call Now</a>
                </div>
              </div>
            </div>
            {/* Right — dark info panel */}
            <div className="hidden lg:flex flex-col justify-center bg-mangrove-900 px-16 h-full space-y-8">
              <div className="space-y-2">
                <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Our Commodities</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Black Pepper", "Cloves", "Nutmeg & Mace", "Green Cardamom", "Dry Ginger", "Coffee Beans"].map(c => (
                    <span key={c} className="px-3 py-1.5 rounded-full bg-white/8 border border-mangrove-accent/20 text-xs text-slate-200 font-medium">{c}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Incoterms</span>
                <div className="flex gap-3">{["FOB", "CIF", "CFR"].map(t => <span key={t} className="px-4 py-2 rounded-lg border-2 border-mangrove-accent text-mangrove-accent font-bold text-sm">{t}</span>)}</div>
              </div>
              <div className="space-y-1">
                <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Trade Lanes</span>
                <p className="text-slate-300 text-sm">India → UAE · Saudi Arabia · Oman · Qatar · Kuwait · Bahrain</p>
              </div>
              <div className="h-px bg-mangrove-accent/20" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mangrove-accent animate-pulse" />
                <span className="text-slate-400 text-xs">Responds within 1 business day</span>
              </div>
            </div>
          </div>

          {/* ── SLIDE 2 — Why Us + Form + Contact (merged) ──────── */}
          <div ref={slideRefs[1]} className="absolute inset-0 bg-white overflow-hidden" style={{ opacity: 0, willChange: "opacity, transform" }}>
            <div className="h-full grid lg:grid-cols-5">

              {/* Left column — reasons + contact details */}
              <div className="hidden lg:flex lg:col-span-2 flex-col justify-center px-10 xl:px-14 bg-mangrove-50 border-r border-mangrove-100 space-y-7">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px bg-mangrove-accent w-8" />
                    <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Why Trade With Us</span>
                  </div>
                  <div className="space-y-4">
                    {reasons.map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-mangrove-900 group-hover:bg-mangrove-accent flex items-center justify-center shrink-0 transition-colors duration-300 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-mangrove-accent group-hover:text-mangrove-900 transition-colors duration-300" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-mangrove-900 mb-0.5">{title}</span>
                          <span className="text-xs text-mangrove-800/55 leading-relaxed">{desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-mangrove-200" />
                <div className="space-y-3">
                  {[
                    { icon: Phone, label: "Direct / WhatsApp", value: "+971 54 1242 100",                      href: "tel:+971541242100" },
                    { icon: Mail,  label: "Trade Email",        value: "info@mangrovesglobal.com",              href: "mailto:info@mangrovesglobal.com" },
                    { icon: MapPin,label: "Headquarters",       value: "Al Hamra Industrial Zone-FZ, RAK, UAE", href: undefined },
                    { icon: Globe2,label: "Trade Lanes",        value: "India → UAE · SA · Oman · Qatar · Kuwait · Bahrain", href: undefined },
                    { icon: Clock, label: "Business Hours",     value: "Sun – Thu: 9 AM – 6 PM GST · Response within 1 day", href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-md bg-white border border-mangrove-100 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-mangrove-accent" />
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest text-mangrove-800/40 font-semibold leading-none mb-0.5">{label}</span>
                        {href
                          ? <a href={href} className="text-xs font-medium text-mangrove-900 hover:text-mangrove-accent transition-colors">{value}</a>
                          : <span className="text-xs text-mangrove-800/65">{value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column — form */}
              <div className="lg:col-span-3 flex flex-col justify-center px-6 lg:px-10 xl:px-14 py-8 lg:py-0 overflow-y-auto">
                <div className="max-w-xl w-full mx-auto space-y-5">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="h-px bg-mangrove-accent w-8" />
                      <span className="text-mangrove-accent text-[10px] uppercase tracking-[0.3em] font-semibold">Trade Inquiry</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-mangrove-900">Your Next Supply Deal Starts Here.</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="tc-name" className="block text-[10px] uppercase tracking-wider text-mangrove-800/50 mb-1">Your Name</label>
                        <input id="tc-name" name="name" type="text" required maxLength={100} className="w-full bg-mangrove-50 border border-mangrove-200 focus:border-mangrove-accent rounded-lg px-3 py-2.5 text-sm text-mangrove-900 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="tc-company" className="block text-[10px] uppercase tracking-wider text-mangrove-800/50 mb-1">Company</label>
                        <input id="tc-company" name="company" type="text" required maxLength={150} className="w-full bg-mangrove-50 border border-mangrove-200 focus:border-mangrove-accent rounded-lg px-3 py-2.5 text-sm text-mangrove-900 focus:outline-none transition-colors" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="tc-email" className="block text-[10px] uppercase tracking-wider text-mangrove-800/50 mb-1">Email</label>
                        <input id="tc-email" name="email" type="email" required maxLength={150} className="w-full bg-mangrove-50 border border-mangrove-200 focus:border-mangrove-accent rounded-lg px-3 py-2.5 text-sm text-mangrove-900 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="tc-commodity" className="block text-[10px] uppercase tracking-wider text-mangrove-800/50 mb-1">Commodity</label>
                        <select id="tc-commodity" name="commodity" className="w-full bg-mangrove-50 border border-mangrove-200 focus:border-mangrove-accent rounded-lg px-3 py-2.5 text-sm text-mangrove-900 focus:outline-none transition-colors">
                          <option>Black Pepper</option>
                          <option>Cloves</option>
                          <option>Nutmeg &amp; Mace</option>
                          <option>Green Cardamom</option>
                          <option>Dry Ginger</option>
                          <option>Robusta Coffee Beans</option>
                          <option>Multiple Items</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="tc-message" className="block text-[10px] uppercase tracking-wider text-mangrove-800/50 mb-1">Volume, Grade &amp; Requirements</label>
                      <textarea id="tc-message" name="message" rows={3} required minLength={10} maxLength={2000} placeholder="Destination port, estimated volume, grade, Incoterms…" className="w-full bg-mangrove-50 border border-mangrove-200 focus:border-mangrove-accent rounded-lg px-3 py-2.5 text-sm text-mangrove-900 focus:outline-none transition-colors resize-none" />
                    </div>
                    <button type="submit" disabled={formStatus === "sending"} className="w-full py-3.5 bg-mangrove-900 text-mangrove-accent hover:bg-mangrove-accent hover:text-mangrove-900 transition-all duration-300 rounded-lg font-semibold text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed">
                      {formStatus === "sending" ? "Sending…" : "Send Trade Inquiry →"}
                    </button>
                    {formStatus === "success" && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-mangrove-50 border border-mangrove-accent/40 text-sm text-mangrove-900">
                        <CheckCircle2 className="w-4 h-4 text-mangrove-accent shrink-0 mt-0.5" />
                        <span>Sent — our commercial desk will respond within 1 business day.</span>
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>Something went wrong. Email info@mangrovesglobal.com directly.</span>
                      </div>
                    )}
                  </form>
                </div>
              </div>

            </div>
          </div>

        </div>{/* /sticky */}
      </div>{/* /wrapper */}

      <SiteFooter />

    </div>
  );
}
