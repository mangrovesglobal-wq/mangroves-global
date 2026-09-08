import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Mangroves Global | UAE Trading, Logistics & Creative Group",
  description:
    "Mangroves Global Trading FZ LLC is a UAE-based business group operating across trading, logistics and creative business services, headquartered in Ras Al Khaimah.",
};

const divisions = [
  {
    num: "01",
    name: "Trading",
    tagline: "Foodstuff &amp; General Trading",
    desc: "Indian-origin spices and agricultural commodities, sourced directly and exported to UAE and GCC buyers.",
    href: "/trading",
  },
  {
    num: "02",
    name: "Logistics",
    tagline: "Logistics &amp; Supply Chain",
    desc: "Freight, customs, transportation and warehousing coordination across India, the UAE and the GCC.",
    href: "/logistics",
  },
  {
    num: "03",
    name: "Creative",
    tagline: "Advertising, Communication &amp; Creative Services",
    desc: "Advertising, digital marketing, branding and creative production for UAE businesses.",
    href: "/creative",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-mangrove-900 antialiased">
      {/* Header */}
      <header className="w-full bg-mangrove-accent">
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
              <Link href="/trading" className="hover:text-mangrove-900 transition-colors">Trading</Link>
              <Link href="/logistics" className="hover:text-mangrove-900 transition-colors">Logistics</Link>
              <Link href="/creative" className="hover:text-mangrove-900 transition-colors">Creative</Link>
              <Link href="/about" className="text-mangrove-900">About</Link>
              <Link href="/contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>
        </div>
      </header>

      <main className="px-6 lg:px-16 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">About</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 mt-3 mb-8">
            One Group. Multiple Capabilities.
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-16 max-w-2xl">
            Mangroves Global Trading FZ LLC is a UAE-based business group operating across complementary sectors — trading, logistics and creative services — headquartered in Ras Al Khaimah, United Arab Emirates.
          </p>

          <div className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-mangrove-900 mb-6">Our Businesses</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {divisions.map((d) => (
                <Link
                  key={d.num}
                  href={d.href}
                  className="group block rounded-2xl border border-mangrove-100 bg-mangrove-50/60 p-6 hover:border-mangrove-accent hover:bg-white transition-all"
                >
                  <div className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold mb-3">Division {d.num}</div>
                  <h3 className="font-serif text-xl font-semibold mb-1">{d.name}</h3>
                  <p
                    className="text-xs text-mangrove-800/50 uppercase tracking-widest mb-3"
                    dangerouslySetInnerHTML={{ __html: d.tagline }}
                  />
                  <p className="text-sm text-mangrove-800/60 leading-relaxed mb-4">{d.desc}</p>
                  <span className="text-xs uppercase tracking-widest font-semibold group-hover:text-mangrove-accent transition-colors">
                    Explore {d.name} →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-mangrove-100 pt-12">
            <h2 className="font-serif text-2xl font-semibold text-mangrove-900 mb-4">Where We&apos;re Based</h2>
            <p className="text-mangrove-800/70 leading-relaxed max-w-2xl">
              Mangroves Global Trading FZ LLC is headquartered in Ras Al Khaimah, United Arab Emirates, with an India-linked sourcing and trade network supporting the Trading division. Each business division operates with its own focus, while remaining part of one company.
            </p>
          </div>

          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl mb-2">Talk to the Right Division</h3>
              <p className="text-white/60 text-sm">Tell us what you need and we&apos;ll connect you with the relevant team.</p>
            </div>
            <Link href="/contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Contact Us
            </Link>
          </div>
        </div>
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
