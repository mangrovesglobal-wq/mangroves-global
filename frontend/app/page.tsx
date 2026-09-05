import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-white text-[#141f1c] min-h-screen">
      {/* Header */}
      <header className="w-full">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-[#22332e] pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Image
              src="/images/logo/mangroves-global-logo-badge.png"
              width={120}
              height={64}
              className="h-14 sm:h-16 w-auto block"
              alt="Mangroves Global — UAE B2B Commodity Sourcing, Freight Logistics, and Digital Marketing Group"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 lg:px-16 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#d5ad75]/40 bg-[#d5ad75]/10 text-[#22332e] text-xs uppercase tracking-widest mb-8">
            UAE Headquartered · Global Operational Reach
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-6">
            Everything Your Business Needs to{" "}
            <br className="hidden sm:inline" />
            <span className="font-normal text-[#d5ad75]">
              Source, Ship, and Scale.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#22332e]/70 text-base sm:text-lg font-light leading-relaxed mb-16">
            Streamline your global supply chain, optimize cargo transport, and accelerate corporate growth through specialized enterprise divisions.
          </p>

          {/* Division cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <a
              href="/trading"
              className="group block rounded-2xl border border-[#dde7e4] bg-[#f2f6f5]/60 p-8 hover:border-[#d5ad75] hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#d5ad75] text-xs uppercase tracking-widest font-semibold mb-4">
                Division 01
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Commodity Sourcing &amp; Trading
              </h2>
              <p className="text-[#22332e]/60 text-sm leading-relaxed mb-6">
                Direct origin sourcing for premium Indian spices, agricultural commodities, and cross-border B2B trading.
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold group-hover:text-[#d5ad75] transition-colors">
                Discover Trading Solutions →
              </span>
            </a>

            <a
              href="/logistics"
              className="group block rounded-2xl border border-[#dde7e4] bg-[#f2f6f5]/60 p-8 hover:border-[#d5ad75] hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#d5ad75] text-xs uppercase tracking-widest font-semibold mb-4">
                Division 02
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Freight &amp; Supply Chain
              </h2>
              <p className="text-[#22332e]/60 text-sm leading-relaxed mb-6">
                End-to-end cargo logistics, international air and sea freight forwarding, and customs clearance routing.
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold group-hover:text-[#d5ad75] transition-colors">
                Explore Freight Logistics →
              </span>
            </a>

            <a
              href="/creative"
              className="group block rounded-2xl border border-[#dde7e4] bg-[#f2f6f5]/60 p-8 hover:border-[#d5ad75] hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#d5ad75] text-xs uppercase tracking-widest font-semibold mb-4">
                Division 03
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Advertising &amp; Brand Growth
              </h2>
              <p className="text-[#22332e]/60 text-sm leading-relaxed mb-6">
                Strategic B2B digital marketing, corporate branding solutions, and high-impact media production.
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold group-hover:text-[#d5ad75] transition-colors">
                Access Creative Services →
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#22332e] text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Image
            src="/images/logo/mangroves-global-logo-wordmark.png"
            width={180}
            height={24}
            className="h-6 w-auto block"
            alt="Mangroves Global Trading FZ LLC"
          />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
