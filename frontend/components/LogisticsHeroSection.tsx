"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Compass } from "lucide-react";
import HeroSocialBar from "@/components/HeroSocialBar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const heroServices = [
  {
    label: "01 / Sea",
    title: "Sea Freight",
    desc: "Full Container Load (FCL) and Less than Container Load (LCL) shipment coordination across global maritime routes.",
    href: "/logistics/sea-freight",
    icon: "/images/icons/sea-freight-icon.png",
  },
  {
    label: "02 / Air",
    title: "Air Freight",
    desc: "Priority coordination for time-sensitive, high-value cargo, with integrated customs clearance support.",
    href: "/logistics/air-freight",
    icon: "/images/icons/air-freight-icon.png",
  },
  {
    label: "03 / Road",
    title: "Road Transport",
    desc: "Flexible multimodal coordination across UAE and GCC road corridors, through qualified transport partners.",
    href: "/logistics/road-transport",
    icon: "/images/icons/road-transport-icon.png",
  },
];

export default function LogisticsHeroSection({ heroImage }: { heroImage?: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgImageRef.current;
    const content = contentRef.current;
    if (!hero || !bg || !content) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const staggerEls = content.querySelectorAll("[data-anim]");

    // This photo is already a naturally warm, bright sunrise shot — just a light polish,
    // not the heavy warm color-correction the old night photo needed.
    const restingFilter = "brightness(1.04) saturate(1.08)";

    if (prefersReducedMotion) {
      gsap.set(bg, { scale: 1, filter: restingFilter });
      gsap.set(staggerEls, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Scroll-scrubbed zoom — created only after the entrance settles, so the two
          // tweens never fight over the scale value.
          gsap.to(bg, {
            scale: 1.32,
            y: -30,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2 },
          });
        },
      });

      tl.fromTo(bg, { scale: 1, filter: "brightness(0.96)" }, { scale: 1.08, filter: restingFilter, duration: 1.4, ease: "expo.out" }, 0);
      tl.fromTo(staggerEls, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" }, 0.15);

      gsap.to(content, {
        opacity: 0.25,
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "80% top", scrub: true },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-mangrove-50 flex justify-center">
        {/* Background layer */}
        <div ref={bgImageRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Container ship arriving at a port at sunrise, with gantry cranes and the city skyline lit by golden morning light, representing Mangroves Global's connected logistics network"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/images/mangroves-global-logistics-sunrise-port.jpg"
              alt="Container ship arriving at a port at sunrise, with gantry cranes and the city skyline lit by golden morning light, representing Mangroves Global's connected logistics network"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div ref={contentRef} className="relative z-30 max-w-7xl w-full mx-auto px-6 lg:px-14 pt-28 sm:pt-32 pb-40 flex items-center">
          <div className="lg:w-6/12">
            <div
              data-anim
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-mangrove-accent/35 text-[11px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: "#9E7D3C" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mangrove-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mangrove-accent" />
              </span>
              Mangroves Logistics &middot; Smart Port Hub
            </div>

            <h1
              className="font-serif text-5xl lg:text-7xl font-bold text-mangrove-900 mt-6"
              style={{ lineHeight: 1.08, textShadow: "0 2px 28px rgba(255,255,255,0.75), 0 1px 4px rgba(255,255,255,0.65)" }}
            >
              <span data-anim className="block">Moving</span>
              <span data-anim className="block">Business</span>
              <span data-anim className="block italic font-normal text-mangrove-accent">Forward.</span>
            </h1>

            <p
              data-anim
              className="max-w-lg text-mangrove-900/85 font-light text-base sm:text-lg leading-relaxed mt-6"
              style={{ textShadow: "0 1px 16px rgba(255,255,255,0.8)" }}
            >
              Technological and maritime logistics solutions engineered to move your high-value cargo across global waterways with absolute clarity and pristine precision.
            </p>

            <div data-anim className="flex flex-wrap items-center gap-4 mt-10">
              <Link
                href="/logistics#contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-mangrove-accent text-mangrove-900 font-bold rounded-xl transition-transform duration-300 hover:scale-105"
                style={{ boxShadow: "0 20px 45px -10px rgba(213,173,117,0.5)" }}
              >
                Request a Logistics Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/logistics#services"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/90 backdrop-blur-md border border-mangrove-100 text-mangrove-900 font-semibold rounded-xl transition-colors duration-300 hover:border-mangrove-accent"
              >
                Explore Our Services
                <Compass className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Social icons — bottom-left of hero */}
        <div className="absolute left-6 lg:left-10 bottom-7 z-30">
          <HeroSocialBar />
        </div>
      </section>

      {/* Overlapping service cards — sits half in the hero, half below it */}
      <div className="relative z-30 -mt-28 sm:-mt-24 px-6 lg:px-16 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-5">
          {heroServices.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group bg-white rounded-2xl border border-mangrove-100 shadow-xl shadow-mangrove-900/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-mangrove-accent/50"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-lg bg-mangrove-accent/15 flex items-center justify-center p-2">
                  <Image src={s.icon} alt="" width={28} height={28} className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-mangrove-800/40 mt-1">{s.label}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-mangrove-900 mb-2">{s.title}</h3>
              <p className="text-sm text-mangrove-800/60 leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
