import { NextRequest, NextResponse } from "next/server";
import {
  getSkills,
  type GetSkillsParams,
  upsertSkill,
  getSkillById,
  getSkillByName,
} from "@/lib/d1";
import type { Category, Skill } from "@/data/skills";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { successResponse, errorResponse, ErrorCode } from "@/lib/api-response";
import { startApiLog, endApiLog, logError } from "@/lib/logger";

/**
 * 获取技能列表 API
 * 支持多种筛选和分页参数
 */
export async function GET(request: NextRequest) {
  const startTime = await startApiLog(request);
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
    endApiLog(request, startTime, 200, { count: skills.length, params });
    return successResponse(skills, "Skills fetched successfully");
  } catch (error) {
    logError(request, error, { params });
    endApiLog(request, startTime, 200);
    return errorResponse("Failed to fetch skills", ErrorCode.INTERNAL_ERROR);
  }
}

/**
 * 创建/更新技能 API
 * 需要 API Token 鉴权
 */
export async function POST(request: NextRequest) {
  let startTime: number | undefined;

  try {
    // 解析 body（需要在 startApiLog 之前）
    const body = await request.json();
    startTime = await startApiLog(request, { body });

    // 验证 Token
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const apiToken = env.API_TOKEN;
    const authHeader = request.headers.get("Authorization");

    if (!apiToken || authHeader !== `Bearer ${apiToken}`) {
      endApiLog(request, startTime, 200, { reason: "Invalid token" });
      return errorResponse("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    const { id, tags, ...data } = body;

    // 处理 tags：如果是字符串，使用逗号分割；如果是数组，直接使用；如果为空，设为 undefined
    let processedTags: string[] | undefined;
    if (typeof tags === "string") {
      // 字符串格式：使用逗号分割，过滤空字符串，去除首尾空格
      processedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      if (processedTags.length === 0) {
        processedTags = undefined;
      }
    } else if (Array.isArray(tags)) {
      // 数组格式：直接使用（兼容旧格式）
      processedTags = tags.filter((tag: string) => tag && tag.trim().length > 0);
      if (processedTags.length === 0) {
        processedTags = undefined;
      }
    } else {
      processedTags = undefined;
    }

    // 如果没有提供 ID，根据名称生成
    const skillId = id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // 如果是新增操作（没有提供 id），检查 name 是否已存在
    if (!id) {
      const existingSkill = await getSkillByName(data.name);
      if (existingSkill) {
        endApiLog(request, startTime, 200, { reason: "Duplicate name", name: data.name });
        return errorResponse(
          "A skill with this name already exists",
          ErrorCode.CONFLICT
        );
      }
    } else {
      // 如果是更新操作（提供了 id），检查 name 是否与其他技能重复
      const existingSkill = await getSkillByName(data.name);
      if (existingSkill && existingSkill.id !== id) {
        endApiLog(request, startTime, 200, { reason: "Duplicate name", name: data.name, id });
        return errorResponse(
          "A skill with this name already exists",
          ErrorCode.CONFLICT
        );
      }
    }

    const skill: Skill = {
      ...data,
      id: skillId,
      tags: processedTags,
    };

    // 执行 Upsert 操作
    const updatedSkill = await upsertSkill(skill);

    if (!updatedSkill) {
      endApiLog(request, startTime, 200, { skillId, reason: "Upsert failed" });
      return errorResponse(
        "Failed to create or update skill",
        ErrorCode.INTERNAL_ERROR
      );
    }

    endApiLog(request, startTime, 200, { skillId, operation: id ? "update" : "create" });
    return successResponse(
      updatedSkill,
      id ? "Skill updated successfully" : "Skill created successfully"
    );
  } catch (error) {
    logError(request, error, { operation: "upsert skill" });
    if (startTime) {
      endApiLog(request, startTime, 200);
    }
    return errorResponse("Internal Server Error", ErrorCode.INTERNAL_ERROR);
  }
}
