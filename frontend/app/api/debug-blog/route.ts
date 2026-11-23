import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "(not set)";
  const url = `${base}/api/blog-posts?division=logistics`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();
    return NextResponse.json({
      env_var: base,
      url,
      status: res.status,
      ok: res.ok,
      body_preview: text.slice(0, 800),
    });
  } catch (err: unknown) {
    return NextResponse.json({
      env_var: base,
      url,
      error: String(err),
    });
  }
}
