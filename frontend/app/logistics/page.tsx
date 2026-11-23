import type { Metadata } from "next";
import LogisticsPageContent from "@/components/LogisticsPageContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("logistics", {
    title: "Logistics & Supply Chain Solutions in UAE",
    description:
      "Mangroves Global coordinates freight, customs, transportation and warehousing across India, the UAE and the GCC. Request a logistics quote.",
    alternates: { canonical: "https://mangrovesglobal.com/logistics" },
  });
}

import { JsonLd } from "@/components/JsonLd";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
      ],
    },
    {
      "@type": "Service",
      name: "Freight & Logistics Coordination UAE",
      serviceType: "Logistics Coordination",
      url: "https://mangrovesglobal.com/logistics",
      description: "Sea freight, air freight, customs clearance, road transport and warehousing coordination in the UAE — through qualified licensed freight and logistics partners.",
      provider: {
        "@type": "Organization",
        "@id": "https://mangrovesglobal.com/#organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
      },
      areaServed: ["United Arab Emirates", "GCC", "India"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Logistics Services UAE",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sea Freight Coordination", url: "https://mangrovesglobal.com/logistics/sea-freight" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Freight Coordination", url: "https://mangrovesglobal.com/logistics/air-freight" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customs Clearance Coordination", url: "https://mangrovesglobal.com/logistics/customs-clearance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Road Transport Coordination", url: "https://mangrovesglobal.com/logistics/road-transport" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Warehousing & 3PL", url: "https://mangrovesglobal.com/logistics/warehousing-3pl" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Supply Chain Consulting", url: "https://mangrovesglobal.com/logistics/supply-chain-consulting" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Freight Coordination", url: "https://mangrovesglobal.com/logistics/freight-coordination" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Last-Mile Distribution", url: "https://mangrovesglobal.com/logistics/last-mile-distribution" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does Mangroves Global own the freight vessels or trucks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Mangroves Global coordinates freight through a vetted network of licensed freight forwarders, customs brokers and transport operators. We provide one point of contact and coordination — not an owned fleet.",
          },
        },
        {
          "@type": "Question",
          name: "What cargo types do you coordinate sea freight for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We coordinate FCL and LCL sea freight for general cargo, food products and spices, agricultural commodities, machinery, furniture, garments and commercial goods between India, UAE and GCC ports.",
          },
        },
        {
          "@type": "Question",
          name: "Can you coordinate customs clearance at Jebel Ali?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We coordinate customs clearance at Jebel Ali, Dubai, Abu Dhabi and other UAE ports through licensed customs broker partners — covering documentation, broker liaison and status updates.",
          },
        },
      ],
    },
  ],
};

export default async function LogisticsPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.mangrovesglobal.com";
  let heroImage: string | undefined;
  try {
    const res = await fetch(`${API_BASE}/api/pages/logistics`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.hero?.image) heroImage = `${API_BASE}${data.hero.image}`;
    }
  } catch { /* fall back to default */ }

  return (
    <>
      <JsonLd schema={schema} />
      <LogisticsPageContent heroImage={heroImage} />
    </>
  );
}
