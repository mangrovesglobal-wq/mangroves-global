"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, AlertTriangle } from "lucide-react";
import LogisticsHeroSection from "./LogisticsHeroSection";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "./Reveal";

const services: { num: string; name: string; desc: string; slug: string | null; icon: string | null }[] = [
  { num: "01", name: "Freight Coordination", desc: "Sea and air freight coordination through established logistics providers.", slug: "freight-coordination", icon: null },
  { num: "02", name: "Sea Freight", desc: "FCL and LCL shipment coordination, port-to-port through door-to-door.", slug: "sea-freight", icon: "/images/icons/sea-freight-icon.png" },
  { num: "03", name: "Air Freight", desc: "Time-sensitive and high-value cargo coordination.", slug: "air-freight", icon: "/images/icons/air-freight-icon.png" },
  { num: "04", name: "Road Transport", desc: "Container transportation and domestic/GCC road logistics through qualified transport partners.", slug: "road-transport", icon: "/images/icons/road-transport-icon.png" },
  { num: "05", name: "Customs Clearance", desc: "Coordination with appropriately licensed customs-clearing partners.", slug: "customs-clearance", icon: "/images/icons/customs-clearance-icon.png" },
  { num: "06", name: "Warehousing & 3PL", desc: "Storage, inventory handling, fulfilment and distribution through selected providers.", slug: "warehousing-3pl", icon: "/images/icons/warehousing-icon.png" },
  { num: "07", name: "Supply Chain Consulting", desc: "Route planning, cost analysis, distribution planning and operational improvement.", slug: "supply-chain-consulting", icon: "/images/icons/supply-chain-icon.png" },
  { num: "08", name: "Last-Mile & Distribution", desc: "UAE delivery and distribution coordination.", slug: "last-mile-distribution", icon: null },
];

const flowSteps = ["Shipment Request", "Route Planning", "Freight", "Customs", "Transport", "Warehouse", "Delivery", "Shipment Update"];


export default function LogisticsPageContent({ heroImage }: { heroImage?: string } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

    const origin = formData.get("origin");
    const destination = formData.get("destination");
    const shipmentDetails = formData.get("message");
    const combinedMessage = `Origin: ${origin || "—"}\nDestination: ${destination || "—"}\n\n${shipmentDetails}`;

    const payload = {
      division: "logistics",
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: `${origin || "?"} → ${destination || "?"}`,
      message: combinedMessage,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      {/* ── DIVISION HEADER ── */}
      <header className="fixed top-0 left-0 w-full z-50" style={{ height: 88 }}>
        <div className="absolute inset-x-0 bg-mangrove-accent" style={{ top: 22, height: 44 }}>
          <div className="hidden lg:flex h-full max-w-screen-2xl mx-auto">
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Home","#home"],["About","#corridor"],["Services","#services"],["Contact","#contact"]].map(([l,h])=>(
                <a key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
            <div style={{ width: 210, flexShrink: 0 }} />
            <nav className="flex-1 flex items-center justify-evenly px-4 xl:px-8">
              {[["Import & Export","/logistics/import-export"],["Blog","/logistics/blog"],["Explore Other Businesses","/"]].map(([l,h])=>(
                <a key={l} href={h} className="relative group text-mangrove-900 text-[10.5px] tracking-[0.15em] font-bold uppercase">
                  {l}<span className="absolute -bottom-0.75 left-0 h-[1.5px] w-0 bg-mangrove-900 rounded-full transition-[width] duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>
          <div className="lg:hidden flex h-full items-center justify-end px-5">
            <button onClick={() => setMobileMenuOpen((v) => !v)} className="relative flex flex-col justify-center items-center w-9 h-9 focus:outline-none" aria-label="Toggle menu">
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute block h-0.5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
              <span className={`absolute block h-0.5 w-5 bg-mangrove-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 bg-mangrove-900 flex items-center justify-center group" style={{ top: 0, height: 88, width: 210, clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)", zIndex: 1 }}>
          <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-17.5 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-95" alt="Mangroves Global" priority />
        </Link>
      </header>

      <div aria-hidden className={`fixed inset-0 z-59 bg-mangrove-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`fixed top-0 right-0 h-full z-60 flex flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} style={{ width: "min(100vw, 340px)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-mangrove-100 shrink-0">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/images/logo/mangroves-global-logo-badge.png" width={898} height={900} className="h-10 w-auto" alt="Mangroves Global" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full text-mangrove-700 hover:bg-mangrove-50 transition-colors" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {[["Home","#home"],["About","#corridor"],["Services","#services"],["Import & Export","/logistics/import-export"],["Blog","/logistics/blog"],["Contact","#contact"],["Explore Other Businesses","/"]].map(([label,href])=>(
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-between px-6 py-4 font-serif text-xl text-mangrove-900 border-b border-mangrove-50 hover:bg-mangrove-50/60 hover:text-mangrove-accent hover:pl-9 transition-all duration-200">
              {label}
              <span className="text-mangrove-300 text-base group-hover:text-mangrove-accent group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="pt-22">
        {/* HERO */}
        <LogisticsHeroSection heroImage={heroImage} />

        {/* TRUST STRIP */}
        <section className="py-8 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
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
            <Reveal className="max-w-xl mb-14">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">What We Coordinate</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Eight core logistics services</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => {
                const card = (
                  <div className="p-6 rounded-2xl border border-mangrove-100 bg-mangrove-50/60 hover:border-mangrove-accent/50 transition-colors h-full">
                    {s.icon && <Image src={s.icon} alt="" width={40} height={40} className="w-10 h-10 mb-4 object-contain" />}
                    <h3 className="font-serif text-lg font-semibold text-mangrove-900 mb-2">{s.name}</h3>
                    <p className="text-sm text-mangrove-800/60 leading-relaxed">{s.desc}</p>
                  </div>
                );
                return (
                  <Reveal key={s.num} delay={(i % 4) * 70}>
                    {s.slug ? (
                      <Link href={`/logistics/${s.slug}`} className="block">
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTROL DESK */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-900 text-white">
          <Reveal className="max-w-5xl mx-auto text-center">
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
          </Reveal>
        </section>

        {/* CORRIDOR */}
        <section id="corridor" className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Corridor</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">India to UAE, coordinated from one point</h2>
              <p className="text-mangrove-800/60 mt-4">With roots in Indian agricultural sourcing and a UAE commercial base, we understand cross-border trade end to end.</p>
            </Reveal>
            <Reveal delay={100} className="grid sm:grid-cols-3 gap-8 p-8 rounded-2xl border border-mangrove-100 bg-mangrove-50">
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
            </Reveal>
            <p className="text-xs text-mangrove-800/40 uppercase tracking-widest mt-4">Subject to carrier, port, customs and cargo requirements.</p>
          </div>
        </section>

        {/* FINAL CTA — quote form */}
        <section id="contact" className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-2xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mb-4">Start a logistics conversation</h2>
              <p className="text-mangrove-900/70">Tell us about your shipment and we&apos;ll come back with a coordinated logistics plan.</p>
            </Reveal>

            {formStatus === "success" ? (
              <div className="bg-white rounded-3xl p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-mangrove-accent mx-auto mb-4" />
                <p className="font-serif text-xl text-mangrove-900 mb-2">Quote request received.</p>
                <p className="text-mangrove-800/60 text-sm">Our logistics team will follow up shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="lg-name" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Full Name</label>
                    <input id="lg-name" name="name" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="lg-company" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Company Name</label>
                    <input id="lg-company" name="company" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="lg-email" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Business Email</label>
                    <input id="lg-email" name="email" type="email" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="lg-phone" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Phone / WhatsApp</label>
                    <input id="lg-phone" name="phone" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="lg-origin" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Origin</label>
                    <input id="lg-origin" name="origin" type="text" placeholder="City, Country" className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="lg-destination" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Destination</label>
                    <input id="lg-destination" name="destination" type="text" placeholder="City, Country" className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lg-message" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Shipment Details</label>
                  <textarea id="lg-message" name="message" rows={4} required placeholder="Cargo type, quantity, timeline..." className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending..." : "Request a Logistics Quote"}
                </button>

                {formStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Something went wrong sending your request. Please try again or email us directly.</span>
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
