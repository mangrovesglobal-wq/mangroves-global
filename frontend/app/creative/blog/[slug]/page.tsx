import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetailContent, { type BlogPostFull, type RelatedPost } from "@/components/BlogPostDetailContent";
import { JsonLd } from "@/components/JsonLd";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

type SeoPost = BlogPostFull & {
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_card?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  updated_at?: string | null;
  schema_type?: string | null;
  custom_schema_json?: string | null;
};

async function getPost(slug: string): Promise<SeoPost | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts/creative/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch { return null; }
}

async function getRelatedPosts(currentSlug: string): Promise<RelatedPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts?division=creative`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    const posts: RelatedPost[] = json.data || [];
    return posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found" };

  const title       = post.meta_title       || post.title;
  const description = post.meta_description || post.excerpt || undefined;
  const ogTitle     = post.og_title         || title;
  const ogDesc      = post.og_description   || description;
  const twTitle     = post.twitter_title    || ogTitle;
  const twDesc      = post.twitter_description || ogDesc;
  const twImage     = post.twitter_image    || post.og_image;

  return {
    title,
    description,
    alternates: { canonical: post.canonical_url || `https://mangrovesglobal.com/creative/blog/${post.slug}` },
    robots: (post.robots || "index,follow") as Metadata["robots"],
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: "article",
      ...(post.og_image ? { images: [{ url: post.og_image }] } : {}),
    },
    twitter: {
      card: (post.twitter_card as "summary_large_image" | "summary") || "summary_large_image",
      title: twTitle,
      description: twDesc,
      ...(twImage ? { images: [twImage] } : {}),
    },
  };
}

const ORG = {
  "@type": "Organization",
  "@id": "https://mangrovesglobal.com/#organization",
  name: "Mangroves Global Trading FZ LLC",
  logo: { "@type": "ImageObject", url: "https://mangrovesglobal.com/images/logo/mangroves-global-logo-badge.png" },
};

function buildArticleSchema(post: SeoPost, pageUrl: string): object {
  const type = (post.schema_type && post.schema_type !== "Custom") ? post.schema_type : "BlogPosting";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
          { "@type": "ListItem", position: 3, name: "Creative Insights", item: "https://mangrovesglobal.com/creative/blog" },
          { "@type": "ListItem", position: 4, name: post.title, item: pageUrl },
        ],
      },
      {
        "@type": type,
        "@id": pageUrl,
        headline: post.title,
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        url: pageUrl,
        inLanguage: "en",
        articleSection: "Creative",
        ...(post.excerpt ? { description: post.excerpt } : {}),
        ...(post.tags ? { keywords: post.tags } : {}),
        ...(post.published_at ? { datePublished: post.published_at } : {}),
        ...(post.updated_at ? { dateModified: post.updated_at } : {}),
        author: { "@type": "Organization", "@id": "https://mangrovesglobal.com/#organization", name: "Mangroves Global Trading FZ LLC" },
        publisher: ORG,
        ...(post.featured_image ? { image: { "@type": "ImageObject", url: post.featured_image } } : {}),
      },
    ],
  };
}

export default async function CreativeBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(slug);

  const pageUrl = `https://mangrovesglobal.com/creative/blog/${post.slug}`;
  let schema: object;
  if (post.schema_type === "Custom" && post.custom_schema_json) {
    try { schema = JSON.parse(post.custom_schema_json); }
    catch { schema = buildArticleSchema(post, pageUrl); }
  } else {
    schema = buildArticleSchema(post, pageUrl);
  }

  return (
    <>
      <JsonLd schema={schema} />
      <BlogPostDetailContent post={post} relatedPosts={relatedPosts} apiBase={API_BASE_URL} division="creative" />
    </>
  );
}
