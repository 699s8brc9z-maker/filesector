import { NextRequest, NextResponse } from 'next/server';
import { getFilePath } from '@/lib/fileCleanup';
import {
    docxToPDF,
    xlsxToPDF,
    pptxToPDF,
    hwpToPDF,
    hwpToDOCX,
    checkLibreOfficeInstalled
} from '@/lib/converters/documentConverter';
import { generateFileId } from '@/lib/fileDetector';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fileId, filename, targetFormat } = body;

        if (!fileId || !filename || !targetFormat) {
            return NextResponse.json(
                { error: '필수 파라미터가 누락되었습니다.' },
                { status: 400 }
            );
        }

        // Check if LibreOffice is installed
        const isInstalled = await checkLibreOfficeInstalled();
        if (!isInstalled) {
            return NextResponse.json(
                { error: 'LibreOffice가 설치되어 있지 않습니다. 문서 변환 기능을 사용하려면 LibreOffice를 설치해주세요.' },
                { status: 500 }
            );
        }

        // Get input file path
        const inputPath = getFilePath(filename);
        const inputExt = filename.split('.').pop()?.toLowerCase() || '';

        // Generate output filename
        const outputId = generateFileId();
        const outputFilename = `${outputId}.${targetFormat}`;

        let outputPath: string;

        // Determine conversion type
        if (targetFormat === 'pdf') {
            // Convert to PDF
            switch (inputExt) {
                case 'docx':
                case 'doc':
                    outputPath = await docxToPDF(inputPath, outputFilename);
                    break;
                case 'xlsx':
                case 'xls':
                    outputPath = await xlsxToPDF(inputPath, outputFilename);
                    break;
                case 'pptx':
                case 'ppt':
                    outputPath = await pptxToPDF(inputPath, outputFilename);
                    break;
                case 'hwp':
                    outputPath = await hwpToPDF(inputPath, outputFilename);
                    break;
                default:
                    return NextResponse.json(
                        { error: '지원하지 않는 파일 형식입니다.' },
                        { status: 400 }
                    );
            }
        } else if (targetFormat === 'docx' && inputExt === 'hwp') {
            // HWP to DOCX
            outputPath = await hwpToDOCX(inputPath, outputFilename);
        } else {
            return NextResponse.json(
                { error: '지원하지 않는 변환입니다.' },
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
        console.error('[Document Conversion API] Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '문서 변환 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
