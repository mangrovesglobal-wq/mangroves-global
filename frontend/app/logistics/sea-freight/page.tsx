import type { Metadata } from "next";
import SeaFreightContent from "@/components/SeaFreightContent";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

type ServiceDetail = {
  name: string;
  short_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
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
  name: "Sea Freight",
  short_description:
    "We coordinate FCL and LCL sea freight movements between India and the UAE, and onward across the GCC, through established ocean freight providers — covering port-to-port, door-to-port, port-to-door and full door-to-door shipments.",
  meta_title: "Sea Freight UAE | FCL & LCL Coordination",
  meta_description:
    "FCL and LCL sea freight coordination between India, the UAE and the GCC — port-to-port through door-to-door. Request a sea freight quote.",
  block_1_heading: "What We Coordinate",
  block_1_content:
    "<ul><li><strong>FCL (Full Container Load)</strong> — 20ft, 40ft and 40HC container coordination for larger volume shipments.</li><li><strong>LCL (Less than Container Load)</strong> — consolidated shipments for smaller volumes, sharing container space with other cargo.</li><li><strong>Port-to-port, door-to-port, port-to-door and door-to-door</strong> — coordination matched to your operational setup at both ends.</li><li><strong>Import, export and re-export</strong> — coordination for all three movement types between India, the UAE and the GCC.</li></ul>",
  block_2_heading: "Cargo We Regularly Coordinate",
  block_2_content:
    "<p>Sea freight coordination covers general cargo, food products and spices, agricultural commodities, machinery, furniture, garments and commercial goods. Dangerous goods (DG) capability is not assumed — this is confirmed on a per-shipment basis with the relevant licensed partner.</p>",
  block_3_heading: "How It Works",
  block_3_content:
    "<p>Tell us your origin, destination, cargo type, volume and required shipping date. We identify suitable carriers and routing, coordinate quotations, and present a clear plan before anything moves — execution is then coordinated through to delivery with status updates along the way.</p>",
  block_4_heading: "Important Note on Execution",
  block_4_content:
    "<p>Mangroves Global coordinates sea freight movements through established logistics providers. Where a regulated service requires a specific licence or authorization, execution is arranged through appropriately licensed service providers.</p>",
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/sea-freight`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK;
    const json = await res.json();
    return json.data || FALLBACK;
  } catch {
    return FALLBACK;
  }
}

const HERO_IMAGE_PATH = "/images/sea-freight-container-port-network.jpg";
const HERO_IMAGE_URL = `https://mangrovesglobal.com${HERO_IMAGE_PATH}`;
const HERO_IMAGE_ALT =
  "Container ship being loaded by gantry cranes at a port terminal at night, representing Mangroves Global's coordinated sea freight network between India and the UAE.";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getService();
  const title = service.meta_title || FALLBACK.meta_title!;
  const description = service.meta_description || FALLBACK.meta_description!;

  return {
    title,
    description,
    alternates: {
      canonical: "/logistics/sea-freight",
    },
    openGraph: {
      title,
      description,
      url: "/logistics/sea-freight",
      images: [{ url: HERO_IMAGE_URL, width: 2400, height: 1371, alt: HERO_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [HERO_IMAGE_URL],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
        { "@type": "ListItem", position: 3, name: "Sea Freight", item: "https://mangrovesglobal.com/logistics/sea-freight" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Sea Freight Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC", "India"],
      image: HERO_IMAGE_URL,
      description:
        "FCL and LCL sea freight coordination between India, the UAE and the GCC, coordinated through established ocean freight providers.",
    },
  ],
};

export default async function SeaFreightPage() {
  const service = await getService();

  const blocks = [1, 2, 3, 4]
    .map((i) => ({
      heading: service[`block_${i}_heading` as keyof ServiceDetail] as string | null,
      content: service[`block_${i}_content` as keyof ServiceDetail] as string | null,
    }))
    .filter((b): b is { heading: string; content: string } => !!b.heading && !!b.content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeaFreightContent
        introText={service.short_description || FALLBACK.short_description!}
        blocks={blocks}
        heroImage={{ src: HERO_IMAGE_PATH, alt: HERO_IMAGE_ALT }}
      />
    </>
  );
}
