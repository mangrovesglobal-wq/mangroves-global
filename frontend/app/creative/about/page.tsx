import type { Metadata } from "next";
import CreativeAboutContent from "@/components/CreativeAboutContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-about", {
    title: "About | Mangroves Global Digital & Creative",
    description:
      "Mangroves Global's Digital & Creative division delivers advertising, digital marketing, branding, content production and web development services to businesses in the UAE.",
    openGraph: {
      title: "About | Mangroves Global Digital & Creative",
      description:
        "Strategy-led digital marketing and creative services for UAE businesses — from branding and campaigns to websites and content.",
      url: "https://www.mangrovesglobal.com/creative/about",
    },
  });
}

export default function CreativeAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Mangroves Global Digital & Creative",
            description:
              "Digital marketing and creative services for UAE businesses — advertising, branding, content, web development and more.",
            url: "https://www.mangrovesglobal.com/creative/about",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Creative", item: "https://www.mangrovesglobal.com/creative" },
                { "@type": "ListItem", position: 2, name: "About", item: "https://www.mangrovesglobal.com/creative/about" },
              ],
            },
          }),
        }}
      />
      <CreativeAboutContent />
    </>
  );
}
