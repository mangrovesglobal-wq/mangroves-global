"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Supply Chain Consulting",
  breadcrumbLabel: "Supply Chain Consulting",
  heroHeadline: "Supply Chain Consulting",
  heroSubheadline: "Route Analysis & Vendor Coordination — UAE & GCC",
  highlights: [
    "Supply chain analysis and route planning",
    "Vendor and partner coordination",
    "Cost and lead-time optimisation",
    "UAE and GCC trade-route expertise",
    "Practical recommendations, no over-engineering",
  ],
  stats: [
    { value: "UAE + GCC", label: "Market Focus" },
    { value: "Route Analysis", label: "Core Service" },
    { value: "Cost Reduction", label: "Goal" },
    { value: "24 hrs", label: "Response Time" },
  ],
  processSteps: [
    { label: "Current State Review" },
    { label: "Route Analysis" },
    { label: "Partner Assessment" },
    { label: "Recommendations" },
    { label: "Implementation Support" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/supply-chain-network-coordination.jpg",
  quoteLabel: "Request a Consulting Call",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function SupplyChainConsultingContent({ introText, blocks, heroImage, icon }: Props) {
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
