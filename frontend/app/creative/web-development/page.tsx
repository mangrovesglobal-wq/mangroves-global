import type { Metadata } from "next";
import WebDigitalContent from "@/components/WebDigitalContent";

export const metadata: Metadata = {
  title: "Web Development UAE | Corporate Websites",
  description:
    "Corporate websites, landing pages, UI/UX and CMS development for UAE businesses. Conversion-focused, SEO-structured, mobile-first builds.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Web & Digital Experiences", item: "https://mangrovesglobal.com/creative/web-development" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Web Development",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: "United Arab Emirates",
      description: "Corporate websites, landing pages, UI/UX, frontend and CMS development for UAE businesses.",
    },
  ],
};

export default function WebDigitalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WebDigitalContent />
    </>
  );
}
