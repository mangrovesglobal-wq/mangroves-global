import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { TradingIcon, LogisticsIcon, CreativeIcon } from "./DivisionIcons";

type DivisionKey = "trading" | "logistics" | "creative";

const divisions: {
  key: DivisionKey;
  name: string;
  tagline: string;
  href: string;
  tone: string;
  Icon: () => React.ReactElement;
}[] = [
  {
    key: "trading",
    name: "Trading",
    tagline: "Agricultural commodities, sourced directly and supplied to UAE & GCC buyers.",
    href: "/trading",
    tone: "bg-mangrove-900",
    Icon: TradingIcon,
  },
  {
    key: "logistics",
    name: "Logistics",
    tagline: "Sea, air and road freight coordination through qualified logistics partners.",
    href: "/logistics",
    tone: "bg-mangrove-500",
    Icon: LogisticsIcon,
  },
  {
    key: "creative",
    name: "Digital & Creative",
    tagline: "Digital marketing, websites, content and branding for UAE businesses.",
    href: "/creative",
    tone: "bg-[#a97a3c]",
    Icon: CreativeIcon,
  },
];

export default function GroupAboutSection({ currentDivision }: { currentDivision: DivisionKey }) {
  return (
    <section className="py-14 sm:py-20 px-6 lg:px-16 bg-mangrove-50 border-b border-mangrove-100">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left — group narrative */}
        <Reveal className="space-y-5">
          <span className="text-mangrove-accent text-xs uppercase tracking-widest font-semibold">
            About The Group
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-mangrove-900 leading-snug">
            Mangroves Global —<br />Different disciplines. One way of working.
          </h2>
          <p className="text-mangrove-800/60 leading-relaxed text-sm sm:text-base max-w-md">
            Mangroves Global brings together trading, logistics and creative capabilities under one practical philosophy: build strong relationships, understand what matters, and deliver with purpose. Headquartered in the UAE with operational roots in India, the group connects origin-based supply chains, coordinated freight, and digital growth services.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center text-xs uppercase tracking-widest font-semibold text-mangrove-900 hover:text-mangrove-accent transition-colors"
          >
            Full Group Story
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>
        </Reveal>

        {/* Right — division cards, current one highlighted */}
        <Reveal className="grid gap-3">
          {divisions.map((d) => {
            const isCurrent = d.key === currentDivision;
            return (
              <Link
                key={d.key}
                href={d.href}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? "bg-mangrove-900 border-mangrove-900 cursor-default pointer-events-none"
                    : "bg-white border-mangrove-100 hover:border-mangrove-accent hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white ${d.tone}`}>
                  <d.Icon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${isCurrent ? "text-white" : "text-mangrove-900"}`}>
                    {d.name}
                  </div>
                  <div className={`text-xs leading-relaxed mt-0.5 ${isCurrent ? "text-white/55" : "text-mangrove-800/55"}`}>
                    {d.tagline}
                  </div>
                </div>
                {isCurrent ? (
                  <span className="shrink-0 text-mangrove-accent text-[10px] uppercase tracking-widest font-bold">
                    You Are Here
                  </span>
                ) : (
                  <span className="shrink-0 text-mangrove-800/30 text-sm transition-colors group-hover:text-mangrove-accent">
                    →
                  </span>
                )}
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
