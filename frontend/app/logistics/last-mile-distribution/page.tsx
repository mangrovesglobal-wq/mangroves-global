import type { Metadata } from "next";
import LastMileDistributionContent from "@/components/LastMileDistributionContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

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
    "Coordination of last-mile delivery and multi-point distribution across the UAE, from a single arrival point out to your final destinations.",
  meta_title: "Last-Mile & Distribution Coordination UAE | Mangroves Global",
  meta_description:
    "UAE-wide last-mile delivery and distribution coordination — multiple drop points, delivery scheduling and proof of delivery, coordinated through qualified transport partners.",
  block_1_heading: "What We Coordinate",
  block_1_content:
    "<p>Once cargo has cleared customs or arrived at a UAE hub, we coordinate its onward delivery to one or multiple final destinations — retail outlets, distributors, warehouses or end customers — across the Emirates.</p>",
  block_2_heading: "How It Works",
  block_2_content:
    "<p>Mangroves Global does not operate its own delivery fleet. We coordinate final-mile delivery through qualified UAE transport partners, matching vehicle type and schedule to your delivery points and timeline.</p>",
  block_3_heading: "Multi-Point Distribution",
  block_3_content:
    "<p>For shipments that need to reach several locations — multiple stores, warehouses or customers — we help plan and coordinate the distribution run so each drop point is scheduled efficiently.</p>",
  block_4_heading: "Proof of Delivery",
  block_4_content:
    "<p>We coordinate delivery confirmation and proof of delivery documentation for each drop point, so you have visibility on completed deliveries.</p>",
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/last-mile-distribution`, {
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

  return {
    title,
    description,
    alternates: { canonical: "/logistics/last-mile-distribution" },
    ...(ogImageUrl && {
      openGraph: { title, description, url: "/logistics/last-mile-distribution", images: [{ url: ogImageUrl, alt: title }] },
      twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
    }),
  };
}

export default async function LastMileDistributionPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, "Last-mile distribution coordination — Mangroves Global");
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
          { "@type": "ListItem", position: 3, name: "Last-Mile & Distribution", item: "https://mangrovesglobal.com/logistics/last-mile-distribution" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Last-Mile & Distribution Coordination",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates"],
        ...(ogImageUrl && { image: ogImageUrl }),
        description:
          "Coordination of last-mile delivery and multi-point distribution across the UAE through qualified transport partners.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LastMileDistributionContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
