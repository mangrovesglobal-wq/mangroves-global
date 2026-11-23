import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { TradingIcon, LogisticsIcon, CreativeIcon } from "@/components/DivisionIcons";
import HeroSocialBar from "@/components/HeroSocialBar";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("home", {
    title: "Mangroves Global | Trading, Logistics & Digital Solutions",
    description:
      "Mangroves Global is a UAE-based business group connecting trade, logistics and digital creativity across India, the UAE and the GCC — rooted in nature, connecting globally.",
    alternates: { canonical: "https://mangrovesglobal.com" },
  });
}

const companies = [
  {
    key: "trading",
    name: "Trading Company",
    tagline: "Source. Trade. Connect.",
    desc: "Connecting quality commodities and agricultural products with businesses and markets across borders.",
    cta: "Explore Trading",
    href: "/trading",
    tone: "bg-mangrove-900",
  },
  {
    key: "logistics",
    name: "Logistics",
    tagline: "Smart Logistics. Connected Supply Chains.",
    desc: "Coordinating reliable movement of goods through connected freight and supply-chain partners.",
    cta: "Explore Logistics",
    href: "/logistics",
    tone: "bg-mangrove-500",
  },
  {
    key: "creative",
    name: "Digital & Creative",
    tagline: "Ideas. Digital. Growth.",
    desc: "Building brands, digital experiences and creative work that help businesses connect and grow.",
    cta: "Explore Digital",
    href: "/creative",
    tone: "bg-[#a97a3c]",
  },
] as const;

const insights = [
  {
    division: "Trading",
    headline: "Understanding the journey from source to market.",
    href: "/trading/blog",
  },
  {
    division: "Logistics",
    headline: "What connected supply chains really mean.",
    href: "/logistics/blog",
  },
  {
    division: "Digital",
    headline: "Building brands for a connected market.",
    href: "/creative/blog",
  },
];

export default async function HomePage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.mangrovesglobal.com";
  let cmsHeroImage: string | undefined;
  try {
    const res = await fetch(`${API_BASE}/api/pages/home`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.hero?.image) cmsHeroImage = `${API_BASE}${data.hero.image}`;
    }
  } catch { /* fall back to static image */ }
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mangrovesglobal.com/#organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
        logo: "https://mangrovesglobal.com/images/logo/mangroves-global-logo-badge.png",
        description:
          "A UAE-based business group connecting trade, logistics and digital creativity across India, the UAE and the GCC.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ras Al Khaimah",
          addressCountry: "AE",
        },
        areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "IN"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "IN"],
          availableLanguage: ["en", "ar"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mangroves Global Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Indian Spice Trading UAE", url: "https://mangrovesglobal.com/trading" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Freight & Logistics Coordination UAE", url: "https://mangrovesglobal.com/logistics" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing & Creative UAE", url: "https://mangrovesglobal.com/creative" } },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://mangrovesglobal.com/#website",
        name: "Mangroves Global",
        url: "https://mangrovesglobal.com",
        publisher: { "@id": "https://mangrovesglobal.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        ],
      },
    ],
  };

  return (
    <div className="bg-white text-mangrove-900 min-h-screen antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader transparent />

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-mangrove-900">
          {cmsHeroImage ? (
            <img
              src={cmsHeroImage}
              alt="Spice farmers harvesting on a forested hillside in India, with a road leading down to a container port and the Dubai skyline in the distance"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "sepia(0.35) saturate(1.5) hue-rotate(-12deg) brightness(0.8) contrast(1.05)" }}
            />
          ) : (
            <Image
              src="/images/mangroves-global-source-to-market-hero.jpg"
              alt="Spice farmers harvesting on a forested hillside in India, with a road leading down to a container port and the Dubai skyline in the distance"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "sepia(0.35) saturate(1.5) hue-rotate(-12deg) brightness(0.8) contrast(1.05)" }}
            />
          )}
          <div className="absolute inset-0 bg-mangrove-900/55" />
          <div className="hero-daylight mix-blend-overlay" />

          <div className="hero-fog w-72 h-72" style={{ top: "8%", left: "2%" }} />
          <div className="hero-fog f2 w-56 h-56" style={{ top: "26%", left: "16%" }} />
          <div className="hero-fog f3 w-64 h-64" style={{ top: "2%", left: "28%" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-mangrove-accent/40 bg-mangrove-accent/10 text-mangrove-accent text-xs uppercase tracking-widest mb-8 reveal">
              UAE Headquartered · Global Operational Reach
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-6">
              <span className="reveal inline-block" style={{ animationDelay: "0.1s" }}>Rooted in Nature,</span>
              <br />
              <span className="reveal inline-block text-mangrove-accent font-normal" style={{ animationDelay: "0.24s" }}>Connecting Globally.</span>
            </h1>

            <p className="reveal max-w-2xl mx-auto text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-10" style={{ animationDelay: "0.4s" }}>
              A diversified business group connecting trade, logistics and digital creativity across markets.
            </p>

            <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.52s" }}>
              <a href="#companies" className="px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
                Explore Our Companies ↓
              </a>
              <Link href="/about" className="px-8 py-4 border border-slate-600 hover:border-mangrove-accent text-white transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase">
                Discover Mangroves
              </Link>
            </div>

            <div className="reveal mt-16 flex items-center justify-center gap-3" style={{ animationDelay: "0.66s" }}>
              <span className="scroll-rail" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Scroll</span>
            </div>
          </div>

          {/* Social icons — bottom-left of hero */}
          <div className="absolute left-6 lg:left-10 bottom-7 z-10">
            <HeroSocialBar />
          </div>
        </section>

        {/* WHO IS MANGROVES */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <Reveal className="max-w-3xl mx-auto text-center">
            <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Who Is Mangroves Global</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-mangrove-900 mt-4 leading-snug">
              One group, three capabilities — sourcing, moving and building for businesses across India, the UAE and the GCC.
            </h2>
            <p className="text-mangrove-800/60 leading-relaxed mt-6 max-w-xl mx-auto">
              Mangroves Global brings together trading, logistics and digital capabilities under one UAE-headquartered group — each division run by its own specialists, connected by a shared standard of coordination.
            </p>
          </Reveal>
        </section>

        {/* OUR COMPANIES */}
        <section id="companies" className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Our Companies</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-mangrove-900 mt-4 leading-tight">
                Three Capabilities.<br />One Connected Vision.
              </h2>
              <p className="text-mangrove-800/60 leading-relaxed mt-5">
                Independent business divisions connected by a common philosophy: creating value through markets, movement and meaningful digital experiences.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((c, i) => {
                const Icon = c.key === "trading" ? TradingIcon : c.key === "logistics" ? LogisticsIcon : CreativeIcon;
                return (
                  <Reveal key={c.key} as="div" delay={i * 80}>
                  <Link
                    href={c.href}
                    className="group relative block rounded-3xl border border-mangrove-100 bg-white p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-transparent"
                  >
                    <div className={`absolute inset-0 ${c.tone} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <div className="text-mangrove-accent group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 mb-6">
                        <Icon />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-mangrove-900 group-hover:text-white transition-colors duration-500">
                        {c.name}
                      </h3>
                      <p className="text-xs uppercase tracking-widest font-semibold text-mangrove-800/40 group-hover:text-mangrove-accent transition-colors duration-500 mt-1 mb-4">
                        {c.tagline}
                      </p>
                      <p className="text-sm text-mangrove-800/60 group-hover:text-white/80 transition-colors duration-500 leading-relaxed mb-6">
                        {c.desc}
                      </p>
                      <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 group-hover:text-white transition-colors duration-500">
                        {c.cta}
                        <span className="ml-2 transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                      </span>
                    </div>
                  </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT / PHILOSOPHY TEASER */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-white">
          <Reveal className="max-w-3xl mx-auto text-center">
            <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">About Us</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-mangrove-900 mt-4 leading-snug">
              Direct relationships. Honest communication. One standard across three divisions.
            </h2>
            <p className="text-mangrove-800/60 leading-relaxed mt-6 max-w-xl mx-auto">
              Our philosophy, mission and approach all come down to the same idea: fewer layers between us and the people we work with, and no promises we can&apos;t stand behind.
            </p>
            <Link href="/about" className="inline-flex items-center mt-8 text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors">
              Learn About Us →
            </Link>
          </Reveal>
        </section>

        {/* INSIGHTS */}
        <section className="py-20 sm:py-28 px-6 lg:px-16 bg-mangrove-50 border-y border-mangrove-100">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-xl mb-14">
              <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">Insights</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-mangrove-900 mt-3">Ideas From Our Connected World.</h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {insights.map((i, idx) => (
                <Reveal key={i.division} delay={idx * 80}>
                <Link href={i.href} className="group block p-6 rounded-2xl border border-mangrove-100 bg-white hover:border-mangrove-accent/50 transition-colors">
                  <span className="text-xs uppercase tracking-widest font-semibold text-mangrove-accent">{i.division}</span>
                  <p className="font-serif text-lg font-semibold text-mangrove-900 mt-3 mb-4 leading-snug group-hover:text-mangrove-accent transition-colors">
                    {i.headline}
                  </p>
                  <span className="text-xs uppercase tracking-widest font-semibold text-mangrove-800/40 group-hover:text-mangrove-900 transition-colors">
                    Read More →
                  </span>
                </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* LET'S CONNECT */}
        <section className="py-24 sm:py-32 px-6 lg:px-16 bg-mangrove-900 text-center">
          <Reveal className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white mb-6">Let&apos;s Connect.</h2>
            <p className="text-slate-300 leading-relaxed mb-10">
              Whether you&apos;re looking to source products, coordinate movement across markets, or build your digital presence, we&apos;d like to hear from you.
            </p>
            <Link href="/contact" className="inline-flex px-10 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Let&apos;s Connect
            </Link>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
