import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("contact", {
    title: "Contact Mangroves Global | UAE Trading, Logistics & Creative Group",
    description:
      "Contact Mangroves Global Trading FZ LLC, Ras Al Khaimah, UAE — reach the right team for Trading, Logistics or Creative.",
    alternates: { canonical: "https://mangrovesglobal.com/contact" },
  });
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com/" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://mangrovesglobal.com/contact" },
      ],
    },
    {
      "@type": "ContactPage",
      name: "Contact Mangroves Global",
      url: "https://mangrovesglobal.com/contact",
      description: "Contact Mangroves Global Trading FZ LLC, Ras Al Khaimah, UAE — reach the right team for Trading, Logistics or Creative.",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://mangrovesglobal.com/#organization",
      name: "Mangroves Global Trading FZ LLC",
      url: "https://mangrovesglobal.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ras Al Khaimah",
        addressCountry: "AE",
      },
      areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "IN"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "IN"],
          availableLanguage: ["en", "ar"],
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <ContactPageContent />
    </>
  );
}
