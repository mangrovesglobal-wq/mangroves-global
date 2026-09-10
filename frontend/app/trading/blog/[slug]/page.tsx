import type { Metadata } from "next";
import Link from "next/link";
// Using a plain <img> tag instead of next/image, since it points to the
// Laravel backend's file storage rather than a locally-bundled image.
import { notFound } from "next/navigation";

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  video_url: string | null;
  author: string | null;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  division: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts/trading/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
  };
}

export default async function TradingBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const embedUrl = post.video_url ? getYouTubeEmbedUrl(post.video_url) : null;

  return (
    <div className="bg-mangrove-900 text-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-16 py-24">
        <nav className="text-xs text-slate-400 mb-8">
          <Link href="/trading" className="hover:text-mangrove-accent">Trading</Link>
          <span className="mx-2">/</span>
          <Link href="/trading/blog" className="hover:text-mangrove-accent">Insights</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-200">{post.title}</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>
        <div className="text-xs text-slate-500 mb-10">
          {post.author && <span>{post.author} · </span>}
          {post.published_at && (
            <span>{new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          )}
        </div>

        {post.featured_image && (
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 border border-slate-800">
            <img
              src={`${API_BASE_URL}/storage/${post.featured_image}`}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {embedUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-slate-800">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={post.title}
            />
          </div>
        )}

        <article className="prose-mgt text-slate-300 whitespace-pre-line leading-relaxed">
          {post.content}
        </article>

        <div className="mt-16 pt-8 border-t border-slate-800">
          <Link href="/trading/blog" className="text-xs uppercase tracking-widest text-mangrove-accent hover:text-white transition-colors">
            ← Back to Trading Insights
          </Link>
        </div>
      </div>
    </div>
  );
}
