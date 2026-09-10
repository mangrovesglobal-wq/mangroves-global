import type { Metadata } from "next";
import CustomsCoordinationContent from "@/components/CustomsCoordinationContent";

const TITLE = "Customs Clearance Coordination UAE";
const DESCRIPTION =
  "Customs documentation and clearance coordination for UAE and GCC shipments, working alongside appropriately licensed customs brokers.";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/customs-clearance-cargo-ship-uae.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/logistics/customs-clearance" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/logistics/customs-clearance",
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
        { "@type": "ListItem", position: 3, name: "Customs Coordination", item: "https://mangrovesglobal.com/logistics/customs-clearance" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Customs Clearance Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC"],
      image: HERO_IMAGE_URL,
      description:
        "Customs documentation and broker communication coordination for UAE and GCC shipments, performed alongside appropriately licensed customs brokers.",
    },
  ],
};

export default function CustomsCoordinationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CustomsCoordinationContent />
    </>
  );
}
