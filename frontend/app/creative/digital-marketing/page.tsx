import type { Metadata } from "next";
import DigitalMarketingContent from "@/components/DigitalMarketingContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_ALT = "Digital marketing services from Mangroves Global for UAE businesses.";

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
    "SEO, social media, paid digital advertising and analytics — digital marketing built around measurable business objectives, not vanity metrics.",
  meta_title: "Digital Marketing Agency UAE | SEO & Paid Media",
  meta_description:
    "SEO, social media marketing, paid digital advertising and analytics for UAE businesses. Digital marketing built around measurable objectives.",
  block_1_heading: "What We Offer",
  block_1_content:
    "<ul><li><strong>Digital strategy</strong> — channel selection and planning matched to your audience and objective.</li><li><strong>SEO</strong> — technical and content optimization to improve organic visibility.</li><li><strong>Social media marketing</strong> — platform strategy, content and community management.</li><li><strong>Paid digital advertising</strong> — campaign setup and management across paid channels.</li><li><strong>Content marketing</strong> — content built to support search visibility and audience engagement.</li><li><strong>Online reputation</strong> — monitoring and management of your digital presence.</li><li><strong>Lead generation</strong> — digital campaigns designed around actual conversion, not just traffic.</li><li><strong>Analytics &amp; reporting</strong> — clear reporting tied back to your original objective.</li></ul>",
  block_2_heading: "Who This Is For",
  block_2_content:
    "<p>UAE businesses that need a digital marketing function without building one internally — from SMEs running their first paid campaign to established businesses looking to improve digital performance.</p>",
  block_3_heading: null,
  block_3_content: null,
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/creative/digital-marketing`, {
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
    alternates: { canonical: "/creative/digital-marketing" },
    ...(ogImageUrl && {
      openGraph: { title, description, url: "/creative/digital-marketing", images: [{ url: ogImageUrl, alt: title }] },
      twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
    }),
  };
  return getSeoMetadata("creative-digital-marketing", serviceDefaults);
}

export default async function DigitalMarketingPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, HERO_IMAGE_ALT, "/images/Digital marketing.jpg");
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
          { "@type": "ListItem", position: 3, name: "Digital Marketing", item: "https://mangrovesglobal.com/creative/digital-marketing" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Digital Marketing",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: "United Arab Emirates",
        ...(ogImageUrl && { image: ogImageUrl }),
        description: "SEO, social media marketing, paid digital advertising, content marketing and analytics for UAE businesses.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DigitalMarketingContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
