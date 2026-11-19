"use client";

import { useState } from "react";

const nodes = [
  { key: "suppliers", title: "Suppliers", desc: "Origin partners & producers" },
  { key: "logistics", title: "Logistics Partners", desc: "Freight & forwarding networks" },
  { key: "clients", title: "Clients", desc: "B2B buyers & businesses" },
  { key: "specialists", title: "Specialists & Markets", desc: "Regional & digital experts" },
] as const;

export default function PartnershipDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative bg-white p-8 sm:p-14 rounded-3xl border border-mangrove-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
        <div className="space-y-5">
          {nodes.slice(0, 2).map((n) => (
            <div
              key={n.key}
              onMouseEnter={() => setHovered(n.key)}
              onMouseLeave={() => setHovered(null)}
              className="p-5 rounded-2xl border border-mangrove-100 bg-mangrove-50 transition-all duration-300"
              style={{ opacity: hovered && hovered !== n.key ? 0.45 : 1 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-mangrove-900 mb-1">{n.title}</h4>
              <p className="text-xs text-mangrove-800/50">{n.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-4 sm:my-0">
          <div className="w-44 h-44 rounded-full bg-mangrove-900 text-white flex flex-col items-center justify-center text-center p-6 border-2 border-mangrove-accent">
            <span className="text-[10px] uppercase tracking-[0.2em] text-mangrove-accent mb-1 font-semibold">Core Hub</span>
            <span className="font-serif text-base font-medium leading-tight">Mangroves Global</span>
          </div>
        </div>

        <div className="space-y-5">
          {nodes.slice(2, 4).map((n) => (
            <div
              key={n.key}
              onMouseEnter={() => setHovered(n.key)}
              onMouseLeave={() => setHovered(null)}
              className="p-5 rounded-2xl border border-mangrove-100 bg-mangrove-50 transition-all duration-300"
              style={{ opacity: hovered && hovered !== n.key ? 0.45 : 1 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-mangrove-900 mb-1">{n.title}</h4>
              <p className="text-xs text-mangrove-800/50">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
