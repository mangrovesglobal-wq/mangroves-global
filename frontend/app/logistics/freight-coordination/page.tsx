import type { Metadata } from "next";
import FreightCoordinationContent from "@/components/FreightCoordinationContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

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
    "Not sure whether your shipment needs sea or air freight? We help you weigh cost, transit time and cargo type, then coordinate the right mode through our sea and air freight partner networks.",
  meta_title: "Freight Coordination UAE | Sea or Air Freight Guidance",
  meta_description:
    "Not sure whether to ship by sea or air? We help UAE and GCC businesses compare cost, speed and cargo type, then coordinate the right freight mode.",
  block_1_heading: "Sea or Air — How to Decide",
  block_1_content:
    "<p>The right choice usually comes down to three factors: how quickly the cargo needs to arrive, how much it weighs or how much space it takes up, and your budget per shipment. Air freight suits urgent, smaller or higher-value shipments; sea freight suits larger volumes where transit time is more flexible.</p>",
  block_2_heading: "Sea Freight",
  block_2_content:
    '<p>Best for larger volumes, FCL and LCL shipments, and cargo where a longer transit time is acceptable. <a href="/logistics/sea-freight">See Sea Freight coordination →</a></p>',
  block_3_heading: "Air Freight",
  block_3_content:
    '<p>Best for urgent, time-sensitive or smaller high-value shipments where speed matters more than cost per kilogram. <a href="/logistics/air-freight">See Air Freight coordination →</a></p>',
  block_4_heading: "How It Works",
  block_4_content:
    "<p>Tell us your cargo, origin, destination, volume and required timeline. We help you compare sea and air options, then coordinate the shipment through the appropriate partner network — sea or air — through to delivery.</p>",
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/freight-coordination`, {
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
    alternates: { canonical: "/logistics/freight-coordination" },
    ...(ogImageUrl && {
      openGraph: { title, description, url: "/logistics/freight-coordination", images: [{ url: ogImageUrl, alt: title }] },
      twitter: { card: "summary_large_image" as const, title, description, images: [ogImageUrl] },
    }),
  };
  return getSeoMetadata("logistics-freight-coordination", serviceDefaults);
}

export default async function FreightCoordinationPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  const heroImage = resolveServiceHeroImage(service.featured_image, API_BASE_URL, "Freight coordination — Mangroves Global");
  const ogImageUrl = resolveOgImageUrl(service.featured_image, API_BASE_URL);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
          { "@type": "ListItem", position: 3, name: "Freight Coordination", item: "https://mangrovesglobal.com/logistics/freight-coordination" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Freight Coordination",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC", "India"],
        ...(ogImageUrl && { image: ogImageUrl }),
        description:
          "Coordination guidance for choosing between sea and air freight, and coordination through the appropriate partner network for India, the UAE and the GCC.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FreightCoordinationContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
