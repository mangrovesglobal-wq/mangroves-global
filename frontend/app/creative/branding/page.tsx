import type { Metadata } from "next";
import BrandingContent from "@/components/BrandingContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";
const HERO_IMAGE_ALT = "Branding & Creative services from Mangroves Global for UAE businesses.";

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
    "Brand strategy, naming, visual identity and packaging design — building a brand that holds together across every touchpoint, not just a logo.",
  meta_title: "Brand Identity Agency UAE | Branding & Creative",
  meta_description:
    "Brand strategy, naming, visual identity and packaging design for UAE businesses. Building brands that hold together across every touchpoint.",
  block_1_heading: "What We Offer",
  block_1_content:
    "<ul><li><strong>Brand strategy</strong> — positioning, tone of voice and brand foundations before any design work starts.</li><li><strong>Naming</strong> — naming projects for new businesses, products or sub-brands.</li><li><strong>Brand identity &amp; visual identity</strong> — logo, colour system, typography and visual language.</li><li><strong>Packaging design</strong> — packaging that reflects brand identity and works commercially on shelf or online.</li><li><strong>Creative direction</strong> — ongoing creative oversight to keep a brand consistent as it grows.</li></ul>",
  block_2_heading: "Who This Is For",
  block_2_content:
    "<p>New businesses building a brand from scratch, and established businesses whose visual identity no longer matches where the business actually is.</p>",
  block_3_heading: null,
  block_3_content: null,
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/creative/branding`, {
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
    alternates: { canonical: "/creative/branding" },
    ...(ogImageUrl && {
      openGraph: { title, description, url: "/creative/branding", images: [{ url: ogImageUrl, alt: title }] },
      twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
    }),
  };
  return getSeoMetadata("creative-branding", serviceDefaults);
}

export default async function BrandingPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, HERO_IMAGE_ALT, "/images/Branding.jpg");
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
          { "@type": "ListItem", position: 3, name: "Branding & Creative", item: "https://mangrovesglobal.com/creative/branding" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Branding & Creative",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: "United Arab Emirates",
        ...(ogImageUrl && { image: ogImageUrl }),
        description: "Brand strategy, naming, visual identity and packaging design for UAE businesses.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BrandingContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
