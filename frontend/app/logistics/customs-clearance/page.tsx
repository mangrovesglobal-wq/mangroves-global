import type { Metadata } from "next";
import CustomsCoordinationContent from "@/components/CustomsCoordinationContent";

export const metadata: Metadata = {
  title: "Customs Clearance Coordination UAE | Mangroves Global",
  description:
    "Customs documentation and clearance coordination for UAE and GCC shipments, working alongside appropriately licensed customs brokers.",
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
