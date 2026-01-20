import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { ensureUploadDir, getFilePath } from '@/lib/fileCleanup';
import { detectFileCategory, generateFileId, formatFileSize } from '@/lib/fileDetector';
import { validateFileSizeByCategory, formatBytes } from '@/lib/fileSizeLimits';
import { sanitizeFilename, hasSuspiciousPatterns } from '@/lib/security';
import { ERROR_MESSAGES, logError, createErrorResponse } from '@/lib/errorHandler';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    try {
        // Ensure upload directory exists
        await ensureUploadDir();

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: '파일이 업로드되지 않았습니다.' },
                { status: 400 }
            );
        }

        // Security: Check for suspicious filename patterns
        if (hasSuspiciousPatterns(file.name)) {
            logError('Upload API', new Error('Suspicious filename detected'), {
                filename: file.name,
            });
            return NextResponse.json(
                { error: ERROR_MESSAGES.INVALID_FILE },
                { status: 400 }
            );
        }

        // Detect file category first
        const category = detectFileCategory(file.type, file.name);

        // Validate file size based on category
        const sizeValidation = validateFileSizeByCategory(file.size, category);
        if (!sizeValidation.valid) {
            return NextResponse.json(
                { error: sizeValidation.message },
                { status: 400 }
            );
        }

        // Generate unique file ID with sanitized extension
        const fileId = generateFileId();
        const originalExtension = file.name.split('.').pop() || '';
        const sanitizedExtension = sanitizeFilename(originalExtension);
        const savedFilename = `${fileId}.${sanitizedExtension}`;
        const filePath = getFilePath(savedFilename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            file: {
                id: fileId,
                name: file.name,
                size: file.size,
                type: file.type,
                category,
                savedFilename,
                sizeLimit: formatBytes(sizeValidation.limit),
            },
        });
    } catch (error) {
        // Log detailed error server-side
        logError('Upload API', error, {
            userAgent: request.headers.get('user-agent'),
        });

        // Return generic error to user
        return NextResponse.json(
            { error: ERROR_MESSAGES.UPLOAD_FAILED },
            { status: 500 }
        );
    }
}
