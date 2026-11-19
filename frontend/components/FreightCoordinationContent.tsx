"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Last-Mile Distribution", href: "/logistics/last-mile-distribution" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Freight Coordination",
  breadcrumbLabel: "Freight Coordination",
  heroHeadline: "Freight Coordination",
  heroSubheadline: "One Contact — Sea, Air & Road, UAE & GCC",
  highlights: [
    "Single point of contact for all freight modes",
    "Sea, air and road coordination",
    "Partner booking and documentation management",
    "Multimodal routing options",
    "Status updates through to delivery",
  ],
  stats: [
    { value: "Sea · Air · Road", label: "Freight Modes" },
    { value: "One Contact", label: "Your Team" },
    { value: "UAE + GCC", label: "Coverage" },
    { value: "24 hrs", label: "Quote Response" },
  ],
  processSteps: [
    { label: "Cargo Brief" },
    { label: "Mode Selection" },
    { label: "Partner Booking" },
    { label: "In Transit" },
    { label: "Final Delivery" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/aerial-view-container-cargo-ship-sea.jpg",
  quoteLabel: "Request a Freight Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function FreightCoordinationContent({ introText, blocks, heroImage, icon }: Props) {
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
