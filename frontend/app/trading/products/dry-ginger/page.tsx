import type { Metadata } from "next";
import DryGingerContent from "@/components/DryGingerContent";

export const metadata: Metadata = {
  title: "Dry Ginger Supplier UAE | Indian Ginger Exporter GCC",
  description:
    "Bulk Indian dry ginger for UAE and GCC buyers — washed whole dried, split and fine ground powder. Export-ready quality, FSSAI / Spice Board / APEDA registered supplier partners. Request specifications and pricing.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Dry Ginger",
          item: "https://mangrovesglobal.com/trading/products/dry-ginger",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Indian Dry Ginger",
      description:
        "Export-grade Indian dry ginger, supplied as washed whole dried, split and fine ground powder, for UAE and GCC buyers.",
      brand: { "@type": "Brand", name: "Mangroves Global" },
      image: "https://mangrovesglobal.com/trading/images/fresh-ginger-export-india.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://mangrovesglobal.com/trading/products/dry-ginger",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between washed whole and split ginger?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Washed whole dried ginger is the complete cleaned rhizome, commonly further processed by the buyer at destination. Split ginger is cut into pieces at origin, suited to processing and extraction applications.",
          },
        },
        {
          "@type": "Question",
          name: "How is dry ginger different from fresh ginger?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dry ginger is sun-dried to reduce moisture content significantly, concentrating flavour and extending shelf life for export, unlike fresh ginger which has a much shorter usable window.",
          },
        },
        {
          "@type": "Question",
          name: "Does Mangroves Global hold export certifications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mangroves Global Trading FZ LLC is UAE headquartered and sources through certified supplier partners in India, including our sister company, who hold FSSAI registration, Spice Board India registration, and APEDA registration.",
          },
        },
        {
          "@type": "Question",
          name: "Can Mangroves Global supply bulk quantities for export to the UAE and GCC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Mangroves Global works with UAE and GCC buyers on bulk quantities with flexible Incoterm-based shipment execution (FOB, CIF, CFR).",
          },
        },
      ],
    },
  ],
};

export default function DryGingerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DryGingerContent />
    </>
  );
}
