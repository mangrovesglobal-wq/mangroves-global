"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, CheckCircle2, AlertTriangle } from "lucide-react";
import CreativeHeroVisual from "./CreativeHeroVisual";

const serviceGroups = [
  {
    title: "Advertising & Communication",
    items: ["Campaign Strategy", "Advertising Campaigns", "Communication Strategy", "Campaign Execution"],
    slug: "advertising",
  },
  {
    title: "Digital Marketing",
    items: ["Digital Strategy", "SEO", "Social Media Marketing", "Paid Digital Advertising", "Analytics & Reporting"],
    slug: "digital-marketing",
  },
  {
    title: "Branding & Creative",
    items: ["Brand Strategy", "Naming", "Visual Identity", "Packaging Design"],
    slug: "branding",
  },
  {
    title: "Content & Production",
    items: ["Copywriting", "Product & Corporate Photography", "Video Content", "Motion Graphics"],
    slug: "content-production",
  },
  {
    title: "Web & Digital Experiences",
    items: ["Corporate Websites", "Landing Pages", "UI/UX", "CMS Development"],
    slug: "web-development",
  },
];

const whyItems = [
  { title: "Strategic Thinking", desc: "Every campaign begins with a clear objective." },
  { title: "Creative Execution", desc: "Ideas converted into useful business communication." },
  { title: "Business Understanding", desc: "Marketing that supports commercial goals." },
  { title: "Integrated Capability", desc: "Strategy, creative, digital and communication working together." },
  { title: "Flexible Engagement", desc: "Project-based, campaign-based or ongoing support." },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "Understand your business, audience and objective." },
  { num: "02", title: "Strategize", desc: "Define positioning, channels and direction." },
  { num: "03", title: "Create", desc: "Develop concepts, content and campaign assets." },
  { num: "04", title: "Execute", desc: "Launch campaigns across selected channels." },
  { num: "05", title: "Measure", desc: "Review performance and optimize." },
];

const industries = ["Food & FMCG", "Trading & Distribution", "Logistics", "Real Estate", "Retail"];

export default function CreativePageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

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
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/5">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/">
              <Image src="/images/logo/mangroves-global-logo-badge.png" width={64} height={64} className="h-14 sm:h-16 w-auto block" alt="Mangroves Global" />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <a href="#services" className="hover:text-mangrove-900 transition-colors">Services</a>
              <a href="#work" className="hover:text-mangrove-900 transition-colors">Work</a>
              <a href="#industries" className="hover:text-mangrove-900 transition-colors">Industries</a>
              <a href="#contact" className="hover:text-mangrove-900 transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>
          <Link href="/" className="hidden lg:inline-flex items-center mr-4 text-[11px] tracking-widest font-semibold uppercase text-mangrove-900/70 hover:text-mangrove-900">
            Explore Other Businesses
          </Link>
          <a href="#contact" className="hidden md:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase">
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden mr-6 text-mangrove-900 focus:outline-none" aria-label="Open menu">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-60 flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-mangrove-900" aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)}>Industries</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}

      <main className="pt-20 sm:pt-24">
        {/* HERO */}
        <section className="relative px-6 lg:px-16 py-24 lg:py-32 overflow-hidden bg-white">
          
          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-mangrove-accent/40 bg-mangrove-accent/10 text-mangrove-800 text-xs uppercase tracking-widest mb-8">
                Advertising, Digital Marketing &amp; Creative
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-mangrove-900 leading-tight mb-6">
                Ideas That Move<br /><span className="font-normal text-mangrove-accent">Businesses Forward.</span>
              </h1>
              <p className="text-mangrove-800/70 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-lg">
                Advertising, digital marketing and creative communication solutions designed to help businesses build visibility, communicate clearly and grow in competitive markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase text-center">
                  Start a Project
                </a>
                <a href="#services" className="px-8 py-4 border border-mangrove-500/40 hover:border-mangrove-500 text-mangrove-900 transition-colors rounded-full font-medium text-xs tracking-widest uppercase text-center">
                  Explore Our Services
                </a>
              </div>
            </div>
            <CreativeHeroVisual />
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="py-8 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">Advertising &amp; Communication</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">Digital Marketing</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">Branding &amp; Creative</span>
            <span className="text-xs uppercase tracking-wider text-mangrove-800/60">Web &amp; Digital Experiences</span>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Introduction</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3 mb-6">Creative Thinking. Strategic Execution.</h2>
            <p className="text-mangrove-800/70 leading-relaxed">
              We combine strategy, creativity, communication and digital execution to help businesses stay consistent across every channel — with marketing built around measurable objectives, not just content for its own sake.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-14">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Services</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">What we do</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {serviceGroups.map((group) => (
                <Link
                  key={group.title}
                  href={`/creative/${group.slug}`}
                  className="block p-6 rounded-2xl border border-mangrove-100 bg-white hover:border-mangrove-accent/50 transition-colors"
                >
                  <h3 className="font-serif text-base font-semibold text-mangrove-900 mb-3">{group.title}</h3>
                  <ul className="text-xs text-mangrove-800/60 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="py-20 px-6 lg:px-16 bg-mangrove-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Why Mangroves Global</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-3">Why businesses work with us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {whyItems.map((item) => (
                <div key={item.title}>
                  <h3 className="font-serif text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">How We Work</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Five steps</h2>
            </div>
            <div className="grid sm:grid-cols-5 gap-6">
              {processSteps.map((step) => (
                <div key={step.num}>
                  <div className="text-mangrove-accent font-serif text-2xl mb-2">{step.num}</div>
                  <h3 className="font-serif text-mangrove-900 font-semibold mb-1">{step.title}</h3>
                  <p className="text-xs text-mangrove-800/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="py-20 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Industries</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Who we work with</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {industries.map((ind) => (
                <div key={ind} className="p-5 rounded-xl border border-mangrove-100 bg-white text-sm font-medium text-mangrove-900 text-center">
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-20 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-12">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Selected Work</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Recent projects</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {["Branding · Retail", "Digital Marketing · FMCG", "Web & UX · Hospitality"].map((label) => (
                <div key={label} className="rounded-2xl overflow-hidden border border-mangrove-100">
                  <div
                    className="aspect-[4/3] flex items-center justify-center border-b border-dashed border-mangrove-500 text-mangrove-500 text-[11px] uppercase tracking-widest"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, #f2f6f5, #f2f6f5 10px, #dde7e4 10px, #dde7e4 20px)" }}
                  >
                    Image Placeholder — Project
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-mangrove-accent uppercase tracking-widest font-semibold mb-1">{label}</div>
                    <p className="text-sm text-mangrove-800/70">Project description placeholder.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA — project inquiry form */}
        <section id="contact" className="py-20 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mb-4">Start a project</h2>
              <p className="text-mangrove-900/70">Tell us what you&apos;re building and we&apos;ll put together the right team and approach.</p>
            </div>

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
                    <label htmlFor="cr-name" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Full Name</label>
                    <input id="cr-name" name="name" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="cr-company" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Company Name</label>
                    <input id="cr-company" name="company" type="text" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cr-email" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Email</label>
                    <input id="cr-email" name="email" type="email" required className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="cr-service" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Service Required</label>
                    <select id="cr-service" name="service" className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-800 focus:outline-none focus:border-mangrove-accent">
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
                  <label htmlFor="cr-message" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Tell Us About the Project</label>
                  <textarea id="cr-message" name="message" rows={4} required placeholder="What are you looking to achieve?" className="w-full border border-mangrove-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending..." : "Start a Project"}
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

      <footer className="bg-mangrove-900 text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image src="/images/logo/mangroves-global-logo-wordmark.png" width={140} height={28} className="h-6 sm:h-7 w-auto block" alt="Mangroves Global" />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
