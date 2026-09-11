import type { Metadata } from "next";
import SupplyChainConsultingContent from "@/components/SupplyChainConsultingContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_PATH = "/images/supply-chain-network-coordination.jpg";
const HERO_IMAGE_URL = `https://mangrovesglobal.com${HERO_IMAGE_PATH}`;
const HERO_IMAGE_ALT =
  "Digital network visualization over a container ship and truck, representing Mangroves Global's coordinated supply chain consultancy.";

type ServiceDetail = {
  short_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
  icon: string | null;
  block_1_heading: string | null;
  block_1_content: string | null;
  block_2_heading: string | null;
  block_2_content: string | null;
  block_3_heading: string | null;
  block_3_content: string | null;
  block_4_heading: string | null;
  block_4_content: string | null;
};

const FALLBACK: ServiceDetail = {
  featured_image: null,
  icon: null,
  short_description:
    "Beyond individual shipment coordination, we work with UAE and GCC businesses on the bigger picture — evaluating routes, suppliers, warehousing and workflows to identify real operational improvements.",
  meta_title: "Supply Chain Consultancy UAE | Logistics Consulting",
  meta_description:
    "Logistics cost audits, route optimization and distribution planning for UAE and GCC businesses. Request a supply chain consultation.",
  block_1_heading: "What We Offer",
  block_1_content:
    "<ul><li><strong>Logistics cost audit</strong> — identifying unnecessary logistics costs in your current setup.</li><li><strong>Route optimization</strong> — evaluating alternative transportation routes for cost or time efficiency.</li><li><strong>Supplier network review</strong> — evaluating your existing logistics suppliers against alternatives.</li><li><strong>Distribution &amp; warehouse planning</strong> — designing practical distribution structures and storage requirements.</li><li><strong>Shipment consolidation</strong> — identifying opportunities to consolidate shipments for cost savings.</li><li><strong>Import/export workflow review</strong> — reviewing documentation and operational bottlenecks in your process.</li></ul>",
  block_2_heading: "Who This Is For",
  block_2_content:
    "<p>This service is designed for businesses that may not have an internal logistics department, but are managing enough shipment volume that a structured review could reveal meaningful cost or efficiency improvements — without needing to build out an in-house logistics function.</p>",
  block_3_heading: "How It Works",
  block_3_content:
    "<p>We start by understanding your current logistics setup — routes, suppliers, volumes and pain points — then identify specific, practical recommendations rather than generic advice. Engagements can be project-based or ongoing, depending on what you need.</p>",
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/supply-chain-consulting`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK;
    const json = await res.json();
    return json.data || FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const service = await getService();
  const title = service.meta_title || FALLBACK.meta_title!;
  const description = service.meta_description || FALLBACK.meta_description!;
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL, HERO_IMAGE_URL)!;

  return {
    title,
    description,
    alternates: { canonical: "/logistics/supply-chain-consulting" },
    openGraph: {
      title,
      description,
      url: "/logistics/supply-chain-consulting",
      images: [{ url: ogImageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function SupplyChainConsultingPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, HERO_IMAGE_ALT, HERO_IMAGE_PATH);
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL, HERO_IMAGE_URL)!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
          { "@type": "ListItem", position: 3, name: "Supply Chain Consulting", item: "https://mangrovesglobal.com/logistics/supply-chain-consulting" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Supply Chain Consultancy",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC"],
        image: ogImageUrl,
        description:
          "Logistics cost audits, route optimization, supplier network review and distribution planning for UAE and GCC businesses.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SupplyChainConsultingContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
