import type { Metadata } from "next";
import TradingContactContent from "@/components/TradingContactContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-contact", {
    title: "Contact | Buy Indian Spices & Commodities — Mangroves Global UAE",
    description:
      "Send a trade inquiry to Mangroves Global Trading's commercial desk. Export-grade Indian spices — black pepper, cardamom, cloves and more — for UAE and GCC buyers. FOB, CIF, CFR terms available.",
    alternates: { canonical: "/trading/contact" },
    openGraph: {
      title: "Contact Our Trading Desk | Mangroves Global UAE",
      description:
        "Sourcing Indian agricultural commodities for UAE or GCC? Contact our commercial team for specifications, pricing and shipment terms.",
      url: "https://www.mangrovesglobal.com/trading/contact",
    },
  });
}

export default function TradingContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Mangroves Global Trading — Trade Inquiry",
            description:
              "Contact Mangroves Global Trading FZ LLC to source export-grade Indian spices and agricultural commodities for UAE and GCC markets.",
            url: "https://www.mangrovesglobal.com/trading/contact",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Trading", item: "https://www.mangrovesglobal.com/trading" },
                { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.mangrovesglobal.com/trading/contact" },
              ],
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+971-54-124-2100",
              email: "info@mangrovesglobal.com",
              contactType: "sales",
              areaServed: ["AE", "SA", "OM", "QA", "KW", "BH"],
              availableLanguage: ["English"],
            },
          }),
        }}
      />
      <TradingContactContent />
    </>
  );
}
