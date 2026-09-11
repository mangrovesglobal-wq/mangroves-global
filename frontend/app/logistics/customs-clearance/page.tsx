import type { Metadata } from "next";
import CustomsCoordinationContent from "@/components/CustomsCoordinationContent";
import { resolveServiceHeroImage, resolveOgImageUrl } from "@/lib/resolveServiceHeroImage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_PATH = "/images/customs-clearance-cargo-ship-uae.jpg";
const HERO_IMAGE_URL = `https://mangrovesglobal.com${HERO_IMAGE_PATH}`;
const HERO_IMAGE_ALT =
  "Aerial view of a container ship at sea, representing cargo moving through customs clearance coordination for UAE and GCC ports.";

type ServiceDetail = {
  short_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
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
  short_description:
    "We help coordinate the documentation and communication side of customs clearance for shipments moving through UAE and GCC ports, working alongside appropriately licensed customs brokers.",
  meta_title: "Customs Clearance Coordination UAE",
  meta_description:
    "Customs documentation and clearance coordination for UAE and GCC shipments, working alongside appropriately licensed customs brokers.",
  block_1_heading: "What We Coordinate",
  block_1_content:
    "<ul><li><strong>Documentation coordination</strong> — organising shipment paperwork ahead of clearance.</li><li><strong>Customs broker communication</strong> — acting as your point of contact with the licensed broker handling clearance.</li><li><strong>Import/export documentation</strong> — coordinating the paperwork required for both directions of trade.</li><li><strong>Duty/VAT information coordination</strong> — helping you understand applicable charges ahead of shipment.</li><li><strong>Inspection coordination &amp; clearance status updates</strong> — keeping you informed as your shipment moves through the process.</li></ul>",
  block_2_heading: "Important Note on Execution",
  block_2_content:
    "<p>Customs clearance is performed by appropriately licensed customs brokers where required. Mangroves Global coordinates customs clearance through licensed customs partners — we do not directly clear customs ourselves.</p>",
  block_3_heading: "How It Works",
  block_3_content:
    "<p>As part of your broader shipment coordination, we manage documentation and communication with the customs broker on your behalf, so you have one point of contact rather than needing to manage the broker relationship directly.</p>",
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/customs-clearance`, {
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
    alternates: { canonical: "/logistics/customs-clearance" },
    openGraph: {
      title,
      description,
      url: "/logistics/customs-clearance",
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

export default async function CustomsCoordinationPage() {
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
          { "@type": "ListItem", position: 3, name: "Customs Coordination", item: "https://mangrovesglobal.com/logistics/customs-clearance" },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Customs Clearance Coordination",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC"],
        image: ogImageUrl,
        description:
          "Customs documentation and broker communication coordination for UAE and GCC shipments, performed alongside appropriately licensed customs brokers.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CustomsCoordinationContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={heroImage}
      />
    </>
  );
}
