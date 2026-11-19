import type { Metadata } from "next";
import StrandbioProjectContent from "@/components/StrandbioProjectContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-work-strandbio", {
    title: "Strand Biolife — Brand Identity | Mangroves Global Creative",
    description:
      "Complete brand identity system for Strand Biolife — a healthcare diagnostics company. Visual identity, clinical collateral, packaging, uniforms and website.",
    alternates: { canonical: "/creative/work/strandbio" },
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
        { "@type": "ListItem", position: 4, name: "Strand Biolife", item: "https://mangrovesglobal.com/creative/work/strandbio" },
      ],
    },
    {
      "@type": "CreativeWork",
      name: "Strand Biolife — Brand Identity",
      url: "https://mangrovesglobal.com/creative/work/strandbio",
      description: "Complete brand identity system for Strand Biolife — a healthcare diagnostics company. Visual identity, clinical collateral, packaging, uniforms and website.",
      creator: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC", url: "https://mangrovesglobal.com" },
    },
  ],
};

export default function StrandbioProjectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StrandbioProjectContent />
    </>
  );
}
