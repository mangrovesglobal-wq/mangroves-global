"use client";

import CreativeServiceLayout, { type SubService, type ProcessStep, type Outcome, type Faq } from "./CreativeServiceLayout";

type ContentBlock = { heading: string; content: string };
type HeroImage = { src: string; alt: string; remote: boolean };
type Props = { introText: string; blocks: ContentBlock[]; heroImage: HeroImage | null; icon: string | null };

const SUB_SERVICES: SubService[] = [
  {
    name: "Campaign Strategy",
    desc: "We start with your business objective and work backwards — positioning, audience, messaging, and channel mix all defined before a single execution is touched.",
  },
  {
    name: "Advertising Campaigns",
    desc: "Full-service campaign execution across print, digital, out-of-home, and broadcast. From approved brief to live placements, managed as one team.",
  },
  {
    name: "Communication Strategy",
    desc: "How your brand speaks, to whom, and through which touchpoints — a framework your internal team and external partners can execute from consistently.",
  },
  {
    name: "Campaign Execution",
    desc: "We manage production, trafficking, and delivery so you don't juggle multiple vendors. One point of accountability from briefing to results reporting.",
  },
];

const PROCESS: ProcessStep[] = [
  { n: "01", title: "Briefing & Discovery", desc: "We learn your business, audience, and objective before any strategy is written." },
  { n: "02", title: "Strategy & Positioning", desc: "Messaging architecture, channel selection, and campaign framework signed off with you." },
  { n: "03", title: "Creative Development", desc: "Concepts, copy, and visual assets developed to brief — with structured review rounds." },
  { n: "04", title: "Production & Launch", desc: "Final assets produced, placements arranged, and campaign goes live with real-time monitoring." },
];

const OUTCOMES: Outcome[] = [
  { metric: "15+", label: "Years in UAE Market" },
  { metric: "200+", label: "Campaigns Executed" },
  { metric: "B2B & B2C", label: "Across Industries" },
  { metric: "Licensed", label: "UAE Agency Activity" },
];

const FAQS: Faq[] = [
  {
    q: "What's the difference between a campaign strategy and just 'running ads'?",
    a: "Running ads is execution without direction. A campaign strategy first defines the audience, the message hierarchy, the channel logic, and the success metrics — so every ad placed is working towards the same objective rather than generating disconnected impressions.",
  },
  {
    q: "Do you handle media buying and placement?",
    a: "Yes. We manage media planning and buying as part of integrated campaign execution. For digital placements we operate directly across the major platforms; for print and OOH we work with licensed UAE media owners on your behalf.",
  },
  {
    q: "How long does a typical campaign take from brief to launch?",
    a: "For a focused digital campaign: 3–4 weeks from brief to live. Integrated campaigns that include print, OOH, or broadcast typically run 6–10 weeks. Rush timelines are possible depending on scope — flag this at briefing.",
  },
  {
    q: "Do you work with both B2B and B2C companies?",
    a: "Yes, and the approach differs. B2B campaigns tend to focus on consideration and lead quality; B2C campaigns on reach, recall, and conversion volume. We adapt the strategy model to your buying cycle, not to a one-size-fits-all playbook.",
  },
  {
    q: "Can you manage ongoing retainer campaigns rather than one-off projects?",
    a: "Absolutely. Many of our clients run on quarterly or annual campaign retainers with rolling strategy reviews. This approach produces stronger results because campaigns compound on what worked before.",
  },
];

export default function AdvertisingContent({ introText, blocks, heroImage, icon }: Props) {
  return (
    <CreativeServiceLayout
      introText={introText}
      blocks={blocks}
      heroImage={heroImage}
      icon={icon}
      categoryLabel="Advertising & Communication"
      breadcrumbLabel="Advertising & Communication"
      h1="Advertising & Communication That Moves Your Market"
      subServices={SUB_SERVICES}
      process={PROCESS}
      outcomes={OUTCOMES}
      faqs={FAQS}
      ctaHeadline="Start a Campaign That Moves the Needle"
      ctaSubline="Tell us your objective and audience. We'll build the strategy from there."
      ctaButton="Request a Campaign Proposal"
    />
  );
}
