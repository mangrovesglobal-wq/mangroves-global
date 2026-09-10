import type { Metadata } from "next";
import AirFreightContent from "@/components/AirFreightContent";

export const metadata: Metadata = {
  title: "Air Freight UAE | India–UAE Cargo Coordination",
  description:
    "Time-sensitive air freight coordination between India, the UAE and the GCC — urgent cargo, samples and high-value shipments. Request an air freight quote.",
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
