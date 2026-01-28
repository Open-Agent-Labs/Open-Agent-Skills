import { NextRequest, NextResponse } from "next/server";
import { getSkillById, getSkillBySlug, getSkillByName, deleteSkill } from "@/lib/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { successResponse, errorResponse, ErrorCode } from "@/lib/api-response";
import { startApiLog, endApiLog, logError } from "@/lib/logger";

/**
 * 获取单个技能详情 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = await startApiLog(request);
  const { id } = await params;

  try {
    const skill = await getSkillById(id);

    if (!skill) {
      const errorData = { code: ErrorCode.NOT_FOUND, data: null, message: "Skill not found" };
      endApiLog(request, startTime, 200, errorData, { id });
      return errorResponse("Skill not found", ErrorCode.NOT_FOUND);
    }

    const responseData = { code: 0, data: skill, message: "Skill fetched successfully" };
    endApiLog(request, startTime, 200, responseData, { id });
    return successResponse(skill, "Skill fetched successfully");
  } catch (error) {
    logError(request, error, { id });
    const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Failed to fetch skill" };
    endApiLog(request, startTime, 200, errorData);
    return errorResponse("Failed to fetch skill", ErrorCode.INTERNAL_ERROR);
  }
}

/**
 * 删除技能 API
 * 需要 API Token 鉴权
 * 支持通过 id、slug 或 name 删除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = await startApiLog(request);
  const { id: identifier } = await params;

  try {
    // 验证 Token
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const apiToken = env.API_TOKEN;
    const authHeader = request.headers.get("Authorization");

    if (!apiToken || authHeader !== `Bearer ${apiToken}`) {
      const errorData = { code: ErrorCode.UNAUTHORIZED, data: null, message: "Unauthorized" };
      endApiLog(request, startTime, 200, errorData, { reason: "Invalid token", identifier });
      return errorResponse("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    // 尝试按不同方式查找技能：先按 id，然后按 slug，最后按 name
    let skill = await getSkillById(identifier);
    let searchType = "id";

    if (!skill) {
      skill = await getSkillBySlug(identifier);
      searchType = "slug";
    }

    if (!skill) {
      skill = await getSkillByName(identifier);
      searchType = "name";
    }

    if (!skill) {
      const errorData = { code: ErrorCode.NOT_FOUND, data: null, message: "Skill not found" };
      endApiLog(request, startTime, 200, errorData, { identifier, reason: "Not found" });
      return errorResponse("Skill not found", ErrorCode.NOT_FOUND);
    }

    // 使用找到的 skill.id 执行删除
    const success = await deleteSkill(skill.id);

    if (!success) {
      const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Failed to delete skill" };
      endApiLog(request, startTime, 200, errorData, { identifier, skillId: skill.id, reason: "Delete failed" });
      return errorResponse("Failed to delete skill", ErrorCode.INTERNAL_ERROR);
    }

    const responseData = { code: 0, data: { id: skill.id, name: skill.name, slug: skill.slug }, message: "Skill deleted successfully" };
    endApiLog(request, startTime, 200, responseData, { identifier, skillId: skill.id, searchType });
    return successResponse({ id: skill.id, name: skill.name, slug: skill.slug }, "Skill deleted successfully");
  } catch (error) {
    logError(request, error, { identifier, operation: "delete skill" });
    const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Internal Server Error" };
    endApiLog(request, startTime, 200, errorData);
    return errorResponse("Internal Server Error", ErrorCode.INTERNAL_ERROR);
  }
}
