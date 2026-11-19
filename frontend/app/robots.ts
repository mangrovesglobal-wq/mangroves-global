import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/storage/"],
      },
    ],
    sitemap: "https://mangrovesglobal.com/sitemap.xml",
    host: "https://mangrovesglobal.com",
  };
}
