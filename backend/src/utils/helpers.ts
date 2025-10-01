import { ApiResponse, ApiError } from '@/types/api';

/**
 * Creates a successful API response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  if (message !== undefined) {
    response.message = message;
  }
  return response;
}

/**
 * Creates an error API response
 */
export function createErrorResponse(
  error: string,
  message?: string
): ApiResponse {
  const response: ApiResponse = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
  };
  if (message !== undefined) {
    response.message = message;
  }
  return response;
}

/**
 * Creates a structured API error
 */
export function createApiError(
  statusCode: number,
  error: string,
  message: string
): ApiError {
  return {
    statusCode,
    error,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Validates if a string is a valid CUID (used by Prisma)
 */
export function isValidCuid(cuid: string): boolean {
  const cuidRegex = /^[0-9a-z]+$/i;
  return cuidRegex.test(cuid) && cuid.length >= 7 && cuid.length <= 32;
}

/**
 * Sanitizes text input
 */
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, ''); // Remove basic HTML characters
}

/**
 * Logs with timestamp
 */
export function logWithTimestamp(level: 'info' | 'error' | 'warn', message: string, ...args: any[]): void {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] ${message}`, ...args);
}