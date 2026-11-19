"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ClovesContent() {
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
            <span className="text-mangrove-900">Cloves</span>
          </nav>

          <Reveal>
          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
            Signature Commodity — Spices
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight mb-6">
            Cloves Exporter to UAE &amp; GCC — Whole Quills &amp; Handpicked Grades
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Mangroves Global Trading FZ LLC supplies export-grade Indian cloves, sourced for high eugenol essential oil content, rich sweet aroma, and consistent whole-quill presentation. We supply whole quills and handpicked grades for buyers across the UAE and GCC.
          </p>
          </Reveal>

          <Reveal delay={80} className="relative w-full h-72 sm:h-96 rounded-2xl mb-12 border border-mangrove-100 overflow-hidden">
            <Image
              src="/trading/images/indian-cloves-export.jpg"
              alt="Indian cloves, whole quills and handpicked grade, for UAE and GCC buyers"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </Reveal>

          <Reveal>
          <article className="prose-mgt-light text-mangrove-800/80">
            <h2>Origin &amp; Sourcing</h2>
            <p>
              Our cloves are sourced through supplier partners in India&apos;s established clove-growing regions, including our own sister company, who manage direct procurement relationships to reduce intermediary layers and preserve consistent quality from lot to lot.
            </p>

            <h2>Available Grades &amp; Specifications</h2>
            <p>Cloves are graded primarily by whether the flower bud head is intact and by overall visual and aroma consistency. The grades we regularly supply to UAE and GCC buyers are:</p>
            <table>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Whole Quills (Ceylon/Cassia style)</td><td>Premium retail, gourmet food service, gifting</td></tr>
                <tr><td>Handpicked Cloves</td><td>Food manufacturing, spice blending, retail packaging</td></tr>
              </tbody>
            </table>
            <p>For a formal quote against your required volume and Incoterm, use the inquiry form below.</p>

            <h2>Quality Parameters</h2>
            <p>Every lot moves through a structured multi-point inspection process before export, covering:</p>
            <ul>
              <li><strong>Eugenol oil content verification</strong> — confirming aromatic strength meets buyer specification.</li>
              <li><strong>Headless bud defect screening</strong> — ensuring zero headless flower bud defects in supplied lots.</li>
              <li><strong>Moisture level checks</strong> — to protect shelf life and prevent mould risk in transit.</li>
              <li><strong>Foreign matter reduction</strong> — screening out stems, dust and non-clove material.</li>
              <li><strong>Farm-to-port traceability</strong> — each lot can be traced back through the supply chain to origin.</li>
            </ul>
            <p>Our internal target is 99.5%+ physical purity across supplied lots.</p>

            <h2>Sourcing &amp; Certifications</h2>
            <p>
              Mangroves Global Trading FZ LLC is headquartered in Ras Al Khaimah, UAE, and does not hold Indian agricultural export certifications directly — these sit with our supplier partners on the ground in India, including our sister company. We only work with suppliers holding <strong>FSSAI registration</strong>, <strong>Spice Board India registration</strong>, and <strong>APEDA registration</strong>, and relevant certification documentation is provided ahead of export for every shipment.
            </p>

            <h2>Applications &amp; Industries Served</h2>
            <p>Cloves are used across a range of buyer categories we regularly supply into across the UAE and GCC:</p>
            <ul>
              <li><strong>Food manufacturers</strong> — spice blends, baked goods, confectionery flavouring.</li>
              <li><strong>Beverage manufacturers</strong> — spiced teas, mulled beverages.</li>
              <li><strong>Qahwa and Arabic coffee producers</strong> — cloves are a traditional component in regional spiced coffee blends.</li>
              <li><strong>Retail &amp; distribution</strong> — packaged spice brands and wholesale distributors.</li>
            </ul>

            <h2>Packaging &amp; Bulk Supply</h2>
            <p>
              We supply in bulk export packaging suited to your destination port and volume requirements. Shipment execution is available on flexible Incoterms — FOB, CIF or CFR — and our commercial desk can confirm packaging options once your order specification is known.
            </p>

            <h2>Storage Guidance</h2>
            <p>
              Cloves are sensitive to heat, light and prolonged air exposure, all of which cause gradual loss of essential oil content and aroma. Buyers should store cloves in a cool, dry, airtight environment away from direct sunlight.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>What is the difference between whole quill and handpicked cloves?</h3>
            <p>Whole quills refer to fully intact, unbroken clove buds typically reserved for premium retail and food-service use. Handpicked cloves are individually sorted for consistent size and quality, commonly used in food manufacturing and blending.</p>
            <h3>What does eugenol content mean for buyers?</h3>
            <p>Eugenol is the primary essential oil compound responsible for clove&apos;s characteristic aroma and flavour intensity. Higher eugenol content generally indicates fresher, higher-quality cloves.</p>
            <h3>Does Mangroves Global hold export certifications?</h3>
            <p>Mangroves Global is UAE headquartered and sources through certified supplier partners in India, including our sister company, who hold FSSAI, Spice Board India, and APEDA registration.</p>
            <h3>Can you supply bulk quantities for export to the UAE and GCC?</h3>
            <p>Yes — contact our commercial desk with your destination port, volume and Incoterm requirements for a formal quote.</p>
          </article>
          </Reveal>

          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Cloves Specifications &amp; Pricing</h3>
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
