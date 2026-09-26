import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const channel = params.get("channel")?.trim() || "linkedin";
  const requestedLimit = Number(params.get("limit") || "50");
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 100)
    : 50;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("portfolio_publications")
    .select("public_id,channel,title,summary,category,url,published_at")
    .eq("channel", channel)
    .eq("portfolio", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Portfolio publications query failed:", error);
    return NextResponse.json(
      { version: "1", publications: [], error: "publications_query_failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    version: "1",
    publications: (data ?? []).map((publication) => ({
      id: publication.public_id,
      channel: publication.channel,
      title: publication.title,
      summary: publication.summary,
      category: publication.category,
      url: publication.url,
      publishedAt: publication.published_at
    }))
  });
}
