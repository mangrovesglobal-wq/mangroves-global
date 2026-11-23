"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CheckCircle2, AlertTriangle, Upload } from "lucide-react";
import Reveal from "./Reveal";
import FaqAccordion from "./FaqAccordion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

const pillars = [
  { num: "01", title: "Market Access", desc: "Helping selected products reach relevant UAE B2B audiences — distributors, wholesalers and food processors already active in the category." },
  { num: "02", title: "Commercial Representation", desc: "Supporting buyer communication, enquiry handling and day-to-day business development on the ground in the UAE." },
  { num: "03", title: "Market Development", desc: "Building relationships and recurring opportunities over time, rather than one-off introductions." },
];

const reasons = [
  { size: "lg", title: "Local UAE Business Interface", desc: "A UAE-based point of contact for buyers, so enquiries get a fast, local response instead of waiting on a time-zone gap." },
  { size: "lg", title: "Lower Market-Entry Friction", desc: "Skip the cost and time of setting up a UAE sales presence before you know whether the market fit is there." },
  { size: "md", title: "B2B Buyer Development", desc: "Ongoing outreach and relationship-building with relevant UAE buyers on your behalf." },
  { size: "md", title: "Professional Product Presentation", desc: "Your products presented to UAE buyers in a consistent, commercially credible way." },
  { size: "sm", title: "Local Commercial Communication", desc: "Day-to-day buyer communication handled locally, in real time." },
  { size: "sm", title: "Integrated Digital Support", desc: "Where useful, product presentation extends into digital and content support." },
];

const journey = [
  { num: "01", title: "Product & Export Review", desc: "We review your product range, grades and export readiness." },
  { num: "02", title: "UAE Market Positioning", desc: "We position your product for the relevant UAE buyer segment." },
  { num: "03", title: "B2B Sales Representation", desc: "We represent your product to UAE buyers and manage enquiries." },
  { num: "04", title: "Digital Market Support", desc: "We support product presentation through digital channels where useful." },
  { num: "05", title: "Logistics Coordination", desc: "We coordinate onward shipment through our logistics network." },
  { num: "06", title: "Repeat Business Development", desc: "We build on early orders to develop a recurring buyer relationship." },
];

const qualifications = [
  "Quality", "Consistency", "Capacity", "Export Readiness",
  "Documentation", "Responsiveness", "Commercial Competitiveness", "Long-Term Commitment",
];

const processSteps = [
  { num: "01", title: "Submit Your Business", desc: "Tell us about your company and products through the form below." },
  { num: "02", title: "Product & Capacity Review", desc: "We review your product range, grades, certifications and supply capacity." },
  { num: "03", title: "Market Fit Discussion", desc: "If there's a potential fit, we discuss the UAE market opportunity directly with you." },
  { num: "04", title: "Partnership Structure", desc: "We agree a commercial structure suited to the scope of the relationship." },
  { num: "05", title: "Market Activation", desc: "We begin representing your product to relevant UAE buyers." },
  { num: "06", title: "Growth & Repeat Business", desc: "We build on early traction to develop a recurring commercial relationship." },
];

const commercialModels = [
  { title: "Representation", desc: "For ongoing UAE commercial representation.", structure: "Potential structure: retainer + success fee / commission." },
  { title: "Market Development", desc: "For targeted UAE market-entry activity.", structure: "Potential structure: project / service fee." },
  { title: "Trade & Supply", desc: "For direct trading or sourcing relationships.", structure: "Potential structure: agreed trading margin." },
];

const trustPrinciples = ["Transparency", "Reliability", "Quality", "Responsiveness", "Clear Communication", "Long-Term Thinking"];

const objectives = [
  "UAE Sales Representation",
  "Buyer Development",
  "GCC Market Entry",
  "Digital Product Marketing",
  "Distribution Opportunity",
  "Sourcing / Trading",
  "Other",
];

const faqs = [
  { question: "What type of suppliers do you represent?", answer: "Established producers, processors and exporters of agricultural products and spices who are export-ready and looking to develop UAE B2B opportunities." },
  { question: "Do you work with Indian spice producers?", answer: "Yes — Indian spice and agricultural producers are a core focus, given our origin sourcing relationships and the India–UAE trade corridor." },
  { question: "Can Mangroves Global help us enter the UAE market?", answer: "We can help by acting as a local commercial interface — supporting buyer development, communication and market positioning in the UAE." },
  { question: "Do you guarantee buyers or orders?", answer: "No. We do not guarantee buyers, orders or sales volumes. We represent your product and develop opportunities where commercially suitable." },
  { question: "Do suppliers need a UAE company?", answer: "Not necessarily. Representation is designed for suppliers who want a UAE commercial presence without setting one up directly." },
  { question: "How are representation fees structured?", answer: "Commercial structures are agreed individually based on scope, responsibility, territory, product and opportunity — see Commercial Structures above." },
  { question: "Can you help with product catalogues and digital marketing?", answer: "Where useful, our Digital & Creative division can support product presentation and digital marketing alongside commercial representation." },
  { question: "Can you coordinate logistics?", answer: "Yes — our Logistics division can coordinate onward freight and customs clearance through qualified partners once a commercial relationship is in place." },
  { question: "Do you only work with spice suppliers?", answer: "Spices are a core focus, but we also consider other food and agricultural commodities on a case-by-case basis." },
  { question: "What happens after submitting the enquiry?", answer: "We review each submission individually and get back to suppliers where there's a potential market fit." },
];

export default function BecomePartnerContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${API_BASE_URL}/api/supplier-partnership`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) {
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
    <>
      <SiteHeader />
      <div className="bg-white text-mangrove-900 antialiased overflow-x-clip">
      <main className="pt-20 sm:pt-24">
        {/* HERO */}
        <section className="relative px-6 lg:px-16 py-20 sm:py-28 overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-mangrove-accent blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-mangrove-500 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <span className="reveal inline-flex items-center px-4 py-2 rounded-full border border-mangrove-accent/40 bg-mangrove-accent/10 text-mangrove-accent text-xs uppercase tracking-widest mb-8" style={{ animationDelay: "0.05s" }}>
              Supplier Representation · UAE Market Entry
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-mangrove-900 leading-tight mb-6">
              <span className="reveal inline-block" style={{ animationDelay: "0.15s" }}>Your Dedicated Commercial</span>{" "}
              <span className="reveal inline-block text-mangrove-accent font-normal" style={{ animationDelay: "0.28s" }}>& Sales Arm in the UAE</span>
            </h1>
            <p className="reveal text-xl text-mangrove-900 font-light mb-6" style={{ animationDelay: "0.4s" }}>
              You focus on production. We help you build the market.
            </p>
            <p className="reveal max-w-2xl mx-auto text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-10" style={{ animationDelay: "0.48s" }}>
              Mangroves Global helps established Indian spice producers and food suppliers develop B2B opportunities across the UAE. We provide a local commercial interface for buyer development, sales representation, market communication and regional growth.
            </p>
            <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" style={{ animationDelay: "0.56s" }}>
              <a href="#partner-form" className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
                Become a Supplier Partner
              </a>
              <a href="#how-it-works" className="px-8 py-4 border border-mangrove-200 hover:border-mangrove-accent text-mangrove-900 transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase">
                See How It Works
              </a>
            </div>

            <Reveal className="max-w-3xl mx-auto bg-mangrove-50 border border-mangrove-100 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative">
                <div className="hidden sm:block absolute top-1/2 left-10 right-10 h-px bg-mangrove-accent/40 -translate-y-1/2" />
                {[
                  { label: "Origin", place: "India" },
                  { label: "Commercial Arm", place: "Mangroves Global · UAE", emphasis: true },
                  { label: "Demand", place: "UAE Buyers" },
                  { label: "Reach", place: "GCC" },
                ].map((n) => (
                  <div
                    key={n.label}
                    className={`relative z-10 px-5 py-3 rounded-xl text-center ${n.emphasis ? "bg-mangrove-900 text-white" : "bg-white border border-mangrove-100"}`}
                  >
                    <span className={`block text-[10px] uppercase tracking-widest font-semibold mb-0.5 ${n.emphasis ? "text-mangrove-accent" : "text-mangrove-accent"}`}>{n.label}</span>
                    <span className={`font-serif text-sm font-medium ${n.emphasis ? "text-white" : "text-mangrove-900"}`}>{n.place}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE UAE OPPORTUNITY */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-t border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">The UAE Opportunity</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight">
                A Great Product Is Only the Beginning.
              </h2>
              <p className="text-mangrove-800/70 text-lg leading-relaxed mt-5">
                Many Indian producers already have the quality, production capability and export readiness UAE buyers look for. What often slows things down isn&apos;t the product — it&apos;s building the local presence to represent it.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              <Reveal className="p-8 rounded-2xl border border-mangrove-100 bg-white">
                <span className="text-xs uppercase tracking-widest text-mangrove-800/40 font-semibold mb-5 block">Without Local Representation</span>
                <ul className="space-y-4">
                  {["Producer", "Remote outreach", "Uncertain enquiries", "Communication gaps", "Missed opportunities"].map((step, i, arr) => (
                    <li key={step} className="flex items-center gap-3 text-mangrove-800/60">
                      <span className="w-6 h-6 rounded-full border border-mangrove-200 flex items-center justify-center text-[11px] shrink-0">{i + 1}</span>
                      <span className={i === arr.length - 1 ? "text-mangrove-800/50 italic" : ""}>{step}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className="p-8 rounded-2xl border border-mangrove-accent/50 bg-mangrove-accent/10">
                <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-5 block">With Mangroves Global</span>
                <ul className="space-y-4">
                  {["Producer", "UAE commercial interface", "Buyer development", "Local communication", "Commercial opportunity"].map((step, i, arr) => (
                    <li key={step} className="flex items-center gap-3 text-mangrove-900">
                      <span className="w-6 h-6 rounded-full bg-mangrove-accent text-mangrove-900 flex items-center justify-center text-[11px] font-semibold shrink-0">{i + 1}</span>
                      <span className={i === arr.length - 1 ? "text-mangrove-accent font-medium" : ""}>{step}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CORE POSITIONING — charcoal accent band */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-900">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-16">
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white leading-tight">
                Your UAE Presence Without Building One From Scratch
              </h2>
            </Reveal>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {pillars.map((p, i) => (
                <Reveal key={p.num} delay={i * 80}>
                  <div className="grid sm:grid-cols-12 gap-4 sm:gap-8 items-start py-10">
                    <span className="sm:col-span-2 font-serif text-4xl sm:text-5xl font-light text-mangrove-accent">{p.num}</span>
                    <h3 className="sm:col-span-3 text-xl sm:text-2xl font-semibold text-white">{p.title}</h3>
                    <p className="sm:col-span-7 text-slate-300 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PRODUCERS PARTNER WITH US */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">Why Producers Partner With Us</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight">
                Six reasons producers work with us.
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {reasons.map((r, i) => (
                <Reveal
                  key={r.title}
                  delay={i * 60}
                  className={r.size === "lg" ? "sm:col-span-2" : ""}
                >
                  <div className={`h-full rounded-2xl border border-mangrove-100 bg-mangrove-50/60 hover:border-mangrove-accent transition-colors ${r.size === "lg" ? "p-8 sm:p-10" : r.size === "md" ? "p-7" : "p-6"}`}>
                    <h3 className={`font-semibold text-mangrove-900 mb-2 ${r.size === "lg" ? "text-xl sm:text-2xl" : r.size === "md" ? "text-lg" : "text-base"}`}>{r.title}</h3>
                    <p className={`text-mangrove-800/60 leading-relaxed ${r.size === "sm" ? "text-sm" : "text-sm sm:text-base"}`}>{r.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FROM PRODUCT TO MARKET OPPORTUNITY */}
        <section id="how-it-works" className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-t border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">How It Works</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight">
                From Product to Market Opportunity
              </h2>
            </Reveal>

            <Reveal>
              <div className="relative">
                <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-mangrove-200">
                  <div className="timeline-fill absolute top-0 left-0 h-full w-full bg-mangrove-accent" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 relative">
                  {journey.map((j) => (
                    <div key={j.num}>
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-mangrove-accent flex items-center justify-center text-mangrove-900 font-serif text-sm font-medium mb-4">
                        {j.num}
                      </div>
                      <h3 className="text-sm font-semibold text-mangrove-900 mb-2 uppercase tracking-wide">{j.title}</h3>
                      <p className="text-xs text-mangrove-800/60 leading-relaxed">{j.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SUPPLIER QUALIFICATION */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-t border-b border-mangrove-100">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal className="max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">Supplier Qualification</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight">
                The Right Partnership Starts With the Right Supply Foundation.
              </h2>
            </Reveal>

            <Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {qualifications.map((q) => (
                  <div key={q} className="flex items-center gap-3 p-4 rounded-xl border border-mangrove-100 bg-white text-left">
                    <Check className="w-5 h-5 text-mangrove-accent shrink-0" />
                    <span className="text-sm text-mangrove-900 font-medium">{q}</span>
                  </div>
                ))}
              </div>
              <p className="text-mangrove-800/60 text-sm mt-8 max-w-xl mx-auto">
                Mangroves Global evaluates each supplier individually — meeting these areas is a starting point for a conversation, not an automatic guarantee of representation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* PARTNERSHIP PROCESS */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <Reveal className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">Partnership Process</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight">
                From Introduction to Market Opportunity
              </h2>
            </Reveal>

            <Reveal className="relative pl-8 sm:pl-10">
              <div className="absolute top-2 left-2.75 sm:left-3.75 bottom-2 w-px bg-mangrove-100">
                <div className="timeline-fill-v absolute top-0 left-0 w-full h-full bg-mangrove-accent" />
              </div>
              <div className="space-y-10">
                {processSteps.map((s, i) => (
                  <Reveal key={s.num} delay={200 + i * 120} className="relative">
                    <span className="absolute -left-8 sm:-left-10 top-0 w-6 h-6 rounded-full bg-mangrove-accent text-mangrove-900 text-[11px] font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-mangrove-900 mb-1">{s.title}</h3>
                    <p className="text-mangrove-800/60 text-sm sm:text-base leading-relaxed max-w-2xl">{s.desc}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* COMMERCIAL STRUCTURES */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-t border-b border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">Commercial Structures</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight">
                A Commercial Model That Fits the Relationship
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {commercialModels.map((m, i) => (
                <Reveal key={m.title} delay={i * 90}>
                  <div className="h-full p-8 rounded-2xl border border-mangrove-100 bg-white hover:border-mangrove-accent transition-colors">
                    <h3 className="font-serif text-xl font-semibold text-mangrove-900 mb-3">{m.title}</h3>
                    <p className="text-mangrove-800/70 text-sm leading-relaxed mb-4">{m.desc}</p>
                    <p className="text-xs text-mangrove-accent uppercase tracking-wide">{m.structure}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="text-mangrove-800/60 text-sm max-w-2xl">
                Commercial structures are agreed individually based on scope, responsibility, territory, product and opportunity.
              </p>
            </Reveal>
          </div>
        </section>

        {/* TRUST — bold gold band */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-accent">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-6">
                We Don&apos;t Just Introduce. We Build Relationships.
              </h2>
              <p className="text-mangrove-900/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Mangroves Global aims to create structured communication between suppliers and buyers — not a one-time introduction.
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                {trustPrinciples.map((p, i) => (
                  <span key={p} className="text-sm uppercase tracking-widest text-mangrove-900 font-semibold">
                    {p}{i < trustPrinciples.length - 1 && <span className="text-mangrove-900/30 ml-6">·</span>}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SUPPLIER FORM */}
        <section id="partner-form" className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-4">
                Become a Supplier Partner
              </h2>
              <p className="text-mangrove-800/70 leading-relaxed max-w-xl mx-auto">
                Tell us about your company, products and export capability. We review each supplier individually to determine potential UAE market fit.
              </p>
            </Reveal>

            {formStatus === "success" ? (
              <Reveal className="bg-mangrove-50 border border-mangrove-100 rounded-3xl p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-mangrove-accent mx-auto mb-4" />
                <p className="font-serif text-xl text-mangrove-900 mb-2">Thank You — Your Enquiry Has Been Received</p>
                <p className="text-mangrove-800/60 text-sm">Our commercial team will review your submission and follow up if there&apos;s a potential market fit.</p>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-mangrove-50 border border-mangrove-100 rounded-3xl p-6 sm:p-10 space-y-10">
                <fieldset className="space-y-5">
                  <legend className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-2">Company</legend>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Company Name" name="company_name" required />
                    <Field label="Contact Person" name="contact_person" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Country" name="country" required />
                    <Field label="City / State" name="city_state" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Website" name="website" type="url" placeholder="https://" />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <Field label="WhatsApp / Phone" name="phone" required />
                </fieldset>

                <fieldset className="space-y-5 pt-2 border-t border-mangrove-100">
                  <legend className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-2">Products</legend>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Primary Products" name="primary_products" required placeholder="e.g. Green Cardamom, Black Pepper" />
                    <Field label="Product Categories" name="product_categories" placeholder="e.g. Spices, Food Commodities" />
                  </div>
                  <TextArea label="Grades / Specifications" name="grades_specifications" rows={2} />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Packaging" name="packaging" placeholder="e.g. 25kg PP bags, export cartons" />
                    <Field label="Certifications" name="certifications" placeholder="e.g. FSSAI, Spice Board, APEDA" />
                  </div>
                </fieldset>

                <fieldset className="space-y-5 pt-2 border-t border-mangrove-100">
                  <legend className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-2">Export Capability</legend>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Current Export Markets" name="export_markets" />
                    <Field label="Monthly / Annual Capacity" name="monthly_capacity" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="MOQ" name="moq" />
                    <Field label="Existing UAE Customers" name="existing_uae_customers" placeholder="If any" />
                  </div>
                </fieldset>

                <fieldset className="space-y-5 pt-2 border-t border-mangrove-100">
                  <legend className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-2">Objective</legend>
                  <div>
                    <label htmlFor="partnership_objective" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">
                      What are you looking for? <span className="text-mangrove-accent">*</span>
                    </label>
                    <select id="partnership_objective" name="partnership_objective" required className="w-full bg-white border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 focus:outline-none focus:border-mangrove-accent">
                      <option value="">Select an objective</option>
                      {objectives.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <TextArea label="Tell Us About Your Export Goals" name="message" rows={4} />
                  <div>
                    <label htmlFor="documents" className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">
                      Company Profile / Catalogue / Spec Sheet (optional)
                    </label>
                    <label htmlFor="documents" className="flex items-center gap-3 border border-dashed border-mangrove-200 rounded-xl px-4 py-4 text-sm text-mangrove-800/60 cursor-pointer hover:border-mangrove-accent transition-colors bg-white">
                      <Upload className="w-4 h-4 shrink-0" />
                      <span>Attach PDF, Word or image files</span>
                    </label>
                    <input id="documents" name="documents[]" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="sr-only" />
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors rounded-full font-semibold text-xs tracking-widest uppercase disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Reviewing Your Partnership Enquiry…" : "Submit Supplier Partnership Enquiry"}
                </button>

                {formStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Something went wrong sending your enquiry. Please try again or email us directly.</span>
                  </div>
                )}

                <p className="text-xs text-mangrove-800/40 leading-relaxed">
                  Information submitted here is used only to evaluate your supplier partnership enquiry and will not be shared outside Mangroves Global.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-t border-mangrove-100">
          <div className="max-w-3xl mx-auto">
            <Reveal className="mb-10">
              <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">FAQs</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 leading-tight">
                Supplier Partnership FAQs
              </h2>
            </Reveal>
            <Reveal>
              <FaqAccordion items={faqs} theme="light" />
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA — charcoal bookend */}
        <section className="py-24 sm:py-32 px-6 lg:px-16 bg-mangrove-900 text-center">
          <Reveal className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-mangrove-accent font-semibold mb-3 block">Ready to Explore the UAE?</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white leading-tight mb-6">
              You Build the Product.<br />We&apos;ll Help Build the Market.
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-xl mx-auto mb-10">
              If you are an established Indian producer, processor or exporter looking to develop B2B opportunities in the UAE, introduce your business to Mangroves Global.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#partner-form" className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
                Become a Supplier Partner
              </a>
              <Link href="/trading#contact" className="px-8 py-4 border border-slate-600 hover:border-mangrove-accent text-white transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase">
                Talk to Our Commercial Team
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      </div>
      <SiteFooter />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">
        {label} {required && <span className="text-mangrove-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 placeholder:text-mangrove-800/30 focus:outline-none focus:border-mangrove-accent"
      />
    </div>
  );
}

function TextArea({ label, name, rows = 3 }: { label: string; name: string; rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-mangrove-800/60 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="w-full bg-white border border-mangrove-100 rounded-xl px-4 py-3 text-sm text-mangrove-900 placeholder:text-mangrove-800/30 focus:outline-none focus:border-mangrove-accent"
      />
    </div>
  );
}
