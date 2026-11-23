"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, CheckCircle2, AlertTriangle } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

const services = [
  {
    num: "01",
    title: "Advertising & Communication",
    slug: "advertising",
    icon: "/images/icons/advertising-icon.png",
    tagline: "Campaigns built around objectives, not output.",
    desc: "We start with your business goal — then build the campaign strategy, messaging frameworks and creative execution that delivers it. Every touchpoint consistent. Every channel chosen for a reason.",
    offerings: [
      "Campaign strategy & positioning",
      "Advertising campaign development",
      "Communication frameworks",
      "Creative concept & execution",
      "Campaign launch & management",
    ],
    color: "#1C3A24",
  },
  {
    num: "02",
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: "/images/icons/digital-marketing-icon.png",
    tagline: "Visibility, engagement and conversion — measurable from day one.",
    desc: "SEO that improves your organic reach. Social media that builds an audience. Paid digital that converts. We manage the whole digital marketing function so you can focus on the business.",
    offerings: [
      "Digital strategy & channel planning",
      "SEO & organic visibility",
      "Social media marketing",
      "Paid digital advertising",
      "Analytics, reporting & optimization",
    ],
    color: "#0D2A1A",
  },
  {
    num: "03",
    title: "Branding & Creative",
    slug: "branding",
    icon: "/images/icons/branding-icon.png",
    tagline: "A brand that holds together across every touchpoint.",
    desc: "From naming and strategy to visual identity and packaging — we build brand foundations that stay consistent as your business grows. Not just a logo, but a brand that means something.",
    offerings: [
      "Brand strategy & positioning",
      "Naming & brand architecture",
      "Visual identity system",
      "Packaging design",
      "Creative direction",
    ],
    color: "#1A2E22",
  },
  {
    num: "04",
    title: "Content & Production",
    slug: "content-production",
    icon: "/images/icons/content-production-icon.png",
    tagline: "Content that fills your campaigns with actual substance.",
    desc: "Copywriting, photography, video and motion graphics — the material that makes campaigns work. We produce on-brand content across every format so your marketing never runs dry.",
    offerings: [
      "Copywriting & brand messaging",
      "Product & corporate photography",
      "Video production",
      "Motion graphics & animation",
      "Social content creation",
    ],
    color: "#132214",
  },
  {
    num: "05",
    title: "Web & Digital Experiences",
    slug: "web-development",
    icon: "/images/icons/web-development-icon.png",
    tagline: "Fast, beautiful websites built to convert.",
    desc: "Corporate sites, landing pages and digital experiences built around a single goal: turning visitors into leads. SEO-structured, mobile-first, and built with a CMS you can actually use.",
    offerings: [
      "Corporate website development",
      "Landing pages & microsites",
      "UI/UX design",
      "Frontend development",
      "CMS & content management",
    ],
    color: "#0E2018",
  },
];


function useSideReveal(count: number) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
            obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return { refs, visible };
}

export default function CreativeServicesContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { refs: panelRefs, visible: panelVisible } = useSideReveal(services.length * 2);

  // ── Canvas + cursor refs ──────────────────────────────────────────────────
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const heroRef        = useRef<HTMLElement>(null);
  const cursorGlowRef  = useRef<HTMLDivElement>(null);
  const mousePosRef    = useRef({ x: -999, y: -999 });

  // ── Morphing headline word ────────────────────────────────────────────────
  const morphWords = ["Creative.", "Impactful.", "Performance.", "Digital.", "Results."];
  const [morphWord, setMorphWord] = useState({ text: "Creative.", state: "idle" as "idle" | "out" | "in" });

  // ── Stats count-up ────────────────────────────────────────────────────────
  const statsRef     = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statsTargets   = [200, 5, 8, 5];
  const statsSuffixes  = ["+", "", "+", ""];
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      division: "creative",
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      subject: formData.get("service"),
      message: formData.get("message"),
    };
    try {
      const response = await fetch(`${API_BASE_URL}/api/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok && result.success) { setFormStatus("success"); form.reset(); }
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  }

  // ── Particle canvas ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = canvas; // narrowed non-null alias for nested functions
    let animId: number;
    const MOBILE = window.innerWidth < 768;
    const N = MOBILE ? 55 : 110;
    const LINK = MOBILE ? 100 : 145;
    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const pts: P[] = [];

    function resize() {
      c.width  = c.offsetWidth;
      c.height = c.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < N; i++)
      pts.push({ x: Math.random() * c.width, y: Math.random() * c.height,
                 vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
                 r: Math.random() * 2 + 0.5, a: Math.random() * 0.45 + 0.1 });

    function frame() {
      ctx!.clearRect(0, 0, c.width, c.height);
      const m = mousePosRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx!.beginPath(); ctx!.moveTo(pts[i].x, pts[i].y); ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.strokeStyle = `rgba(242,201,76,${(1 - d / LINK) * 0.2})`; ctx!.lineWidth = 0.7; ctx!.stroke();
          }
        }
      }
      pts.forEach((p) => {
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(242,201,76,${p.a})`; ctx!.fill();
        const mdx = m.x - p.x, mdy = m.y - p.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120) { p.x -= (mdx / md) * 1.8; p.y -= (mdy / md) * 1.8; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; } if (p.x > c.width)  { p.x = c.width;  p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; } if (p.y > c.height) { p.y = c.height; p.vy *= -1; }
      });
      animId = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // ── Morphing headline word ────────────────────────────────────────────────
  useEffect(() => {
    let idx = 0;
    const id = setInterval(() => {
      setMorphWord((prev) => ({ ...prev, state: "out" }));
      setTimeout(() => {
        idx = (idx + 1) % morphWords.length;
        setMorphWord({ text: morphWords[idx], state: "in" });
        setTimeout(() => setMorphWord((prev) => ({ ...prev, state: "idle" })), 600);
      }, 400);
    }, 3200);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Stats count-up ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsInView) return;
    const dur = 1800, start = performance.now();
    function tick(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setCounts(statsTargets.map((v) => Math.round(v * e)));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [statsInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[96vh] flex items-center bg-mangrove-900 overflow-hidden pt-22"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            mousePosRef.current = { x, y };
            if (cursorGlowRef.current) {
              cursorGlowRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
              cursorGlowRef.current.style.opacity = "1";
            }
          }}
          onMouseLeave={() => { if (cursorGlowRef.current) cursorGlowRef.current.style.opacity = "0"; }}
        >
          {/* Particle canvas — fills entire hero */}
          <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          />

          {/* Cursor glow — follows mouse */}
          <div
            ref={cursorGlowRef}
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              zIndex: 1,
              width: "480px", height: "480px",
              top: 0, left: 0,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(242,201,76,0.12) 0%, transparent 65%)",
              opacity: 0,
              transition: "opacity 0.4s ease",
              willChange: "transform",
            }}
          />

          {/* Static deep radial glow behind headline */}
          <div aria-hidden className="absolute pointer-events-none"
            style={{
              zIndex: 1, top: "30%", left: "50%", transform: "translate(-50%,-50%)",
              width: "700px", height: "700px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(242,201,76,0.07) 0%, transparent 65%)",
            }}
          />

          {/* Faint dot grid */}
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
            backgroundImage: "radial-gradient(circle, rgba(242,201,76,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px" }} />

          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-6 lg:px-16 py-20 w-full" style={{ zIndex: 10 }}>

            {/* Breadcrumb */}
            <nav className="text-xs text-white/35 mb-10 flex items-center gap-2"
              style={{ animation: "wordRise 0.6s cubic-bezier(0.22,1,0.36,1) 300ms both" }}
              aria-label="Breadcrumb">
              <Link href="/creative" className="hover:text-mangrove-accent transition-colors">Creative</Link>
              <span>/</span>
              <span className="text-white/60">Services</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 text-[10px] uppercase tracking-[0.32em] font-semibold"
              style={{
                border: "1px solid rgba(242,201,76,0.35)", background: "rgba(242,201,76,0.07)", color: "#F2C94C",
                animation: "wordRise 0.65s cubic-bezier(0.22,1,0.36,1) 450ms both",
              }}>
              5 Service Verticals &nbsp;✦&nbsp; Creative Division
            </div>

            {/* Headline — word by word rise */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[5.5rem] font-bold leading-[1.1] mb-6 tracking-tight" style={{ overflow: "visible" }}>
              {/* Line 1: static words */}
              <span className="block">
                {["Where", "Strategy"].map((word, i) => (
                  <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                    <span className="inline-block" style={{
                      animation: "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) both",
                      animationDelay: `${620 + i * 160}ms`,
                      color: "#ffffff",
                    }}>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
              {/* Line 2: "Meets" + morphing word */}
              <span className="block mt-1">
                <span className="inline-block overflow-hidden mr-[0.25em]">
                  <span className="inline-block" style={{
                    animation: "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) 940ms both",
                    color: "#F2C94C",
                  }}>
                    Meets
                  </span>
                </span>
                <span className="inline-block overflow-hidden">
                  <span
                    className="inline-block"
                    style={{
                      color: "#F2C94C",
                      animation: morphWord.state === "out"
                        ? "morphFadeOut 0.4s cubic-bezier(0.55,0.1,0.4,0.9) both"
                        : morphWord.state === "in"
                        ? "morphFadeIn 0.55s cubic-bezier(0.22,1,0.36,1) both"
                        : "wordRise 0.8s cubic-bezier(0.22,1,0.36,1) 1100ms both",
                    }}
                  >
                    {morphWord.text}
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 1260ms both" }}>
              Five integrated service verticals — all built around one idea: marketing that earns its place by delivering measurable business outcomes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4"
              style={{ animation: "wordRise 0.7s cubic-bezier(0.22,1,0.36,1) 1400ms both" }}>
              {/* Primary — gold with shimmer sweep */}
              <Link href="/creative/contact"
                className="relative overflow-hidden px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{ background: "#F2C94C", color: "#1C2B1E", animation: "pulseRing 2.5s ease-in-out 2s infinite" }}>
                <span className="relative z-10">Start a Project</span>
                <span aria-hidden className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "ctaShimmer 2.2s linear 1.8s infinite",
                  }} />
              </Link>
              {/* Secondary — outline with hover fill */}
              <Link href="/creative/work"
                className="relative overflow-hidden group px-8 py-4 rounded-full font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
                style={{ border: "1.5px solid rgba(255,255,255,0.28)", color: "#fff" }}>
                <span className="relative z-10 flex items-center gap-2">
                  View Our Work <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <span aria-hidden className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.07)" }} />
              </Link>
            </div>

            {/* Stats — count-up on scroll-into-view */}
            <div ref={statsRef} className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-10"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {[
                { label: "Brands Served",     suffix: "+", idx: 0 },
                { label: "Service Verticals", suffix: "",  idx: 1 },
                { label: "Years of Craft",    suffix: "+", idx: 2 },
                { label: "Countries Active",  suffix: "",  idx: 3 },
              ].map(({ label, suffix, idx }, i) => (
                <div key={label} style={{ animation: `wordRise 0.7s cubic-bezier(0.22,1,0.36,1) ${1560 + i * 80}ms both` }}>
                  <div className="font-serif text-3xl sm:text-4xl font-bold mb-1 tabular-nums" style={{ color: "#F2C94C" }}>
                    {counts[idx]}{suffix}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/35">{label}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────────────── */}
        <div className="overflow-x-clip border-y border-mangrove-accent/15 bg-mangrove-900 py-3.5" aria-hidden>
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite", willChange: "transform" }}>
            {["ADVERTISING","DIGITAL MARKETING","BRANDING","CONTENT PRODUCTION","WEB DEVELOPMENT",
              "ADVERTISING","DIGITAL MARKETING","BRANDING","CONTENT PRODUCTION","WEB DEVELOPMENT",
              "ADVERTISING","DIGITAL MARKETING","BRANDING","CONTENT PRODUCTION","WEB DEVELOPMENT",
            ].map((w, i) => (
              <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.32em] text-mangrove-accent/55 px-8">
                {w}&nbsp;&nbsp;<span className="text-mangrove-accent/30">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── SERVICE PANELS — alternating left / right ─────────────────── */}
        {services.map((svc, i) => {
          const isEven = i % 2 === 0;
          const textIdx  = i * 2;
          const visualIdx = i * 2 + 1;
          const textVisible   = panelVisible[textIdx];
          const visualVisible = panelVisible[visualIdx];

          const textPanel = (
            <div
              ref={(el) => { panelRefs.current[textIdx] = el; }}
              className={`reveal-${isEven ? "left" : "right"} ${textVisible ? "is-visible" : ""} flex flex-col justify-center px-8 lg:px-12 py-7 lg:py-9`}
              style={{ transitionDelay: "80ms" }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="font-serif text-xs text-mangrove-accent/50 tracking-widest">{svc.num}</span>
                <span className="flex-1 h-px bg-mangrove-accent/20" />
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <Image src={svc.icon} alt="" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest">{svc.title}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-mangrove-900 leading-snug mb-3">
                {svc.tagline}
              </h2>
              <p className="text-mangrove-800/65 text-sm leading-relaxed mb-4">
                {svc.desc}
              </p>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-2 mb-5">
                {svc.offerings.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-mangrove-800/70">
                    <Check className="w-3.5 h-3.5 text-mangrove-accent shrink-0 mt-0.5" />
                    <span className="leading-snug">{o}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/creative/${svc.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 text-xs tracking-widest font-semibold uppercase self-start group"
              >
                Explore {svc.title.split(" ")[0]}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          );

          const visualPanel = (
            <div
              ref={(el) => { panelRefs.current[visualIdx] = el; }}
              className={`reveal-${isEven ? "right" : "left"} ${visualVisible ? "is-visible" : ""} relative flex items-center justify-center min-h-40 lg:min-h-0 overflow-hidden`}
              style={{ background: svc.color }}
            >
              {/* Dot grid pattern */}
              <div aria-hidden className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, rgba(242,201,76,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
              {/* Giant number */}
              <div aria-hidden className="absolute right-3 bottom-1 font-serif font-bold select-none pointer-events-none"
                style={{ fontSize: "clamp(72px,12vw,130px)", color: "rgba(242,201,76,0.07)", lineHeight: 1 }}>
                {svc.num}
              </div>
              {/* Icon */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(242,201,76,0.10)", border: "1px solid rgba(242,201,76,0.2)" }}>
                  <Image src={svc.icon} alt={svc.title} width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-center px-4" style={{ color: "rgba(242,201,76,0.45)" }}>
                  {svc.title}
                </p>
              </div>
              {/* Gold border accent */}
              <div aria-hidden className="absolute inset-y-0 pointer-events-none"
                style={{ [isEven ? "right" : "left"]: 0, width: "2px", background: "linear-gradient(to bottom, transparent, rgba(242,201,76,0.5), transparent)" }} />
            </div>
          );

          return (
            <div key={svc.slug} className={`grid ${isEven ? "lg:grid-cols-[3fr_1fr]" : "lg:grid-cols-[1fr_3fr]"} border-b border-mangrove-100`}>
              {isEven ? <>{textPanel}{visualPanel}</> : <>{visualPanel}{textPanel}</>}
            </div>
          );
        })}

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-2xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900 mb-3">Start a project</h2>
              <p className="text-mangrove-900/65 text-sm">Tell us what you&apos;re building. We&apos;ll put together the right team and approach.</p>
            </Reveal>

            {formStatus === "success" ? (
              <div className="bg-white rounded-3xl p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-mangrove-accent mx-auto mb-4" />
                <p className="font-serif text-xl text-mangrove-900 mb-2">Thanks — your project inquiry has been sent.</p>
                <p className="text-mangrove-800/60 text-sm">Our creative team will follow up shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cs-name" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Full Name</label>
                    <input id="cs-name" name="name" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="cs-company" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Company</label>
                    <input id="cs-company" name="company" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cs-email" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Email</label>
                    <input id="cs-email" name="email" type="email" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="cs-service" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Service</label>
                    <select id="cs-service" name="service" className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-800 focus:outline-none focus:border-mangrove-accent">
                      <option>Advertising &amp; Communication</option>
                      <option>Digital Marketing</option>
                      <option>Branding &amp; Creative</option>
                      <option>Content &amp; Production</option>
                      <option>Web &amp; Digital Experiences</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="cs-message" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Tell us about the project</label>
                  <textarea id="cs-message" name="message" rows={4} required placeholder="What are you looking to achieve?" className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                </div>
                <button type="submit" disabled={formStatus === "sending"}
                  className="w-full py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase disabled:opacity-60">
                  {formStatus === "sending" ? "Sending..." : "Start a Project"}
                </button>
                {formStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Something went wrong. Please try again or email us directly.</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
