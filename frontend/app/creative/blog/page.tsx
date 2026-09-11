import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creative Insights & News",
  description: "Articles on advertising, digital marketing, branding and creative strategy for UAE businesses.",
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
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

  return (
    <div className="bg-white text-mangrove-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-16 py-24">
        <nav className="text-xs text-mangrove-800/50 mb-8">
          <Link href="/creative" className="hover:text-mangrove-accent">Creative</Link>
          <span className="mx-2">/</span>
          <span className="text-mangrove-900">Insights</span>
        </nav>

        <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
          Creative Insights
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mangrove-900 mb-12">
          Articles &amp; News
        </h1>

        {posts.length === 0 ? (
          <div className="border border-mangrove-100 rounded-2xl p-12 text-center text-mangrove-800/50">
            No articles published yet. Check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/creative/blog/${post.slug}`}
                className="group rounded-2xl border border-mangrove-100 overflow-hidden hover:border-mangrove-accent transition-colors"
              >
                {post.featured_image && (
                  <div className="relative h-48 bg-mangrove-50">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Laravel-hosted image; next/image optimizer 400s on this host, see backend notes */}
                    <img
                      src={`${API_BASE_URL}/storage/${post.featured_image}`}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-serif text-xl text-mangrove-900 mb-2 group-hover:text-mangrove-accent transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-mangrove-800/60 leading-relaxed mb-3">{post.excerpt}</p>
                  )}
                  <div className="text-xs text-mangrove-800/40">
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
