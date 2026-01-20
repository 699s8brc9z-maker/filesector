import path from 'path';

/**
 * Sanitize filename to prevent path traversal attacks
 */
export function sanitizeFilename(filename: string): string {
    // Remove any path components
    const basename = path.basename(filename);

    // Remove dangerous characters and patterns
    return basename
        .replace(/[^a-zA-Z0-9가-힣._-]/g, '_') // 안전한 문자만 허용 (한글 포함)
        .replace(/\.{2,}/g, '.') // 연속된 점 제거 (../ 방지)
        .replace(/^\.+/, '') // 시작 부분의 점 제거
        .substring(0, 255); // 파일명 길이 제한
}

/**
 * Validate and sanitize file path to prevent directory traversal
 */
export function validateFilePath(filename: string, baseDir: string): string {
    const sanitized = sanitizeFilename(filename);
    const fullPath = path.join(baseDir, sanitized);

    // Ensure the resolved path is within the base directory
    const resolvedPath = path.resolve(fullPath);
    const resolvedBaseDir = path.resolve(baseDir);

    if (!resolvedPath.startsWith(resolvedBaseDir)) {
        throw new Error('Invalid file path');
    }

    return resolvedPath;
}

/**
 * Check if filename contains suspicious patterns
 */
export function hasSuspiciousPatterns(filename: string): boolean {
    const suspiciousPatterns = [
        /\.\./,           // Parent directory
        /\//,             // Path separator
        /\\/,             // Windows path separator
        /\0/,             // Null byte
        /[<>:"|?*]/,      // Windows invalid characters
    ];

    return suspiciousPatterns.some(pattern => pattern.test(filename));
}

/**
 * Generate safe filename with timestamp and random string
 */
export function generateSafeFilename(originalFilename: string): string {
    const ext = path.extname(originalFilename).toLowerCase();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);

    // Sanitize extension
    const safeExt = ext.replace(/[^a-z0-9.]/g, '');

    return `${timestamp}-${random}${safeExt}`;
}
