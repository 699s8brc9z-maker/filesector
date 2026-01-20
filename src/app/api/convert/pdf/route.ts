import { NextRequest, NextResponse } from 'next/server';
import { getFilePath } from '@/lib/fileCleanup';
import { imageToPDF, imagesToPDF } from '@/lib/converters/pdfConverter';
import { generateFileId } from '@/lib/fileDetector';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { files, pageSize = 'auto', margin = 20 } = body;

        if (!files || !Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { error: '변환할 파일이 없습니다.' },
                { status: 400 }
            );
        }

        // Get input file paths
        const inputPaths = files.map((f: any) => getFilePath(f.filename));

        // Generate output filename
        const outputId = generateFileId();
        const outputFilename = `${outputId}.pdf`;

        // Convert to PDF
        let outputPath;
        if (inputPaths.length === 1) {
            outputPath = await imageToPDF(inputPaths[0], outputFilename, {
                pageSize,
                margin,
            });
        } else {
            outputPath = await imagesToPDF(inputPaths, outputFilename, {
                pageSize,
                margin,
            });
        }

        return NextResponse.json({
            success: true,
            outputFile: {
                id: outputId,
                filename: outputFilename,
                format: 'pdf',
            },
        });
    } catch (error) {
        console.error('[PDF Conversion API] Error:', error);
        return NextResponse.json(
            { error: 'PDF 변환 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
