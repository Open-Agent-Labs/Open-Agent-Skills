import { NextRequest, NextResponse } from "next/server";
import { getSkills, type GetSkillsParams } from "@/lib/d1";
import type { Category } from "@/data/skills";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params: GetSkillsParams = {};

  const category = searchParams.get("category");
  if (category) {
    params.category = category as Category;
  }

  const featured = searchParams.get("featured");
  if (featured !== null) {
    params.featured = featured === "true" || featured === "1";
  }

  const official = searchParams.get("official");
  if (official !== null) {
    params.official = official === "true" || official === "1";
  }

  const tag = searchParams.get("tag");
  if (tag) {
    params.tag = tag;
  }

  const search = searchParams.get("search");
  if (search) {
    params.search = search;
  }

  const limit = searchParams.get("limit");
  if (limit) {
    params.limit = parseInt(limit, 10);
  }

  const offset = searchParams.get("offset");
  if (offset) {
    params.offset = parseInt(offset, 10);
  }

  try {
    const skills = await getSkills(params);
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills from D1:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
