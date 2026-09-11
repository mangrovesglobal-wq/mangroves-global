"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type FloatingCard = {
  key: string;
  className: string;
  depth: number;
  growth?: boolean;
  title: string;
  sub: string;
  icon: React.ReactNode;
};

const CARDS: FloatingCard[] = [
  {
    key: "branding",
    className: "top-[8%] -left-[6%]",
    depth: 0.6,
    title: "Branding",
    sub: "Identity & Position",
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    key: "digital-marketing",
    className: "top-[12%] -right-[6%]",
    depth: 0.35,
    title: "Digital Marketing",
    sub: "Targeted Campaigns",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    key: "advertising",
    className: "bottom-[25%] -left-[6%]",
    depth: 0.7,
    title: "Advertising",
    sub: "Creative Outreach",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
        <path d="M12 12L2.1 12A10 10 0 0 0 12 22V12z" />
      </svg>
    ),
  },
  {
    key: "web-experiences",
    className: "bottom-[6%] right-[2%]",
    depth: 0.45,
    title: "Web Experiences",
    sub: "UI/UX Platforms",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    key: "growth",
    className: "top-1/2 -right-[8%] hidden lg:flex",
    depth: 0.8,
    growth: true,
    title: "Growth",
    sub: "Scalable Impact",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export default function CreativeHeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (!stage || cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(stage, { opacity: 1, scale: 1 });
      gsap.set(cards, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(stage, { opacity: 1, scale: 1, duration: 1.1 }, 0);
    tl.to(cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, 0.4);

    const floatTweens = cards.map((card, index) => {
      const yMove = 14 + index * 3;
      const xMove = 6 + index * 2;
      return gsap.to(card, {
        y: `+=${yMove}`,
        x: `+=${xMove}`,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
        delay: 1 + index * 0.1,
      });
    });

    function handleMouseMove(e: MouseEvent) {
      if (!stage) return;
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(stage, { rotateY: mouseX * 5, rotateX: -mouseY * 5, duration: 0.8, ease: "power2.out" });
      cards.forEach((card, i) => {
        const depth = CARDS[i]?.depth ?? 0.4;
        gsap.to(card, { x: mouseX * (depth * 45), y: mouseY * (depth * 45), duration: 0.9, ease: "power1.out" });
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      tl.kill();
      floatTweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <div
      className="relative w-full flex items-center justify-center h-115 lg:h-145"
      style={{ perspective: 1000 }}
    >
      <div
        ref={stageRef}
        className="relative w-full h-full rounded-[20px] border border-white/40 opacity-0"
        style={{
          backgroundColor: "#d5ad75",
          boxShadow: "0 30px 60px -10px rgba(213,173,117,0.4)",
          transformStyle: "preserve-3d",
          transform: "scale(0.92)",
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-1" viewBox="0 0 500 500" preserveAspectRatio="none">
          <path
            d="M 40 250 C 150 100, 350 400, 460 250"
            fill="none"
            stroke="#22332e"
            strokeWidth={2}
            strokeDasharray="6 6"
            className="opacity-35 animate-[dashMove_20s_linear_infinite]"
          />
          <path
            d="M 100 450 Q 250 50 400 450"
            fill="none"
            stroke="#22332e"
            strokeWidth={2}
            strokeDasharray="6 6"
            className="opacity-35 animate-[dashMove_20s_linear_infinite]"
            style={{ animationDirection: "reverse" }}
          />
        </svg>

        <span className="absolute top-[6%] left-[6%] text-[11px] font-extrabold tracking-[0.2em] uppercase text-mangrove-900/50 pointer-events-none">
          MATRIX // MANGROVES CREATIVE
        </span>
        <span className="absolute bottom-[6%] left-[6%] text-[11px] font-extrabold tracking-[0.2em] uppercase text-mangrove-900/50 pointer-events-none">
          SEQUENCE // IDEA &rarr; STRATEGY &rarr; GROWTH
        </span>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52.5 h-52.5 z-3 flex items-center justify-center">
          <div
            className="absolute -inset-3 rounded-full opacity-35"
            style={{
              border: "1.5px dashed #22332e",
              animation: "coreRotate 24s linear infinite",
            }}
          />
          <div
            className="w-full h-full rounded-full bg-mangrove-900 flex items-center justify-center p-2.5"
            style={{
              boxShadow: "0 18px 36px rgba(20,31,28,0.45), inset 0 0 15px rgba(0,0,0,0.5)",
              animation: "globePulse 4s ease-in-out infinite alternate",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="#d5ad75" strokeWidth={3.5}>
              <circle cx="50" cy="50" r="46" />
              <path d="M 50,4 L 50,96" />
              <path d="M 4,50 L 96,50" />
              <path d="M 50,4 C 25,20 25,80 50,96" />
              <path d="M 50,4 C 75,20 75,80 50,96" />
              <path d="M 50,4 C 10,25 10,75 50,96" />
              <path d="M 50,4 C 90,25 90,75 50,96" />
              <path d="M 12,24 C 30,34 70,34 88,24" />
              <path d="M 12,76 C 30,66 70,66 88,76" />
            </svg>
          </div>
        </div>

        {CARDS.map((card, index) => (
          <div
            key={card.key}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`floating-card group absolute items-center gap-3.5 px-5 py-3.5 rounded-xl z-4 opacity-0 cursor-pointer transition-colors duration-300 ${card.className} ${
              card.growth
                ? "bg-mangrove-900 border border-white/20 hover:bg-mangrove-accent! hover:border-white! hover:shadow-[0_20px_45px_rgba(213,173,117,0.5)]"
                : "bg-white/90 border border-white/80"
            }`}
            style={{
              boxShadow: "0 15px 35px rgba(20,31,28,0.12)",
              backdropFilter: "blur(10px)",
              display: card.growth ? undefined : "flex",
              willChange: "transform",
            }}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                card.growth ? "bg-white/15 group-hover:bg-mangrove-900!" : "bg-mangrove-900/10"
              }`}
            >
              <span
                  className={`w-4.5 h-4.5 [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-none [&_svg]:stroke-2 [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round ${
                  card.growth ? "[&_svg]:stroke-white group-hover:[&_svg]:stroke-mangrove-accent!" : "[&_svg]:stroke-mangrove-900"
                }`}
              >
                {card.icon}
              </span>
            </div>
            <div>
              <span
                className={`font-serif text-[13px] font-extrabold tracking-wider uppercase leading-tight block transition-colors duration-300 ${
                  card.growth ? "text-white group-hover:text-mangrove-900!" : "text-mangrove-900"
                }`}
              >
                {card.title}
              </span>
              <span
                className={`text-[11px] font-semibold mt-0.5 block transition-colors duration-300 ${
                  card.growth ? "text-white/70 group-hover:text-mangrove-900!" : "text-mangrove-900/65"
                }`}
              >
                {card.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes dashMove { to { stroke-dashoffset: -100; } }
        @keyframes coreRotate { to { transform: rotate(360deg); } }
        @keyframes globePulse { 0% { transform: scale(0.96); } 100% { transform: scale(1.04); } }
        .floating-card:hover { transform: translateY(-4px); box-shadow: 0 20px 45px rgba(20,31,28,0.2); }
      `}</style>
    </div>
  );
}
