import type { Metadata } from "next";
import CreativePageContent from "@/components/CreativePageContent";

export const metadata: Metadata = {
  title: "Digital Marketing & Creative Agency UAE | Mangroves Global",
  description:
    "Advertising, digital marketing, branding and creative production for UAE businesses. Strategic communication built around measurable business objectives.",
};

export default function CreativePage() {
  return <CreativePageContent />;
}
