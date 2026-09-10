import type { Metadata } from "next";
import LogisticsPageContent from "@/components/LogisticsPageContent";

const TITLE = "Logistics & Supply Chain Solutions in UAE";
const DESCRIPTION =
  "Mangroves Global coordinates freight, customs, transportation and warehousing across India, the UAE and the GCC. Request a logistics quote.";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/logistics-global-network-hero.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/logistics" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/logistics",
    images: [{ url: HERO_IMAGE_URL, width: 2400, height: 1350, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMAGE_URL],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mangroves Global Trading FZ LLC — Logistics",
  url: "https://mangrovesglobal.com/logistics",
  image: HERO_IMAGE_URL,
  description: DESCRIPTION,
  areaServed: ["United Arab Emirates", "GCC", "India"],
};

export default function LogisticsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LogisticsPageContent />
    </>
  );
}
