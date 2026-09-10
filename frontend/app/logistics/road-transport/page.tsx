import type { Metadata } from "next";
import RoadTransportContent from "@/components/RoadTransportContent";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/road-transport-trucks-uae-gcc.jpg";

type ServiceDetail = {
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

const FALLBACK: ServiceDetail = {
  short_description:
    "We coordinate road transportation across the UAE and into the wider GCC through qualified transport providers, matched to cargo, vehicle and route requirements.",
  meta_title: "Road Transport UAE | GCC Road Logistics",
  meta_description:
    "Road transportation coordination across the UAE and into the GCC through qualified transport partners — container, FTL and inter-emirate delivery. Request a quote.",
  block_1_heading: "What We Coordinate",
  block_1_content:
    "<ul><li><strong>Container transportation</strong> — port pickup and delivery coordination for FCL containers.</li><li><strong>FTL (Full Truck Load)</strong> — dedicated vehicle coordination for larger shipments.</li><li><strong>Local UAE transportation</strong> — inter-emirate movement between Dubai, Sharjah, Ajman, Ras Al Khaimah and Abu Dhabi.</li><li><strong>GCC road transportation</strong> — coordination for UAE-to-GCC movement, subject to route and regulatory requirements.</li></ul>",
  block_2_heading: "Important Note on Execution",
  block_2_content:
    "<p>Transportation is arranged through qualified transport providers according to cargo, vehicle and route requirements. Mangroves Global does not claim ownership of a transport fleet — road transportation execution is coordinated through our qualified transport network.</p>",
  block_3_heading: "How It Works",
  block_3_content:
    "<p>Tell us your cargo, origin, destination and required delivery date. We match your shipment to a suitable transport provider and vehicle type, coordinate the plan, and keep you updated through to delivery.</p>",
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/road-transport`, {
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

  return {
    title,
    description,
    alternates: { canonical: "/logistics/road-transport" },
    openGraph: {
      title,
      description,
      url: "/logistics/road-transport",
      images: [{ url: HERO_IMAGE_URL, width: 2400, height: 1350, alt: title }],
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
        { "@type": "ListItem", position: 3, name: "Road Transport", item: "https://mangrovesglobal.com/logistics/road-transport" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Road Transportation Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates", "GCC"],
      image: HERO_IMAGE_URL,
      description:
        "Road transportation coordination across the UAE and into the GCC through qualified transport providers.",
    },
  ],
};

export default async function RoadTransportPage() {
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
      <RoadTransportContent introText={service.short_description || FALLBACK.short_description!} blocks={blocks} />
    </>
  );
}
