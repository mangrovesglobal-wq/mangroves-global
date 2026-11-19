"use client";
import LogisticsServiceLayout, { type LogisticsServiceConfig, type ContentBlock, type HeroImage } from "./LogisticsServiceLayout";

const ALL_SERVICES = [
  { name: "Sea Freight", href: "/logistics/sea-freight" },
  { name: "Air Freight", href: "/logistics/air-freight" },
  { name: "Customs Clearance", href: "/logistics/customs-clearance" },
  { name: "Road Transport", href: "/logistics/road-transport" },
  { name: "Warehousing & 3PL", href: "/logistics/warehousing-3pl" },
  { name: "Supply Chain Consulting", href: "/logistics/supply-chain-consulting" },
  { name: "Freight Coordination", href: "/logistics/freight-coordination" },
  { name: "Import & Export", href: "/logistics/import-export" },
];

const config: LogisticsServiceConfig = {
  serviceName: "Last-Mile Distribution",
  breadcrumbLabel: "Last-Mile Distribution",
  heroHeadline: "Last-Mile Distribution",
  heroSubheadline: "Warehouse to End Recipient — Dubai & UAE",
  highlights: [
    "Dubai, Abu Dhabi and broader UAE coverage",
    "B2B and B2C delivery coordination",
    "Coordination through licensed delivery partners",
    "Scheduled and on-demand dispatch",
    "POD and tracking available",
  ],
  stats: [
    { value: "Dubai + UAE", label: "Coverage" },
    { value: "B2B & B2C", label: "Delivery Types" },
    { value: "Licensed Partners", label: "Operator Network" },
    { value: "24 hrs", label: "Response Time" },
  ],
  processSteps: [
    { label: "Warehouse Release" },
    { label: "Route Planning" },
    { label: "Dispatch" },
    { label: "In Transit" },
    { label: "Delivered & POD" },
  ],
  relatedServices: ALL_SERVICES,
  fallbackHeroPath: "/images/commercial-trucks-lined-up-logistics-hub-sunset.jpg",
  quoteLabel: "Request a Delivery Quote",
};

type Props = {
  introText: string;
  blocks: ContentBlock[];
  heroImage: HeroImage | null;
  icon: string | null;
};

export default function LastMileDistributionContent({ introText, blocks, heroImage, icon }: Props) {
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
