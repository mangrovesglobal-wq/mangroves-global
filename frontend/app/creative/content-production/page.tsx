import type { Metadata } from "next";
import ContentProductionContent from "@/components/ContentProductionContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_ALT = "Content & Production services from Mangroves Global for UAE businesses.";

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
    "Copywriting, photography, video and motion graphics — the content that actually fills your campaigns, website and social channels.",
  meta_title: "Content & Production Services UAE",
  meta_description:
    "Copywriting, photography, video and motion graphics for UAE businesses — content for campaigns, websites and social channels.",
  block_1_heading: "What We Offer",
  block_1_content:
    "<ul><li><strong>Copywriting</strong> — website copy, campaign copy and brand messaging.</li><li><strong>Creative content</strong> — content concepts built for specific channels and audiences.</li><li><strong>Product &amp; corporate photography</strong> — photography for e-commerce, marketing and corporate use.</li><li><strong>Video content</strong> — video production for campaigns, social and corporate communication.</li><li><strong>Motion graphics</strong> — animated content for digital and social channels.</li></ul>",
  block_2_heading: "Who This Is For",
  block_2_content:
    "<p>Businesses that need a steady supply of on-brand content — whether for an ongoing campaign, a website relaunch, or a social media presence that needs to look consistently professional.</p>",
  block_3_heading: null,
  block_3_content: null,
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/creative/content-production`, {
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
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const serviceDefaults: Metadata = {
    title,
    description,
    alternates: { canonical: "/creative/content-production" },
    ...(ogImageUrl && {
      openGraph: { title, description, url: "/creative/content-production", images: [{ url: ogImageUrl, alt: title }] },
      twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
    }),
  };
  return getSeoMetadata("creative-content-production", serviceDefaults);
}

export default async function ContentProductionPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, HERO_IMAGE_ALT, "/images/Content Production.jpg");
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
          { "@type": "ListItem", position: 3, name: "Content & Production", item: "https://mangrovesglobal.com/creative/content-production" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Content & Production",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: "United Arab Emirates",
        ...(ogImageUrl && { image: ogImageUrl }),
        description: "Copywriting, product and corporate photography, video content and motion graphics for UAE businesses.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentProductionContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
