import type { Metadata } from "next";
import WebDigitalContent from "@/components/WebDigitalContent";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

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
    "Corporate websites, landing pages and conversion-focused digital experiences — built to look professional and actually generate enquiries, not just exist.",
  meta_title: "Web Development UAE | Corporate Websites",
  meta_description:
    "Corporate websites, landing pages, UI/UX and CMS development for UAE businesses. Conversion-focused, SEO-structured, mobile-first builds.",
  block_1_heading: "What We Offer",
  block_1_content:
    "<ul><li><strong>Corporate websites</strong> — full business websites built around clear information architecture and SEO.</li><li><strong>Landing pages</strong> — focused pages built for a specific campaign or offer.</li><li><strong>UI/UX</strong> — interface and experience design that keeps visitors moving toward a conversion.</li><li><strong>Frontend development</strong> — modern, fast, mobile-responsive builds.</li><li><strong>CMS development</strong> — content management systems so you can update your own site without a developer.</li><li><strong>Conversion-focused websites</strong> — built with a clear goal (leads, enquiries, bookings) in mind from the start.</li></ul>",
  block_2_heading: "Who This Is For",
  block_2_content:
    "<p>Businesses that need a website that actually performs — fast, mobile-friendly, SEO-structured, and built around getting visitors to take action, not just look good.</p>",
  block_3_heading: null,
  block_3_content: null,
  block_4_heading: null,
  block_4_content: null,
};

async function getService(): Promise<ServiceDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/creative/web-development`, {
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
    alternates: { canonical: "/creative/web-development" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Web & Digital Experiences", item: "https://mangrovesglobal.com/creative/web-development" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Web Development",
      provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
      areaServed: "United Arab Emirates",
      description: "Corporate websites, landing pages, UI/UX, frontend and CMS development for UAE businesses.",
    },
  ],
};

export default async function WebDigitalPage() {
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
      <WebDigitalContent introText={service.short_description || FALLBACK.short_description!} blocks={blocks} />
    </>
  );
}
