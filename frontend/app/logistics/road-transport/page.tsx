import type { Metadata } from "next";
import RoadTransportContent from "@/components/RoadTransportContent";

const TITLE = "Road Transport UAE | GCC Road Logistics";
const DESCRIPTION =
  "Road transportation coordination across the UAE and into the GCC through qualified transport partners — container, FTL and inter-emirate delivery. Request a quote.";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/road-transport-trucks-uae-gcc.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/logistics/road-transport" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/logistics/road-transport",
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
        { "@type": "ListItem", position: 3, name: "Road Transport", item: "https://mangrovesglobal.com/logistics/road-transport" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Road Transportation Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC"],
      image: HERO_IMAGE_URL,
      description:
        "Road transportation coordination across the UAE and into the GCC through qualified transport providers.",
    },
  ],
};

export default function RoadTransportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RoadTransportContent />
    </>
  );
}
