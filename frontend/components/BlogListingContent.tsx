"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, ChevronRight } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

export type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
  tags: string | null;
};

export type DivisionConfig = {
  label: string;
  divHref: string;
  blogHref: string;
  description: string;
  ctaHeading: string;
  filters: { label: string; key: string }[];
};

function readMins(excerpt: string | null): number {
  if (!excerpt) return 5;
  return Math.max(3, Math.min(10, Math.round(excerpt.split(/\s+/).length * 6)));
}

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogListingContent({
  posts: serverPosts,
  apiBase,
  config,
  division,
}: {
  posts: BlogPostSummary[];
  apiBase: string;
  config: DivisionConfig;
  division: "trading" | "logistics" | "creative";
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [clientPosts, setClientPosts] = useState<BlogPostSummary[] | null>(null);

  useEffect(() => {
    if (serverPosts.length === 0) {
      fetch(`${apiBase}/api/blog-posts?division=${division}`)
        .then((r) => r.json())
        .then((d) => setClientPosts(d.data ?? []))
        .catch(() => setClientPosts([]));
    }
  }, [serverPosts.length, apiBase, division]);

  const posts = clientPosts ?? serverPosts;

  const allFiltered = useMemo(() => {
    if (activeFilter === "all") return posts;
    return posts.filter((p) =>
      p.tags?.toLowerCase().includes(activeFilter.toLowerCase()),
    );
  }, [activeFilter, posts]);

  const featured  = activeFilter === "all" ? (posts[0] ?? null) : (allFiltered[0] ?? null);
  const gridPosts = activeFilter === "all" ? posts.slice(1) : allFiltered.slice(1);

  function img(path: string | null) {
    return path ? `${apiBase}/storage/${path}` : null;
  }

  return (
    <div className="bg-white min-h-screen text-mangrove-900">
      <DivisionHeader division={division} />

      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-25 pb-10">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-mangrove-800/40 mb-6">
          <Link href={config.divHref} className="hover:text-mangrove-accent transition-colors">
            {config.label}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-mangrove-900">Blog</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent block mb-2">
              {config.label} Insights
            </span>
            <h1 className="font-serif font-bold text-mangrove-900" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
              Articles &amp; News
            </h1>
          </div>
          <p className="text-sm text-mangrove-800/50 max-w-xs leading-relaxed">
            {config.description}
          </p>
        </div>
      </div>

      {/* ── Featured hero ── */}
      {featured && (
        <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-10">
          <Link
            href={`${config.blogHref}/${featured.slug}`}
            className="group relative flex items-end w-full rounded-3xl overflow-hidden"
            style={{ height: "clamp(300px, 54vh, 520px)" }}
          >
            {img(featured.featured_image) ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={img(featured.featured_image)!}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="absolute inset-0 bg-mangrove-900" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-mangrove-900/95 via-mangrove-900/45 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-mangrove-900/30 to-transparent" />

            <span className="absolute top-6 left-6 text-[9px] uppercase tracking-[0.3em] font-bold text-mangrove-accent border border-mangrove-accent/40 bg-mangrove-accent/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Latest
            </span>

            <div className="relative z-10 p-7 lg:p-12 w-full">
              <h2
                className="font-serif font-bold text-white leading-tight mb-3"
                style={{ fontSize: "clamp(20px, 3vw, 42px)", maxWidth: "70ch" }}
              >
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-2 max-w-2xl hidden sm:block">
                  {featured.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
                {featured.author && <span>{featured.author}</span>}
                {featured.published_at && <span>{fmtDate(featured.published_at)}</span>}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {readMins(featured.excerpt)} min read
                </span>
                <span className="sm:ml-auto flex items-center gap-1.5 text-mangrove-accent font-semibold uppercase tracking-widest group-hover:gap-2.5 transition-all duration-200">
                  Read Article
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── Filter pills ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {config.filters.map((f) => {
            const isActive = activeFilter === f.key;
            const count =
              f.key === "all"
                ? posts.length
                : posts.filter((p) => p.tags?.toLowerCase().includes(f.key)).length;
            if (f.key !== "all" && count === 0) return null;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: isActive ? "#1A2820" : "transparent",
                  color:      isActive ? "#F2C94C"  : "#1A282066",
                  border:     isActive ? "1px solid #1A2820" : "1px solid #E5E0D8",
                  boxShadow:  isActive ? "0 2px 12px rgba(26,40,32,0.18)" : "none",
                }}
              >
                {f.label}
                <span
                  className="text-[9px] rounded-full px-1.5 py-0.5 font-bold"
                  style={{
                    background: isActive ? "#F2C94C22" : "#1A282011",
                    color:      isActive ? "#F2C94C"   : "#1A282055",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Article grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-20">
        {allFiltered.length === 0 ? (
          <div className="rounded-2xl border border-mangrove-100 p-14 text-center text-mangrove-800/40">
            No articles in this category yet — check back soon.
          </div>
        ) : gridPosts.length === 0 ? null : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => (
              <Link
                key={post.slug}
                href={`${config.blogHref}/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-mangrove-100 overflow-hidden hover:border-mangrove-accent/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative h-48 bg-mangrove-50 overflow-hidden shrink-0">
                  {img(post.featured_image) && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={img(post.featured_image)!}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-mangrove-900/0 group-hover:bg-mangrove-900/12 transition-colors duration-300" />
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold text-white bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Clock className="w-2.5 h-2.5" />
                    {readMins(post.excerpt)} min
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-serif font-semibold text-mangrove-900 leading-snug group-hover:text-mangrove-accent transition-colors duration-200 mb-2.5 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-mangrove-800/55 leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-mangrove-100">
                    <span className="text-[11px] text-mangrove-800/35">
                      {fmtDate(post.published_at)}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-mangrove-accent flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
                      Read
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA strip ── */}
      <div style={{ background: "#1A2820" }} className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent mb-2">
              Work with us
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              {config.ctaHeading}
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.03] shrink-0"
            style={{ background: "#F2C94C", color: "#1A2820" }}
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
