import { NextRequest, NextResponse } from 'next/server';
import { getFilePath } from '@/lib/fileCleanup';
import {
    videoToGIF,
    videoToMP3,
    convertVideoFormat,
    extractThumbnail,
    compressVideo
} from '@/lib/converters/videoConverter';
import { generateFileId } from '@/lib/fileDetector';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fileId, filename, targetFormat, quality = 'medium' } = body;

        if (!fileId || !filename || !targetFormat) {
            return NextResponse.json(
                { error: '필수 파라미터가 누락되었습니다.' },
                { status: 400 }
            );
        }

        // Get input file path
        const inputPath = getFilePath(filename);

        // Generate output filename
        const outputId = generateFileId();
        const outputFilename = `${outputId}.${targetFormat}`;

        let outputPath: string;

        // Determine conversion type
        if (targetFormat === 'gif') {
            // Convert to GIF
            outputPath = await videoToGIF(inputPath, outputFilename, {
                width: 480,
                fps: 10,
                duration: 30 // Max 30 seconds for GIF
            });
        } else if (targetFormat === 'mp3') {
            // Extract audio as MP3
            outputPath = await videoToMP3(inputPath, outputFilename, '192k');
        } else if (targetFormat === 'mp4' || targetFormat === 'webm') {
            // Convert video format
            outputPath = await convertVideoFormat(
                inputPath,
                outputFilename,
                targetFormat,
                quality as 'high' | 'medium' | 'low'
            );
        } else if (targetFormat === 'jpg' || targetFormat === 'png') {
            // Extract thumbnail
            outputPath = await extractThumbnail(inputPath, outputFilename, 1);
        } else {
            return NextResponse.json(
                { error: '지원하지 않는 변환 형식입니다.' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            outputFile: {
                id: outputId,
                filename: outputFilename,
                format: targetFormat,
            },
        });
    } catch (error) {
        console.error('[Video Conversion API] Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '비디오 변환 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
