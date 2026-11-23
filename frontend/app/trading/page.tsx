import type { Metadata } from "next";
import TradingPageContent from "@/components/TradingPageContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading", {
    title: "Indian Spices & Agricultural Commodity Exporter | UAE & GCC Supplier",
    description:
      "Mangroves Global supplies UAE and GCC buyers with Indian-origin green cardamom, black pepper, cloves, nutmeg, ginger and coffee — transparent sourcing, export-ready quality.",
    alternates: { canonical: "https://mangrovesglobal.com/trading" },
  });
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
      ],
    },
    {
      "@type": "Service",
      name: "Indian Spices & Agricultural Commodity Trading UAE",
      serviceType: "Commodity Trading",
      url: "https://mangrovesglobal.com/trading",
      description: "Direct-source wholesale supply of Kerala and Indian spices for UAE and GCC buyers — cardamom, black pepper, coffee beans, cloves, ginger and nutmeg.",
      provider: {
        "@type": "Organization",
        "@id": "https://mangrovesglobal.com/#organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
      },
      areaServed: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Indian Spice Products",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Green Cardamom (Idukki, Kerala)", url: "https://mangrovesglobal.com/trading/products/green-cardamom" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Black Pepper (Malabar / Tellicherry)", url: "https://mangrovesglobal.com/trading/products/black-pepper" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cloves", url: "https://mangrovesglobal.com/trading/products/cloves" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dry Ginger", url: "https://mangrovesglobal.com/trading/products/dry-ginger" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Nutmeg & Mace", url: "https://mangrovesglobal.com/trading/products/nutmeg-mace" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Coffee Beans", url: "https://mangrovesglobal.com/trading/products/coffee-beans" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where does Mangroves Global source its spices from?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We source primarily from Kerala, Karnataka and other South Indian growing regions — including Idukki for cardamom, Wayanad and the Malabar coast for black pepper, and Coorg and Chikmagalur for coffee.",
          },
        },
        {
          "@type": "Question",
          name: "What shipping terms do you offer for UAE buyers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with UAE and GCC buyers on FOB (Cochin / JNPT), CIF Dubai, and CFR terms. Contact our trading desk with your destination port, volume and timeline.",
          },
        },
        {
          "@type": "Question",
          name: "Do you supply in bulk wholesale quantities?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Mangroves Global supplies B2B wholesale buyers in UAE and GCC — from full container loads (FCL) to consolidated LCL shipments depending on volume and product.",
          },
        },
      ],
    },
  ],
};

export default async function TradingPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.mangrovesglobal.com";
  let heroVideo: string | undefined;
  let heroPoster: string | undefined;
  try {
    const res = await fetch(`${API_BASE}/api/pages/trading`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.hero?.video)        heroVideo  = `${API_BASE}${data.hero.video}`;
      if (data?.hero?.video_poster) heroPoster = `${API_BASE}${data.hero.video_poster}`;
    }
  } catch { /* fall back to defaults */ }

  return (
    <>
      <JsonLd schema={schema} />
      <TradingPageContent heroVideo={heroVideo} heroPoster={heroPoster} />
    </>
  );
}
