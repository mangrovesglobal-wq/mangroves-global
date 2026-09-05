import type { Metadata } from "next";
import TradingPageContent from "@/components/TradingPageContent";

export const metadata: Metadata = {
  title: "Indian Spices & Agricultural Commodity Exporter | UAE & GCC Supplier",
  description:
    "Mangroves Global supplies UAE and GCC buyers with Indian-origin green cardamom, black pepper, cloves, nutmeg, ginger and coffee — transparent sourcing, export-ready quality.",
};

export default function TradingPage() {
  return <TradingPageContent />;
}
