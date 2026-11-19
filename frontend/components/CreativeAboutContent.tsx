"use client";

import Link from "next/link";
import { Target, Layers, BarChart2, Handshake } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";
import GroupAboutSection from "./GroupAboutSection";

const philosophy = [
  {
    icon: Target,
    title: "Objective-Led Strategy",
    desc: "Every engagement begins by understanding the business objective — not just the creative brief. Marketing that cannot be connected back to a commercial goal is unlikely to generate one.",
  },
  {
    icon: Layers,
    title: "Integrated Capability",
    desc: "Strategy, creative, digital and communication are handled as a connected whole rather than separate disciplines. This prevents the common failure where good strategy is handed to a team that cannot execute it.",
  },
  {
    icon: BarChart2,
    title: "Measurable Outcomes",
    desc: "Campaigns are designed with measurement in mind from the start — defining what success looks like before work begins, and reviewing performance to inform the next cycle.",
  },
  {
    icon: Handshake,
    title: "Flexible Engagement",
    desc: "We work with UAE businesses on project-based, campaign-based and ongoing retainer arrangements — adapting the engagement model to what the business actually needs at that stage.",
  },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "Understand your business, audience and objective." },
  { num: "02", title: "Strategize", desc: "Define positioning, channels and direction." },
  { num: "03", title: "Create", desc: "Develop concepts, content and campaign assets." },
  { num: "04", title: "Execute", desc: "Launch campaigns across selected channels." },
  { num: "05", title: "Measure", desc: "Review performance and optimize." },
];

const serviceGroups = [
  { name: "Advertising & Communication", desc: "Campaign strategy, advertising concepts and communication planning." },
  { name: "Digital Marketing", desc: "SEO, social media marketing, paid digital advertising and analytics." },
  { name: "Branding & Creative", desc: "Brand strategy, visual identity, naming and packaging design." },
  { name: "Content & Production", desc: "Copywriting, photography, video and motion graphics." },
  { name: "Web & Digital Experiences", desc: "Corporate websites, landing pages, UI/UX and CMS development." },
];

export default function CreativeAboutContent() {
  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      <main className="pt-22">

        {/* Group-level section */}
        <GroupAboutSection currentDivision="creative" />

        {/* Gold divider */}
        <div className="px-6 lg:px-16 py-6 bg-white">
          <Reveal>
            <div className="max-w-7xl mx-auto flex items-center gap-5">
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill" />
              <span className="text-mangrove-accent text-[11px] uppercase tracking-[0.3em] font-semibold whitespace-nowrap shrink-0">
                Digital &amp; Creative Division
              </span>
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill-right" />
            </div>
          </Reveal>
        </div>

        {/* Division-specific about content */}
        <div className="pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/creative" className="hover:text-mangrove-accent transition-colors">Creative</Link>
            <span>/</span>
            <span className="text-mangrove-900">About</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block">
                About The Division
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight">
                Digital Marketing &amp; Creative Services for UAE Businesses.
              </h1>
              <p className="text-mangrove-800/70 leading-relaxed text-sm sm:text-base">
                Mangroves Global&apos;s Digital &amp; Creative division delivers advertising, digital marketing, branding, content production and web development services to businesses operating in the UAE. Our approach connects strategy directly to execution — every campaign and project is built around a clear business objective rather than creative preference alone.
              </p>
              <p className="text-mangrove-800/60 leading-relaxed text-sm">
                We work with clients across food and FMCG, trading, logistics, retail and real estate — sectors where practical communication, consistent brand presence and measurable digital performance matter more than trend-chasing.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <div className="px-4 py-3 rounded-lg bg-mangrove-900 text-xs">
                  <span className="block font-semibold text-mangrove-accent">Market</span>
                  <span className="text-slate-300">UAE Businesses</span>
                </div>
                <div className="px-4 py-3 rounded-lg bg-mangrove-900 text-xs">
                  <span className="block font-semibold text-mangrove-accent">Approach</span>
                  <span className="text-slate-300">Strategy to Execution</span>
                </div>
              </div>

              {/* Services quick list */}
              <div className="pt-4 border-t border-mangrove-100 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-mangrove-900/50">What We Do</p>
                {serviceGroups.map((s) => (
                  <div key={s.name} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mangrove-accent shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-mangrove-900">{s.name}</span>
                      <span className="text-mangrove-800/55 text-xs ml-2">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7 space-y-8">
              <h2 className="text-xl font-serif text-mangrove-900 mb-6 border-b border-mangrove-100 pb-4">
                Our Working Principles
              </h2>
              <div className="space-y-6">
                {philosophy.map(({ icon: Icon, title, desc }, i) => (
                  <Reveal
                    key={title}
                    delay={i * 70}
                    className="p-8 rounded-2xl bg-mangrove-50 border-2 border-mangrove-100 hover:bg-mangrove-900 hover:border-mangrove-900 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 rounded-xl bg-mangrove-900 text-mangrove-accent flex items-center justify-center shrink-0 group-hover:bg-mangrove-accent group-hover:text-mangrove-900 transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-mangrove-900 group-hover:text-white mb-2 transition-colors duration-300">{title}</h3>
                        <p className="text-mangrove-800/60 group-hover:text-slate-300 text-sm leading-relaxed transition-colors duration-300">{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          {/* How We Work */}
          <Reveal className="mt-16 pt-16 border-t border-mangrove-100">
            <div className="mb-10">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">How We Work</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Five steps</h2>
            </div>
            <div className="grid sm:grid-cols-5 gap-6 relative">
              <div aria-hidden className="hidden sm:block absolute top-5.5 left-[10%] right-[10%] h-px bg-mangrove-accent/20" />
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 80}>
                  <div className="relative flex flex-col items-center sm:items-start text-center sm:text-left group">
                    <div className="w-10 h-10 rounded-full border-2 border-mangrove-accent/30 flex items-center justify-center mb-4 bg-white group-hover:border-mangrove-accent group-hover:bg-mangrove-accent/10 transition-all duration-300 relative z-10">
                      <span className="text-mangrove-accent font-serif text-sm font-bold">{step.num}</span>
                    </div>
                    <h3 className="font-serif text-mangrove-900 font-semibold mb-1 group-hover:text-mangrove-accent transition-colors duration-300">{step.title}</h3>
                    <p className="text-xs text-mangrove-800/55">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Ready to Start a Project?</h3>
              <p className="text-slate-300 text-sm">Tell us what you are trying to achieve and we will put together a proposal.</p>
            </div>
            <Link href="/creative/contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Get in Touch
            </Link>
          </Reveal>
        </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
