import type { Metadata } from "next";
import SourcingSupplyContent from "@/components/SourcingSupplyContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-sourcing-supply", {
    title: "Sourcing & Supply",
    description:
      "How Mangroves Global sources Indian spices and agricultural commodities — direct origin relationships, a short supply chain, and documented traceability for UAE and GCC buyers.",
    alternates: { canonical: "/trading/sourcing-supply" },
  });
}

export default function SourcingSupplyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Commodity Sourcing & Supply",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC"],
        description:
          "How Mangroves Global sources Indian spices and agricultural commodities — direct origin relationships, a short supply chain, and documented traceability for UAE and GCC buyers.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
          { "@type": "ListItem", position: 3, name: "Sourcing & Supply", item: "https://mangrovesglobal.com/trading/sourcing-supply" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SourcingSupplyContent />
    </>
  );
}
