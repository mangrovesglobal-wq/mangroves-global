"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowDown,
  Sprout,
  ShieldCheck,
  FileText,
  Anchor,
  CheckCircle2,
  Award,
  Eye,
  Layers,
  Truck,
  MessageSquare,
  Check,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react";

type Product = {
  slug: string;
  name: string;
  category: "spices" | "beverages";
  categoryLabel: string;
  grades: string;
  description: string;
  highlight: string;
  image: string;
  alt: string;
};

const products: Product[] = [
  {
    slug: "black-pepper",
    name: "Black Pepper",
    category: "spices",
    categoryLabel: "Spices",
    grades: "Tellicherry (TGEB), Malabar Garbled (MG1), Cracked & Powder.",
    description:
      "Bulk black pepper export to UAE and GCC buyers, sourced from prime Malabar coastal regions with maximum piperine heat and bold uniform berry density.",
    highlight: "High Piperine Heat",
    image: "/trading/images/indian-black-pepper-supplier.jpg",
    alt: "Indian black pepper supplier for UAE and GCC — Tellicherry and Malabar Garbled grades",
  },
  {
    slug: "cloves",
    name: "Cloves",
    category: "spices",
    categoryLabel: "Spices",
    grades: "Whole Quills (Ceylon/Cassia) & Handpicked Cloves.",
    description:
      "Cloves supplier to UAE and GCC markets, featuring high eugenol essential oil content, rich sweet aroma, and zero headless flower bud defects.",
    highlight: "Rich Eugenol Oil",
    image: "/trading/images/indian-cloves-export.jpg",
    alt: "Indian cloves exporter for UAE and GCC — whole quills and handpicked grades",
  },
  {
    slug: "nutmeg-mace",
    name: "Nutmeg & Mace",
    category: "spices",
    categoryLabel: "Spices",
    grades: "Whole ABCD Nutmeg, Red Mace Arils, Fine Powder.",
    description:
      "Nutmeg and mace exporter serving UAE and GCC buyers, with rich volatile oil profile, vibrant deep crimson mace arils, and zero-shell defect lots.",
    highlight: "Zero Shell Defect",
    image: "/trading/images/indian-nutmeg-export.jpg",
    alt: "Indian nutmeg and mace exporter for UAE and GCC — ABCD grade whole nutmeg",
  },
  {
    slug: "green-cardamom",
    name: "Green Cardamom",
    category: "spices",
    categoryLabel: "Spices",
    grades: "Bold Green Pods (6–8mm+), Seeds, Fine Powder.",
    description:
      "Green cardamom exporter to UAE and GCC, sourced from Idukki, Kerala — India's premier cardamom region — with vibrant green retention and high oil yields.",
    highlight: "6-8mm+ Bold Pods",
    image: "/trading/images/indian-green-cardamom-export.jpg",
    alt: "Indian green cardamom exporter for UAE and GCC — Idukki Kerala bold green pods",
  },
  {
    slug: "dry-ginger",
    name: "Dry Ginger",
    category: "spices",
    categoryLabel: "Spices",
    grades: "Washed Whole Dried, Split & Fine Ground Powder.",
    description:
      "Dry ginger supplier to UAE and GCC importers, cleaned and sun-dried for a distinct pungent flavor profile and minimal fibrous content.",
    highlight: "Pungent Flavor Profile",
    image: "/trading/images/fresh-ginger-export-india.jpg",
    alt: "Fresh ginger exporter to UAE and GCC — washed whole dried ginger from India",
  },
  {
    slug: "coffee-beans",
    name: "Coffee Beans",
    category: "beverages",
    categoryLabel: "Coffee",
    grades: "Green Beans (Grades AA, A, PB).",
    description:
      "Green coffee bean exporter for UAE and GCC roasters, high-altitude shade-grown with uniform moisture levels and rigorous 0 defect scoring.",
    highlight: "Grades AA, A, Peaberry",
    image: "/trading/images/indian-coffee-beans-export.jpg",
    alt: "Indian green coffee beans exporter for UAE and GCC roasters — grades AA, A, peaberry",
  },
];

const marketRates = [
  { label: "8mm+", value: "Dhs 170-162" },
  { label: "8mm", value: "Dhs 164-153" },
  { label: "7.5mm", value: "Dhs 156-147" },
  { label: "7-8mm", value: "Dhs 149-140" },
  { label: "7mm", value: "Dhs 143-134" },
  { label: "6-7mm", value: "Dhs 133-124" },
  { label: "6mm", value: "Dhs 125-117" },
  { label: "BULK", value: "Dhs 146-132" },
];

export default function TradingPageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "spices" | "beverages">("all");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

    const payload = {
      division: "trading",
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      subject: formData.get("commodity"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="bg-mangrove-900 text-slate-100 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-mangrove-accent shadow-lg shadow-black/10">
        <div className="relative flex items-center h-20 sm:h-24">
          <div
            className="relative h-full flex items-center shrink-0 bg-mangrove-800 pl-4 sm:pl-6 pr-10 sm:pr-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 62% 100%, 0 100%)" }}
          >
            <Link href="/">
              <Image
                src="/images/logo/mangroves-global-logo-badge.png"
                width={64}
                height={64}
                className="h-14 sm:h-16 w-auto block"
                alt="Mangroves Global"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-10 text-sm tracking-widest font-medium text-mangrove-900/80 uppercase">
              <a href="#home" className="hover:text-mangrove-900 transition-colors">Home</a>
              <a href="#about" className="hover:text-mangrove-900 transition-colors">About</a>
              <a href="#products" className="hover:text-mangrove-900 transition-colors">Commodities</a>
              <a href="#quality" className="hover:text-mangrove-900 transition-colors">Quality Assurance</a>
              <a href="#contact" className="hover:text-mangrove-900 transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div>

          <Link
            href="/"
            className="hidden lg:inline-flex items-center mr-4 text-[11px] tracking-widest font-semibold uppercase text-mangrove-900/70 hover:text-mangrove-900"
          >
            Explore Other Businesses
          </Link>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center mr-8 lg:mr-16 px-6 py-2.5 border-2 border-mangrove-900 text-mangrove-900 hover:bg-mangrove-900 hover:text-mangrove-accent transition-all duration-300 rounded-full text-xs tracking-widest font-semibold uppercase"
          >
            <span>Trade Inquiry</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden mr-6 text-mangrove-900 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-mangrove-900/95 backdrop-blur-xl z-60 flex flex-col justify-center items-center space-y-8 text-2xl font-serif text-white">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">About Us</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Commodities</a>
          <a href="#quality" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Quality Control</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-mangrove-accent">Contact</a>
        </div>
      )}

      <main className="pt-20 sm:pt-24">
        {/* HERO */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-mangrove-500 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-mangrove-accent blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-mangrove-500/30 bg-mangrove-800/40 text-mangrove-accent text-xs uppercase tracking-widest mb-8">
              <span>UAE Headquartered • Exporting Indian Spices to the GCC</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
              Rooted in Nature,<br />
              <span className="font-normal text-mangrove-accent">Connecting Globally.</span>
            </h1>

            <p className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12">
              Supplying UAE and GCC buyers with reliable, origin-linked Indian agricultural commodities through transparent sourcing, disciplined quality control, and export-ready trade execution.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href="#products" className="w-full sm:w-auto px-8 py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-full font-semibold text-xs tracking-widest uppercase flex items-center justify-center">
                Explore Commodities
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>
              <a href="#about" className="w-full sm:w-auto px-8 py-4 border border-slate-700 hover:border-mangrove-accent text-white transition-colors duration-300 rounded-full font-medium text-xs tracking-widest uppercase flex items-center justify-center">
                Our Philosophy
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-slate-800/80 w-full max-w-5xl">
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-mangrove-accent font-semibold">99.5%+</span>
                <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">Physical Purity Target</span>
              </div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-mangrove-accent font-semibold">Dual</span>
                <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">India &amp; UAE Presence</span>
              </div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-mangrove-accent font-semibold">0 Defect</span>
                <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">Coffee &amp; Spice Grading</span>
              </div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-mangrove-accent font-semibold">100%</span>
                <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">Traceability &amp; Compliance</span>
              </div>
            </div>
          </div>
        </section>

        {/* Commodities strip */}
        <section className="py-10 px-6 lg:px-16 border-t border-slate-800/50 bg-mangrove-900/60">
          <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-8">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/trading/products/${p.slug}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-slate-800 group-hover:border-mangrove-accent/60 transition-colors relative">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 group-hover:text-mangrove-accent transition-colors">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Market rate ticker */}
        <section className="relative bg-mangrove-accent overflow-hidden" aria-label="Today's market rates">
          <div className="flex items-stretch">
            <div
              className="relative shrink-0 flex items-center bg-mangrove-800 pl-6 pr-12"
              style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
            >
              <span className="relative z-10 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-mangrove-accent whitespace-nowrap">
                Market Rate
              </span>
            </div>
            <div className="flex-1 min-w-0 py-2 pl-6 pr-4 overflow-x-auto">
              <div className="text-mangrove-900 font-extrabold text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap">
                Indian Green Cardamom
              </div>
              <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold text-mangrove-900 whitespace-nowrap mt-0.5">
                {marketRates.map((rate, i) => (
                  <span key={rate.label} className="inline-flex items-center gap-1.5">
                    <span className="font-bold">{rate.label}:</span>
                    <span className="font-extrabold">{rate.value}</span>
                    {i < marketRates.length - 1 && <span className="opacity-40 ml-4">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-28 px-6 lg:px-16 border-t border-slate-800/50 bg-mangrove-900/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block">
                About The Company
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
                Connecting Farmlands to UAE &amp; GCC Trade Gateways.
              </h2>
              <p className="text-slate-400 leading-relaxed font-light text-sm sm:text-base">
                Mangroves Global Trading FZ LLC was established to bridge UAE and GCC buyers directly with authentic Indian agricultural origins. Headquartered in the UAE—one of the world&apos;s most strategic trade hubs—and backed by deep agricultural roots in India, we ensure transparent, efficient, and seamless trade execution.
              </p>
              <div className="pt-4">
                <div className="flex items-center space-x-4 text-xs tracking-wider text-slate-300">
                  <div className="px-4 py-3 rounded-lg bg-mangrove-800/50 border border-slate-700/50">
                    <span className="block font-semibold text-white">Origin Sourcing</span>
                    <span className="text-slate-400">Kerala &amp; Pan-India</span>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-mangrove-800/50 border border-slate-700/50">
                    <span className="block font-semibold text-white">Commercial Gateway</span>
                    <span className="text-slate-400">Ras Al Khaimah, UAE</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src="/trading/images/premium-indian-spices-uae.jpg"
                  alt="Flat lay of premium Indian spices — cloves, dried chillies, turmeric, cardamom, cinnamon and cumin — sourced by Mangroves Global for UAE and GCC buyers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-xl font-serif text-white mb-6 border-b border-slate-800 pb-4">
                Our Core Operating Philosophy
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Sprout,
                    title: "Direct Farm-Level Sourcing",
                    desc: "Source closer to the farm to ensure absolute authenticity, origin purity, and complete lot traceability from harvest to export.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Structured Quality Inspections",
                    desc: "Verify quality before movement through structured multi-point inspections, grading, and laboratory analysis.",
                  },
                  {
                    icon: FileText,
                    title: "Disciplined Export Compliance",
                    desc: "Manage trade documentation professionally for smooth customs clearance and strict global export compliance.",
                  },
                  {
                    icon: Anchor,
                    title: "End-to-End Delivery Integrity",
                    desc: "Deliver with absolute commercial integrity from origin dispatch to destination port, offering flexible Incoterms.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-8 rounded-2xl bg-mangrove-800/20 border border-slate-800 hover:border-mangrove-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 rounded-xl bg-mangrove-500/10 text-mangrove-accent flex items-center justify-center shrink-0 group-hover:bg-mangrove-accent group-hover:text-mangrove-900 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-28 px-6 lg:px-16 border-t border-slate-800/50 bg-mangrove-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
                  Signature Commodities
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
                  Export-Grade Portfolio for UAE &amp; GCC Buyers
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
                {(["all", "spices", "beverages"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all ${
                      filter === cat
                        ? "border-mangrove-accent bg-mangrove-accent text-mangrove-900"
                        : "border-slate-800 bg-mangrove-800/40 text-slate-300 hover:border-mangrove-accent"
                    }`}
                  >
                    {cat === "all" ? "All Items" : cat === "spices" ? "Spices" : "Coffee"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-3">
              {filteredProducts.map((p) => (
                <div
                  key={p.slug}
                  className="group rounded-2xl bg-mangrove-800/30 border border-slate-800/80 overflow-hidden hover:border-mangrove-accent/50 transition-all duration-500"
                >
                  <div className="h-56 bg-slate-800 relative overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 right-4 bg-mangrove-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-mangrove-accent border border-mangrove-accent/30">
                      {p.categoryLabel}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-white mb-2">{p.name}</h3>
                    <p className="text-mangrove-accent text-xs uppercase tracking-wider mb-4">{p.grades}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.description}</p>
                    <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-300">
                      <span>{p.highlight}</span>
                      <CheckCircle2 className="w-4 h-4 text-mangrove-accent" />
                    </div>
                    <Link
                      href={`/trading/products/${p.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mangrove-accent hover:text-white transition-colors"
                    >
                      View Full Specifications
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality */}
        <section id="quality" className="py-28 px-6 lg:px-16 border-t border-slate-800/50 bg-mangrove-900/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
                  Structured QA Approach
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
                  Quality Control Priorities
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Quality is central to our sourcing and export workflow. From initial farm grading to port dispatch, our structured multi-tier inspection protocols guarantee export-ready consistency for UAE and GCC buyers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "99.5%+ Physical Purity Target.",
                  "Moisture Level Checks.",
                  "Foreign Matter Reduction.",
                  "Lot Visual Grading.",
                  "Microbiological Lab Testing.",
                  "Farm-to-Port Traceability.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-mangrove-800/30 border border-slate-800"
                  >
                    <Check className="w-5 h-5 text-mangrove-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-mangrove-800/20 border border-slate-800 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-mangrove-accent/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="font-serif text-2xl text-white mb-6">Positioned for UAE &amp; GCC Buyers</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                {[
                  { icon: Award, text: "Signature Indian spice & commodity origins." },
                  { icon: Eye, text: "Transparent farm-to-port procurement workflows." },
                  { icon: Layers, text: "Reduced intermediary layers for competitive pricing." },
                  { icon: Truck, text: "Flexible Incoterm-based shipment execution (FOB, CIF, CFR)." },
                  { icon: MessageSquare, text: "Professional B2B commercial support & fast responses." },
                ].map(({ icon: Icon, text }, i, arr) => (
                  <li
                    key={text}
                    className={`flex items-center space-x-3 pb-3 ${
                      i < arr.length - 1 ? "border-b border-slate-800/60" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5 text-mangrove-accent shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-28 px-6 lg:px-16 border-t border-slate-800/50 bg-mangrove-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-mangrove-accent text-xs font-semibold uppercase tracking-widest block mb-3">
                  Global Commercial Desk
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
                  Start a Trade Conversation
                </h2>
              </div>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Looking to procure premium Indian agricultural commodities for the UAE or GCC market? Contact our commercial team for specifications, pricing, or custom shipping contracts.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-mangrove-800/60 border border-slate-800 flex items-center justify-center text-mangrove-accent shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">Headquarters</span>
                    <span className="text-sm font-medium text-white block mt-1">
                      CWEP9605, Compass Bldg, Al Hamra Ind Zone, Ras Al Khaimah, UAE
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-mangrove-800/60 border border-slate-800 flex items-center justify-center text-mangrove-accent shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">
                      Direct Phone / WhatsApp
                    </span>
                    <a
                      href="tel:+971541242100"
                      className="text-sm font-medium text-white hover:text-mangrove-accent transition-colors block mt-1"
                    >
                      +971 54 1242 100
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-mangrove-800/60 border border-slate-800 flex items-center justify-center text-mangrove-accent shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">Email Inquiry</span>
                    <a
                      href="mailto:info@mangrovesglobal.com"
                      className="text-sm font-medium text-white hover:text-mangrove-accent transition-colors block mt-1"
                    >
                      info@mangrovesglobal.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-mangrove-800/20 border border-slate-800 p-8 sm:p-12 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tf-name" className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                      Your Name
                    </label>
                    <input
                      id="tf-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      className="w-full bg-mangrove-900/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mangrove-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="tf-company" className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                      Company Name
                    </label>
                    <input
                      id="tf-company"
                      name="company"
                      type="text"
                      required
                      maxLength={150}
                      className="w-full bg-mangrove-900/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mangrove-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tf-email" className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                      Corporate Email
                    </label>
                    <input
                      id="tf-email"
                      name="email"
                      type="email"
                      required
                      maxLength={150}
                      className="w-full bg-mangrove-900/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mangrove-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="tf-commodity" className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                      Commodity of Interest
                    </label>
                    <select
                      id="tf-commodity"
                      name="commodity"
                      className="w-full bg-mangrove-900/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-mangrove-accent transition-colors"
                    >
                      <option>Black Pepper</option>
                      <option>Cloves</option>
                      <option>Nutmeg &amp; Mace</option>
                      <option>Green Cardamom</option>
                      <option>Dry Ginger</option>
                      <option>Robusta Coffee Beans</option>
                      <option>Multiple Items</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="tf-message" className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Message &amp; Quantity Requirements
                  </label>
                  <textarea
                    id="tf-message"
                    name="message"
                    rows={4}
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="Please state destination port, volume, and required Incoterms..."
                    className="w-full bg-mangrove-900/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mangrove-accent transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-mangrove-accent text-mangrove-900 hover:bg-white transition-colors duration-300 rounded-xl font-semibold text-xs tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Trade Inquiry"}
                </button>

                {formStatus === "success" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-mangrove-500/10 border border-mangrove-500/40 text-sm text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-mangrove-accent shrink-0 mt-0.5" />
                    <span>Thank you — your trade inquiry has been sent. Our commercial desk will respond shortly.</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-sm text-slate-200">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>Something went wrong sending your inquiry. Please try again or email us directly.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-mangrove-accent text-mangrove-900/80 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image
            src="/images/logo/mangroves-global-logo-wordmark.png"
            width={140}
            height={28}
            className="h-6 sm:h-7 w-auto block"
            alt="Mangroves Global"
          />
          <p>&copy; 2026 Mangroves Global Trading FZ LLC. All rights reserved</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-mangrove-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-mangrove-900 transition-colors">Terms of Trade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
