import type { Metadata } from "next";
import ContentProductionContent from "@/components/ContentProductionContent";

export const metadata: Metadata = {
  title: "Content & Production Services UAE | Mangroves Global",
  description:
    "Copywriting, photography, video and motion graphics for UAE businesses — content for campaigns, websites and social channels.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Content & Production", item: "https://mangrovesglobal.com/creative/content-production" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Content & Production",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: "United Arab Emirates",
      description: "Copywriting, product and corporate photography, video content and motion graphics for UAE businesses.",
    },
  ],
};

export default function ContentProductionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentProductionContent />
    </>
  );
}
