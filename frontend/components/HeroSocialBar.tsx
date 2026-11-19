"use client";

import { useSocialLinks } from "@/lib/socialLinksContext";
import { buildSocialItems } from "@/lib/socialItems";

export default function HeroSocialBar() {
  const links = useSocialLinks();
  const items = buildSocialItems(links);

  return (
    <div className="flex items-center gap-3">
      {items.map((item) => (
        <a
          key={item.ariaLabel}
          href={item.href}
          aria-label={item.ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: item.color }}
          />
          <img src={item.svgUrl} alt="" aria-hidden className="relative z-10 w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
