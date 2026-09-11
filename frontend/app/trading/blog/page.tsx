import type { Metadata } from "next";
import Link from "next/link";
// Using a plain <img> tag instead of next/image, since it points to the
// Laravel backend's file storage rather than a locally-bundled image.

export const metadata: Metadata = {
  title: "Trading Insights & News",
  description: "Articles on Indian spices, agricultural commodity trading and export to the UAE and GCC.",
};

type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
  division: string;
};

async function getPosts(): Promise<BlogPostSummary[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
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
    <div className="bg-mangrove-900 text-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-16 py-24">
        <nav className="text-xs text-slate-400 mb-8">
          <Link href="/trading" className="hover:text-mangrove-accent">Trading</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-200">Insights</span>
        </nav>

        <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
          Trading Insights
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-12">
          Articles &amp; News
        </h1>

        {posts.length === 0 ? (
          <div className="border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            No articles published yet. Check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/trading/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-800 overflow-hidden hover:border-mangrove-accent/50 transition-colors"
              >
                {post.featured_image && (
                  <div className="relative h-48 bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Laravel-hosted image; next/image optimizer 400s on this host, see backend notes */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"}/storage/${post.featured_image}`}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-serif text-xl text-white mb-2 group-hover:text-mangrove-accent transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{post.excerpt}</p>
                  )}
                  <div className="text-xs text-slate-500">
                    {post.author && <span>{post.author} · </span>}
                    {post.published_at && (
                      <span>{new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
