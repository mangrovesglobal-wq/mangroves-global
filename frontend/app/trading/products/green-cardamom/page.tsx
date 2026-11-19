import type { Metadata } from "next";
import GreenCardamomContent from "@/components/GreenCardamomContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-product-green-cardamom", {
    title: "Indian Green Cardamom Exporter UAE | Idukki Kerala Supplier",
    description:
      "Bulk Indian green cardamom for UAE and GCC buyers, sourced from Idukki, Kerala. Grades 6mm to 8mm+, export-ready quality, FSSAI / Spice Board / APEDA registered supplier partners. Request specifications and pricing.",
    alternates: { canonical: "/trading/products/green-cardamom" },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Green Cardamom",
          item: "https://mangrovesglobal.com/trading/products/green-cardamom",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Indian Green Cardamom (Idukki, Kerala)",
      description:
        "Export-grade Indian green cardamom sourced from Idukki, Kerala, supplied in bold green pod, seed and fine powder formats across multiple size grades, for UAE and GCC buyers.",
      brand: { "@type": "Brand", name: "Mangroves Global" },
      image: "https://mangrovesglobal.com/trading/images/indian-green-cardamom-export.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://mangrovesglobal.com/trading/products/green-cardamom",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Idukki cardamom?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Idukki cardamom is green cardamom grown in Idukki district, Kerala, in India's Western Ghats — the country's principal cardamom-growing region.",
          },
        },
        {
          "@type": "Question",
          name: "What do cardamom size grades like 8mm and 7.5mm mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cardamom is graded by pod width in millimetres, measured across the widest point of the dried pod. Larger pods (8mm and above) are generally considered premium grade.",
          },
        },
        {
          "@type": "Question",
          name: "Does Mangroves Global hold export certifications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mangroves Global Trading FZ LLC is UAE headquartered and sources through certified supplier partners in India, including our sister company, who hold FSSAI registration, Spice Board India registration, and APEDA registration.",
          },
        },
        {
          "@type": "Question",
          name: "Can Mangroves Global supply bulk quantities for export to the UAE and GCC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Mangroves Global works with UAE and GCC buyers on bulk quantities with flexible Incoterm-based shipment execution (FOB, CIF, CFR). Contact our commercial desk with your destination port and volume requirements for a quote.",
          },
        },
      ],
    },
  ],
};

export default function GreenCardamomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GreenCardamomContent />
    </>
  );
}
