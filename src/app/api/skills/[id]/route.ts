import { NextRequest, NextResponse } from "next/server";
import { getSkillById, deleteSkill } from "@/lib/d1";
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
      endApiLog(request, startTime, 200, { id });
      return errorResponse("Skill not found", ErrorCode.NOT_FOUND);
    }

    endApiLog(request, startTime, 200, { id });
    return successResponse(skill, "Skill fetched successfully");
  } catch (error) {
    logError(request, error, { id });
    endApiLog(request, startTime, 200);
    return errorResponse("Failed to fetch skill", ErrorCode.INTERNAL_ERROR);
  }
}

/**
 * 删除技能 API
 * 需要 API Token 鉴权
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = await startApiLog(request);
  const { id } = await params;

  try {
    // 验证 Token
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const apiToken = env.API_TOKEN;
    const authHeader = request.headers.get("Authorization");

    if (!apiToken || authHeader !== `Bearer ${apiToken}`) {
      endApiLog(request, startTime, 200, { reason: "Invalid token", id });
      return errorResponse("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    const success = await deleteSkill(id);

    if (!success) {
      endApiLog(request, startTime, 200, { id, reason: "Delete failed" });
      return errorResponse("Failed to delete skill", ErrorCode.INTERNAL_ERROR);
    }

    endApiLog(request, startTime, 200, { id });
    return successResponse({ id }, "Skill deleted successfully");
  } catch (error) {
    logError(request, error, { id, operation: "delete skill" });
    endApiLog(request, startTime, 200);
    return errorResponse("Internal Server Error", ErrorCode.INTERNAL_ERROR);
  }
}
