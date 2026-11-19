import type { Metadata } from "next";
import LogisticsAboutContent from "@/components/LogisticsAboutContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("logistics-about", {
    title: "About | Mangroves Global Logistics",
    description:
      "Mangroves Global Logistics coordinates sea freight, air freight, road transport, customs clearance and supply chain services through qualified partners — serving UAE and GCC trade lanes.",
    alternates: { canonical: "/logistics/about" },
    openGraph: {
      title: "About | Mangroves Global Logistics",
      description:
        "Freight coordination services for UAE and GCC importers and exporters, managed through a vetted partner network.",
      url: "https://www.mangrovesglobal.com/logistics/about",
    },
  });
}

export default function LogisticsAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Mangroves Global Logistics",
            description:
              "Freight coordination services for UAE and GCC trade lanes through a network of qualified logistics partners.",
            url: "https://www.mangrovesglobal.com/logistics/about",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Logistics", item: "https://www.mangrovesglobal.com/logistics" },
                { "@type": "ListItem", position: 2, name: "About", item: "https://www.mangrovesglobal.com/logistics/about" },
              ],
            },
          }),
        }}
      />
      <LogisticsAboutContent />
    </>
  );
}
