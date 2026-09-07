import type { Metadata } from "next";
import AdvertisingContent from "@/components/AdvertisingContent";

export const metadata: Metadata = {
  title: "Advertising Agency UAE | Campaign Strategy | Mangroves Global",
  description:
    "Advertising campaigns, communication strategy and campaign execution for UAE businesses. Objective-first, not content for its own sake.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Advertising & Communication", item: "https://mangrovesglobal.com/creative/advertising" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Advertising & Communication",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: "United Arab Emirates",
      description: "Campaign strategy, advertising campaigns and communication planning for UAE businesses.",
    },
  ],
};

export default function AdvertisingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AdvertisingContent />
    </>
  );
}
