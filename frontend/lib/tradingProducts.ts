export type TradingProduct = {
  slug: string;
  name: string;
  category: "spices" | "beverages";
  categoryLabel: string;
  grades: string;
  description: string;
  highlight: string;
  icon: string;
  iconAlt: string;
};

export const tradingProducts: TradingProduct[] = [
  {
    slug: "black-pepper",
    name: "Black Pepper",
    category: "spices",
    categoryLabel: "Spices",
    grades: "Tellicherry (TGEB), Malabar Garbled (MG1), Cracked & Powder.",
    description:
      "Bulk black pepper export to UAE and GCC buyers, sourced from prime Malabar coastal regions with maximum piperine heat and bold uniform berry density.",
    highlight: "High Piperine Heat",
    icon: "/images/icons/products/black-pepper-icon.png",
    iconAlt: "Hand-drawn illustration of whole black peppercorns",
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
    icon: "/images/icons/products/cloves-icon.png",
    iconAlt: "Hand-drawn illustration of whole cloves",
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
    icon: "/images/icons/products/nutmeg-mace-icon.png",
    iconAlt: "Hand-drawn illustration of whole nutmeg",
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
    icon: "/images/icons/products/green-cardamom-icon.png",
    iconAlt: "Hand-drawn illustration of green cardamom pods",
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
    icon: "/images/icons/products/dry-ginger-icon.png",
    iconAlt: "Hand-drawn illustration of dried ginger root",
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
    icon: "/images/icons/products/coffee-beans-icon.png",
    iconAlt: "Hand-drawn illustration of green coffee beans",
  },
];
