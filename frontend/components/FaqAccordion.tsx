"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type FaqItem = { question: string; answer: string };

type FaqAccordionProps = {
  items: FaqItem[];
  theme?: "dark" | "light";
};

export default function FaqAccordion({ items, theme = "dark" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isLight = theme === "light";

  return (
    <div className={isLight ? "divide-y divide-mangrove-100" : "divide-y divide-slate-800"}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-base sm:text-lg font-medium ${isLight ? "text-mangrove-900" : "text-white"}`}>{item.question}</span>
              <Plus className={`w-5 h-5 text-mangrove-accent shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
            </button>
            <div
              className="grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`text-sm sm:text-base leading-relaxed pb-5 pr-8 ${isLight ? "text-mangrove-800/70" : "text-slate-400"}`}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
