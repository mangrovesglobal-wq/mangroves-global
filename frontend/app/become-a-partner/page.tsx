import type { Metadata } from "next";
import BecomePartnerContent from "@/components/BecomePartnerContent";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("become-a-partner", {
    title: "Be Our Supplier Partner | UAE Market Entry & B2B Sales Representation",
    description:
      "Mangroves Global helps Indian spice producers and food suppliers develop B2B opportunities in the UAE through local commercial representation, buyer development and market-entry support.",
    alternates: { canonical: "https://mangrovesglobal.com/become-a-partner" },
  });
}

const faqs = [
  { question: "What type of suppliers do you represent?", answer: "Established producers, processors and exporters of agricultural products and spices who are export-ready and looking to develop UAE B2B opportunities." },
  { question: "Do you work with Indian spice producers?", answer: "Yes — Indian spice and agricultural producers are a core focus, given our origin sourcing relationships and the India–UAE trade corridor." },
  { question: "Can Mangroves Global help us enter the UAE market?", answer: "We can help by acting as a local commercial interface — supporting buyer development, communication and market positioning in the UAE." },
  { question: "Do you guarantee buyers or orders?", answer: "No. We do not guarantee buyers, orders or sales volumes. We represent your product and develop opportunities where commercially suitable." },
  { question: "Do suppliers need a UAE company?", answer: "Not necessarily. Representation is designed for suppliers who want a UAE commercial presence without setting one up directly." },
  { question: "How are representation fees structured?", answer: "Commercial structures are agreed individually based on scope, responsibility, territory, product and opportunity." },
  { question: "Can you help with product catalogues and digital marketing?", answer: "Where useful, our Digital & Creative division can support product presentation and digital marketing alongside commercial representation." },
  { question: "Can you coordinate logistics?", answer: "Yes — our Logistics division can coordinate onward freight and customs clearance through qualified partners once a commercial relationship is in place." },
  { question: "Do you only work with spice suppliers?", answer: "Spices are a core focus, but we also consider other food and agricultural commodities on a case-by-case basis." },
  { question: "What happens after submitting the enquiry?", answer: "We review each submission individually and get back to suppliers where there's a potential market fit." },
];

export default function BecomeAPartnerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
        logo: "https://mangrovesglobal.com/images/logo/mangroves-global-logo-badge.png",
      },
      {
        "@type": "Service",
        serviceType: "Supplier Commercial Representation",
        provider: { "@type": "Organization", name: "Mangroves Global Trading FZ LLC" },
        areaServed: ["United Arab Emirates", "GCC"],
        description:
          "UAE-based commercial representation for Indian spice and food producers, covering buyer development, market positioning and sales representation.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
          { "@type": "ListItem", position: 2, name: "Become a Supplier Partner", item: "https://mangrovesglobal.com/become-a-partner" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BecomePartnerContent />
    </>
  );
}
