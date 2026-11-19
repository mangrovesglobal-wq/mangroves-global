"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig } from "./LogisticsServiceLayout";
import type { ContentBlock, HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Sea Freight",
  breadcrumbLabel: "Sea Freight",
  heroHeadline: "Sea Freight Coordination",
  heroSubheadline: "FCL & LCL — India, UAE & GCC",
  highlights: [
    "Full Container Load (FCL) & Less than Container Load (LCL)",
    "India–UAE–GCC route coverage",
    "Flexible Incoterms — FOB, CIF, CFR",
    "Port-to-port through door-to-door coordination",
    "Status updates from booking through to delivery",
  ],
  stats: [
    { value: "FCL & LCL", label: "Cargo Types" },
    { value: "India → GCC", label: "Route Coverage" },
    { value: "FOB / CIF / CFR", label: "Incoterms" },
    { value: "24 hrs", label: "Quote Response" },
  ],
  processSteps: [
    { label: "Origin Port" },
    { label: "Ocean Freight" },
    { label: "UAE Port Arrival" },
    { label: "Customs Clearance" },
    { label: "Final Delivery" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/sea-freight-container-port-network.jpg",
  quoteLabel: "Request a Sea Freight Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function SeaFreightContent({ introText, blocks, heroImage, icon }: Props) {
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
