"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function CoffeeBeansContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-mangrove-900 text-slate-100 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/10">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/trading">
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
              <Link href="/trading" className="hover:text-mangrove-900 transition-colors">Home</Link>
              <Link href="/trading#about" className="hover:text-mangrove-900 transition-colors">About</Link>
              <Link href="/trading#products" className="hover:text-mangrove-900 transition-colors">Commodities</Link>
              <Link href="/trading#quality" className="hover:text-mangrove-900 transition-colors">Quality Assurance</Link>
              <Link href="/trading#contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>
          <Link
            href="/trading#contact"
            className="hidden md:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
          >
            <span>Trade Inquiry</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
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
        <div className="fixed inset-0 bg-mangrove-900/95 backdrop-blur-xl z-[60] flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-white">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Home</Link>
          <Link href="/trading#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">About Us</Link>
          <Link href="/trading#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Commodities</Link>
          <Link href="/trading#quality" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Quality Control</Link>
          <Link href="/trading#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Contact</Link>
        </div>
      )}

      <main className="pt-32 sm:pt-36 pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-slate-400 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/trading#products" className="hover:text-mangrove-accent transition-colors">Commodities</Link>
            <span>/</span>
            <span className="text-slate-300">Coffee Beans</span>
          </nav>

          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
            Signature Commodity — Coffee
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Green Coffee Bean Exporter to UAE &amp; GCC — Grades AA, A &amp; Peaberry
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Mangroves Global Trading FZ LLC supplies export-grade Indian green coffee beans — high-altitude, shade-grown, with uniform moisture levels and rigorous zero-defect scoring. We supply Grades AA, A and Peaberry for roasters and buyers across the UAE and GCC.
          </p>

          <div className="relative w-full h-72 sm:h-96 rounded-2xl mb-12 border border-slate-800 overflow-hidden">
            <Image
              src="/trading/images/indian-coffee-beans-export.jpg"
              alt="Indian green coffee beans, grades AA, A and peaberry, for UAE and GCC roasters"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <article className="prose-mgt text-slate-300">
            <h2>Origin &amp; Sourcing</h2>
            <p>
              Our green coffee beans are sourced through supplier partners in India&apos;s established high-altitude, shade-grown coffee regions, including our own sister company, who manage processing and grading at origin before export. Shade cultivation at higher elevations is associated with slower cherry maturation and more developed flavour precursors in the bean.
            </p>

            <h2>Available Grades &amp; Specifications</h2>
            <p>Green coffee is graded by bean size, shape and defect count. The grades we regularly supply to UAE and GCC roasters are:</p>
            <table>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Grade AA</td><td>Specialty and premium roasters, larger bean size</td></tr>
                <tr><td>Grade A</td><td>Commercial roasting, blends</td></tr>
                <tr><td>Peaberry (PB)</td><td>Specialty roasters seeking a distinct single-bean profile</td></tr>
              </tbody>
            </table>
            <p>For a formal quote against your required volume and Incoterm, use the inquiry form below.</p>

            <h2>Quality Parameters</h2>
            <p>Every lot moves through a structured multi-point inspection process before export, covering:</p>
            <ul>
              <li><strong>Defect scoring</strong> — targeting zero-defect lots across supplied grades.</li>
              <li><strong>Moisture level checks</strong> — maintaining uniform moisture for consistent roast performance.</li>
              <li><strong>Bean size &amp; density sorting</strong> — ensuring grade consistency across the lot.</li>
              <li><strong>Foreign matter reduction</strong> — screening out husk, stones and non-bean material.</li>
              <li><strong>Farm-to-port traceability</strong> — each lot can be traced back through the supply chain to origin.</li>
            </ul>
            <p>Our internal target is 99.5%+ physical purity across supplied lots.</p>

            <h2>Sourcing &amp; Certifications</h2>
            <p>
              Mangroves Global Trading FZ LLC is headquartered in Ras Al Khaimah, UAE, and does not hold Indian agricultural export certifications directly — these sit with our supplier partners on the ground in India, including our sister company. We only work with suppliers holding <strong>FSSAI registration</strong>, <strong>Spice Board India registration</strong>, and <strong>APEDA registration</strong>, and relevant certification documentation is provided ahead of export for every shipment.
            </p>

            <h2>Applications &amp; Industries Served</h2>
            <p>Green coffee beans are used across a range of buyer categories we regularly supply into across the UAE and GCC:</p>
            <ul>
              <li><strong>Specialty coffee roasters</strong> — single-origin and small-batch roasting programs.</li>
              <li><strong>Commercial roasters</strong> — blend components for larger-volume production.</li>
              <li><strong>Cafe chains &amp; hospitality groups</strong> — house-blend and private-label programs.</li>
              <li><strong>Retail &amp; distribution</strong> — packaged coffee brands and wholesale distributors.</li>
            </ul>

            <h2>Packaging &amp; Bulk Supply</h2>
            <p>
              We supply in bulk export packaging suited to your destination port and volume requirements. Shipment execution is available on flexible Incoterms — FOB, CIF or CFR — and our commercial desk can confirm packaging options once your order specification is known.
            </p>

            <h2>Storage Guidance</h2>
            <p>
              Green coffee should be stored in a cool, dry environment with stable humidity to preserve bean quality prior to roasting. Avoid exposure to strong odours, as unroasted beans can absorb surrounding smells during storage and transit.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>What is the difference between Grade AA, A and Peaberry?</h3>
            <p>Grade AA refers to the largest bean size with the fewest defects, typically commanding premium pricing. Grade A is a standard commercial grade. Peaberry is a naturally occurring single round bean (rather than the usual flat-sided pair) prized by some specialty roasters for a distinct flavour profile.</p>
            <h3>What does shade-grown mean for coffee quality?</h3>
            <p>Shade-grown coffee is cultivated under a forest canopy, which slows cherry ripening and is generally associated with more complex flavour development in the bean.</p>
            <h3>Does Mangroves Global hold export certifications?</h3>
            <p>Mangroves Global is UAE headquartered and sources through certified supplier partners in India, including our sister company, who hold FSSAI, Spice Board India, and APEDA registration.</p>
            <h3>Can you supply bulk quantities for export to the UAE and GCC?</h3>
            <p>Yes — contact our commercial desk with your destination port, volume and Incoterm requirements for a formal quote.</p>
          </article>

          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-800/30 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Coffee Bean Specifications &amp; Pricing</h3>
              <p className="text-slate-400 text-sm">Tell us your destination port, volume and grade requirement.</p>
            </div>
            <Link
              href="/trading#contact"
              className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-mangrove-accent text-mangrove-900/80 text-xs">
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
            <Link href="/" className="hover:text-mangrove-900 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-900 transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
