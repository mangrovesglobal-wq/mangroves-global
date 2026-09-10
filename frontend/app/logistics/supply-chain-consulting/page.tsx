import type { Metadata } from "next";
import SupplyChainConsultingContent from "@/components/SupplyChainConsultingContent";

export const metadata: Metadata = {
  title: "Supply Chain Consultancy UAE | Logistics Consulting",
  description:
    "Logistics cost audits, route optimization and distribution planning for UAE and GCC businesses. Request a supply chain consultation.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
        { "@type": "ListItem", position: 3, name: "Supply Chain Consulting", item: "https://mangrovesglobal.com/logistics/supply-chain-consulting" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Supply Chain Consultancy",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC"],
      description:
        "Logistics cost audits, route optimization, supplier network review and distribution planning for UAE and GCC businesses.",
    },
  ],
};

export default function SupplyChainConsultingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SupplyChainConsultingContent />
    </>
  );
}
