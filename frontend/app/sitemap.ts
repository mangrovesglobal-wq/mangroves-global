import type { MetadataRoute } from "next";

const BASE = "https://mangrovesglobal.com";
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

type BlogPost = { slug: string; updated_at?: string | null };

async function getBlogSlugs(division: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API}/api/blog-posts?division=${division}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []) as BlogPost[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static routes with priorities ────────────────────────────────────────
  const routes: MetadataRoute.Sitemap = [
    // Core
    { url: BASE,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/become-a-partner`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Trading division
    { url: `${BASE}/trading`,                              lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/trading/about`,                        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/trading/contact`,                      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/trading/commodities`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/trading/sourcing-supply`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/quality-assurance`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/become-a-partner`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/blog`,                         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    // Trading products
    { url: `${BASE}/trading/products/green-cardamom`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/products/black-pepper`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/products/cloves`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/products/nutmeg-mace`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/products/dry-ginger`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trading/products/coffee-beans`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Logistics division
    { url: `${BASE}/logistics`,                            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/logistics/about`,                      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/logistics/import-export`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/sea-freight`,                lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/air-freight`,                lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/road-transport`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/customs-clearance`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/warehousing-3pl`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/supply-chain-consulting`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/freight-coordination`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/last-mile-distribution`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/logistics/blog`,                       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },

    // Creative division
    { url: `${BASE}/creative`,                             lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/creative/about`,                       lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creative/services`,                    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/creative/work`,                        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/creative/advertising`,                 lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/creative/branding`,                    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/creative/content-production`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/creative/digital-marketing`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/creative/web-development`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/creative/contact`,                     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creative/blog`,                        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    // Portfolio case studies
    { url: `${BASE}/creative/work/strandbio`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creative/work/helthee`,                lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creative/work/ettara`,                 lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creative/work/holiday-basket`,         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creative/work/zaincart`,               lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // ── Dynamic blog posts ────────────────────────────────────────────────────
  const [tradingPosts, logisticsPosts, creativePosts] = await Promise.all([
    getBlogSlugs("trading"),
    getBlogSlugs("logistics"),
    getBlogSlugs("creative"),
  ]);

  const blogEntries: MetadataRoute.Sitemap = [
    ...tradingPosts.map((p) => ({
      url: `${BASE}/trading/blog/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...logisticsPosts.map((p) => ({
      url: `${BASE}/logistics/blog/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...creativePosts.map((p) => ({
      url: `${BASE}/creative/blog/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return [...routes, ...blogEntries];
}
