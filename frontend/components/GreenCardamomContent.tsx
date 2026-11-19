"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

export default function GreenCardamomContent() {

  return (
    <div className="bg-white text-mangrove-900 antialiased overflow-x-hidden">
      <DivisionHeader division="trading" />

      <main className="pt-28 pb-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-mangrove-800/50 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/trading" className="hover:text-mangrove-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/trading/commodities" className="hover:text-mangrove-accent transition-colors">Commodities</Link>
            <span>/</span>
            <span className="text-mangrove-900">Green Cardamom</span>
          </nav>

          <Reveal>
          <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
            Signature Commodity — Spices
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 leading-tight mb-6">
            Indian Green Cardamom Exporter to UAE &amp; GCC — Sourced from Idukki, Kerala
          </h1>
          <p className="text-mangrove-800/70 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Mangroves Global Trading FZ LLC supplies export-grade Indian green cardamom sourced from Idukki, Kerala — the Western Ghats region recognised as India&apos;s principal cardamom-growing belt. We supply bold green pods, seeds and fine powder across the full range of commercial size grades, for buyers across the UAE and GCC.
          </p>
          </Reveal>

          <Reveal delay={80} className="relative w-full h-72 sm:h-96 rounded-2xl mb-12 border border-mangrove-100 overflow-hidden">
            <Image
              src="/trading/images/indian-green-cardamom-export.jpg"
              alt="Bold green Idukki Kerala cardamom pods, export grade, for UAE and GCC buyers"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </Reveal>

          <Reveal>
          <article className="prose-mgt-light text-mangrove-800/80">
            <h2>Origin: Idukki, Kerala</h2>
            <p>
              Our green cardamom is sourced from Idukki district in Kerala, India — a high-altitude region within the Western Ghats that accounts for the majority of India&apos;s cardamom production. The combination of elevation, rainfall and soil in this belt is what Indian cardamom&apos;s reputation for aroma and oil content is built on. We work with supplier partners based in this growing region, including our own sister company in India, to source directly rather than through multiple intermediary layers.
            </p>

            <h2>Available Grades &amp; Size Specifications</h2>
            <p>
              Green cardamom is graded primarily by pod width, measured in millimetres across the widest point of the dried pod. Larger, bolder pods are generally graded higher. The grades we regularly supply to UAE and GCC buyers are:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>8mm+ (Bold)</td><td>Premium retail, gifting, gourmet food service</td></tr>
                <tr><td>8mm</td><td>Premium retail and food manufacturing</td></tr>
                <tr><td>7–8mm</td><td>Food manufacturing, beverage and qahwa blending</td></tr>
                <tr><td>7.5mm</td><td>Food manufacturing, beverage and qahwa blending</td></tr>
                <tr><td>7mm</td><td>General food processing</td></tr>
                <tr><td>6–7mm</td><td>Processing, mass-market blending</td></tr>
                <tr><td>6mm</td><td>Processing, powder production</td></tr>
                <tr><td>Bulk grade</td><td>Large-volume industrial and processing use</td></tr>
              </tbody>
            </table>
            <p>
              Current indicative pricing by grade is published on our{" "}
              <Link href="/trading#home">homepage market rate ticker</Link>, updated regularly. For a formal quote against your required volume and Incoterm, use the inquiry form below.
            </p>

            <h2>Quality Parameters</h2>
            <p>Every lot moves through a structured multi-point inspection process before export, covering:</p>
            <ul>
              <li><strong>Moisture level checks</strong> — to protect shelf life and prevent mould risk in transit.</li>
              <li><strong>Foreign matter reduction</strong> — screening out stems, dust and non-cardamom material.</li>
              <li><strong>Lot visual grading</strong> — sorting by pod size, colour retention and defect rate.</li>
              <li><strong>Microbiological lab testing</strong> — verifying lots meet food-safety thresholds before shipment.</li>
              <li><strong>Farm-to-port traceability</strong> — each lot can be traced back through the supply chain to origin.</li>
            </ul>
            <p>Our internal target is 99.5%+ physical purity across supplied lots.</p>

            <h2>Sourcing &amp; Certifications</h2>
            <p>
              Mangroves Global Trading FZ LLC is headquartered in Ras Al Khaimah, UAE, and does not hold Indian agricultural export certifications directly — these sit with our supplier partners on the ground in India, including our sister company. We only work with suppliers holding <strong>FSSAI registration</strong>, <strong>Spice Board India registration</strong>, and <strong>APEDA registration</strong>, and relevant certification documentation is provided ahead of export for every shipment.
            </p>

            <h2>Applications &amp; Industries Served</h2>
            <p>Indian green cardamom from Idukki is used across a range of buyer categories we regularly supply into across the UAE and GCC:</p>
            <ul>
              <li><strong>Food manufacturers</strong> — spice blends, confectionery, bakery flavouring.</li>
              <li><strong>Beverage manufacturers</strong> — flavoured teas, specialty drinks.</li>
              <li><strong>Coffee manufacturers</strong> — cardamom-spiced coffee blends, a category with strong demand across the GCC.</li>
              <li><strong>Qahwa and Arabic coffee producers</strong> — cardamom is a defining ingredient in traditional qahwa, making consistent grade and aroma critical for this segment.</li>
            </ul>

            <h2>Packaging &amp; Bulk Supply</h2>
            <p>
              We supply in bulk export packaging suited to your destination port and volume requirements. Shipment execution is available on flexible Incoterms — FOB, CIF or CFR — and our commercial desk can confirm packaging options once your order specification is known.
            </p>

            <h2>Storage Guidance</h2>
            <p>
              Green cardamom is sensitive to heat, light and humidity, all of which accelerate the loss of volatile essential oils that give cardamom its aroma. Buyers should store cardamom in a cool, dry, airtight environment away from direct sunlight, and avoid prolonged exposure to open air once packaging is broken.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>What is Idukki cardamom?</h3>
            <p>Idukki cardamom is green cardamom grown in Idukki district, Kerala, in India&apos;s Western Ghats — the country&apos;s principal cardamom-growing region.</p>
            <h3>What do cardamom size grades like 8mm and 7.5mm mean?</h3>
            <p>They refer to pod width in millimetres, measured across the widest point of the dried pod. Larger pods are generally graded as premium.</p>
            <h3>Does Mangroves Global hold export certifications?</h3>
            <p>Mangroves Global is UAE headquartered and sources through certified supplier partners in India, including our sister company, who hold FSSAI, Spice Board India, and APEDA registration.</p>
            <h3>Can you supply bulk quantities for export to the UAE and GCC?</h3>
            <p>Yes — contact our commercial desk with your destination port, volume and Incoterm requirements for a formal quote.</p>

            <p className="mt-10 text-sm text-mangrove-800/60">
              Related reading:{" "}
              <Link href="/trading/blog/what-is-idukki-cardamom">What is Idukki Cardamom?</Link>
              {" · "}
              <Link href="/trading/blog/cardamom-grades-explained">Cardamom Grades Explained</Link>
            </p>
          </article>
          </Reveal>

          {/* CTA */}
          <Reveal className="mt-16 p-8 sm:p-10 rounded-3xl bg-mangrove-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Cardamom Specifications &amp; Pricing</h3>
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
