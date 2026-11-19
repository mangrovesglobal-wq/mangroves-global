"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, Copy, Check, MessageCircle } from "lucide-react";
import DivisionHeader from "@/components/DivisionHeader";
import SiteFooter from "@/components/SiteFooter";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export type BlogPostFull = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  video_url: string | null;
  author: string | null;
  published_at: string | null;
  tags: string | null;
  division: string;
};

export type RelatedPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
};

type TocItem = { id: string; text: string };

function extractToc(html: string): TocItem[] {
  const matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  return matches.map((m, i) => ({
    id: `h2-${i}`,
    text: m[1].replace(/<[^>]+>/g, "").trim(),
  }));
}

function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, () => `<h2$1 id="h2-${i++}">`);
}

function readingMins(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function getYouTubeEmbedUrl(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

const DIVISION_META: Record<string, { label: string; listHref: string; backLabel: string; divHref: string }> = {
  trading:   { label: "Trading",   listHref: "/trading/blog",   backLabel: "Trading Insights",   divHref: "/trading"   },
  logistics: { label: "Logistics", listHref: "/logistics/blog", backLabel: "Logistics Insights", divHref: "/logistics" },
  creative:  { label: "Creative",  listHref: "/creative/blog",  backLabel: "Creative Insights",  divHref: "/creative"  },
};

export default function BlogPostDetailContent({
  post,
  relatedPosts,
  apiBase,
  division,
}: {
  post: BlogPostFull;
  relatedPosts: RelatedPost[];
  apiBase: string;
  division: "trading" | "logistics" | "creative";
}) {
  const [scrollPct, setScrollPct]   = useState(0);
  const [activeId, setActiveId]     = useState("");
  const [copied, setCopied]         = useState(false);
  const [showTop, setShowTop]       = useState(false);
  const [tocOpen, setTocOpen]       = useState(false);

  const toc            = useMemo(() => extractToc(post.content), [post.content]);
  const contentWithIds = useMemo(() => injectHeadingIds(post.content), [post.content]);
  const mins           = useMemo(() => readingMins(post.content), [post.content]);
  const tags           = useMemo(
    () => (post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : []),
    [post.tags],
  );
  const embedUrl = post.video_url ? getYouTubeEmbedUrl(post.video_url) : null;
  const imgSrc   = post.featured_image ? `${apiBase}/storage/${post.featured_image}` : null;
  const meta     = DIVISION_META[post.division] ?? DIVISION_META.trading;

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  // ── Scroll events ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollPct(pct);
      setShowTop(doc.scrollTop > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active TOC section via IntersectionObserver ────────────────────────────
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -72% 0px" },
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  // ── Share actions ──────────────────────────────────────────────────────────
  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }
  function whatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(post.title + "\n" + window.location.href)}`, "_blank");
  }
  function linkedin() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white text-mangrove-900 min-h-screen">
      <DivisionHeader division={division} />

      {/* ── Gold reading-progress bar ── */}
      <div
        aria-hidden
        className="fixed top-0 left-0 z-50 h-0.75"
        style={{
          width: `${scrollPct}%`,
          background: "#F2C94C",
          transition: "width 80ms linear",
          boxShadow: "0 0 8px #F2C94C88",
        }}
      />

      {/* ── Cinematic hero ── */}
      <div
        className="relative w-full overflow-x-clip"
        style={{ height: "clamp(340px, 62vh, 580px)" }}
      >
        {imgSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imgSrc}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scale(1.04)" }}
          />
        ) : (
          <div className="absolute inset-0 bg-mangrove-900" />
        )}

        {/* gradient scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-mangrove-900/95 via-mangrove-900/50 to-black/20" />
        {/* side fade for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-mangrove-900/40 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-16 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] text-white/40 mb-4 uppercase tracking-widest">
            <Link href={meta.divHref} className="hover:text-mangrove-accent transition-colors">{meta.label}</Link>
            <span>/</span>
            <Link href={meta.listHref} className="hover:text-mangrove-accent transition-colors">Insights</Link>
          </nav>

          <h1
            className="font-serif font-bold text-white leading-tight mb-5"
            style={{ fontSize: "clamp(22px, 3.2vw, 46px)", maxWidth: "72ch", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
          >
            {post.title}
          </h1>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-3">
            {post.author && (
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/80">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                  style={{ background: "#F2C94C", color: "#1A2820" }}
                >
                  {post.author.charAt(0).toUpperCase()}
                </span>
                {post.author}
              </span>
            )}
            {publishDate && (
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/70">
                {publishDate}
              </span>
            )}
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/70 flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              {mins} min read
            </span>
          </div>
        </div>
      </div>

      {/* ── 3-column body ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[220px_1fr_200px] gap-10 xl:gap-14">

          {/* LEFT — Table of Contents */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-8">
                <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-mangrove-800/35 mb-5">
                  In this article
                </p>
                <nav className="space-y-0.5">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="group w-full flex items-start gap-3 py-2 text-left rounded-lg px-2 hover:bg-mangrove-50 transition-colors duration-150"
                      >
                        <span
                          className="mt-1.75 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                          style={{
                            background: isActive ? "#F2C94C" : "#D4D4D4",
                            transform: isActive ? "scale(1.4)" : "scale(1)",
                            boxShadow: isActive ? "0 0 6px #F2C94C99" : "none",
                          }}
                        />
                        <span
                          className="text-[12.5px] leading-snug transition-colors duration-200"
                          style={{
                            color: isActive ? "#1A2820" : "#1A282066",
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                {/* Divider + back link */}
                <div className="mt-8 pt-6 border-t border-mangrove-100">
                  <Link
                    href={meta.listHref}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-mangrove-800/40 hover:text-mangrove-accent transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    {meta.backLabel}
                  </Link>
                </div>
              </div>
            </aside>
          )}

          {/* CENTER — Article */}
          <article className={`min-w-0 ${toc.length === 0 ? "lg:col-span-2" : ""}`}>

            {/* Mobile TOC accordion */}
            {toc.length > 0 && (
              <div className="lg:hidden mb-8 rounded-2xl border border-mangrove-100 overflow-hidden">
                <button
                  onClick={() => setTocOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-mangrove-50 text-sm font-semibold"
                >
                  <span>In this article</span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="transition-transform duration-200"
                    style={{ transform: tocOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {tocOpen && (
                  <div className="px-5 pb-4 pt-2 space-y-1 bg-white">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { scrollTo(item.id); setTocOpen(false); }}
                        className="block w-full text-left text-sm py-1.5 text-mangrove-800/60 hover:text-mangrove-accent transition-colors"
                      >
                        {item.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Excerpt lead */}
            {post.excerpt && (
              <p
                className="text-lg text-mangrove-800/70 leading-relaxed mb-8 pb-8 border-b border-mangrove-100 font-light"
                style={{ fontStyle: "italic" }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Video embed */}
            {embedUrl && (
              <div className="relative rounded-2xl overflow-hidden mb-10 border border-mangrove-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post.title}
                />
              </div>
            )}

            {/* Article HTML */}
            <div
              className="prose-mgt-light"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-mangrove-100 flex flex-wrap gap-2">
                <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-mangrove-800/35 self-center mr-1">Topics</span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-mangrove-200 text-mangrove-800/55 hover:border-mangrove-accent hover:text-mangrove-900 transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile share + CTA */}
            <div className="lg:hidden mt-10 space-y-6">
              {/* Share row */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full border border-mangrove-200 hover:border-mangrove-accent transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <button
                  onClick={whatsapp}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full border border-mangrove-200 hover:border-mangrove-accent transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
                <button
                  onClick={linkedin}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full border border-mangrove-200 hover:border-mangrove-accent transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  LinkedIn
                </button>
              </div>
              {/* CTA */}
              <div className="rounded-2xl bg-mangrove-900 p-6 text-white">
                <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent mb-2">Get in touch</p>
                <p className="font-serif text-lg font-semibold leading-snug mb-3">Ready to work with us?</p>
                <p className="text-xs text-white/55 mb-5 leading-relaxed">Talk to our team about how Mangroves Global can support your business.</p>
                <Link
                  href="/contact"
                  className="block text-center text-xs uppercase tracking-widest font-semibold py-3 rounded-xl transition-colors"
                  style={{ background: "#F2C94C", color: "#1A2820" }}
                >
                  Contact Us →
                </Link>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-14 pt-8 border-t border-mangrove-100">
              <Link
                href={meta.listHref}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-mangrove-accent hover:text-mangrove-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {meta.backLabel}
              </Link>
            </div>
          </article>

          {/* RIGHT — Share + CTA (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-8">

              {/* Share panel */}
              <div className="rounded-2xl border border-mangrove-100 p-5">
                <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-mangrove-800/35 mb-4">Share this</p>
                <div className="space-y-1">
                  <button
                    onClick={copyLink}
                    className="group w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-mangrove-50 transition-colors text-left"
                  >
                    {copied
                      ? <Check className="w-4 h-4 text-green-500 shrink-0" />
                      : <Copy className="w-4 h-4 text-mangrove-800/40 group-hover:text-mangrove-accent transition-colors shrink-0" />}
                    <span className="text-[12px] text-mangrove-800/60 group-hover:text-mangrove-900 transition-colors">
                      {copied ? "Link copied!" : "Copy link"}
                    </span>
                  </button>
                  <button
                    onClick={whatsapp}
                    className="group w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-mangrove-50 transition-colors text-left"
                  >
                    <MessageCircle className="w-4 h-4 text-mangrove-800/40 group-hover:text-green-500 transition-colors shrink-0" />
                    <span className="text-[12px] text-mangrove-800/60 group-hover:text-mangrove-900 transition-colors">Share on WhatsApp</span>
                  </button>
                  <button
                    onClick={linkedin}
                    className="group w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-mangrove-50 transition-colors text-left"
                  >
                    <LinkedinIcon className="w-4 h-4 text-mangrove-800/40 group-hover:text-blue-600 transition-colors shrink-0" />
                    <span className="text-[12px] text-mangrove-800/60 group-hover:text-mangrove-900 transition-colors">Share on LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-2xl bg-mangrove-900 p-6 text-white">
                <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-mangrove-accent mb-3">Get in touch</p>
                <p className="font-serif text-lg font-bold leading-tight mb-3">Ready to work with us?</p>
                <p className="text-[12px] text-white/55 mb-5 leading-relaxed">
                  Talk to our team about how Mangroves Global can support your business.
                </p>
                <Link
                  href="/contact"
                  className="block text-center text-[11px] uppercase tracking-widest font-bold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: "#F2C94C", color: "#1A2820" }}
                >
                  Contact Us →
                </Link>
              </div>

              {/* Reading progress ring */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-14 h-14">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56" aria-hidden>
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#F0EDE8" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r="22"
                      fill="none"
                      stroke="#F2C94C"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 22}`}
                      strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollPct / 100)}`}
                      style={{ transition: "stroke-dashoffset 120ms linear" }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-mangrove-900">
                    {Math.round(scrollPct)}%
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-mangrove-800/35">Progress</span>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* ── Related posts grid ── */}
      {relatedPosts.length > 0 && (
        <section className="py-16 mt-4" style={{ background: "#F7F5F0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-mangrove-800/40 mb-2">More from {meta.label}</p>
            <h2 className="font-serif text-2xl font-bold text-mangrove-900 mb-10">Related Insights</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${post.division}/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-mangrove-100 hover:border-mangrove-accent/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-mangrove-100">
                    {rp.featured_image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`${apiBase}/storage/${rp.featured_image}`}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    {/* Hover tint */}
                    <div className="absolute inset-0 bg-mangrove-900/0 group-hover:bg-mangrove-900/10 transition-colors duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-mangrove-900 leading-snug group-hover:text-mangrove-accent transition-colors mb-2 line-clamp-2">
                      {rp.title}
                    </h3>
                    {rp.excerpt && (
                      <p className="text-xs text-mangrove-800/55 line-clamp-2 leading-relaxed">{rp.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      {rp.published_at && (
                        <p className="text-[11px] text-mangrove-800/35">
                          {new Date(rp.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-mangrove-accent group-hover:gap-2 flex items-center gap-1 transition-all">
                        Read
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className="group-hover:translate-x-0.5 transition-transform">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />

      {/* ── Back to top FAB ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          background: "#1A2820",
          color: "#fff",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
