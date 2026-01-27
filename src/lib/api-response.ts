import { NextResponse } from "next/server";

/**
 * 统一的 API 响应结构
 */
export interface ApiResponse<T = any> {
  code: number; // 业务状态码
  data: T | null; // 响应数据
  message: string; // 响应消息
}

/**
 * 成功响应
 * @param data 响应数据
 * @param message 消息（可选）
 */
export function successResponse<T>(
  data: T,
  message = "Success"
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      code: 0,
      data,
      message,
    },
    { status: 200 }
  );
}

/**
 * 错误响应
 * @param message 错误消息
 * @param code 业务错误码（默认 -1）
 */
export function errorResponse(
  message: string,
  code = -1
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      code,
      data: null,
      message,
    },
    { status: 200 }
  );
}

/**
 * 业务错误码定义
 */
export const ErrorCode = {
  // 通用错误
  SUCCESS: 0,
  UNKNOWN_ERROR: -1,

  // 客户端错误 (400-499)
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  // 服务器错误 (500-599)
  INTERNAL_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;
