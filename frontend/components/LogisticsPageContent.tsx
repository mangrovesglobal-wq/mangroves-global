"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

const services = [
  { num: "01", name: "Freight Coordination", desc: "Sea and air freight coordination through established logistics providers." },
  { num: "02", name: "Ocean Freight", desc: "FCL and LCL shipment coordination, port-to-port through door-to-door." },
  { num: "03", name: "Air Freight", desc: "Time-sensitive and high-value cargo coordination." },
  { num: "04", name: "Road Transportation", desc: "Container transportation and domestic/GCC road logistics through qualified transport partners." },
  { num: "05", name: "Customs Coordination", desc: "Coordination with appropriately licensed customs-clearing partners." },
  { num: "06", name: "Warehousing & 3PL", desc: "Storage, inventory handling, fulfilment and distribution through selected providers." },
  { num: "07", name: "Supply Chain Consultancy", desc: "Route planning, cost analysis, distribution planning and operational improvement." },
  { num: "08", name: "Last-Mile & Distribution", desc: "UAE delivery and distribution coordination." },
];

const flowSteps = ["Shipment Request", "Route Planning", "Freight", "Customs", "Transport", "Warehouse", "Delivery", "Shipment Update"];

const industries = ["Food & Spices", "Agriculture & Commodities", "Textiles & Garments", "Furniture", "Building Materials", "Consumer Products"];

export default function LogisticsPageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/5">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/">
              <Image
                src="/images/logo/mangroves-global-logo-badge.png"
                width={64}
                height={64}
                className="h-14 sm:h-16 w-auto block"
                alt="Mangroves Global"
              />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <a href="#services" className="hover:text-mangrove-900 transition-colors">Services</a>
              <a href="#corridor" className="hover:text-mangrove-900 transition-colors">India–UAE</a>
              <a href="#industries" className="hover:text-mangrove-900 transition-colors">Industries</a>
              <a href="#contact" className="hover:text-mangrove-900 transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>
          <Link
            href="/"
            className="hidden lg:inline-flex items-center mr-4 text-[11px] tracking-widest font-semibold uppercase text-mangrove-900/70 hover:text-mangrove-900"
          >
            Explore Other Businesses
          </Link>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden mr-6 text-mangrove-900 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[60] flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-mangrove-900"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#corridor" onClick={() => setMobileMenuOpen(false)}>India–UAE</a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)}>Industries</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}

      <main className="pt-20 sm:pt-24">
        {/* HERO */}
        <section className="relative px-6 lg:px-16 py-24 lg:py-32 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-[36rem] h-[36rem] rounded-full bg-mangrove-accent/10 blur-3xl -translate-y-1/3 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-mangrove-500/10 blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-mangrove-accent/40 bg-mangrove-accent/10 text-mangrove-800 text-xs uppercase tracking-widest mb-8">
              Logistics &amp; Supply Chain Division
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-mangrove-900 leading-tight mb-6">
              Smart Logistics.<br /><span className="font-normal text-mangrove-accent">Connected Supply Chains.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-mangrove-800/70 text-base sm:text-lg font-light leading-relaxed mb-10">
              Coordinating freight, transportation, customs, warehousing and delivery through a connected network of logistics specialists across India, the UAE and the GCC.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
                Request a Logistics Quote
              </a>
              <a href="#contact" className="px-8 py-4 border border-mangrove-500/40 hover:border-mangrove-500 text-mangrove-900 transition-colors rounded-full font-medium text-xs tracking-widest uppercase">
                Speak to a Specialist
              </a>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="py-8 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">India–UAE Trade Corridor</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">UAE-Based Coordination</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">Multi-Modal Logistics</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">B2B Supply Chain Support</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">Connected Service Network</span>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-14">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">What We Coordinate</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Eight core logistics services</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <div key={s.num} className="p-6 rounded-2xl border border-mangrove-100 bg-mangrove-50/60 hover:border-mangrove-accent/50 transition-colors">
                  <h3 className="font-serif text-lg font-semibold text-mangrove-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-mangrove-800/60 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTROL DESK */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-900 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">How It Works</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-3 mb-6">One coordination point. Multiple logistics capabilities.</h2>
            <p className="max-w-2xl mx-auto text-white/70 mb-12">
              You give us the shipment details — origin, destination, cargo, timeline, Incoterm. The Mangroves Logistics Control Desk coordinates the right combination of partners to move it.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-widest text-white/80">
              {flowSteps.map((step, i) => (
                <span
                  key={step}
                  className={`px-4 py-2 rounded-full border ${
                    i === flowSteps.length - 1 ? "border-mangrove-accent text-mangrove-accent font-medium" : "border-white/20"
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CORRIDOR */}
        <section id="corridor" className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Corridor</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">India to UAE, coordinated from one point</h2>
              <p className="text-mangrove-800/60 mt-4">With roots in Indian agricultural sourcing and a UAE commercial base, we understand cross-border trade end to end.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 p-8 rounded-2xl border border-mangrove-100 bg-mangrove-50">
              <div>
                <div className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold mb-3">Origin — India</div>
                <ul className="space-y-1.5 text-sm text-mangrove-800/80">
                  <li>Kerala</li><li>Tamil Nadu</li><li>Karnataka</li><li>Maharashtra</li><li>Gujarat</li><li>Delhi / NCR</li>
                </ul>
              </div>
              <div>
                <div className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold mb-3">Port / Airport</div>
                <ul className="space-y-1.5 text-sm text-mangrove-800/80">
                  <li>Cochin</li><li>Mundra</li><li>Nhava Sheva</li><li>Chennai</li><li>Tuticorin</li><li>Mumbai / Delhi</li>
                </ul>
              </div>
              <div>
                <div className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold mb-3">Destination — UAE</div>
                <ul className="space-y-1.5 text-sm text-mangrove-800/80">
                  <li>Jebel Ali</li><li>Dubai</li><li>Sharjah</li><li>Ajman</li><li>Ras Al Khaimah</li><li>Abu Dhabi</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-4">Subject to carrier, port, customs and cargo requirements.</p>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="py-20 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Industries</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Who we help move cargo</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {industries.map((ind) => (
                <div key={ind} className="p-5 rounded-xl border border-mangrove-100 bg-white text-sm font-medium text-mangrove-900 text-center">
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mb-4">Start a logistics conversation</h2>
            <p className="text-mangrove-900/70 mb-8">Tell us about your shipment and we&apos;ll come back with a coordinated logistics plan.</p>
            <a href="mailto:info@mangrovesglobal.com" className="inline-flex px-8 py-4 bg-mangrove-900 text-mangrove-accent hover:bg-white hover:text-mangrove-900 transition-colors rounded-full font-semibold text-xs tracking-widest uppercase">
              Request a Logistics Quote
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-mangrove-900 text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image
            src="/images/logo/mangroves-global-logo-wordmark.png"
            width={140}
            height={28}
            className="h-6 sm:h-7 w-auto block"
            alt="Mangroves Global"
          />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
