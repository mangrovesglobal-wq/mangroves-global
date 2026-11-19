import type { Metadata } from "next";
import CreativePageContent from "@/components/CreativePageContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative", {
    title: "Digital Marketing & Creative Agency UAE",
    description:
      "Advertising, digital marketing, branding and creative production for UAE businesses. Strategic communication built around measurable business objectives.",
    alternates: { canonical: "https://mangrovesglobal.com/creative" },
  });
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
      ],
    },
    {
      "@type": "ProfessionalService",
      name: "Mangroves Global Creative — Digital Marketing Agency UAE",
      serviceType: "Digital Marketing Agency",
      url: "https://mangrovesglobal.com/creative",
      description: "Advertising, digital marketing, branding, content production and web development for UAE businesses — creative services built for measurable GCC market results.",
      provider: {
        "@type": "Organization",
        "@id": "https://mangrovesglobal.com/#organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
      },
      areaServed: ["United Arab Emirates", "GCC"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Creative Services UAE",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Advertising & Communication", url: "https://mangrovesglobal.com/creative/advertising" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", url: "https://mangrovesglobal.com/creative/digital-marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Creative", url: "https://mangrovesglobal.com/creative/branding" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content & Production", url: "https://mangrovesglobal.com/creative/content-production" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & Digital Experiences", url: "https://mangrovesglobal.com/creative/web-development" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What digital marketing services do you offer in UAE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer SEO, social media marketing, Google and Meta paid advertising, content strategy and performance analytics for UAE and GCC businesses — all integrated and built around measurable targets.",
          },
        },
        {
          "@type": "Question",
          name: "Do you create Arabic-language branding and digital content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We produce bilingual English and Arabic brand identities, advertising campaigns and digital content designed for the UAE and GCC market.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a website development project typically take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Corporate website projects typically take 2 to 8 weeks depending on scope, content readiness and feature requirements. We handle design, development and CMS handover.",
          },
        },
      ],
    },
  ],
};

const LAYER_KEYS = ["layer_bg", "layer_0", "layer_1", "layer_2", "layer_3", "layer_4", "layer_5", "layer_6"] as const;

export default async function CreativePage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
  let heroLayerSrcs: string[] | undefined;
  try {
    const res = await fetch(`${API_BASE}/api/pages/creative`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.hero) {
        const layers = LAYER_KEYS.map((k) =>
          data.hero[k] ? `${API_BASE}${data.hero[k]}` : ""
        );
        if (layers.some(Boolean)) heroLayerSrcs = layers;
      }
    }
  } catch { /* fall back to defaults */ }

  return (
    <>
      <JsonLd schema={schema} />
      <CreativePageContent heroLayerSrcs={heroLayerSrcs} />
    </>
  );
}
