import { NextRequest, NextResponse } from 'next/server';
import { readFile, unlink } from 'fs/promises';
import { getFilePath } from '@/lib/fileCleanup';
import { sanitizeFilename, hasSuspiciousPatterns } from '@/lib/security';
import { ERROR_MESSAGES, logError } from '@/lib/errorHandler';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ fileId: string }> }
) {
    try {
        const { fileId } = await params;
        const searchParams = request.nextUrl.searchParams;
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json(
                { error: '파일명이 지정되지 않았습니다.' },
                { status: 400 }
            );
        }

        // Security: Validate filename
        if (hasSuspiciousPatterns(filename)) {
            logError('Download API', new Error('Suspicious filename in download'), {
                filename,
                fileId,
                ip: request.ip,
            });
            return NextResponse.json(
                { error: ERROR_MESSAGES.INVALID_REQUEST },
                { status: 400 }
            );
        }

        // Security: Sanitize filename to prevent path traversal
        const sanitizedFilename = sanitizeFilename(filename);
        const filePath = getFilePath(sanitizedFilename);

        // Read file
        const fileBuffer = await readFile(filePath);

        // Determine content type from extension
        const ext = sanitizedFilename.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';

        switch (ext) {
            case 'jpg':
            case 'jpeg':
                contentType = 'image/jpeg';
                break;
            case 'png':
                contentType = 'image/png';
                break;
            case 'webp':
                contentType = 'image/webp';
                break;
            case 'gif':
                contentType = 'image/gif';
                break;
            case 'pdf':
                contentType = 'application/pdf';
                break;
            case 'mp3':
                contentType = 'audio/mpeg';
                break;
            case 'mp4':
                contentType = 'video/mp4';
                break;
            case 'webm':
                contentType = 'video/webm';
                break;
        }

        // Create response with file
        const response = new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${sanitizedFilename}"`,
                'Cache-Control': 'no-store',
                'X-Content-Type-Options': 'nosniff', // Security header
            },
        });

        // Delete file after sending (zero-trace security)
        // Note: This happens asynchronously after response is sent
        unlink(filePath).catch(err => {
            logError('Download API', err, {
                context: 'File deletion after download',
                filename: sanitizedFilename,
            });
        });

        return response;
    } catch (error) {
        // Log detailed error server-side
        logError('Download API', error, {
            ip: request.ip,
            userAgent: request.headers.get('user-agent'),
        });

        // Return generic error to user
        return NextResponse.json(
            { error: ERROR_MESSAGES.FILE_NOT_FOUND },
            { status: 404 }
        );
    }
}
