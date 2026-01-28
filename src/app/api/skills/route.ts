import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { pinyin } from "pinyin-pro";
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
 * 生成 URL 友好的 slug
 * @param name 技能名称
 * @returns slug 字符串
 */
function generateSlug(name: string): string {
  // 将中文转换为拼音
  const pinyinText = pinyin(name, { toneType: "none", type: "array" }).join("-");
  
  return pinyinText
    .toLowerCase()
    .trim()
    // 替换空白字符为连字符
    .replace(/\s+/g, "-")
    // 移除特殊字符，只保留字母、数字和连字符
    .replace(/[^a-z0-9\-]/g, "")
    // 移除多余的连字符
    .replace(/-+/g, "-")
    // 移除首尾的连字符
    .replace(/^-+|-+$/g, "");
}

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
    const responseData = { code: 0, data: skills, message: "Skills fetched successfully" };
    endApiLog(request, startTime, 200, responseData, { count: skills.length, params });
    return successResponse(skills, "Skills fetched successfully");
  } catch (error) {
    logError(request, error, { params });
    const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Failed to fetch skills" };
    endApiLog(request, startTime, 200, errorData);
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
      const errorData = { code: ErrorCode.UNAUTHORIZED, data: null, message: "Unauthorized" };
      endApiLog(request, startTime, 200, errorData, { reason: "Invalid token" });
      return errorResponse("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    const { id, tags, slug, ...data } = body;

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

    // 如果没有提供 ID，使用 UUID 生成
    const skillId = id || randomUUID();

    // 处理 slug：如果没有提供，根据 name 生成
    const skillSlug = slug || generateSlug(data.name);

    // 如果是新增操作（没有提供 id），检查 name 是否已存在
    if (!id) {
      const existingSkill = await getSkillByName(data.name);
      if (existingSkill) {
        const errorData = { code: ErrorCode.CONFLICT, data: null, message: "A skill with this name already exists" };
        endApiLog(request, startTime, 200, errorData, { reason: "Duplicate name", name: data.name });
        return errorResponse(
          "A skill with this name already exists",
          ErrorCode.CONFLICT
        );
      }
    } else {
      // 如果是更新操作（提供了 id），检查 name 是否与其他技能重复
      const existingSkill = await getSkillByName(data.name);
      if (existingSkill && existingSkill.id !== id) {
        const errorData = { code: ErrorCode.CONFLICT, data: null, message: "A skill with this name already exists" };
        endApiLog(request, startTime, 200, errorData, { reason: "Duplicate name", name: data.name, id });
        return errorResponse(
          "A skill with this name already exists",
          ErrorCode.CONFLICT
        );
      }
    }

    const skill: Skill = {
      ...data,
      id: skillId,
      slug: skillSlug,
      tags: processedTags,
    };

    // 执行 Upsert 操作
    const updatedSkill = await upsertSkill(skill);

    if (!updatedSkill) {
      const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Failed to create or update skill" };
      endApiLog(request, startTime, 200, errorData, { skillId, reason: "Upsert failed" });
      return errorResponse(
        "Failed to create or update skill",
        ErrorCode.INTERNAL_ERROR
      );
    }

    const successMsg = id ? "Skill updated successfully" : "Skill created successfully";
    const responseData = { code: 0, data: updatedSkill, message: successMsg };
    endApiLog(request, startTime, 200, responseData, { skillId, operation: id ? "update" : "create" });
    return successResponse(updatedSkill, successMsg);
  } catch (error) {
    logError(request, error, { operation: "upsert skill" });
    if (startTime) {
      const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Internal Server Error" };
      endApiLog(request, startTime, 200, errorData);
    }
    return errorResponse("Internal Server Error", ErrorCode.INTERNAL_ERROR);
  }
}
