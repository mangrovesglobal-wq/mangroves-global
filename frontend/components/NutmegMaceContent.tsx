"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function NutmegMaceContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
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
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center space-x-4 xl:space-x-8 text-[11px] xl:text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <Link href="/trading" className="hover:text-mangrove-900 transition-colors">Home</Link>
              <Link href="/trading/about" className="hover:text-mangrove-900 transition-colors">About</Link>
              <Link href="/trading/commodities" className="hover:text-mangrove-900 transition-colors">Commodities</Link>
              <Link href="/trading/sourcing-supply" className="hover:text-mangrove-900 transition-colors">Sourcing &amp; Supply</Link>
              <Link href="/trading/quality-assurance" className="hover:text-mangrove-900 transition-colors">Quality Assurance</Link>
              <Link href="/trading/blog" className="hover:text-mangrove-900 transition-colors">Insights</Link>
              <Link href="/trading#contact" className="hover:text-mangrove-900 transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 lg:hidden"></div>
          <Link
            href="/trading#contact"
            className="hidden lg:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
          >
            <span>Trade Inquiry</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden mr-6 text-mangrove-900 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-60 flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-mangrove-900">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-mangrove-900"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/trading/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/trading/commodities" onClick={() => setMobileMenuOpen(false)} className="text-mangrove-accent">Commodities</Link>
          <Link href="/trading/sourcing-supply" onClick={() => setMobileMenuOpen(false)}>Sourcing &amp; Supply</Link>
          <Link href="/trading/quality-assurance" onClick={() => setMobileMenuOpen(false)}>Quality Assurance</Link>
          <Link href="/trading/blog" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
          <Link href="/trading#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <main className="pt-32 sm:pt-36 pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/trading/commodities" className="hover:text-mangrove-accent transition-colors">Commodities</Link>
            <span>/</span>
            <span className="text-mangrove-900">Nutmeg &amp; Mace</span>
          </nav>

          <Reveal>
          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
            Signature Commodity — Spices
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight mb-6">
            Nutmeg &amp; Mace Exporter to UAE &amp; GCC — ABCD Grade Whole Nutmeg
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Mangroves Global Trading FZ LLC supplies export-grade Indian nutmeg and mace, featuring rich volatile oil profile, vibrant deep crimson mace arils, and thoroughly inspected zero-shell-defect lots. We supply whole ABCD nutmeg, red mace arils and fine powder for buyers across the UAE and GCC.
          </p>
          </Reveal>

          <Reveal delay={80} className="relative w-full h-72 sm:h-96 rounded-2xl mb-12 border border-mangrove-100 overflow-hidden">
            <Image
              src="/trading/images/indian-nutmeg-export.jpg"
              alt="Indian nutmeg and mace, ABCD grade whole nutmeg, for UAE and GCC buyers"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </Reveal>

          <Reveal>
          <article className="prose-mgt-light text-mangrove-800/80">
            <h2>Origin &amp; Sourcing</h2>
            <p>
              Our nutmeg and mace are sourced through supplier partners in India&apos;s established nutmeg-growing regions, including our own sister company, who manage direct procurement to reduce intermediary layers and preserve lot-to-lot consistency in oil content and colour.
            </p>

            <h2>Available Grades &amp; Specifications</h2>
            <p>Nutmeg is graded by shell condition, size and visual uniformity (the ABCD grading scale), while mace is graded separately by arils colour and intactness. The grades we regularly supply to UAE and GCC buyers are:</p>
            <table>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Whole ABCD Nutmeg</td><td>Premium retail, food manufacturing, gourmet food service</td></tr>
                <tr><td>Red Mace Arils</td><td>Premium retail, specialty spice blending</td></tr>
                <tr><td>Fine Powder</td><td>Food manufacturing, bakery and confectionery</td></tr>
              </tbody>
            </table>
            <p>For a formal quote against your required volume and Incoterm, use the inquiry form below.</p>

            <h2>Quality Parameters</h2>
            <p>Every lot moves through a structured multi-point inspection process before export, covering:</p>
            <ul>
              <li><strong>Volatile oil profile verification</strong> — confirming aromatic strength meets buyer specification.</li>
              <li><strong>Shell defect screening</strong> — targeting zero-shell-defect lots for whole nutmeg.</li>
              <li><strong>Moisture level checks</strong> — to protect shelf life and prevent mould risk in transit.</li>
              <li><strong>Colour grading for mace</strong> — sorting arils by depth of crimson colour.</li>
              <li><strong>Farm-to-port traceability</strong> — each lot can be traced back through the supply chain to origin.</li>
            </ul>
            <p>Our internal target is 99.5%+ physical purity across supplied lots.</p>

            <h2>Sourcing &amp; Certifications</h2>
            <p>
              Mangroves Global Trading FZ LLC is headquartered in Ras Al Khaimah, UAE, and does not hold Indian agricultural export certifications directly — these sit with our supplier partners on the ground in India, including our sister company. We only work with suppliers holding <strong>FSSAI registration</strong>, <strong>Spice Board India registration</strong>, and <strong>APEDA registration</strong>, and relevant certification documentation is provided ahead of export for every shipment.
            </p>

            <h2>Applications &amp; Industries Served</h2>
            <p>Nutmeg and mace are used across a range of buyer categories we regularly supply into across the UAE and GCC:</p>
            <ul>
              <li><strong>Food manufacturers</strong> — spice blends, baked goods, confectionery flavouring.</li>
              <li><strong>Beverage manufacturers</strong> — spiced drinks, dessert beverages.</li>
              <li><strong>Foodservice &amp; hospitality</strong> — hotels, restaurants and catering groups.</li>
              <li><strong>Retail &amp; distribution</strong> — packaged spice brands and wholesale distributors.</li>
            </ul>

            <h2>Packaging &amp; Bulk Supply</h2>
            <p>
              We supply in bulk export packaging suited to your destination port and volume requirements. Shipment execution is available on flexible Incoterms — FOB, CIF or CFR — and our commercial desk can confirm packaging options once your order specification is known.
            </p>

            <h2>Storage Guidance</h2>
            <p>
              Nutmeg and mace should be stored in a cool, dry, airtight environment away from direct sunlight. Whole nutmeg holds its essential oil content and aroma considerably longer than pre-ground powder.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>What does ABCD grading mean for nutmeg?</h3>
            <p>ABCD is a shell-condition and size grading scale used for whole nutmeg, with higher grades reflecting larger, more uniform, defect-free kernels.</p>
            <h3>What is the relationship between nutmeg and mace?</h3>
            <p>Mace is the lacy red covering (aril) that surrounds the nutmeg seed inside the fruit. Both are harvested from the same tree but graded and sold as separate spice products.</p>
            <h3>Does Mangroves Global hold export certifications?</h3>
            <p>Mangroves Global is UAE headquartered and sources through certified supplier partners in India, including our sister company, who hold FSSAI, Spice Board India, and APEDA registration.</p>
            <h3>Can you supply bulk quantities for export to the UAE and GCC?</h3>
            <p>Yes — contact our commercial desk with your destination port, volume and Incoterm requirements for a formal quote.</p>
          </article>
          </Reveal>

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Nutmeg &amp; Mace Specifications &amp; Pricing</h3>
              <p className="text-slate-300 text-sm">Tell us your destination port, volume and grade requirement.</p>
            </div>
            <Link
              href="/trading#contact"
              className="shrink-0 px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase"
            >
              Request a Quote
            </Link>
          </Reveal>
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
