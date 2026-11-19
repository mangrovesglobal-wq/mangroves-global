"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

export default function CoffeeBeansContent() {

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      <DivisionHeader division="trading" />

      <main className="pt-28 pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/trading/commodities" className="hover:text-mangrove-accent transition-colors">Commodities</Link>
            <span>/</span>
            <span className="text-mangrove-900">Coffee Beans</span>
          </nav>

          <Reveal>
          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
            Signature Commodity — Coffee
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight mb-6">
            Green Coffee Bean Exporter to UAE &amp; GCC — Grades AA, A &amp; Peaberry
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Mangroves Global Trading FZ LLC supplies export-grade Indian green coffee beans — high-altitude, shade-grown, with uniform moisture levels and rigorous zero-defect scoring. We supply Grades AA, A and Peaberry for roasters and buyers across the UAE and GCC.
          </p>
          </Reveal>

          <Reveal delay={80} className="relative w-full h-72 sm:h-96 rounded-2xl mb-12 border border-mangrove-100 overflow-hidden">
            <Image
              src="/trading/images/indian-coffee-beans-export.jpg"
              alt="Indian green coffee beans, grades AA, A and peaberry, for UAE and GCC roasters"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </Reveal>

          <Reveal>
          <article className="prose-mgt-light text-mangrove-800/80">
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
          </Reveal>

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Coffee Bean Specifications &amp; Pricing</h3>
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

      <SiteFooter />
    </div>
  );
}
