import type { Metadata } from "next";
import EttaraProjectContent from "@/components/EttaraProjectContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-work-ettara", {
    title: "Ettara — Brand Identity & Packaging | Mangroves Global Creative",
    description:
      "Premium brand identity and packaging design for Ettara — a natural essential oils brand built on deep forest green, gold and silver foil across product labels, gift boxes and stationery.",
    alternates: { canonical: "/creative/work/ettara" },
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
        { "@type": "ListItem", position: 4, name: "Ettara", item: "https://mangrovesglobal.com/creative/work/ettara" },
      ],
    },
    {
      "@type": "CreativeWork",
      name: "Ettara — Brand Identity & Packaging",
      url: "https://mangrovesglobal.com/creative/work/ettara",
      description: "Premium brand identity and packaging design for Ettara — a natural essential oils brand built on deep forest green, gold and silver foil across product labels, gift boxes and stationery.",
      creator: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC", url: "https://mangrovesglobal.com" },
    },
  ],
};

export default function EttaraProjectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EttaraProjectContent />
    </>
  );
}
