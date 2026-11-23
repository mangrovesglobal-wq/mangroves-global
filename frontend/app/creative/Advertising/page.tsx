import type { Metadata } from "next";
import AdvertisingContent from "@/components/AdvertisingContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";
const HERO_IMAGE_ALT = "Advertising & Communication services from Mangroves Global for UAE businesses.";

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
    "Campaign strategy, advertising campaigns and communication planning built around a clear business objective — not content for its own sake.",
  meta_title: "Advertising Agency UAE | Campaign Strategy",
  meta_description:
    "Advertising campaigns, communication strategy and campaign execution for UAE businesses. Objective-first, not content for its own sake.",
  block_1_heading: "What We Offer",
  block_1_content:
    "<ul><li><strong>Campaign strategy</strong> — defining objective, audience and positioning before any creative work begins.</li><li><strong>Advertising campaigns</strong> — concept development and execution across selected channels.</li><li><strong>Communication strategy</strong> — messaging frameworks that stay consistent across every touchpoint.</li><li><strong>Creative campaign development</strong> — turning strategy into concrete campaign assets.</li><li><strong>Campaign execution</strong> — managing launch and delivery across chosen channels.</li></ul>",
  block_2_heading: "Who This Is For",
  block_2_content:
    "<p>Businesses that need advertising and communication support but don't have (or don't want to build) an internal agency function — from product launches to ongoing brand communication.</p>",
  block_3_heading: "Regulatory Note",
  block_3_content:
    "<p>Mangroves Global provides advertising and communication services within the scope of the company's licensed business activity, subject to applicable UAE regulatory approvals.</p>",
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/creative/advertising`, {
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
    alternates: { canonical: "/creative/advertising" },
    ...(ogImageUrl && {
      openGraph: { title, description, url: "/creative/advertising", images: [{ url: ogImageUrl, alt: title }] },
      twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
    }),
  };
  return getSeoMetadata("creative-advertising", serviceDefaults);
}

export default async function AdvertisingPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, HERO_IMAGE_ALT, "/images/Advertising.jpg");
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
          { "@type": "ListItem", position: 3, name: "Advertising & Communication", item: "https://mangrovesglobal.com/creative/advertising" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Advertising & Communication",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: "United Arab Emirates",
        ...(ogImageUrl && { image: ogImageUrl }),
        description: "Campaign strategy, advertising campaigns and communication planning for UAE businesses.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AdvertisingContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
