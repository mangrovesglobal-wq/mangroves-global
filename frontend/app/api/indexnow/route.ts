import { NextResponse } from "next/server";

const BASE = "https://mangrovesglobal.com";

// All static URLs that should be submitted to IndexNow
const STATIC_URLS = [
  `${BASE}/`,
  `${BASE}/about`,
  `${BASE}/contact`,
  `${BASE}/become-a-partner`,
  `${BASE}/trading`,
  `${BASE}/trading/about`,
  `${BASE}/trading/contact`,
  `${BASE}/trading/commodities`,
  `${BASE}/trading/sourcing-supply`,
  `${BASE}/trading/quality-assurance`,
  `${BASE}/trading/blog`,
  `${BASE}/trading/products/green-cardamom`,
  `${BASE}/trading/products/black-pepper`,
  `${BASE}/trading/products/cloves`,
  `${BASE}/trading/products/nutmeg-mace`,
  `${BASE}/trading/products/dry-ginger`,
  `${BASE}/trading/products/coffee-beans`,
  `${BASE}/logistics`,
  `${BASE}/logistics/import-export`,
  `${BASE}/logistics/sea-freight`,
  `${BASE}/logistics/air-freight`,
  `${BASE}/logistics/road-transport`,
  `${BASE}/logistics/customs-clearance`,
  `${BASE}/logistics/warehousing-3pl`,
  `${BASE}/logistics/supply-chain-consulting`,
  `${BASE}/logistics/freight-coordination`,
  `${BASE}/logistics/last-mile-distribution`,
  `${BASE}/logistics/blog`,
  `${BASE}/creative`,
  `${BASE}/creative/services`,
  `${BASE}/creative/work`,
  `${BASE}/creative/advertising`,
  `${BASE}/creative/branding`,
  `${BASE}/creative/content-production`,
  `${BASE}/creative/digital-marketing`,
  `${BASE}/creative/web-development`,
  `${BASE}/creative/blog`,
];

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  // Allow optional extra URLs in the request body
  let extraUrls: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body.urls)) extraUrls = body.urls;
  } catch { /* no body */ }

  const urlList = [...STATIC_URLS, ...extraUrls];

  const payload = {
    host: "mangrovesglobal.com",
    key,
    keyLocation: `${BASE}/${key}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return NextResponse.json(
    { submitted: urlList.length, status: res.status },
    { status: res.ok ? 200 : 502 }
  );
}

// GET — ping a single URL (useful for blog post publish webhook)
export async function GET(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url param required" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}`,
  );

  return NextResponse.json({ url, status: res.status }, { status: res.ok ? 200 : 502 });
}
