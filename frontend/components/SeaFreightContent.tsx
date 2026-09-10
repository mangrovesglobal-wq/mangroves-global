"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Check } from "lucide-react";

type ContentBlock = {
  heading: string;
  content: string;
};

type HeroImage = {
  src: string;
  alt: string;
};

type SeaFreightContentProps = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage;
};

export default function SeaFreightContent({ introText, blocks, heroImage }: SeaFreightContentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/5">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/logistics">
              <Image src="/images/logo/mangroves-global-logo-badge.png" width={64} height={64} className="h-14 sm:h-16 w-auto block" alt="Mangroves Global" />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <Link href="/logistics#services" className="hover:text-mangrove-900 transition-colors">Services</Link>
              <Link href="/logistics#corridor" className="hover:text-mangrove-900 transition-colors">India–UAE</Link>
              <Link href="/logistics#industries" className="hover:text-mangrove-900 transition-colors">Industries</Link>
              <Link href="/logistics#contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>
          <Link href="/" className="hidden lg:inline-flex items-center mr-4 text-[11px] tracking-widest font-semibold uppercase text-mangrove-900/70 hover:text-mangrove-900">
            Explore Other Businesses
          </Link>
          <Link href="/logistics#contact" className="hidden md:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase">
            <span>Request a Quote</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden mr-6 text-mangrove-900 focus:outline-none" aria-label="Open menu">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[60] flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-mangrove-900" aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <Link href="/logistics#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/logistics#corridor" onClick={() => setMobileMenuOpen(false)}>India–UAE</Link>
          <Link href="/logistics#industries" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
          <Link href="/logistics#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <main className="pt-32 sm:pt-36 pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/logistics" className="hover:text-mangrove-accent transition-colors">Logistics</Link>
            <span>/</span>
            <span className="text-mangrove-900">Sea Freight</span>
          </nav>

          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">Ocean Freight</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight mb-6">
            Sea Freight Coordination — FCL &amp; LCL for UAE &amp; GCC Importers
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-12 max-w-3xl">
            {introText}
          </p>

          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-mangrove-100">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <article className="prose-mgt-light text-mangrove-800/80">
            {blocks.map((block) => (
              <div key={block.heading}>
                <h2>{block.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: block.content }} />
              </div>
            ))}
          </article>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {["FCL & LCL coordination", "India–UAE–GCC coverage", "Flexible Incoterms (FOB, CIF, CFR)", "Status updates through to delivery"].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-mangrove-50 border border-mangrove-100">
                <Check className="w-5 h-5 text-mangrove-accent shrink-0 mt-0.5" />
                <span className="text-sm text-mangrove-800">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-50 border border-mangrove-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-mangrove-900 mb-2">Request a Sea Freight Quote</h3>
              <p className="text-mangrove-800/60 text-sm">Tell us your origin, destination, cargo and timeline.</p>
            </div>
            <Link href="/logistics#contact" className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase">
              Request Sea Freight Quote
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
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
