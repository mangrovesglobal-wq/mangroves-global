import type { Metadata } from "next";
import RoadTransportContent from "@/components/RoadTransportContent";

export const metadata: Metadata = {
  title: "Road Transport UAE | GCC Road Logistics | Mangroves Global",
  description:
    "Road transportation coordination across the UAE and into the GCC through qualified transport partners — container, FTL and inter-emirate delivery. Request a quote.",
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
