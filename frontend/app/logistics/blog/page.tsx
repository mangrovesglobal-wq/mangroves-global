import type { Metadata } from "next";
import BlogListingContent, {
  type BlogPostSummary,
  type DivisionConfig,
} from "@/components/BlogListingContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("logistics-blog", {
    title: "Logistics Insights & News",
    description: "Articles on freight, customs, warehousing and supply chain coordination across India, the UAE and the GCC.",
    alternates: { canonical: "https://mangrovesglobal.com/logistics/blog" },
  });
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const LOGISTICS_CONFIG: DivisionConfig = {
  label: "Logistics",
  divHref: "/logistics",
  blogHref: "/logistics/blog",
  description: "Freight, customs and supply chain insights for businesses importing and exporting through the UAE.",
  ctaHeading: "Need help with your UAE freight and logistics?",
  filters: [
    { label: "All",        key: "all" },
    { label: "Sea Freight", key: "sea freight" },
    { label: "Customs",    key: "customs" },
    { label: "Cargo",      key: "cargo" },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Logistics", item: "https://mangrovesglobal.com/logistics" },
        { "@type": "ListItem", position: 3, name: "Logistics Insights", item: "https://mangrovesglobal.com/logistics/blog" },
      ],
    },
    {
      "@type": "Blog",
      "@id": "https://mangrovesglobal.com/logistics/blog",
      name: "Logistics Insights | Mangroves Global",
      url: "https://mangrovesglobal.com/logistics/blog",
      description: "Articles on freight, customs, warehousing and supply chain coordination across India, the UAE and the GCC.",
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        "@id": "https://mangrovesglobal.com/#organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
      },
    },
  ],
};

async function getPosts(): Promise<BlogPostSummary[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts?division=logistics`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function LogisticsBlogPage() {
  const posts = await getPosts();
  return (
    <>
      <JsonLd schema={schema} />
      <BlogListingContent posts={posts} apiBase={API_BASE_URL} config={LOGISTICS_CONFIG} division="logistics" />
    </>
  );
}
