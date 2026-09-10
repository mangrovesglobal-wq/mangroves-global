import type { Metadata } from "next";
import LogisticsPageContent from "@/components/LogisticsPageContent";

export const metadata: Metadata = {
  title: "Logistics & Supply Chain Solutions in UAE",
  description:
    "Mangroves Global coordinates freight, customs, transportation and warehousing across India, the UAE and the GCC. Request a logistics quote.",
};

export default function LogisticsPage() {
  return <LogisticsPageContent />;
}
