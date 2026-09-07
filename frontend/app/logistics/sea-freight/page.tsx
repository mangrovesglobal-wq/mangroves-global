import type { Metadata } from "next";
import SeaFreightContent from "@/components/SeaFreightContent";

export const metadata: Metadata = {
  title: "Sea Freight UAE | FCL & LCL Coordination | Mangroves Global",
  description:
    "FCL and LCL sea freight coordination between India, the UAE and the GCC — port-to-port through door-to-door. Request a sea freight quote.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
        { "@type": "ListItem", position: 3, name: "Sea Freight", item: "https://mangrovesglobal.com/logistics/sea-freight" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Sea Freight Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC", "India"],
      description:
        "FCL and LCL sea freight coordination between India, the UAE and the GCC, coordinated through established ocean freight providers.",
    },
  ],
};

export default function SeaFreightPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeaFreightContent />
    </>
  );
}
