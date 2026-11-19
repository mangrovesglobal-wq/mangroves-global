"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceHeroImage from "./ServiceHeroImage";
import ServiceIcon from "./ServiceIcon";

type ContentBlock = { heading: string; content: string };
type HeroImage = { src: string; alt: string; remote: boolean };

export type SubService = { name: string; desc: string };
export type ProcessStep = { n: string; title: string; desc: string };
export type Outcome = { metric: string; label: string };
export type Faq = { q: string; a: string };

type Props = {
  // CMS-driven
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
  // Service identity
  categoryLabel: string;
  breadcrumbLabel: string;
  h1: string;
  // Sales content
  subServices: SubService[];
  process: ProcessStep[];
  outcomes: Outcome[];
  faqs: Faq[];
  ctaHeadline: string;
  ctaSubline: string;
  ctaButton: string;
};

export default function CreativeServiceLayout({
  introText, blocks, heroImage, icon,
  categoryLabel, breadcrumbLabel, h1,
  subServices, process, outcomes, faqs,
  ctaHeadline, ctaSubline, ctaButton,
}: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      {/* ── DARK HERO ─────────────────────────────────────────────── */}
      <section className="bg-mangrove-900 text-white pt-27 pb-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-white/40 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/creative" className="hover:text-mangrove-accent transition-colors">Creative</Link>
            <span>/</span>
            <span className="text-white/70">{breadcrumbLabel}</span>
          </nav>

          <div className="flex items-center gap-2 mb-5">
            <ServiceIcon name={icon} className="w-5 h-5 text-mangrove-accent" />
            <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest">{categoryLabel}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {h1}
          </h1>

          <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
            {introText}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/creative/contact"
              className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-bold text-xs tracking-widest uppercase"
            >
              Get a Proposal
            </Link>
            <Link
              href="/creative/work"
              className="px-8 py-4 border border-white/25 text-white hover:border-mangrove-accent hover:text-mangrove-accent transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase flex items-center gap-2"
            >
              See Our Work <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUTCOMES STRIP — gold bar ─────────────────────────────── */}
      <section className="bg-mangrove-accent px-6 lg:px-16 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {outcomes.map(({ metric, label }) => (
            <div key={label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-mangrove-900">{metric}</div>
              <div className="text-mangrove-900/60 text-[10px] uppercase tracking-widest mt-1 font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <main className="pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">

          {/* ── HERO IMAGE ────────────────────────────────────────── */}
          {heroImage && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mt-16 border border-mangrove-100">
              <ServiceHeroImage src={heroImage.src} alt={heroImage.alt} remote={heroImage.remote} />
            </div>
          )}

          {/* ── SERVICES BREAKDOWN ─────────────────────────────────── */}
          <section className="pt-20 pb-16 border-b border-mangrove-100">
            <h2 className="font-serif text-3xl font-bold mb-2">What We Deliver</h2>
            <p className="text-mangrove-800/55 text-base mb-10 max-w-xl">
              Every engagement is scoped around your business objective — not a standard retainer.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {subServices.map(({ name, desc }) => (
                <div
                  key={name}
                  className="group p-6 rounded-2xl border border-mangrove-100 hover:border-mangrove-900 hover:bg-mangrove-900 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-lg font-semibold text-mangrove-900 group-hover:text-white transition-colors duration-300">
                      {name}
                    </h3>
                    <Check className="w-4 h-4 text-mangrove-accent shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-mangrove-800/60 group-hover:text-white/65 leading-relaxed transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CMS CONTENT BLOCKS ─────────────────────────────────── */}
          {blocks.length > 0 && (
            <section className="pt-16 pb-16 border-b border-mangrove-100">
              <article className="prose-mgt-light text-mangrove-800/80">
                {blocks.map((block) => (
                  <div key={block.heading}>
                    <h2>{block.heading}</h2>
                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                  </div>
                ))}
              </article>
            </section>
          )}

          {/* ── HOW WE WORK ────────────────────────────────────────── */}
          <section className="pt-16 pb-16 border-b border-mangrove-100">
            <h2 className="font-serif text-3xl font-bold mb-2">How We Work</h2>
            <p className="text-mangrove-800/55 text-base mb-10 max-w-xl">
              A defined process keeps projects on time, on brief, and without surprises.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map(({ n, title, desc }) => (
                <div key={n} className="flex flex-col">
                  <div className="w-11 h-11 rounded-full bg-mangrove-900 text-white flex items-center justify-center text-sm font-bold mb-5 shrink-0">
                    {n}
                  </div>
                  <h3 className="font-serif font-semibold text-mangrove-900 mb-2 text-base">{title}</h3>
                  <p className="text-sm text-mangrove-800/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ACCORDION ──────────────────────────────────────── */}
          <section className="pt-16 pb-16 border-b border-mangrove-100">
            <h2 className="font-serif text-3xl font-bold mb-2">Common Questions</h2>
            <p className="text-mangrove-800/55 text-base mb-10 max-w-xl">
              What businesses usually ask before they get started.
            </p>
            <div className="divide-y divide-mangrove-100">
              {faqs.map(({ q, a }, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  >
                    <span className="font-medium text-mangrove-900 group-hover:text-mangrove-accent transition-colors duration-200 text-sm sm:text-base">
                      {q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-mangrove-accent shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? "max-h-96 pb-5" : "max-h-0"}`}
                  >
                    <p className="text-sm text-mangrove-800/65 leading-relaxed max-w-3xl">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CLOSING CTA ────────────────────────────────────────── */}
          <section className="pt-16">
            <div className="bg-mangrove-900 rounded-3xl p-10 sm:p-16 flex flex-col items-center text-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-mangrove-accent/35 text-mangrove-accent text-[10px] uppercase tracking-widest mb-6 font-semibold">
                {categoryLabel}
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold mb-5 max-w-xl leading-tight">
                {ctaHeadline}
              </h2>
              <p className="text-white/55 text-sm sm:text-base mb-10 max-w-sm leading-relaxed">{ctaSubline}</p>
              <Link
                href="/creative/contact"
                className="px-10 py-5 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-bold text-xs tracking-widest uppercase"
              >
                {ctaButton}
              </Link>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
