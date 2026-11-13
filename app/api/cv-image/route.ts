import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl =   process.env.JADI_APP_BASE_URL;
    const token = process.env.JADI_CV_API_TOKEN;
  const imageUrl = request.nextUrl.searchParams.get("url");
  if (!baseUrl || !token || !imageUrl) {
    return new NextResponse(null, { status: 404 });
  }

  let upstream: URL;
  let base: URL;
  try {
    base = new URL(baseUrl);
    upstream = new URL(imageUrl);
  } catch {
    return new NextResponse(null, { status: 404 });
  }
  if (upstream.origin !== base.origin || !/^\/api\/v1\/cv\/images\/[^/]+\/[^/]+$/.test(upstream.pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  const response = await fetch(upstream, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });
  if (!response.ok || !response.body) {
    return new NextResponse(null, { status: response.status === 404 ? 404 : 502 });
  }
  return new NextResponse(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") || "application/octet-stream",
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
