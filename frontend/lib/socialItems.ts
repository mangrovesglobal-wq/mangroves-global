import type { SocialItem } from "@/components/ui/social-media";
import type { SocialLinks } from "@/lib/socialLinksContext";

type SocialShape = Omit<SocialItem, "href"> & { urlKey: keyof SocialLinks };

const socialShape: SocialShape[] = [
  { urlKey: "instagram_url", ariaLabel: "Instagram",   tooltip: "Instagram",   color: "#E1306C", svgUrl: "/icons/social/instagram.svg" },
  { urlKey: "facebook_url",  ariaLabel: "Facebook",    tooltip: "Facebook",    color: "#1877F2", svgUrl: "/icons/social/facebook.svg" },
  { urlKey: "linkedin_url",  ariaLabel: "LinkedIn",    tooltip: "LinkedIn",    color: "#0A66C2", svgUrl: "/icons/social/linkedin.svg" },
  { urlKey: "twitter_url",   ariaLabel: "X (Twitter)", tooltip: "X (Twitter)", color: "#1a1a1a", svgUrl: "/icons/social/x.svg" },
  { urlKey: "youtube_url",   ariaLabel: "YouTube",     tooltip: "YouTube",     color: "#FF0000", svgUrl: "/icons/social/youtube.svg" },
];

export function buildSocialItems(links: SocialLinks = {}): SocialItem[] {
  return socialShape.map(({ urlKey, ...rest }) => ({
    ...rest,
    href: links[urlKey] || "#",
  }));
}

// Static fallback export (href: "#") for server components that can't use context
export const socialItems: SocialItem[] = buildSocialItems({});
