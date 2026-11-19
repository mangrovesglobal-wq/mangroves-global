import type { Metadata } from "next";
import QualityAssuranceContent from "@/components/QualityAssuranceContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-quality-assurance", {
    title: "Quality Assurance",
    description:
      "Mangroves Global's multi-point quality assurance process for Indian spices and agricultural commodities exported to the UAE and GCC.",
    alternates: { canonical: "/trading/quality-assurance" },
  });
}

export default function QualityAssurancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Commodity Quality Assurance",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC"],
        description:
          "Mangroves Global's multi-point quality assurance process for Indian spices and agricultural commodities exported to the UAE and GCC.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
          { "@type": "ListItem", position: 3, name: "Quality Assurance", item: "https://mangrovesglobal.com/trading/quality-assurance" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QualityAssuranceContent />
    </>
  );
}
