import type { NextRequest } from "next/server";

/**
 * 日志级别
 */
export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

/**
 * 格式化时间戳
 */
function formatTimestamp(): string {
  return new Date().toISOString();
}

/**
 * 获取客户端 IP
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * 获取请求查询参数
 */
function getQueryParams(request: NextRequest): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URL(request.url).searchParams;
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * 记录 API 请求日志
 */
export async function logRequest(
  request: NextRequest,
  additionalInfo?: Record<string, any>
): Promise<void> {
  const method = request.method;
  const url = request.url;
  const path = new URL(url).pathname;
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  const queryParams = getQueryParams(request);

  // 记录请求信息
  const logInfo: Record<string, any> = {
    ip,
    userAgent: userAgent.substring(0, 100), // 截断过长的 UA
  };

  // 添加 query 参数
  if (Object.keys(queryParams).length > 0) {
    logInfo.query = queryParams;
  }

  // 添加额外信息
  if (additionalInfo) {
    Object.assign(logInfo, additionalInfo);
  }

  console.log(
    `[${formatTimestamp()}] [${LogLevel.INFO}] [REQUEST] ${method} ${path}`,
    logInfo
  );
}

/**
 * 记录 API 响应日志
 */
export function logResponse(
  request: NextRequest,
  statusCode: number,
  duration?: number,
  responseData?: any,
  additionalInfo?: Record<string, any>
): void {
  const method = request.method;
  const path = new URL(request.url).pathname;
  const level = statusCode >= 500 ? LogLevel.ERROR : statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;

  const logInfo: Record<string, any> = {
    duration: duration ? `${duration}ms` : undefined,
    ...additionalInfo,
  };

  // 添加响应数据
  if (responseData !== undefined) {
    logInfo.response = responseData;
  }

  console.log(
    `[${formatTimestamp()}] [${level}] [RESPONSE] ${method} ${path} - ${statusCode}`,
    logInfo
  );
}

/**
 * 记录错误日志
 */
export function logError(
  request: NextRequest,
  error: unknown,
  additionalInfo?: Record<string, any>
): void {
  const method = request.method;
  const path = new URL(request.url).pathname;

  console.error(
    `[${formatTimestamp()}] [${LogLevel.ERROR}] [ERROR] ${method} ${path}`,
    {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      ...additionalInfo,
    }
  );
}

/**
 * API 日志中间件辅助函数
 * 返回开始时间，用于计算请求耗时
 */
export async function startApiLog(
  request: NextRequest,
  additionalInfo?: Record<string, any>
): Promise<number> {
  await logRequest(request, additionalInfo);
  return Date.now();
}

/**
 * 结束 API 日志记录
 */
export function endApiLog(
  request: NextRequest,
  startTime: number,
  statusCode: number,
  responseData?: any,
  additionalInfo?: Record<string, any>
): void {
  const duration = Date.now() - startTime;
  logResponse(request, statusCode, duration, responseData, additionalInfo);
}
