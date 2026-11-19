import type { Metadata } from "next";
import ZaincartProjectContent from "@/components/ZaincartProjectContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-work-zaincart", {
    title: "ZainCart — Branding & E-Commerce Platform | Mangroves Global Creative",
    description:
      "Brand identity and e-commerce platform design for ZainCart — a Qatar-based multi-category shopping app covering groceries, fashion and everyday essentials.",
    alternates: { canonical: "/creative/work/zaincart" },
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
        { "@type": "ListItem", position: 4, name: "ZainCart", item: "https://mangrovesglobal.com/creative/work/zaincart" },
      ],
    },
    {
      "@type": "CreativeWork",
      name: "ZainCart — Branding & E-Commerce Platform",
      url: "https://mangrovesglobal.com/creative/work/zaincart",
      description: "Brand identity and e-commerce platform design for ZainCart — a Qatar-based multi-category shopping app covering groceries, fashion and everyday essentials.",
      creator: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC", url: "https://mangrovesglobal.com" },
    },
  ],
};

export default function ZaincartProjectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ZaincartProjectContent />
    </>
  );
}
