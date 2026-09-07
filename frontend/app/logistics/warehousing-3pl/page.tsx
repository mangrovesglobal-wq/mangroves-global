import type { Metadata } from "next";
import WarehousingContent from "@/components/WarehousingContent";

export const metadata: Metadata = {
  title: "Warehousing & 3PL Solutions UAE | Mangroves Global",
  description:
    "Warehouse and 3PL capacity coordination in the UAE — storage, inventory handling, pick & pack and distribution through our logistics network.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
        { "@type": "ListItem", position: 3, name: "Warehousing & 3PL", item: "https://mangrovesglobal.com/logistics/warehousing-3pl" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Warehousing & 3PL Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates"],
      description:
        "Warehouse and 3PL capacity coordination for storage, inventory handling, fulfilment and distribution, connected through our logistics network.",
    },
  ],
};

export default function WarehousingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WarehousingContent />
    </>
  );
}
