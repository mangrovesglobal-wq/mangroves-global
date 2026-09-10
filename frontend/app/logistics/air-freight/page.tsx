import type { Metadata } from "next";
import AirFreightContent from "@/components/AirFreightContent";

const TITLE = "Air Freight UAE | India–UAE Cargo Coordination";
const DESCRIPTION =
  "Time-sensitive air freight coordination between India, the UAE and the GCC — urgent cargo, samples and high-value shipments. Request an air freight quote.";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/air-freight-cargo-plane-port.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/logistics/air-freight" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/logistics/air-freight",
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
        { "@type": "ListItem", position: 3, name: "Air Freight", item: "https://mangrovesglobal.com/logistics/air-freight" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Air Freight Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC", "India"],
      image: HERO_IMAGE_URL,
      description:
        "Time-sensitive air freight coordination for urgent cargo, samples and high-value shipments between India, the UAE and the GCC.",
    },
  ],
};

export default function AirFreightPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AirFreightContent />
    </>
  );
}
