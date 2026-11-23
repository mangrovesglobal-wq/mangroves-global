"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Reveal from "./Reveal";

export default function ContactPageContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

    const divisionMap: Record<string, string> = {
      "Trading": "trading",
      "Logistics": "logistics",
      "Creative": "creative",
      "Not sure / General inquiry": "general",
    };
    const rawDivision = String(formData.get("division") || "");

    const payload = {
      division: divisionMap[rawDivision] || "general",
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
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
    <div className="bg-white text-mangrove-900 antialiased">
      <SiteHeader />

      <main className="pt-20 sm:pt-24 px-6 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-5">
            <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Contact</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 mt-3 mb-8">
              Talk to the Right Division
            </h1>
            <p className="text-mangrove-800/70 leading-relaxed mb-10">
              Tell us what you need and we&apos;ll connect you with the relevant Mangroves Global team — Trading, Logistics or Creative.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-mangrove-50 border border-mangrove-100 flex items-center justify-center text-mangrove-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-mangrove-800/50">Headquarters</span>
                  <span className="text-sm font-medium text-mangrove-900 block mt-1">
                    CWEP9605, Compass Bldg, Al Hamra Ind Zone, Ras Al Khaimah, UAE
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-mangrove-50 border border-mangrove-100 flex items-center justify-center text-mangrove-accent shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-mangrove-800/50">Phone / WhatsApp</span>
                  <a href="tel:+971541242100" className="text-sm font-medium text-mangrove-900 hover:text-mangrove-accent transition-colors block mt-1">
                    +971 54 1242 100
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-mangrove-50 border border-mangrove-100 flex items-center justify-center text-mangrove-accent shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-mangrove-800/50">Email</span>
                  <a href="mailto:info@mangrovesglobal.com" className="text-sm font-medium text-mangrove-900 hover:text-mangrove-accent transition-colors block mt-1">
                    info@mangrovesglobal.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            {formStatus === "success" ? (
              <div className="bg-mangrove-50 border border-mangrove-100 rounded-3xl p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-mangrove-accent mx-auto mb-4" />
                <p className="font-serif text-xl text-mangrove-900 mb-2">Thanks — your message has been sent.</p>
                <p className="text-mangrove-800/60 text-sm">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-mangrove-50 border border-mangrove-100 rounded-3xl p-8 sm:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ct-name" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Full Name</label>
                    <input id="ct-name" name="name" type="text" required className="w-full border border-mangrove-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="ct-company" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Company Name</label>
                    <input id="ct-company" name="company" type="text" className="w-full border border-mangrove-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ct-email" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Email</label>
                    <input id="ct-email" name="email" type="email" required className="w-full border border-mangrove-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                  </div>
                  <div>
                    <label htmlFor="ct-division" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Which Division?</label>
                    <select id="ct-division" name="division" className="w-full border border-mangrove-100 bg-white rounded-xl px-4 py-3 text-sm text-mangrove-800 focus:outline-none focus:border-mangrove-accent">
                      <option>Trading</option>
                      <option>Logistics</option>
                      <option>Creative</option>
                      <option>Not sure / General inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="ct-message" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">Message</label>
                  <textarea id="ct-message" name="message" rows={5} required className="w-full border border-mangrove-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mangrove-accent" />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>

                {formStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Something went wrong sending your message. Please try again or email us directly.</span>
                  </div>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
