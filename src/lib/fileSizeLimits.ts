/**
 * File size limits by category (in bytes)
 */
export const FILE_SIZE_LIMITS = {
    image: 50 * 1024 * 1024,      // 50MB - 이미지
    document: 100 * 1024 * 1024,  // 100MB - 문서 (HWP, DOCX, etc.)
    pdf: 100 * 1024 * 1024,       // 100MB - PDF
    video: 500 * 1024 * 1024,     // 500MB - 비디오
    audio: 100 * 1024 * 1024,     // 100MB - 오디오
    default: 100 * 1024 * 1024    // 100MB - 기본
} as const;

/**
 * Get file size limit for a specific category
 */
export function getFileSizeLimit(category: string): number {
    return FILE_SIZE_LIMITS[category as keyof typeof FILE_SIZE_LIMITS] || FILE_SIZE_LIMITS.default;
}

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate file size against category limit
 */
export function validateFileSizeByCategory(
    fileSize: number,
    category: string
): { valid: boolean; limit: number; message?: string } {
    const limit = getFileSizeLimit(category);

    if (fileSize > limit) {
        return {
            valid: false,
            limit,
            message: `파일 크기는 ${formatBytes(limit)} 이하여야 합니다. (현재: ${formatBytes(fileSize)})`
        };
    }

    return { valid: true, limit };
}
