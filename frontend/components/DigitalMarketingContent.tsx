"use client";

import CreativeServiceLayout, { type SubService, type ProcessStep, type Outcome, type Faq } from "./CreativeServiceLayout";

type ContentBlock = { heading: string; content: string };
type HeroImage = { src: string; alt: string; remote: boolean };
type Props = { introText: string; blocks: ContentBlock[]; heroImage: HeroImage | null; icon: string | null };

const SUB_SERVICES: SubService[] = [
  {
    name: "Digital Strategy",
    desc: "An integrated plan that connects your business goals to the right digital channels — not random activity across platforms because they're popular.",
  },
  {
    name: "SEO & Organic Growth",
    desc: "Technical, content, and authority-building that earns consistent organic visibility and qualified traffic without paying per click.",
  },
  {
    name: "Social Media Marketing",
    desc: "Platform-native content and community strategy that builds real audience relationships and drives measurable engagement — not just follower counts.",
  },
  {
    name: "Paid Digital Advertising",
    desc: "Meta, Google, LinkedIn — budget-efficient campaigns built around cost per acquisition, not vanity reach metrics. Every dirham tracked.",
  },
  {
    name: "Analytics & Performance Reporting",
    desc: "Clear dashboards and regular reporting cadences so you always know what's working, what to shift, and where you're growing.",
  },
  {
    name: "Lead Generation Funnels",
    desc: "End-to-end digital funnels from first touch to qualified lead — landing pages, nurture sequences, and conversion tracking built as one system.",
  },
];

const PROCESS: ProcessStep[] = [
  { n: "01", title: "Audit & Baseline", desc: "We assess your current digital presence, channels, and competitive landscape before recommending anything." },
  { n: "02", title: "Strategy & Channel Plan", desc: "A prioritised digital plan built around your growth objective and your budget — not a full-channel wish list." },
  { n: "03", title: "Execute & Publish", desc: "Campaigns, content, and paid placements go live with clear naming, tracking, and attribution from day one." },
  { n: "04", title: "Measure & Optimise", desc: "Regular review cycles to cut what isn't working and scale what is — the loop that compounds results over time." },
];

const OUTCOMES: Outcome[] = [
  { metric: "3×", label: "Avg. ROI Improvement" },
  { metric: "12+", label: "Platforms Managed" },
  { metric: "UAE & GCC", label: "Market Coverage" },
  { metric: "Performance", label: "Focused Delivery" },
];

const FAQS: Faq[] = [
  {
    q: "How long before we see results from SEO?",
    a: "For a new domain with no prior SEO work: meaningful organic traffic typically builds in months 3–6, with compounding results through 12 months. For established domains with existing authority, targeted improvements show results in 4–8 weeks. We set realistic timelines in writing at the strategy stage.",
  },
  {
    q: "What's the minimum budget for paid campaigns?",
    a: "We typically recommend a minimum media spend of AED 5,000/month to generate statistically meaningful data for optimisation. Below that threshold, the data volume is too low to make reliable decisions. Our management fees are separate from your media spend.",
  },
  {
    q: "Do you manage our social accounts or only create content?",
    a: "Both options are available. Full-service social management includes strategy, content creation, scheduling, community management, and reporting. Content-only engagements provide planned and produced assets for your team to publish. Most clients start full-service and move to a hybrid model once internal capability grows.",
  },
  {
    q: "How often do you report on performance?",
    a: "Monthly performance reports are standard, with dashboard access available daily. For active paid campaigns we review performance weekly and make optimisation decisions in real time. Quarterly business reviews look at channel trends and strategic direction.",
  },
  {
    q: "Can you take over existing campaigns that another agency started?",
    a: "Yes. We conduct a full audit of existing account structure, creative, and performance history before making changes. Where campaigns are performing we improve incrementally; where they aren't we present a rebuild recommendation with rationale before acting.",
  },
];

export default function DigitalMarketingContent({ introText, blocks, heroImage, icon }: Props) {
  return (
    <CreativeServiceLayout
      introText={introText}
      blocks={blocks}
      heroImage={heroImage}
      icon={icon}
      categoryLabel="Digital Marketing"
      breadcrumbLabel="Digital Marketing"
      h1="Digital Marketing That Turns Channels Into a Sales Engine"
      subServices={SUB_SERVICES}
      process={PROCESS}
      outcomes={OUTCOMES}
      faqs={FAQS}
      ctaHeadline="Let's Build Your Digital Growth Plan"
      ctaSubline="Tell us your goals and current digital presence. We'll show you the gap and how to close it."
      ctaButton="Book a Strategy Session"
    />
  );
}
