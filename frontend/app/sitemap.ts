import type { MetadataRoute } from "next";

const baseUrl = "https://mangrovesglobal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/trading",
    "/trading/products/green-cardamom",
    "/trading/products/black-pepper",
    "/trading/products/cloves",
    "/trading/products/nutmeg-mace",
    "/trading/products/dry-ginger",
    "/trading/products/coffee-beans",
    "/logistics",
    "/logistics/sea-freight",
    "/logistics/air-freight",
    "/logistics/road-transport",
    "/logistics/customs-clearance",
    "/logistics/warehousing-3pl",
    "/logistics/supply-chain-consulting",
    "/creative",
    "/creative/advertising",
    "/creative/digital-marketing",
    "/creative/branding",
    "/creative/content-production",
    "/creative/web-development",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
