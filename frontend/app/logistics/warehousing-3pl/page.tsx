import type { Metadata } from "next";
import WarehousingContent from "@/components/WarehousingContent";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HERO_IMAGE_URL = "https://mangrovesglobal.com/images/warehousing-3pl-storage-uae.jpg";

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
    "We connect customers with suitable warehouse and 3PL capacity through our logistics network — short- and long-term storage, inventory handling, fulfilment and distribution.",
  meta_title: "Warehousing & 3PL Solutions UAE",
  meta_description:
    "Warehouse and 3PL capacity coordination in the UAE — storage, inventory handling, pick & pack and distribution through our logistics network.",
  block_1_heading: "What We Coordinate",
  block_1_content:
    "<ul><li><strong>Short- and long-term storage</strong> — flexible warehousing matched to your holding period.</li><li><strong>Pallet &amp; bulk storage</strong> — coordination for palletized and bulk cargo storage needs.</li><li><strong>Inventory handling</strong> — stock management coordination through our warehouse partners.</li><li><strong>Pick &amp; pack, labelling and repacking</strong> — fulfilment-related handling coordination.</li><li><strong>Distribution &amp; cross-docking</strong> — coordination where cross-docking capacity is available.</li></ul>",
  block_2_heading: "Important Note on Execution",
  block_2_content:
    "<p>Mangroves Global does not claim ownership of warehouse facilities. We connect customers with suitable warehouse and 3PL capacity through our logistics network — access is coordinated according to your cargo, volume and location requirements.</p>",
  block_3_heading: "How It Works",
  block_3_content:
    "<p>Tell us your cargo type, expected volume, holding duration and any fulfilment requirements (pick &amp; pack, labelling, etc.). We identify suitable warehouse and 3PL capacity from our network and coordinate access and terms on your behalf.</p>",
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/logistics/warehousing-3pl`, {
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
    alternates: { canonical: "/logistics/warehousing-3pl" },
    openGraph: {
      title,
      description,
      url: "/logistics/warehousing-3pl",
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
        { "@type": "ListItem", position: 3, name: "Warehousing & 3PL", item: "https://mangrovesglobal.com/logistics/warehousing-3pl" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Warehousing & 3PL Coordination",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: ["United Arab Emirates"],
      image: HERO_IMAGE_URL,
      description:
        "Warehouse and 3PL capacity coordination for storage, inventory handling, fulfilment and distribution, connected through our logistics network.",
    },
  ],
};

export default async function WarehousingPage() {
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
      <WarehousingContent introText={service.short_description || FALLBACK.short_description!} blocks={blocks} />
    </>
  );
}
