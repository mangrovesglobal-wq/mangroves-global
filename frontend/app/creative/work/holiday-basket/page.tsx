import type { Metadata } from "next";
import HolidayBasketProjectContent from "@/components/HolidayBasketProjectContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-work-holiday-basket", {
    title: "The Holiday Basket — Logo & Digital Marketing | Mangroves Global Creative",
    description:
      "Logo design and digital marketing strategy for The Holiday Basket — a travel-inspired gifting brand built around a playful HB monogram and aeroplane motif.",
    alternates: { canonical: "/creative/work/holiday-basket" },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Selected Work", item: "https://mangrovesglobal.com/creative/work" },
        { "@type": "ListItem", position: 4, name: "The Holiday Basket", item: "https://mangrovesglobal.com/creative/work/holiday-basket" },
      ],
    },
    {
      "@type": "CreativeWork",
      name: "The Holiday Basket — Logo & Digital Marketing",
      url: "https://mangrovesglobal.com/creative/work/holiday-basket",
      description: "Logo design and digital marketing strategy for The Holiday Basket — a travel-inspired gifting brand built around a playful HB monogram and aeroplane motif.",
      creator: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC", url: "https://mangrovesglobal.com" },
    },
  ],
};

export default function HolidayBasketProjectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HolidayBasketProjectContent />
    </>
  );
}
