import type { Metadata } from "next";
import HeltheeProjectContent from "@/components/HeltheeProjectContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-work-helthee", {
    title: "Helthee Care Clinic — Brand Identity | Mangroves Global Creative",
    description:
      "Brand identity for Helthee Care Clinic — ECG wordmark, magenta palette, business stationery, medical labelling and pharmaceutical packaging.",
    alternates: { canonical: "/creative/work/helthee" },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Selected Work", item: "https://mangrovesglobal.com/creative/work" },
        { "@type": "ListItem", position: 4, name: "Helthee Care Clinic", item: "https://mangrovesglobal.com/creative/work/helthee" },
      ],
    },
    {
      "@type": "CreativeWork",
      name: "Helthee Care Clinic — Brand Identity",
      url: "https://mangrovesglobal.com/creative/work/helthee",
      description: "Brand identity for Helthee Care Clinic — ECG wordmark, magenta palette, business stationery, medical labelling and pharmaceutical packaging.",
      creator: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC", url: "https://mangrovesglobal.com" },
    },
  ],
};

export default function HeltheeProjectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeltheeProjectContent />
    </>
  );
}
