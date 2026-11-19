import { Metadata } from "next";
import CreativeContactContent from "@/components/CreativeContactContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-contact", {
    title: "Contact | Creative Division | Mangroves Global",
    description:
      "Start a creative project with Mangroves Global. Brief our advertising, digital marketing, branding, content production, or web development team in Dubai.",
    alternates: {
      canonical: "https://mangrovesglobal.com/creative/contact",
    },
    openGraph: {
      title: "Start a Creative Project | Mangroves Global",
      description:
        "Tell us what you're building. Our creative team in Dubai responds within one business day.",
      url: "https://mangrovesglobal.com/creative/contact",
      siteName: "Mangroves Global",
      type: "website",
    },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://mangrovesglobal.com/creative/contact",
      url: "https://mangrovesglobal.com/creative/contact",
      name: "Creative Division — Contact",
      description:
        "Contact Mangroves Global's creative team for advertising, digital marketing, branding, content production, and web development projects in the UAE.",
      inLanguage: "en",
      isPartOf: { "@id": "https://mangrovesglobal.com" },
    },
    {
      "@type": "Organization",
      "@id": "https://mangrovesglobal.com/#organization",
      name: "Mangroves Global",
      url: "https://mangrovesglobal.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "hello@mangrovesglobal.com",
          contactType: "sales",
          areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
          availableLanguage: ["en", "ar"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "18:00",
          },
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Contact", item: "https://mangrovesglobal.com/creative/contact" },
      ],
    },
  ],
};

export default function CreativeContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CreativeContactContent />
    </>
  );
}
