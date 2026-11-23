import type { Metadata } from "next";
import CreativeWorkContent, { type Tile } from "@/components/CreativeWorkContent";
import { JsonLd } from "@/components/JsonLd";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mangrovesglobal.com";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("creative-work", {
    title: "Selected Work",
    description:
      "Branding, digital marketing, content production and web work from Mangroves Global's Creative division — a running record of projects for UAE businesses.",
    alternates: { canonical: "/creative/work" },
  });
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mangrovesglobal.com" },
        { "@type": "ListItem", position: 2, name: "Creative", item: "https://mangrovesglobal.com/creative" },
        { "@type": "ListItem", position: 3, name: "Selected Work", item: "https://mangrovesglobal.com/creative/work" },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Selected Work | Mangroves Global Creative",
      url: "https://mangrovesglobal.com/creative/work",
      description: "Branding, digital marketing, content production and web work for UAE businesses.",
      publisher: {
        "@type": "Organization",
        name: "Mangroves Global Trading FZ LLC",
        url: "https://mangrovesglobal.com",
      },
    },
  ],
};

type ApiProject = {
  id: number;
  title: string;
  category: string;
  image: string | null;
  tone: "ink" | "teal" | "gold" | "sand" | null;
  shape: "square" | "tall" | "wide";
  column_index: number;
  sort_order: number;
  link: string | null;
  feature_in_hero: boolean;
};

type HeroFloat = { src: string; alt: string };

const FALLBACK_COLUMNS: Tile[][] = [
  [
    { kind: "photo", image: { src: "/images/portfolio/strandbio/01.jpg", alt: "Strand Biolife brand identity — business cards", remote: false }, category: "Branding", title: "Strand Biolife", link: "/creative/work/strandbio" },
    { kind: "photo", image: { src: "/images/portfolio/ETTARA/ettara.jpg", alt: "Ettara brand identity — silver foil business cards on matte black", remote: false }, category: "Branding · Packaging", title: "Ettara", link: "/creative/work/ettara" },
  ],
  [
    { kind: "photo", image: { src: "/images/portfolio/healthee/branding in biomedical in Dubai helthee.jpg", alt: "Helthee Care Clinic brand identity — magenta ECG wordmark", remote: false }, category: "Branding", title: "Helthee Care Clinic", link: "/creative/work/helthee" },
  ],
  [
    { kind: "photo", image: { src: "/images/portfolio/holidaybasket/logo-hb.jpg", alt: "The Holiday Basket logo — HB monogram with aeroplane motif", remote: false }, category: "Digital Marketing", title: "The Holiday Basket", link: "/creative/work/holiday-basket" },
  ],
  [
    { kind: "photo", image: { src: "/images/portfolio/Zaincart/work-zain-1.jpg", alt: "ZainCart e-commerce app — grocery homepage on mobile", remote: false }, category: "Web Development", title: "ZainCart", link: "/creative/work/zaincart" },
  ],
];

const FALLBACK_HERO_FLOATS: HeroFloat[] = FALLBACK_COLUMNS.flat()
  .filter((t): t is Extract<Tile, { kind: "photo" }> => t.kind === "photo")
  .map((t) => ({ src: t.image.src, alt: t.image.alt }));

async function getPortfolio(): Promise<{ columns: Tile[][]; heroFloats: HeroFloat[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/portfolio-projects`, { next: { revalidate: 60 } });
    if (!res.ok) return { columns: FALLBACK_COLUMNS, heroFloats: FALLBACK_HERO_FLOATS };

    const json = await res.json();
    const projects: ApiProject[] = json.data || [];
    if (projects.length === 0) return { columns: FALLBACK_COLUMNS, heroFloats: FALLBACK_HERO_FLOATS };

    const columns: Tile[][] = [[], [], [], []];
    const heroFloats: HeroFloat[] = [];

    for (const p of projects) {
      const col = Math.min(Math.max(p.column_index, 0), 3);
      if (p.image) {
        const src = `${API_BASE_URL}/storage/${p.image}`;
        columns[col].push({ kind: "photo", image: { src, alt: p.title, remote: true }, category: p.category, title: p.title, shape: p.shape === "square" ? undefined : p.shape });
        if (p.feature_in_hero) heroFloats.push({ src, alt: p.title });
      } else {
        columns[col].push({ kind: "tone", tone: p.tone || "ink", category: p.category, title: p.title });
      }
    }

    return { columns, heroFloats: heroFloats.length ? heroFloats : FALLBACK_HERO_FLOATS };
  } catch {
    return { columns: FALLBACK_COLUMNS, heroFloats: FALLBACK_HERO_FLOATS };
  }
}

export default async function CreativeWorkPage() {
  const { columns, heroFloats } = await getPortfolio();

  return (
    <>
      <JsonLd schema={schema} />
      <CreativeWorkContent columns={columns} heroFloats={heroFloats} />
    </>
  );
}
