"use client";

import CreativeServiceLayout, { type SubService, type ProcessStep, type Outcome, type Faq } from "./CreativeServiceLayout";

type ContentBlock = { heading: string; content: string };
type HeroImage = { src: string; alt: string; remote: boolean };
type Props = { introText: string; blocks: ContentBlock[]; heroImage: HeroImage | null; icon: string | null };

const SUB_SERVICES: SubService[] = [
  {
    name: "Strategic Copywriting",
    desc: "Website copy, campaign messaging, and brand content built on your positioning — not generic filler that could belong to anyone.",
  },
  {
    name: "Product & Corporate Photography",
    desc: "Professional photography with full direction and styling for products, teams, locations, and campaign assets. Shot to your brief.",
  },
  {
    name: "Video Content Production",
    desc: "Corporate films, product showcases, testimonials, and social reels — from scripted brief to finished edit, delivered in your required formats.",
  },
  {
    name: "Motion Graphics & Animation",
    desc: "Animated explainers, branded social assets, and motion design that communicate faster and land harder than static images.",
  },
  {
    name: "Ongoing Content Management",
    desc: "A rolling content calendar across platforms — planned, produced, and published as a managed service so your brand never goes quiet.",
  },
  {
    name: "Arabic & English Content",
    desc: "All content produced bilingually where required — with native Arabic copywriters, not translation tools. Tone and meaning preserved.",
  },
];

const PROCESS: ProcessStep[] = [
  { n: "01", title: "Content Strategy", desc: "Objectives, audience, formats, and volume agreed — a content plan your business can actually use." },
  { n: "02", title: "Production Planning", desc: "Shoot schedules, scripts, storyboards, and logistics confirmed before any equipment is hired." },
  { n: "03", title: "Shoot & Creation", desc: "Professional production executed to brief with structured creative direction and client review points." },
  { n: "04", title: "Edit, Delivery & Deploy", desc: "Post-production, format exports, and distribution-ready files delivered with deployment support." },
];

const OUTCOMES: Outcome[] = [
  { metric: "In-house", label: "Production Studio" },
  { metric: "Arabic &", label: "English Content" },
  { metric: "Multi-", label: "Platform Ready" },
  { metric: "Fast", label: "Turnaround" },
];

const FAQS: Faq[] = [
  {
    q: "Do you have your own production studio?",
    a: "Yes. We operate an in-house studio for product photography and controlled shoots. For location shoots — offices, facilities, and outdoor — we bring the full production setup to you.",
  },
  {
    q: "Can you manage our content on an ongoing basis rather than project-by-project?",
    a: "Yes, and it's often more cost-effective. Monthly content retainers cover planning, production, and publishing across your agreed channels. This approach also builds a consistent visual language over time, which individual projects can't replicate.",
  },
  {
    q: "What's the typical turnaround for a video project?",
    a: "A 60–90 second corporate or product video: 2–3 weeks from approved script to final delivery. Social reels with simpler production: 5–7 business days. Longer brand films or projects requiring extensive location work run 4–6 weeks. Timelines are confirmed at briefing.",
  },
  {
    q: "Do you produce content in Arabic?",
    a: "Yes, with native Arabic copywriters, not translation tools. All content — scripts, copy, captions — is written to perform in Arabic, not converted from English. Where bilingual versions are required, both are produced to the same standard.",
  },
  {
    q: "What deliverable formats do you provide?",
    a: "We deliver in every format your channels require: high-res images (TIFF/PNG), web-optimised files (JPG/WebP), video in MP4/MOV at specified resolutions, and social-specific crops. Source files are retained and available on request.",
  },
];

export default function ContentProductionContent({ introText, blocks, heroImage, icon }: Props) {
  return (
    <CreativeServiceLayout
      introText={introText}
      blocks={blocks}
      heroImage={heroImage}
      icon={icon}
      categoryLabel="Content & Production"
      breadcrumbLabel="Content & Production"
      h1="Content That Works as Hard as Your Business Does"
      subServices={SUB_SERVICES}
      process={PROCESS}
      outcomes={OUTCOMES}
      faqs={FAQS}
      ctaHeadline="Let's Create Content That Actually Converts"
      ctaSubline="Brief us on your next project or content challenge. We'll scope it honestly."
      ctaButton="Request a Content Proposal"
    />
  );
}
