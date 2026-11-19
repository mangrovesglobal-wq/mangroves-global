"use client";

import CreativeServiceLayout, { type SubService, type ProcessStep, type Outcome, type Faq } from "./CreativeServiceLayout";

type ContentBlock = { heading: string; content: string };
type HeroImage = { src: string; alt: string; remote: boolean };
type Props = { introText: string; blocks: ContentBlock[]; heroImage: HeroImage | null; icon: string | null };

const SUB_SERVICES: SubService[] = [
  {
    name: "Corporate Websites",
    desc: "Lead-generating, brand-representing sites built for long-term performance — SEO-structured, fast-loading, and self-manageable by your team.",
  },
  {
    name: "Landing Pages",
    desc: "High-conversion single-purpose pages for campaigns, product launches, and events. Designed around the action, not the brand catalogue.",
  },
  {
    name: "UI/UX Design",
    desc: "User research-informed design that makes digital products intuitive and conversion-ready. From wireframe to final spec delivered for development.",
  },
  {
    name: "CMS Development",
    desc: "WordPress, headless, and custom builds where your team can update content without a developer. Handover includes full training.",
  },
  {
    name: "E-commerce Builds",
    desc: "Product catalogues, checkout flows, and payment integrations built for conversion — with the backend your team can actually manage.",
  },
  {
    name: "Website Maintenance & Support",
    desc: "Ongoing technical support, security updates, performance monitoring, and content updates as a managed service after launch.",
  },
];

const PROCESS: ProcessStep[] = [
  { n: "01", title: "Discovery & Scoping", desc: "Objectives, audience, page structure, integrations, and success metrics defined before any design begins." },
  { n: "02", title: "UX & Visual Design", desc: "Wireframes, then hi-fidelity mockups reviewed and approved in Figma — no design surprises in development." },
  { n: "03", title: "Development & Testing", desc: "Built to spec, tested across browsers and devices, and QA'd before you see a preview link." },
  { n: "04", title: "Launch & Handover", desc: "Live deployment, search console setup, analytics verification, and team training so you're self-sufficient from day one." },
];

const OUTCOMES: Outcome[] = [
  { metric: "2–8 wk", label: "Build Timeline" },
  { metric: "Mobile-", label: "First Builds" },
  { metric: "CMS-", label: "Powered" },
  { metric: "SEO-", label: "Structured" },
];

const FAQS: Faq[] = [
  {
    q: "What CMS platform do you build on?",
    a: "We build on the platform that best suits the project. WordPress is most common for content-heavy sites and marketing teams. For performance-critical or complex applications we use headless architecture (Next.js with a headless CMS). We'll recommend the right stack at the scoping stage — we don't push one platform regardless of fit.",
  },
  {
    q: "How long does a typical website project take?",
    a: "A focused corporate website (5–10 pages): 4–6 weeks. A larger site with custom functionality: 8–12 weeks. Landing pages for campaigns: 1–2 weeks. Timelines depend heavily on how quickly client content and approvals move — we account for this in the project plan.",
  },
  {
    q: "Do you handle hosting and ongoing maintenance?",
    a: "We set up hosting on your preferred provider or recommend one appropriate for the project's scale and location requirements. Post-launch maintenance is available as a monthly retainer covering updates, security, backups, and content changes.",
  },
  {
    q: "Can our team update the website after it launches?",
    a: "Yes — that's a requirement, not a feature. Every website we build is delivered with CMS access, a handover document, and training for your team. If you need ongoing update support as a service rather than DIY, we offer that too.",
  },
  {
    q: "Do you design and build, or only one of the two?",
    a: "We do both end-to-end. Design and development under one team means no briefing lost in handover, no design that's impossible to build, and one point of accountability from first wireframe to live launch.",
  },
];

export default function WebDigitalContent({ introText, blocks, heroImage, icon }: Props) {
  return (
    <CreativeServiceLayout
      introText={introText}
      blocks={blocks}
      heroImage={heroImage}
      icon={icon}
      categoryLabel="Web & Digital Experiences"
      breadcrumbLabel="Web & Digital Experiences"
      h1="Websites & Digital Experiences That Generate Business"
      subServices={SUB_SERVICES}
      process={PROCESS}
      outcomes={OUTCOMES}
      faqs={FAQS}
      ctaHeadline="A Website That Works for Your Business Around the Clock"
      ctaSubline="Tell us what you need it to do. We'll scope a build that delivers it."
      ctaButton="Start a Website Project"
    />
  );
}
