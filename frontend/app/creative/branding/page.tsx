import type { Metadata } from "next";
import BrandingContent from "@/components/BrandingContent";

export const metadata: Metadata = {
  title: "Brand Identity Agency UAE | Branding & Creative | Mangroves Global",
  description:
    "Brand strategy, naming, visual identity and packaging design for UAE businesses. Building brands that hold together across every touchpoint.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Branding & Creative", item: "https://mangrovesglobal.com/creative/branding" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Branding & Creative",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: "United Arab Emirates",
      description: "Brand strategy, naming, visual identity and packaging design for UAE businesses.",
    },
  ],
};

export default function BrandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BrandingContent />
    </>
  );
}
