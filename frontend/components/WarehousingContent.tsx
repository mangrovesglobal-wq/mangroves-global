"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Warehousing & 3PL",
  breadcrumbLabel: "Warehousing & 3PL",
  heroHeadline: "Warehousing & 3PL Coordination",
  heroSubheadline: "Bonded & Commercial Storage — Dubai & UAE",
  highlights: [
    "Bonded and commercial warehouse options",
    "Short and long-term storage coordination",
    "Inventory management and pick-and-pack",
    "Dubai and UAE locations",
    "Coordination through licensed warehouse operators",
  ],
  stats: [
    { value: "Bonded & Commercial", label: "Storage Types" },
    { value: "Dubai & UAE", label: "Locations" },
    { value: "Pick & Pack", label: "Fulfilment" },
    { value: "24 hrs", label: "Quote Response" },
  ],
  processSteps: [
    { label: "Cargo Arrives" },
    { label: "Receiving & Check-In" },
    { label: "Storage & Inventory" },
    { label: "Pick & Pack" },
    { label: "Outbound Dispatch" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/warehousing-3pl-storage-uae.jpg",
  quoteLabel: "Request a Warehousing Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function WarehousingContent({ introText, blocks, heroImage, icon }: Props) {
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
