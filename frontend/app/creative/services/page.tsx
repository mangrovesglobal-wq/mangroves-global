import type { Metadata } from "next";
import CreativeServicesContent from "@/components/CreativeServicesContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-services", {
    title: "Creative Services | Advertising, Digital Marketing, Branding & Web — UAE",
    description:
      "Five integrated creative service verticals: advertising campaigns, digital marketing, branding & identity, content production, and web development for UAE businesses.",
    alternates: { canonical: "/creative/services" },
    openGraph: {
      title: "Creative Services | Mangroves Global",
      description:
        "Advertising, digital marketing, branding, content production and web development — integrated creative services built around measurable business outcomes.",
      url: "/creative/services",
    },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Services", item: "https://mangrovesglobal.com/creative/services" },
      ],
    },
    {
      "@type": "WebPage",
      name: "Creative Services",
      url: "https://mangrovesglobal.com/creative/services",
      description: "Advertising, digital marketing, branding, content production and web development for UAE businesses.",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
    },
  ],
};

export default function CreativeServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CreativeServicesContent />
    </>
  );
}
