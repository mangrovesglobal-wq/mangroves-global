import type { Metadata } from "next";
import NutmegMaceContent from "@/components/NutmegMaceContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-product-nutmeg-mace", {
    title: "Nutmeg & Mace Exporter UAE | Bulk Supplier to GCC",
    description:
      "Bulk Indian nutmeg and mace for UAE and GCC buyers — whole ABCD nutmeg, red mace arils, fine powder. Export-ready quality, FSSAI / Spice Board / APEDA registered supplier partners. Request specifications and pricing.",
    alternates: { canonical: "/trading/products/nutmeg-mace" },
  });
}

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
          name: "Nutmeg & Mace",
          item: "https://mangrovesglobal.com/trading/products/nutmeg-mace",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Indian Nutmeg & Mace",
      description:
        "Export-grade Indian nutmeg and mace, supplied as whole ABCD nutmeg, red mace arils and fine powder, for UAE and GCC buyers.",
      brand: { "@type": "Brand", name: "Mangroves Global" },
      image: "https://mangrovesglobal.com/trading/images/indian-nutmeg-export.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://mangrovesglobal.com/trading/products/nutmeg-mace",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does ABCD grading mean for nutmeg?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ABCD is a shell-condition and size grading scale used for whole nutmeg, with higher grades reflecting larger, more uniform, defect-free kernels.",
          },
        },
        {
          "@type": "Question",
          name: "What is the relationship between nutmeg and mace?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mace is the lacy red covering (aril) that surrounds the nutmeg seed inside the fruit. Both are harvested from the same tree but graded and sold as separate spice products.",
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

export default function NutmegMacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NutmegMaceContent />
    </>
  );
}
