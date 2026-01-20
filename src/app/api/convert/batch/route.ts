import { NextRequest, NextResponse } from 'next/server';
import { getConversionQueue, processConversionJob, type ConversionJob } from '@/lib/conversionQueue';
import { getFilePath } from '@/lib/fileCleanup';
import { generateFileId } from '@/lib/fileDetector';
import { convertImage } from '@/lib/converters/imageConverter';
import { docxToPDF, xlsxToPDF, pptxToPDF, hwpToPDF } from '@/lib/converters/documentConverter';

interface BatchConversionRequest {
    files: Array<{
        id: string;
        filename: string;
        targetFormat: string;
    }>;
}

export async function POST(request: NextRequest) {
    try {
        const body: BatchConversionRequest = await request.json();
        const { files } = body;

        if (!files || !Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { error: '변환할 파일이 없습니다.' },
                { status: 400 }
            );
        }

        if (files.length > 10) {
            return NextResponse.json(
                { error: '최대 10개 파일까지 동시 변환 가능합니다.' },
                { status: 400 }
            );
        }

        const queue = getConversionQueue();
        const jobIds: string[] = [];
        const results: Array<{ success: boolean; fileId?: string; filename?: string; error?: string }> = [];

        // Process each file
        for (const file of files) {
            try {
                const inputPath = getFilePath(file.filename);
                const inputExt = file.filename.split('.').pop()?.toLowerCase() || '';
                const outputId = generateFileId();
                const outputFilename = `${outputId}.${file.targetFormat}`;

                // Determine converter function
                let converter: (inputPath: string, outputFilename: string) => Promise<string>;

                if (file.targetFormat === 'pdf') {
                    switch (inputExt) {
                        case 'docx':
                        case 'doc':
                            converter = docxToPDF;
                            break;
                        case 'xlsx':
                        case 'xls':
                            converter = xlsxToPDF;
                            break;
                        case 'pptx':
                        case 'ppt':
                            converter = pptxToPDF;
                            break;
                        case 'hwp':
                            converter = hwpToPDF;
                            break;
                        default:
                            // Image to PDF
                            converter = async (input, output) => {
                                // Use existing image to PDF converter
                                throw new Error('이미지 → PDF 변환은 별도 API를 사용해주세요.');
                            };
                    }
                } else if (['jpg', 'png', 'webp'].includes(file.targetFormat)) {
                    // Image conversion
                    converter = async (input, output) => {
                        return convertImage(input, output, {
                            format: file.targetFormat as 'jpg' | 'png' | 'webp',
                            quality: 90,
                        });
                    };
                } else {
                    throw new Error('지원하지 않는 변환 형식입니다.');
                }

                // Create job
                const job: Omit<ConversionJob, 'status' | 'progress'> = {
                    id: outputId,
                    filename: file.filename,
                    inputPath,
                    outputFilename,
                    targetFormat: file.targetFormat,
                };

                // Process conversion
                await processConversionJob(job, converter);

                results.push({
                    success: true,
                    fileId: outputId,
                    filename: outputFilename,
                });
            } catch (error) {
                results.push({
                    success: false,
                    error: error instanceof Error ? error.message : '변환 실패',
                });
            }
        }

        return NextResponse.json({
            success: true,
            results,
            stats: queue.getStats(),
        });
    } catch (error) {
        console.error('[Batch Conversion API] Error:', error);
        return NextResponse.json(
            { error: '일괄 변환 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

/**
 * GET endpoint to check batch conversion status
 */
export async function GET(request: NextRequest) {
    try {
        const queue = getConversionQueue();
        const stats = queue.getStats();
        const jobs = queue.getAllJobs();

        return NextResponse.json({
            success: true,
            stats,
            jobs,
        });
    } catch (error) {
        console.error('[Batch Status API] Error:', error);
        return NextResponse.json(
            { error: '상태 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
