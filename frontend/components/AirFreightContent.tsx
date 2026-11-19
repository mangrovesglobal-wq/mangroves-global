"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Air Freight",
  breadcrumbLabel: "Air Freight",
  heroHeadline: "Air Freight Coordination",
  heroSubheadline: "Urgent & Time-Sensitive Cargo — India to UAE",
  highlights: [
    "Urgent & deadline-driven shipments",
    "Samples and small commercial cargo",
    "High-value goods with priority handling",
    "India–UAE corridor, express routing",
    "UAE customs coordination included",
  ],
  stats: [
    { value: "Express", label: "Delivery Priority" },
    { value: "India → UAE", label: "Main Corridor" },
    { value: "High-Value", label: "Cargo Priority" },
    { value: "24 hrs", label: "Quote Response" },
  ],
  processSteps: [
    { label: "Origin Airport" },
    { label: "Air Transit" },
    { label: "Dubai Airport" },
    { label: "Customs Clearance" },
    { label: "Final Delivery" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/air-freight-cargo-plane-port.jpg",
  quoteLabel: "Request an Air Freight Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function AirFreightContent({ introText, blocks, heroImage, icon }: Props) {
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
