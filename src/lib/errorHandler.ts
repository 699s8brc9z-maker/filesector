/**
 * Generic error messages for production
 * Prevents leaking sensitive information to users
 */

export const ERROR_MESSAGES = {
    // Upload errors
    UPLOAD_FAILED: '파일 업로드 중 오류가 발생했습니다.',
    INVALID_FILE: '유효하지 않은 파일입니다.',
    FILE_TOO_LARGE: '파일 크기가 제한을 초과했습니다.',
    UNSUPPORTED_FORMAT: '지원하지 않는 파일 형식입니다.',

    // Conversion errors
    CONVERSION_FAILED: '파일 변환 중 오류가 발생했습니다.',
    CONVERSION_TIMEOUT: '변환 시간이 초과되었습니다. 다시 시도해주세요.',

    // Download errors
    DOWNLOAD_FAILED: '파일 다운로드 중 오류가 발생했습니다.',
    FILE_NOT_FOUND: '파일을 찾을 수 없습니다.',
    FILE_EXPIRED: '파일이 만료되었습니다.',

    // Security errors
    INVALID_REQUEST: '잘못된 요청입니다.',
    RATE_LIMIT_EXCEEDED: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    SUSPICIOUS_ACTIVITY: '비정상적인 활동이 감지되었습니다.',

    // Generic errors
    INTERNAL_ERROR: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    SERVICE_UNAVAILABLE: '서비스를 일시적으로 사용할 수 없습니다.',
} as const;

/**
 * Log error details for debugging (server-side only)
 */
export function logError(context: string, error: unknown, metadata?: Record<string, any>) {
    const errorDetails = {
        timestamp: new Date().toISOString(),
        context,
        error: error instanceof Error ? {
            message: error.message,
            stack: error.stack,
            name: error.name,
        } : error,
        metadata,
        environment: process.env.NODE_ENV,
    };

    // In production, send to logging service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
        console.error('[ERROR]', JSON.stringify(errorDetails));
        // TODO: Send to external logging service
        // Sentry.captureException(error, { contexts: { custom: errorDetails } });
    } else {
        // In development, show detailed errors
        console.error(`[${context}] Error:`, error);
        if (metadata) {
            console.error('Metadata:', metadata);
        }
    }
}

/**
 * Get user-friendly error message
 * Returns generic message in production, detailed in development
 */
export function getUserErrorMessage(error: unknown, fallbackMessage: string = ERROR_MESSAGES.INTERNAL_ERROR): string {
    if (process.env.NODE_ENV === 'development') {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }

    // In production, return generic message
    return fallbackMessage;
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
    message: string,
    statusCode: number = 500,
    details?: Record<string, any>
) {
    const response: any = {
        error: message,
        timestamp: new Date().toISOString(),
    };

    // Only include details in development
    if (process.env.NODE_ENV === 'development' && details) {
        response.details = details;
    }

    return {
        body: response,
        status: statusCode,
    };
}
