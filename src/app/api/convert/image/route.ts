import { NextRequest, NextResponse } from 'next/server';
import { getFilePath } from '@/lib/fileCleanup';
import { convertImage, convertHEIC } from '@/lib/converters/imageConverter';
import { generateFileId } from '@/lib/fileDetector';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fileId, filename, targetFormat, quality = 90 } = body;

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

        // Convert image
        const outputPath = await convertImage(inputPath, outputFilename, {
            format: targetFormat as 'jpg' | 'png' | 'webp' | 'gif',
            quality: parseInt(quality),
        });

        return NextResponse.json({
            success: true,
            outputFile: {
                id: outputId,
                filename: outputFilename,
                format: targetFormat,
            },
        });
    } catch (error) {
        console.error('[Image Conversion API] Error:', error);
        return NextResponse.json(
            { error: '이미지 변환 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
