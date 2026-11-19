import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import PartnershipDiagram from "@/components/PartnershipDiagram";
import { TradingIcon, LogisticsIcon, CreativeIcon } from "@/components/DivisionIcons";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("about", {
    title: "About Mangroves Global | Trading, Logistics & Creative",
    description:
      "Mangroves Global connects trading, logistics and creative capabilities from the UAE, supporting businesses across sourcing, movement and digital growth.",
    alternates: { canonical: "https://mangrovesglobal.com/about" },
  });
}

const philosophyCards = [
  { num: "01", title: "Direct Relationships", desc: "Wherever practical, we work closer to the source — with suppliers, logistics partners, clients and the people responsible for making things happen." },
  { num: "02", title: "Practical Thinking", desc: "We focus on what works in the real world, not what simply looks good on paper." },
  { num: "03", title: "Clear Connections", desc: "Good business depends on information moving clearly between the right people, places and decisions." },
  { num: "04", title: "Built to Last", desc: "We prefer relationships and systems that create value beyond a single transaction." },
];

const usps = [
  { num: "01", title: "Relationship-Led", desc: "We build business through people and dependable relationships rather than relying purely on transactional networks." },
  { num: "02", title: "Origin-Aware", desc: "Our trading approach is informed by proximity to source, particularly in agricultural supply chains." },
  { num: "03", title: "Connected Capabilities", desc: "Trading, logistics and creative capabilities give us different ways to support businesses as their requirements evolve." },
  { num: "04", title: "Built for Practical Business", desc: "Our focus is on commercially useful outcomes — sourcing, moving, positioning and growing products and businesses." },
  { num: "05", title: "Flexible by Design", desc: "We work with partners and specialist networks where expertise or infrastructure is better provided by the right external operator." },
];

const divisions = [
  {
    key: "trading",
    num: "01",
    name: "Trading",
    tagline: "From origin to opportunity.",
    desc: "Agricultural products and spices, sourced directly and supplied in bulk to B2B buyers across the UAE and GCC.",
    cta: "Explore Trading",
    href: "/trading",
    tone: "bg-mangrove-900",
    Icon: TradingIcon,
  },
  {
    key: "logistics",
    num: "02",
    name: "Logistics",
    tagline: "Moving business with greater clarity.",
    desc: "Sea freight, air freight, road transport, customs coordination and warehousing — coordinated through qualified logistics partners, not an owned fleet.",
    cta: "Explore Logistics",
    href: "/logistics",
    tone: "bg-mangrove-500",
    Icon: LogisticsIcon,
  },
  {
    key: "creative",
    num: "03",
    name: "Digital & Creative",
    tagline: "Making businesses easier to find, understand and choose.",
    desc: "Digital marketing, websites, content and branding built for UAE businesses that need to grow their presence.",
    cta: "Explore Digital & Creative",
    href: "/creative",
    tone: "bg-[#a97a3c]",
    Icon: CreativeIcon,
  },
];

const steps = [
  { num: "01", title: "Understand", desc: "We start with the requirement, the market and the people involved." },
  { num: "02", title: "Connect", desc: "We bring together the relevant suppliers, partners, specialists or capabilities." },
  { num: "03", title: "Execute", desc: "We focus on practical coordination and clear communication." },
  { num: "04", title: "Build", desc: "The goal is not only to complete today's requirement, but to create a stronger relationship for what comes next." },
];

const routeNodes = [
  { label: "Origin", place: "India" },
  { label: "Hub", place: "UAE", emphasis: true },
  { label: "Corridor", place: "GCC" },
  { label: "Reach", place: "Global" },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mangrovesglobal.com/#organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
        logo: "https://mangrovesglobal.com/images/logo/mangroves-global-logo-badge.png",
        description: "Mangroves Global brings together trading, logistics and creative capabilities under one practical philosophy.",
      },
      {
        "@type": "WebPage",
        "@id": "https://mangrovesglobal.com/about#webpage",
        url: "https://mangrovesglobal.com/about",
        name: "About Mangroves Global",
        isPartOf: { "@id": "https://mangrovesglobal.com/#organization" },
        description: "Mangroves Global's relationship-led approach to trading, logistics and creative growth.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "About Us", item: "https://mangrovesglobal.com/about" },
        ],
      },
    ],
  };

  return (
    <div className="bg-white text-mangrove-900 antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main className="pt-20 sm:pt-24">
        {/* HERO */}
        <section className="relative px-6 lg:px-16 py-20 sm:py-28 overflow-hidden">
          <div className="absolute right-6 bottom-6 hidden lg:block opacity-[0.15] pointer-events-none select-none" aria-hidden="true">
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="98" stroke="#d5ad75" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="70" stroke="#d5ad75" strokeWidth="1" />
              <path d="M100 0V200M0 100H200" stroke="#d5ad75" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <span className="reveal block text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-4" style={{ animationDelay: "0.05s" }}>
              About Mangroves Global
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-mangrove-900 leading-[1.08] mb-8">
              <span className="reveal inline-block" style={{ animationDelay: "0.15s" }}>Different disciplines.</span>
              <br />
              <span className="reveal inline-block text-mangrove-accent font-normal" style={{ animationDelay: "0.28s" }}>One way of working.</span>
            </h1>
            <p className="reveal text-mangrove-800/70 text-base sm:text-lg leading-relaxed max-w-2xl mb-10" style={{ animationDelay: "0.42s" }}>
              Mangroves Global brings together trading, logistics and creative capabilities under one practical philosophy — build strong relationships, understand what matters, and deliver with purpose.
            </p>
            <div className="reveal flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.54s" }}>
              <a href="#divisions" className="inline-flex justify-center items-center px-8 py-4 bg-mangrove-900 text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-mangrove-800 transition-colors">
                Explore Our Companies
              </a>
              <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 border border-mangrove-accent/60 text-mangrove-900 text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-mangrove-accent/10 transition-colors">
                Let&apos;s Connect
              </Link>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" className="py-20 sm:py-28 px-6 lg:px-16 bg-white border-t border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">Our Philosophy</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-5">
                Three disciplines. One set of principles.
              </h2>
              <p className="text-mangrove-800/60 text-lg leading-relaxed">
                Trading, logistics and creative work may look very different on the surface. But the way we approach them is remarkably consistent: stay close to the people involved, understand the real requirement, communicate clearly and focus on execution.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {philosophyCards.map((c, i) => (
                <Reveal key={c.num} delay={i * 100} className="group relative bg-mangrove-50 p-7 rounded-2xl border border-mangrove-100 transition-all duration-300 hover:-translate-y-1 hover:border-mangrove-accent hover:shadow-lg">
                  <div className="font-serif text-3xl font-light text-mangrove-accent/60 group-hover:text-mangrove-accent transition-colors mb-4">{c.num}</div>
                  <h3 className="text-base font-semibold text-mangrove-900 mb-2 tracking-wide uppercase">{c.title}</h3>
                  <p className="text-sm text-mangrove-800/60 leading-relaxed">{c.desc}</p>
                  <div className="w-0 h-0.5 bg-mangrove-accent mt-5 transition-all duration-300 group-hover:w-full" />
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* WHY MANGROVES GLOBAL */}
        <section className="py-12 sm:py-16 px-6 lg:px-16 bg-mangrove-900 text-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-7">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-2 block">Why Mangroves Global</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white leading-tight mb-3">
                Closer to the work. Closer to the people.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                What sets us apart is proximity — to origin, to partners, and to the people making decisions — paired with honest, direct communication.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-3">
              {usps.map((u, i) => (
                <Reveal key={u.num} delay={i * 70} className={i === usps.length - 1 ? "sm:col-span-2" : ""}>
                  <div className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:border-mangrove-accent/50 hover:bg-white/6 hover:-translate-y-1">
                    <span className="pointer-events-none absolute -top-2 right-3 font-serif text-5xl leading-none font-light text-white/5 select-none">
                      {u.num}
                    </span>
                    <div className="relative">
                      <span className="text-mangrove-accent font-serif text-xs font-medium tracking-widest">{u.num}</span>
                      <h3 className="mt-1.5 text-base font-semibold tracking-wide text-white">
                        {u.title}
                      </h3>
                      <p className="mt-2 text-slate-300 text-sm leading-relaxed max-w-md">{u.desc}</p>
                      <div className="mt-3.5 w-7 h-px bg-mangrove-accent/50 transition-all duration-300 group-hover:w-14" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* THREE DIVISIONS */}
        <section id="divisions" className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">What We Do</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-5">
                Three capabilities. Different needs. One connected approach.
              </h2>
              <p className="text-mangrove-800/60 text-lg leading-relaxed">
                Our divisions operate independently or together, tailored to what your business needs at any given stage.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-6">
              {divisions.map((d, i) => (
                <Reveal key={d.key} delay={i * 100}>
                  <Link
                    href={d.href}
                    className="group block h-full bg-white rounded-3xl border border-mangrove-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className={`relative h-36 ${d.tone} flex items-center justify-between px-7`}>
                      <d.Icon />
                      <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">{d.num}</span>
                    </div>
                    <div className="p-7">
                      <h3 className="font-serif text-xl font-semibold text-mangrove-900 mb-2">{d.name}</h3>
                      <p className="text-mangrove-900 font-medium text-sm mb-3">{d.tagline}</p>
                      <p className="text-mangrove-800/60 text-sm leading-relaxed mb-6">{d.desc}</p>
                      <div className="w-full h-px bg-mangrove-100 mb-5 group-hover:bg-mangrove-accent transition-colors" />
                      <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 group-hover:text-mangrove-accent transition-colors">
                        {d.cta} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">How We Work</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-5">
                Simple in principle. Serious in execution.
              </h2>
              <p className="text-mangrove-800/60 text-lg leading-relaxed">
                A structured four-step approach designed to remove ambiguity and keep every requirement moving.
              </p>
            </Reveal>

            <Reveal>
              <div className="relative">
                <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-mangrove-100">
                  <div className="timeline-fill absolute top-0 left-0 h-full w-full bg-mangrove-accent" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 relative">
                  {steps.map((s) => (
                    <div key={s.num}>
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-mangrove-accent flex items-center justify-center text-mangrove-900 font-serif text-xl font-medium mb-6">
                        {s.num}
                      </div>
                      <h3 className="text-lg font-semibold text-mangrove-900 mb-2 tracking-wide uppercase">{s.title}</h3>
                      <p className="text-sm text-mangrove-800/60 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* OUR ROOTS */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">Where It Started</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-6">
                Relationships came first. The business followed.
              </h2>
              <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-5">
                Mangroves Global&apos;s trading roots are in direct-origin sourcing from India — working with growers and farm-gate aggregators rather than buying opportunistically on the open market. That same preference for short, direct relationships carried through into how we built our logistics and creative divisions.
              </p>
              <p className="text-mangrove-800/60 leading-relaxed">
                Staying close to origin, and close to the businesses we work with across the UAE and GCC, is what keeps that approach consistent across all three divisions.
              </p>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-6">
              <div className="relative bg-mangrove-900 rounded-3xl p-10 sm:p-14 overflow-hidden text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-mangrove-accent/40 flex items-center justify-center text-mangrove-accent">
                  <TradingIcon />
                </div>
                <h3 className="text-white text-xl font-serif font-light mb-3">Rooted in Origin &amp; Trust</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                  Connecting growers and producers with commercial markets through direct, dependable relationships.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* UAE + GLOBAL OUTLOOK */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <Reveal className="max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">Our Outlook</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-5">
                Rooted in the region. Connected beyond it.
              </h2>
              <p className="text-mangrove-800/60 text-lg leading-relaxed">
                Positioned to connect Indian origin sourcing with UAE and GCC markets, and beyond.
              </p>
            </Reveal>

            <Reveal>
              <div className="max-w-4xl mx-auto bg-mangrove-50 p-8 sm:p-14 rounded-3xl border border-mangrove-100">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                  <div className="hidden md:block absolute top-1/2 left-12 right-12 h-px bg-mangrove-accent/40 -translate-y-1/2" />
                  {routeNodes.map((n) => (
                    <div
                      key={n.label}
                      className={`relative z-10 px-6 py-4 rounded-2xl text-center min-w-32.5 ${
                        n.emphasis ? "bg-mangrove-900 text-white border border-mangrove-accent py-5 px-8 min-w-37.5" : "bg-white border border-mangrove-100"
                      }`}
                    >
                      <span className={`block text-xs uppercase tracking-widest mb-1 font-semibold ${n.emphasis ? "text-mangrove-accent" : "text-mangrove-accent"}`}>{n.label}</span>
                      <span className={`font-serif text-lg font-medium ${n.emphasis ? "text-white" : "text-mangrove-900"}`}>{n.place}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">Partnerships</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 leading-tight mb-5">
                The right relationship can move a business further.
              </h2>
              <p className="text-mangrove-800/60 text-lg leading-relaxed">
                We don&apos;t try to do everything ourselves — we connect the right capability to the right requirement. Hover over a group below to see how it fits.
              </p>
            </Reveal>

            <Reveal>
              <PartnershipDiagram />
            </Reveal>
          </div>
        </section>

        {/* CREDIBILITY */}
        <section className="py-14 px-6 lg:px-16 bg-white border-b border-mangrove-100">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">Credibility</span>
            <p className="font-serif text-xl sm:text-2xl text-mangrove-900">
              Built around accountability, communication and relationships.
            </p>
          </Reveal>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 sm:py-32 px-6 lg:px-16 bg-mangrove-900 text-center">
          <Reveal className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-mangrove-accent font-semibold mb-3 block">Let&apos;s Build Something Useful</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white leading-tight mb-6">
              Have a requirement?<br />Let&apos;s talk about it.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Whether you&apos;re sourcing products, coordinating movement, or looking to strengthen your digital presence, start with the requirement — we&apos;ll help identify the right way forward.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
                Let&apos;s Connect
              </Link>
              <a href="#divisions" className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase">
                Explore Our Companies
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
