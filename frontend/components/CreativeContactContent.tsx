"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertTriangle, Mail, Clock, MapPin } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

const SERVICES = [
  { id: "advertising",    label: "Advertising &\nCommunication",    icon: "📢" },
  { id: "digital",        label: "Digital\nMarketing",              icon: "📈" },
  { id: "branding",       label: "Branding &\nCreative",            icon: "✦" },
  { id: "content",        label: "Content &\nProduction",           icon: "🎬" },
  { id: "web",            label: "Web & Digital\nExperiences",      icon: "🖥" },
  { id: "notsure",        label: "Not sure yet —\ntell us more",    icon: "💡" },
];

const SERVICE_LABELS: Record<string, string> = {
  advertising: "Advertising & Communication",
  digital:     "Digital Marketing",
  branding:    "Branding & Creative",
  content:     "Content & Production",
  web:         "Web & Digital Experiences",
  notsure:     "Not sure yet",
};

const WHAT_NEXT = [
  { n: "01", title: "We receive your brief", desc: "Your enquiry lands with our creative team — not a generic inbox." },
  { n: "02", title: "We review and respond", desc: "Within one business day we'll reply with questions or a proposed next step." },
  { n: "03", title: "We set up a call", desc: "A focused conversation to understand the brief, timeline, and budget before anything is proposed." },
];

export default function CreativeContactContent() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  function pickService(id: string) {
    setSelectedService(id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(`${API_BASE_URL}/api/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          division: "creative",
          name:     data.get("name"),
          company:  data.get("company"),
          email:    data.get("email"),
          subject:  data.get("service"),
          message:  data.get("message"),
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setFormStatus("success");
        form.reset();
        setCharCount(0);
        setSelectedService("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <DivisionHeader division="creative" />

      {/* ── DARK HERO ─────────────────────────────────────────── */}
      <section className="bg-mangrove-900 text-white pt-27 pb-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-white/40 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/creative" className="hover:text-mangrove-accent transition-colors">Creative</Link>
            <span>/</span>
            <span className="text-white/70">Contact</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-mangrove-accent" />
            <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest">Start a Project</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-bold leading-[1.04] mb-8 max-w-3xl">
            Let&apos;s Build<br />
            <span className="text-mangrove-accent">Something</span><br />
            Together.
          </h1>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
            Tell us what you&apos;re working on. Our creative team will come back with the right people, the right approach, and no sales fluff.
          </p>
        </div>
      </section>

      {/* ── SERVICE PICKER ────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-16 border-b border-mangrove-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-mangrove-800/50 font-semibold mb-6">
            What are you looking to build?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICES.map(({ id, label, icon }) => {
              const active = selectedService === id;
              return (
                <button
                  key={id}
                  onClick={() => pickService(id)}
                  className={`group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${active
                      ? "border-mangrove-accent bg-mangrove-900 text-white shadow-lg scale-[1.03]"
                      : "border-mangrove-100 hover:border-mangrove-900 hover:bg-mangrove-900/5 text-mangrove-800"
                    }`}
                >
                  <span className="text-2xl leading-none">{icon}</span>
                  <span className={`text-xs font-semibold leading-snug whitespace-pre-line ${active ? "text-white" : ""}`}>
                    {label}
                  </span>
                  {active && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-mangrove-accent flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-mangrove-900" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────────────────── */}
      <section ref={formRef} className="px-6 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_340px] gap-16">

          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2">Send Us a Brief</h2>
            <p className="text-mangrove-800/55 mb-10 max-w-lg">
              The more context you give us, the better our response. There&apos;s no commitment required.
            </p>

            {formStatus === "success" ? (
              <div className="bg-mangrove-50 rounded-3xl p-12 text-center border border-mangrove-100">
                <CheckCircle2 className="w-12 h-12 text-mangrove-accent mx-auto mb-5" />
                <h3 className="font-serif text-2xl text-mangrove-900 mb-3">Brief received.</h3>
                <p className="text-mangrove-800/60 text-sm mb-6">
                  Our creative team will review and follow up within one business day.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="cc-name" className="block text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-2">
                      Full Name <span className="text-mangrove-accent">*</span>
                    </label>
                    <input
                      id="cc-name" name="name" type="text" required
                      className="w-full border border-mangrove-100 rounded-xl px-4 py-3.5 text-sm text-mangrove-900 placeholder-mangrove-800/30 focus:outline-none focus:border-mangrove-900 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-company" className="block text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-2">
                      Company <span className="text-mangrove-accent">*</span>
                    </label>
                    <input
                      id="cc-company" name="company" type="text" required
                      className="w-full border border-mangrove-100 rounded-xl px-4 py-3.5 text-sm text-mangrove-900 placeholder-mangrove-800/30 focus:outline-none focus:border-mangrove-900 transition-colors duration-200"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cc-email" className="block text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-2">
                      Email <span className="text-mangrove-accent">*</span>
                    </label>
                    <input
                      id="cc-email" name="email" type="email" required
                      className="w-full border border-mangrove-100 rounded-xl px-4 py-3.5 text-sm text-mangrove-900 placeholder-mangrove-800/30 focus:outline-none focus:border-mangrove-900 transition-colors duration-200"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-service" className="block text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-2">
                      Service Required
                    </label>
                    <select
                      id="cc-service" name="service"
                      value={selectedService ? SERVICE_LABELS[selectedService] : ""}
                      onChange={(e) => {
                        const matched = Object.entries(SERVICE_LABELS).find(([, v]) => v === e.target.value);
                        setSelectedService(matched ? matched[0] : "");
                      }}
                      className="w-full border border-mangrove-100 rounded-xl px-4 py-3.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-900 transition-colors duration-200 bg-white"
                    >
                      <option value="">Select a service…</option>
                      <option>Advertising &amp; Communication</option>
                      <option>Digital Marketing</option>
                      <option>Branding &amp; Creative</option>
                      <option>Content &amp; Production</option>
                      <option>Web &amp; Digital Experiences</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="cc-budget" className="block text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-2">
                    Approximate Budget (optional)
                  </label>
                  <select
                    id="cc-budget" name="budget"
                    className="w-full border border-mangrove-100 rounded-xl px-4 py-3.5 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-900 transition-colors duration-200 bg-white"
                  >
                    <option value="">Prefer not to say</option>
                    <option>Under AED 10,000</option>
                    <option>AED 10,000 – 30,000</option>
                    <option>AED 30,000 – 75,000</option>
                    <option>AED 75,000 – 200,000</option>
                    <option>AED 200,000+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="cc-message" className="block text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold">
                      Tell Us About the Project <span className="text-mangrove-accent">*</span>
                    </label>
                    <span className="text-[10px] text-mangrove-800/40">{charCount}/1000</span>
                  </div>
                  <textarea
                    id="cc-message" name="message" rows={5} required
                    maxLength={1000}
                    onChange={(e) => setCharCount(e.target.value.length)}
                    placeholder="What are you trying to achieve? The more you share, the better our response."
                    className="w-full border border-mangrove-100 rounded-xl px-4 py-3.5 text-sm text-mangrove-900 placeholder-mangrove-800/30 focus:outline-none focus:border-mangrove-900 transition-colors duration-200 resize-none"
                  />
                </div>

                {formStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Something went wrong. Please try again or email us directly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-5 bg-mangrove-900 text-white hover:bg-mangrove-accent hover:text-mangrove-900 transition-colors duration-300 rounded-full font-bold text-xs tracking-widest uppercase disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending…" : "Send Your Brief →"}
                </button>

                <p className="text-center text-xs text-mangrove-800/40">
                  No commitment. We review every brief personally.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10 pt-2 lg:pt-18">
            {/* What happens next */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-6 text-mangrove-900">What happens next</h3>
              <div className="space-y-6">
                {WHAT_NEXT.map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-mangrove-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {n}
                    </div>
                    <div>
                      <p className="font-semibold text-mangrove-900 text-sm mb-1">{title}</p>
                      <p className="text-sm text-mangrove-800/55 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-mangrove-100" />

            {/* Contact details */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-mangrove-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-0.5">Email</p>
                  <a href="mailto:hello@mangrovesglobal.com" className="text-sm text-mangrove-900 hover:text-mangrove-accent transition-colors font-medium">
                    hello@mangrovesglobal.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-mangrove-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-0.5">Office Hours</p>
                  <p className="text-sm text-mangrove-900">Sunday–Thursday, 9am–6pm GST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mangrove-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-0.5">Location</p>
                  <p className="text-sm text-mangrove-900">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-mangrove-100" />

            {/* Services shortcut */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-mangrove-800/50 font-semibold mb-4">Explore Our Services</p>
              <div className="space-y-2">
                {[
                  ["Advertising & Communication", "/creative/advertising"],
                  ["Digital Marketing",           "/creative/digital-marketing"],
                  ["Branding & Creative",         "/creative/branding"],
                  ["Content & Production",        "/creative/content-production"],
                  ["Web & Digital Experiences",   "/creative/web-development"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between py-2.5 border-b border-mangrove-50 text-sm text-mangrove-800 hover:text-mangrove-accent transition-colors group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
