import type { Metadata } from "next";
import BlogListingContent, {
  type BlogPostSummary,
  type DivisionConfig,
} from "@/components/BlogListingContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-blog", {
    title: "Creative Insights & News",
    description: "Articles on advertising, digital marketing, branding and creative strategy for UAE businesses.",
    alternates: { canonical: "https://mangrovesglobal.com/creative/blog" },
  });
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const CREATIVE_CONFIG: DivisionConfig = {
  label: "Creative",
  divHref: "/creative",
  blogHref: "/creative/blog",
  description: "Strategy, design and digital — ideas for UAE businesses that want to grow.",
  ctaHeading: "Ready to elevate your UAE brand?",
  filters: [
    { label: "All",               key: "all" },
    { label: "Branding",          key: "branding" },
    { label: "Digital Marketing", key: "digital marketing" },
    { label: "Social Media",      key: "social media" },
    { label: "Content",           key: "content production" },
    { label: "Web Design",        key: "website design" },
    { label: "Advertising",       key: "advertising" },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Creative Insights", item: "https://mangrovesglobal.com/creative/blog" },
      ],
    },
    {
      "@type": "Blog",
      "@id": "https://mangrovesglobal.com/creative/blog",
      name: "Creative Insights | Mangroves Global",
      url: "https://mangrovesglobal.com/creative/blog",
      description: "Articles on advertising, digital marketing, branding and creative strategy for UAE businesses.",
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
    const res = await fetch(`${API_BASE_URL}/api/blog-posts?division=creative`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function CreativeBlogPage() {
  const posts = await getPosts();
  return (
    <>
      <JsonLd schema={schema} />
      <BlogListingContent posts={posts} apiBase={API_BASE_URL} config={CREATIVE_CONFIG} division="creative" />
    </>
  );
}
