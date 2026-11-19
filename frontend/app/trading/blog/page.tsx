import type { Metadata } from "next";
import BlogListingContent, {
  type BlogPostSummary,
  type DivisionConfig,
} from "@/components/BlogListingContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("trading-blog", {
    title: "Trading Insights & News",
    description: "Articles on Indian spices, agricultural commodity trading and export to the UAE and GCC.",
    alternates: { canonical: "https://mangrovesglobal.com/trading/blog" },
  });
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const TRADING_CONFIG: DivisionConfig = {
  label: "Trading",
  divHref: "/trading",
  blogHref: "/trading/blog",
  description: "Commodity insights, sourcing intelligence and market updates for UAE and GCC businesses.",
  ctaHeading: "Looking for a reliable commodity partner?",
  filters: [
    { label: "All",          key: "all" },
    { label: "Spices",       key: "spices" },
    { label: "Black Pepper", key: "black pepper" },
    { label: "Cardamom",     key: "cardamom" },
    { label: "Kerala",       key: "kerala" },
    { label: "Sourcing",     key: "sourcing" },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Trading", item: "https://mangrovesglobal.com/trading" },
        { "@type": "ListItem", position: 3, name: "Trading Insights", item: "https://mangrovesglobal.com/trading/blog" },
      ],
    },
    {
      "@type": "Blog",
      "@id": "https://mangrovesglobal.com/trading/blog",
      name: "Trading Insights | Mangroves Global",
      url: "https://mangrovesglobal.com/trading/blog",
      description: "Articles on Indian spices, agricultural commodity trading and export to the UAE and GCC.",
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
    const res = await fetch(`${API_BASE_URL}/api/blog-posts?division=trading`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function TradingBlogPage() {
  const posts = await getPosts();
  return (
    <>
      <JsonLd schema={schema} />
      <BlogListingContent posts={posts} apiBase={API_BASE_URL} config={TRADING_CONFIG} division="trading" />
    </>
  );
}
