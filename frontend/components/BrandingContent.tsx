"use client";

import CreativeServiceLayout, { type SubService, type ProcessStep, type Outcome, type Faq } from "./CreativeServiceLayout";

type ContentBlock = { heading: string; content: string };
type HeroImage = { src: string; alt: string; remote: boolean };
type Props = { introText: string; blocks: ContentBlock[]; heroImage: HeroImage | null; icon: string | null };

const SUB_SERVICES: SubService[] = [
  {
    name: "Brand Strategy",
    desc: "Before a logo is drawn, we define what your brand stands for, who it's for, how it's positioned, and what it promises — the foundation everything else is built on.",
  },
  {
    name: "Brand Naming",
    desc: "A name that works linguistically, legally, and commercially across Arabic and English-speaking markets. Tested for availability and cultural fit.",
  },
  {
    name: "Visual Identity Design",
    desc: "Logo, colour palette, typography, and usage guidelines that hold together across every touchpoint — digital, print, environmental, and packaging.",
  },
  {
    name: "Packaging Design",
    desc: "Structural and graphic design for products that need to perform on the shelf, in transit, and in an unboxing moment. Designed for manufacturing reality.",
  },
  {
    name: "Brand Guidelines",
    desc: "A complete brand standards document so every team member, agency, and printer can apply the brand consistently — without asking you each time.",
  },
  {
    name: "Brand Refresh & Rebrand",
    desc: "Evolving an existing brand without losing what works — research-led decisions on what to keep, refine, and replace so the refresh lands without confusion.",
  },
];

const PROCESS: ProcessStep[] = [
  { n: "01", title: "Research & Discovery", desc: "Market landscape, competitor positioning, and audience expectations mapped before strategy is written." },
  { n: "02", title: "Brand Strategy", desc: "Positioning, personality, voice, and messaging architecture agreed before any visual direction begins." },
  { n: "03", title: "Design Development", desc: "Visual concepts developed in rounds against the agreed strategy — with structured feedback at each stage." },
  { n: "04", title: "System Delivery", desc: "Complete brand assets and guidelines delivered in formats ready for immediate use across every channel." },
];

const OUTCOMES: Outcome[] = [
  { metric: "15+", label: "Brand Systems Built" },
  { metric: "Bilingual", label: "English & Arabic" },
  { metric: "GCC-ready", label: "Market Positioning" },
  { metric: "Full System", label: "Every Touchpoint" },
];

const FAQS: Faq[] = [
  {
    q: "We already have a brand — can you just refresh it rather than start over?",
    a: "Most of the time, yes. A brand refresh retains the equity in what already works — recognition, associations, existing assets — while updating what has dated or no longer positions you correctly. We always audit before recommending. A full rebrand is only justified when the positioning itself is broken, not when the logo feels old.",
  },
  {
    q: "Does the visual identity include Arabic language versions?",
    a: "Yes, bilingual execution is standard. Arabic typography selection, right-to-left layout guidelines, and Arabic brand naming (where applicable) are included in our UAE projects. We work with specialist Arabic calligraphers for mark-based wordmarks when needed.",
  },
  {
    q: "What do we receive at the end of the project?",
    a: "A complete brand system: master logo files in all required formats, the colour and typography system, a brand guidelines document, and all application files. We deliver in source formats (AI, Figma, indd) alongside production-ready exports (SVG, PNG, PDF).",
  },
  {
    q: "How long does a full brand project take?",
    a: "Brand strategy + visual identity: typically 8–12 weeks. Visual identity only (strategy already exists): 4–6 weeks. Packaging design as an add-on: 2–4 additional weeks depending on complexity. Timelines are defined in the project agreement.",
  },
  {
    q: "Do you help with implementation after the brand is delivered?",
    a: "Yes. Post-delivery support includes applying the brand to stationery, website, signage, and marketing materials. Some clients engage us on an ongoing creative direction retainer to ensure brand consistency as new materials are produced over time.",
  },
];

export default function BrandingContent({ introText, blocks, heroImage, icon }: Props) {
  return (
    <CreativeServiceLayout
      introText={introText}
      blocks={blocks}
      heroImage={heroImage}
      icon={icon}
      categoryLabel="Branding & Creative"
      breadcrumbLabel="Branding & Creative"
      h1="Brand Identity That Earns Its Place in the Market"
      subServices={SUB_SERVICES}
      process={PROCESS}
      outcomes={OUTCOMES}
      faqs={FAQS}
      ctaHeadline="Build a Brand Worth Remembering"
      ctaSubline="Tell us what you're building and where you want it to stand. We'll show you how to get there."
      ctaButton="Start Your Brand Project"
    />
  );
}
