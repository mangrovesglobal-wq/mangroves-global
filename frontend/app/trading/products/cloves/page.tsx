import type { Metadata } from "next";
import ClovesContent from "@/components/ClovesContent";

export const metadata: Metadata = {
  title: "Cloves Supplier UAE | Indian Cloves Exporter to GCC",
  description:
    "Bulk Indian cloves for UAE and GCC buyers — whole quills and handpicked grades, high eugenol oil content. Export-ready quality, FSSAI / Spice Board / APEDA registered supplier partners. Request specifications and pricing.",
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
          name: "Cloves",
          item: "https://mangrovesglobal.com/trading/products/cloves",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Indian Cloves",
      description:
        "Export-grade Indian cloves, supplied as whole quills and handpicked grades, for UAE and GCC buyers.",
      brand: { "@type": "Brand", name: "Mangroves Global" },
      image: "https://mangrovesglobal.com/trading/images/indian-cloves-export.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://mangrovesglobal.com/trading/products/cloves",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between whole quill and handpicked cloves?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Whole quills refer to fully intact, unbroken clove buds typically reserved for premium retail and food-service use. Handpicked cloves are individually sorted for consistent size and quality.",
          },
        },
        {
          "@type": "Question",
          name: "What does eugenol content mean for buyers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eugenol is the primary essential oil compound responsible for clove's characteristic aroma and flavour intensity. Higher eugenol content generally indicates fresher, higher-quality cloves.",
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

export default function ClovesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClovesContent />
    </>
  );
}
