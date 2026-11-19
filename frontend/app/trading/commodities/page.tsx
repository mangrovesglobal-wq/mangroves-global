import type { Metadata } from "next";
import CommoditiesContent from "@/components/CommoditiesContent";
import { tradingProducts } from "@/lib/tradingProducts";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-commodities", {
    title: "Indian Spice & Commodity Exports to UAE | Mangroves Global",
    description:
      "Export-grade black pepper, cloves, nutmeg & mace, green cardamom, dry ginger and green coffee beans — sourced from India for UAE and GCC buyers.",
    alternates: { canonical: "/trading/commodities" },
  });
}

export default function CommoditiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        itemListElement: tradingProducts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.name,
            description: p.description,
            url: `https://mangrovesglobal.com/trading/products/${p.slug}`,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
          { "@type": "ListItem", position: 3, name: "Commodities", item: "https://mangrovesglobal.com/trading/commodities" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CommoditiesContent />
    </>
  );
}
