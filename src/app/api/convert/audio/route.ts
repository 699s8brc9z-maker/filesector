import { NextRequest, NextResponse } from 'next/server';
import { getFilePath } from '@/lib/fileCleanup';
import { convertAudio } from '@/lib/converters/audioConverter';
import { generateFileId } from '@/lib/fileDetector';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fileId, filename, targetFormat, bitrate = '192k' } = body;

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

        // Convert audio
        const outputPath = await convertAudio(inputPath, outputFilename, {
            format: targetFormat as 'mp3' | 'wav' | 'm4a' | 'ogg',
            bitrate,
            sampleRate: 44100
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
        console.error('[Audio Conversion API] Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '오디오 변환 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
