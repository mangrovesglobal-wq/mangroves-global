import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Mangroves Global | UAE Trading, Logistics & Creative Group",
  description:
    "Contact Mangroves Global Trading FZ LLC, Ras Al Khaimah, UAE — reach the right team for Trading, Logistics or Creative.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
