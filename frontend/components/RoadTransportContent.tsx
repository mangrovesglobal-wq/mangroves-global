"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Road Transport",
  breadcrumbLabel: "Road Transport",
  heroHeadline: "Road Transport Coordination",
  heroSubheadline: "UAE & GCC Cross-Border Trucking",
  highlights: [
    "UAE domestic and GCC cross-border routes",
    "Qualified transport operator network",
    "Saudi Arabia, Oman, Qatar coverage",
    "Port-to-warehouse and door-to-door",
    "Tracking and status updates included",
  ],
  stats: [
    { value: "UAE + GCC", label: "Route Coverage" },
    { value: "Cross-Border", label: "Capability" },
    { value: "Full & Part Loads", label: "Cargo Options" },
    { value: "24 hrs", label: "Quote Response" },
  ],
  processSteps: [
    { label: "Pickup Arranged" },
    { label: "In Transit" },
    { label: "Border Crossing" },
    { label: "Customs Coordination" },
    { label: "Final Delivery" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/road-transport-trucks-uae-gcc.jpg",
  quoteLabel: "Request a Road Freight Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function RoadTransportContent({ introText, blocks, heroImage, icon }: Props) {
  return (
    <LogisticsServiceLayout
      config={config}
      introText={introText}
      blocks={blocks}
      heroImage={heroImage}
      icon={icon}
    />
  );
}
