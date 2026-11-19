"use client";

import Link from "next/link";
import Image from "next/image";
import { SocialTooltip } from "@/components/ui/social-media";
import { buildSocialItems } from "@/lib/socialItems";
import { useSocialLinks } from "@/lib/socialLinksContext";

const columns = [
  {
    heading: "About Us",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Our Philosophy", href: "/about#philosophy" },
      { label: "Our Companies", href: "/about#divisions" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Trading",
    links: [
      { label: "Commodities", href: "/trading/commodities" },
      { label: "Sourcing & Supply", href: "/trading/sourcing-supply" },
      { label: "Quality Assurance", href: "/trading/quality-assurance" },
      { label: "Blog", href: "/trading/blog" },
    ],
  },
  {
    heading: "Logistics",
    links: [
      { label: "Services", href: "/logistics#services" },
      { label: "Import & Export", href: "/logistics/import-export" },
      { label: "Blog", href: "/logistics/blog" },
    ],
  },
  {
    heading: "Digital & Creative",
    links: [
      { label: "Services", href: "/creative#services" },
      { label: "Portfolio", href: "/creative/work" },
{ label: "Blog", href: "/creative/blog" },
    ],
  },
];

export default function SiteFooter() {
  const socialLinks = useSocialLinks();
  const socialItems = buildSocialItems(socialLinks);

  return (
    <footer className="bg-mangrove-900 text-white/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-mangrove-accent mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <Image src="/images/logo/mangroves-global-logo-wordmark.png" width={1200} height={289} className="h-6 sm:h-7 w-auto block mb-3" alt="Mangroves Global" />
            <p className="text-xs uppercase tracking-widest text-mangrove-accent/90">Rooted in Nature, Connecting Globally</p>
          </div>
          <SocialTooltip items={socialItems} className="justify-start sm:justify-end" />
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-mangrove-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
