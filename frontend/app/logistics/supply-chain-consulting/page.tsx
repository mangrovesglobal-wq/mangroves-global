import type { Metadata } from "next";
import SupplyChainConsultingContent from "@/components/SupplyChainConsultingContent";

const TITLE = "Supply Chain Consultancy UAE | Logistics Consulting";
const DESCRIPTION =
  "Logistics cost audits, route optimization and distribution planning for UAE and GCC businesses. Request a supply chain consultation.";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/supply-chain-network-coordination.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/logistics/supply-chain-consulting" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/logistics/supply-chain-consulting",
    images: [{ url: HERO_IMAGE_URL, width: 2400, height: 1350, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMAGE_URL],
  },
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
      image: HERO_IMAGE_URL,
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
