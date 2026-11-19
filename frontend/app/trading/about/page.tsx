import type { Metadata } from "next";
import TradingAboutContent from "@/components/TradingAboutContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-about", {
    title: "About Mangroves Global Trading | UAE Spice & Commodity Exporter",
    description:
      "Mangroves Global Trading FZ LLC connects UAE and GCC buyers directly with authentic Indian agricultural origins — direct farm sourcing, structured QA, and disciplined export compliance.",
    alternates: { canonical: "/trading/about" },
  });
}

export default function TradingAboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "About Mangroves Global Trading",
        description:
          "Mangroves Global Trading FZ LLC connects UAE and GCC buyers directly with authentic Indian agricultural origins.",
        url: "https://mangrovesglobal.com/trading/about",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
          { "@type": "ListItem", position: 3, name: "About", item: "https://mangrovesglobal.com/trading/about" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TradingAboutContent />
    </>
  );
}
