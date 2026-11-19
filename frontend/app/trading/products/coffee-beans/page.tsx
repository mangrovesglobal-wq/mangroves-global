import type { Metadata } from "next";
import CoffeeBeansContent from "@/components/CoffeeBeansContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-product-coffee-beans", {
    title: "Green Coffee Beans Exporter UAE | Indian Coffee Supplier GCC",
    description:
      "Bulk Indian green coffee beans for UAE and GCC roasters — Grades AA, A and Peaberry, high-altitude shade-grown, zero-defect scoring. FSSAI / Spice Board / APEDA registered supplier partners. Request specifications and pricing.",
    alternates: { canonical: "/trading/products/coffee-beans" },
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
          name: "Coffee Beans",
          item: "https://mangrovesglobal.com/trading/products/coffee-beans",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Indian Green Coffee Beans",
      description:
        "Export-grade Indian green coffee beans, supplied as Grades AA, A and Peaberry, for UAE and GCC roasters and buyers.",
      brand: { "@type": "Brand", name: "Mangroves Global" },
      image: "https://mangrovesglobal.com/trading/images/indian-coffee-beans-export.jpg",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://mangrovesglobal.com/trading/products/coffee-beans",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between Grade AA, A and Peaberry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Grade AA refers to the largest bean size with the fewest defects. Grade A is a standard commercial grade. Peaberry is a naturally occurring single round bean prized by some specialty roasters.",
          },
        },
        {
          "@type": "Question",
          name: "What does shade-grown mean for coffee quality?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shade-grown coffee is cultivated under a forest canopy, which slows cherry ripening and is generally associated with more complex flavour development in the bean.",
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
            text: "Yes. Mangroves Global works with UAE and GCC roasters and buyers on bulk quantities with flexible Incoterm-based shipment execution (FOB, CIF, CFR).",
          },
        },
      ],
    },
  ],
};

export default function CoffeeBeansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoffeeBeansContent />
    </>
  );
}
