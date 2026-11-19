import type { Metadata } from "next";
import BlackPepperContent from "@/components/BlackPepperContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-product-black-pepper", {
    title: "Black Pepper Exporter UAE | Bulk Malabar Pepper Supplier",
    description:
      "Bulk Indian black pepper for UAE and GCC buyers — Tellicherry (TGEB), Malabar Garbled (MG1), cracked and powder. Export-ready quality, FSSAI / Spice Board / APEDA registered supplier partners. Request specifications and pricing.",
    alternates: { canonical: "/trading/products/black-pepper" },
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
          name: "Black Pepper",
          item: "https://mangrovesglobal.com/trading/products/black-pepper",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Indian Black Pepper (Malabar / Tellicherry)",
      description:
        "Export-grade Indian black pepper sourced from the Malabar coast, supplied as Tellicherry (TGEB), Malabar Garbled (MG1), cracked and powder, for UAE and GCC buyers.",
      brand: { "@type": "Brand", name: "Mangroves Global" },
      image: "https://mangrovesglobal.com/trading/images/indian-black-pepper-supplier.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://mangrovesglobal.com/trading/products/black-pepper",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between Tellicherry and Malabar Garbled pepper?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tellicherry (TGEB) refers to larger, bolder, fully mature peppercorns typically used in premium retail and gourmet applications. Malabar Garbled (MG1) is a standard commercial grade widely used in food manufacturing.",
          },
        },
        {
          "@type": "Question",
          name: "What does piperine content mean for buyers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Piperine is the compound responsible for pepper's pungency. Higher piperine content generally indicates a more potent, higher-quality pepper.",
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

export default function BlackPepperPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlackPepperContent />
    </>
  );
}
