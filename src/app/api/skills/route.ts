import { NextRequest, NextResponse } from "next/server";
import { getSkills, type GetSkillsParams, upsertSkill } from "@/lib/d1";
import type { Category, Skill } from "@/data/skills";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * 获取技能列表 API
 * 支持多种筛选和分页参数
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params: GetSkillsParams = {};

  // 解析查询参数
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

/**
 * 创建/更新技能 API
 * 需要 API Token 鉴权
 */
export async function POST(request: NextRequest) {
  try {
    // 验证 Token
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const apiToken = env.API_TOKEN;
    const authHeader = request.headers.get("Authorization");

    if (!apiToken || authHeader !== `Bearer ${apiToken}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...data } = body;

    // 如果没有提供 ID，根据名称生成
    const skillId = id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const skill: Skill = {
      ...data,
      id: skillId,
    };

    // 执行 Upsert 操作
    const updatedSkill = await upsertSkill(skill);

    if (!updatedSkill) {
      return NextResponse.json(
        { error: "Failed to create or update skill" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error("Error in POST /api/skills:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
