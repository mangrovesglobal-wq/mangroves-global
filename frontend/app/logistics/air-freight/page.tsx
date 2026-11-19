import type { Metadata } from "next";
import AirFreightContent from "@/components/AirFreightContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_PATH = "/images/air-freight-cargo-plane-port.jpg";
const HERO_IMAGE_URL = `https://mangrovesglobal.com${HERO_IMAGE_PATH}`;
const HERO_IMAGE_ALT =
  "Cargo aircraft climbing out over a container port, representing Mangroves Global's time-sensitive air freight coordination between India and the UAE.";

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

// Fallback copy, used if the CMS record is unavailable so this page never breaks for visitors.
const FALLBACK: ServiceDetail = {
  featured_image: null,
  icon: null,
  short_description:
    "We coordinate air freight movements for urgent cargo, samples, small commercial shipments and high-value or time-sensitive goods, between India, the UAE and the wider GCC.",
  meta_title: "Air Freight UAE | India–UAE Cargo Coordination",
  meta_description:
    "Time-sensitive air freight coordination between India, the UAE and the GCC — urgent cargo, samples and high-value shipments. Request an air freight quote.",
  block_1_heading: "What We Coordinate",
  block_1_content:
    "<ul><li><strong>Urgent &amp; time-sensitive cargo</strong> — coordination prioritising speed for deadline-driven shipments.</li><li><strong>Samples &amp; small commercial shipments</strong> — suited to buyers and traders moving smaller volumes quickly.</li><li><strong>High-value cargo</strong> — coordination with appropriate handling and documentation for higher-value goods.</li><li><strong>Export/import coordination</strong> — origin airport to UAE customs coordination through to delivery.</li></ul>",
  block_2_heading: "How It Works",
  block_2_content:
    "<p>Origin → Airport → Air Freight → UAE Customs Coordination → Delivery. Tell us your cargo, origin, destination and required timeline, and we identify the fastest suitable routing through our air freight partner network, coordinating quotations and keeping you updated through to delivery.</p>",
  block_3_heading: "Important Note on Execution",
  block_3_content:
    "<p>Mangroves Global coordinates air freight movements through established logistics providers. Where a regulated service requires a specific licence or authorization, execution is arranged through appropriately licensed service providers.</p>",
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/air-freight`, {
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

  const serviceDefaults: Metadata = {
    title,
    description,
    alternates: { canonical: "/logistics/air-freight" },
    openGraph: {
      title,
      description,
      url: "/logistics/air-freight",
      images: [{ url: ogImageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
  return getSeoMetadata("logistics-air-freight", serviceDefaults);
}

export default async function AirFreightPage() {
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
          { "@type": "ListItem", position: 3, name: "Air Freight", item: "https://mangrovesglobal.com/logistics/air-freight" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Air Freight Coordination",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC", "India"],
        image: ogImageUrl,
        description:
          "Time-sensitive air freight coordination for urgent cargo, samples and high-value shipments between India, the UAE and the GCC.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AirFreightContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
        icon={service.icon}
      />
    </>
  );
}
