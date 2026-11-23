/**
 * Fetches SEO metadata from the backend for a given page key and returns
 * a Next.js Metadata object.  Falls back to `defaults` if the API is
 * unavailable or returns no data.
 *
 * Usage:
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return getSeoMetadata('trading', { title: 'Fallback…', description: '…' });
 *   }
 */
import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

interface PageSeoApiResponse {
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  og_type?: string | null;
  twitter_card?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  schema_type?: string | null;
  custom_schema_json?: string | null;
}

export async function getSeoMetadata(
  pageKey: string,
  defaults: Metadata = {}
): Promise<Metadata> {
  try {
    const res = await fetch(`${API_BASE}/api/seo/${pageKey}`, {
      next: { revalidate: 3600 }, // re-validate every hour
    });
    if (!res.ok) return defaults;

    const seo: PageSeoApiResponse | null = await res.json();
    if (!seo) return defaults;

    const meta: Metadata = { ...defaults };

    if (seo.meta_title) meta.title = seo.meta_title;
    if (seo.meta_description) meta.description = seo.meta_description;
    if (seo.canonical_url) meta.alternates = { canonical: seo.canonical_url };
    if (seo.robots) meta.robots = seo.robots as Metadata["robots"];

    // Open Graph — build only when at least a title or description is present
    const ogTitle = seo.og_title || seo.meta_title;
    const ogDesc  = seo.og_description || seo.meta_description;

    if (ogTitle || ogDesc || seo.og_image) {
      meta.openGraph = {
        ...(defaults.openGraph as object | undefined),
        ...(ogTitle       ? { title: ogTitle }             : {}),
        ...(ogDesc        ? { description: ogDesc }        : {}),
        ...(seo.og_type   ? { type: seo.og_type as "website" | "article" } : {}),
        ...(seo.og_image  ? { images: [{ url: seo.og_image }] } : {}),
      };
    }

    // Twitter Card
    const twTitle = seo.twitter_title || ogTitle;
    const twDesc  = seo.twitter_description || ogDesc;
    const twImage = seo.twitter_image || seo.og_image;

    if (twTitle || twDesc || twImage) {
      meta.twitter = {
        card: (seo.twitter_card as "summary_large_image" | "summary") || "summary_large_image",
        ...(twTitle ? { title: twTitle }       : {}),
        ...(twDesc  ? { description: twDesc }  : {}),
        ...(twImage ? { images: [twImage] }    : {}),
      };
    }

    return meta;
  } catch {
    // API unreachable — return static fallback so the page still has metadata
    return defaults;
  }
}
