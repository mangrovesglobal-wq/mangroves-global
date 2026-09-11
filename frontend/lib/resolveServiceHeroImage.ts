export type ResolvedHeroImage = {
  src: string;
  alt: string;
  remote: boolean;
};

/**
 * Prefers a CMS-uploaded (Laravel-hosted) featured image when present,
 * falling back to a curated local /public asset otherwise. Returns null
 * when neither is available (e.g. Creative pages with no local fallback).
 */
export function resolveServiceHeroImage(
  featuredImage: string | null,
  apiBaseUrl: string,
  alt: string,
  localFallbackPath?: string
): ResolvedHeroImage | null {
  if (featuredImage) {
    return { src: `${apiBaseUrl}/storage/${featuredImage}`, alt, remote: true };
  }
  if (localFallbackPath) {
    return { src: localFallbackPath, alt, remote: false };
  }
  return null;
}

/** Absolute image URL for Open Graph / JSON-LD, preferring the CMS image. */
export function resolveOgImageUrl(
  featuredImage: string | null,
  apiBaseUrl: string,
  localAbsoluteUrl?: string
): string | undefined {
  if (featuredImage) {
    return `${apiBaseUrl}/storage/${featuredImage}`;
  }
  return localAbsoluteUrl;
}
