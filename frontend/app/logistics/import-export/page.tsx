import type { Metadata } from "next";
import ImportExportContent from "@/components/ImportExportContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("logistics-import-export", {
    title: "Import & Export Coordination UAE | Mangroves Global",
    description:
      "Import and export coordination for UAE and GCC businesses — freight, customs and documentation through one point of contact, across spices, agriculture, textiles and more.",
    alternates: { canonical: "/logistics/import-export" },
  });
}

export default function ImportExportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Import & Export Coordination",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC"],
        description:
          "Coordination of import and export shipments for UAE and GCC businesses — freight, customs documentation and onward transport through one point of contact.",
        audience: {
          "@type": "Audience",
          audienceType: "Food & Spices, Agriculture & Commodities, Textiles & Garments, Furniture, Building Materials, Consumer Products",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
          { "@type": "ListItem", position: 3, name: "Import & Export", item: "https://mangrovesglobal.com/logistics/import-export" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ImportExportContent />
    </>
  );
}
