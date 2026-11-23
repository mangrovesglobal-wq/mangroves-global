"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Network, FileSearch, Users, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import GroupAboutSection from "./GroupAboutSection";
import SiteFooter from "@/components/SiteFooter";

const philosophy = [
  {
    icon: Network,
    title: "Coordination-First Model",
    desc: "We do not own vessels, aircraft, or trucks. Instead, we maintain relationships with qualified freight, customs, and transport partners — giving clients access to a wide network without a single-provider lock-in.",
  },
  {
    icon: FileSearch,
    title: "Documentation Oversight",
    desc: "Freight moves on paperwork. We manage the coordination of all shipping documents, customs declarations, and compliance filings to ensure shipments clear without avoidable delay.",
  },
  {
    icon: Users,
    title: "Partner-Vetted Execution",
    desc: "Every logistics provider in our network is selected for reliability and compliance. We coordinate execution through trusted partners and remain the single point of contact for our clients.",
  },
  {
    icon: MapPin,
    title: "UAE & GCC Trade Lanes",
    desc: "Our operational focus is inbound and outbound freight serving UAE and GCC trade corridors — particularly India-UAE lanes where we understand both the origin and destination requirements.",
  },
];

export default function LogisticsAboutContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/5">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/logistics">
              <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-14 sm:h-16 w-auto block" alt="Mangroves Global" />
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <Link href="/logistics" className="hover:text-mangrove-900 transition-colors">Home</Link>
              <Link href="/logistics/about" className="text-mangrove-900">About</Link>
              <Link href="/logistics#services" className="hover:text-mangrove-900 transition-colors">Services</Link>
              <Link href="/logistics/import-export" className="hover:text-mangrove-900 transition-colors">Import &amp; Export</Link>
              <Link href="/logistics/blog" className="hover:text-mangrove-900 transition-colors">Insights</Link>
              <Link href="/logistics#contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 lg:hidden"></div>
          <Link href="/" className="hidden lg:inline-flex items-center mr-4 text-[11px] tracking-widest font-semibold uppercase text-mangrove-900/70 hover:text-mangrove-900">
            Explore Other Businesses
          </Link>
          <Link
            href="/logistics#contact"
            className="hidden lg:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden mr-6 text-mangrove-900 focus:outline-none" aria-label="Open menu">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-60 flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-mangrove-900" aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <Link href="/logistics" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/logistics/about" onClick={() => setMobileMenuOpen(false)} className="text-mangrove-accent">About Us</Link>
          <Link href="/logistics#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/logistics/import-export" onClick={() => setMobileMenuOpen(false)}>Import &amp; Export</Link>
          <Link href="/logistics/blog" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
          <Link href="/logistics#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <main className="pt-20 sm:pt-24">

        {/* Group-level section */}
        <GroupAboutSection currentDivision="logistics" />

        {/* Gold divider */}
        <div className="px-6 lg:px-16 py-6 bg-white">
          <Reveal>
            <div className="max-w-7xl mx-auto flex items-center gap-5">
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill" />
              <span className="text-mangrove-accent text-[11px] uppercase tracking-[0.3em] font-semibold whitespace-nowrap shrink-0">
                Logistics Division
              </span>
              <div className="flex-1 h-px bg-mangrove-accent timeline-fill-right" />
            </div>
          </Reveal>
        </div>

        {/* Division-specific about content */}
        <div className="pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/logistics" className="hover:text-mangrove-accent transition-colors">Logistics</Link>
            <span>/</span>
            <span className="text-mangrove-900">About</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block">
                About The Division
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight">
                Freight Coordination for UAE &amp; GCC Trade Lanes.
              </h1>
              <p className="text-mangrove-800/70 leading-relaxed text-sm sm:text-base">
                Mangroves Global Logistics coordinates sea freight, air freight, road transport, customs clearance, warehousing and supply chain services through a network of qualified logistics partners. We do not operate our own transport assets — our role is to plan, coordinate and oversee freight movement on behalf of our clients, acting as a single point of contact across the full shipment lifecycle.
              </p>
              <p className="text-mangrove-800/60 leading-relaxed text-sm">
                Our core trade lanes connect India and the wider Asia-Pacific region into the UAE and GCC — corridors we understand from both an origin and destination perspective, which helps us anticipate documentation requirements, transit timelines, and customs protocols before they become issues.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <div className="px-4 py-3 rounded-lg bg-mangrove-900 text-xs">
                  <span className="block font-semibold text-mangrove-accent">Core Trade Lane</span>
                  <span className="text-slate-300">India → UAE &amp; GCC</span>
                </div>
                <div className="px-4 py-3 rounded-lg bg-mangrove-900 text-xs">
                  <span className="block font-semibold text-mangrove-accent">Model</span>
                  <span className="text-slate-300">Coordination Only</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7 space-y-8">
              <h2 className="text-xl font-serif text-mangrove-900 mb-6 border-b border-mangrove-100 pb-4">
                How We Approach Logistics
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

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Need a Freight Quote?</h3>
              <p className="text-slate-300 text-sm">Tell us your origin, destination and cargo type and we will coordinate a solution through our partner network.</p>
            </div>
            <Link href="/logistics#contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
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
