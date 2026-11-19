"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Customs Clearance",
  breadcrumbLabel: "Customs Clearance",
  heroHeadline: "Customs Clearance Coordination",
  heroSubheadline: "UAE Import & Export — Jebel Ali, Dubai, Abu Dhabi",
  highlights: [
    "Import and export clearance coordination",
    "Jebel Ali, Dubai & Abu Dhabi ports",
    "Licensed customs broker liaison",
    "Documentation preparation and tracking",
    "Status updates at every stage",
  ],
  stats: [
    { value: "UAE Ports", label: "Coverage" },
    { value: "Import & Export", label: "Clearance Types" },
    { value: "Licensed Brokers", label: "Partner Network" },
    { value: "24 hrs", label: "Quote Response" },
  ],
  processSteps: [
    { label: "Documentation Prep" },
    { label: "Broker Submission" },
    { label: "Customs Review" },
    { label: "Duty Assessment" },
    { label: "Clearance & Release" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/customs-clearance-cargo-ship-uae.jpg",
  quoteLabel: "Request a Customs Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function CustomsCoordinationContent({ introText, blocks, heroImage, icon }: Props) {
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
