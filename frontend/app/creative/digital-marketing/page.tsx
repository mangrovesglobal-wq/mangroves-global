import type { Metadata } from "next";
import DigitalMarketingContent from "@/components/DigitalMarketingContent";

export const metadata: Metadata = {
  title: "Digital Marketing Agency UAE | SEO & Paid Media",
  description:
    "SEO, social media marketing, paid digital advertising and analytics for UAE businesses. Digital marketing built around measurable objectives.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Digital Marketing", item: "https://mangrovesglobal.com/creative/digital-marketing" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Digital Marketing",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: "United Arab Emirates",
      description: "SEO, social media marketing, paid digital advertising, content marketing and analytics for UAE businesses.",
    },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DigitalMarketingContent />
    </>
  );
}
