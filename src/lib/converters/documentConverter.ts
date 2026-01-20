import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { getFilePath } from '../fileCleanup';

const execAsync = promisify(exec);

export interface DocumentConversionOptions {
    format: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'hwp';
    quality?: 'high' | 'medium' | 'low';
}

/**
 * Check if LibreOffice is installed
 */
export async function checkLibreOfficeInstalled(): Promise<boolean> {
    try {
        // Check common LibreOffice paths on macOS
        const possiblePaths = [
            '/Applications/LibreOffice.app/Contents/MacOS/soffice',
            '/usr/local/bin/soffice',
            '/opt/homebrew/bin/soffice'
        ];

        for (const sofficePath of possiblePaths) {
            try {
                await fs.access(sofficePath);
                return true;
            } catch {
                continue;
            }
        }

        return false;
    } catch (error) {
        return false;
    }
}

/**
 * Get LibreOffice soffice path
 */
export async function getLibreOfficePath(): Promise<string> {
    const possiblePaths = [
        '/Applications/LibreOffice.app/Contents/MacOS/soffice',
        '/usr/local/bin/soffice',
        '/opt/homebrew/bin/soffice'
    ];

    for (const sofficePath of possiblePaths) {
        try {
            await fs.access(sofficePath);
            return sofficePath;
        } catch {
            continue;
        }
    }

    throw new Error('LibreOffice가 설치되어 있지 않습니다. brew install --cask libreoffice 명령으로 설치해주세요.');
}

/**
 * Convert document using LibreOffice
 * Supports: DOCX → PDF, XLSX → PDF, PPTX → PDF, HWP → PDF, HWP → DOCX
 */
export async function convertWithLibreOffice(
    inputPath: string,
    outputFilename: string,
    targetFormat: 'pdf' | 'docx' | 'xlsx'
): Promise<string> {
    const sofficePath = await getLibreOfficePath();
    const outputDir = path.dirname(getFilePath(outputFilename));
    const inputFilename = path.basename(inputPath);
    const inputExt = path.extname(inputPath).toLowerCase();

    // Determine output filter
    let filter = '';
    switch (targetFormat) {
        case 'pdf':
            filter = 'writer_pdf_Export';
            if (inputExt === '.xlsx' || inputExt === '.xls') {
                filter = 'calc_pdf_Export';
            } else if (inputExt === '.pptx' || inputExt === '.ppt') {
                filter = 'impress_pdf_Export';
            }
            break;
        case 'docx':
            filter = 'MS Word 2007 XML';
            break;
        case 'xlsx':
            filter = 'Calc MS Excel 2007 XML';
            break;
    }

    try {
        // Run LibreOffice conversion
        const command = `"${sofficePath}" --headless --convert-to ${targetFormat}${filter ? `:${filter}` : ''} --outdir "${outputDir}" "${inputPath}"`;

        await execAsync(command, {
            timeout: 60000, // 60 second timeout
        });

        // LibreOffice creates file with same name but different extension
        const baseName = path.basename(inputPath, path.extname(inputPath));
        const convertedFile = path.join(outputDir, `${baseName}.${targetFormat}`);
        const finalPath = getFilePath(outputFilename);

        // Rename to our desired filename
        await fs.rename(convertedFile, finalPath);

        return finalPath;
    } catch (error) {
        console.error('[LibreOffice Conversion] Error:', error);
        throw new Error(`LibreOffice 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
}

/**
 * Convert DOCX to PDF
 */
export async function docxToPDF(
    inputPath: string,
    outputFilename: string
): Promise<string> {
    return convertWithLibreOffice(inputPath, outputFilename, 'pdf');
}

/**
 * Convert XLSX to PDF
 */
export async function xlsxToPDF(
    inputPath: string,
    outputFilename: string
): Promise<string> {
    return convertWithLibreOffice(inputPath, outputFilename, 'pdf');
}

/**
 * Convert PPTX to PDF
 */
export async function pptxToPDF(
    inputPath: string,
    outputFilename: string
): Promise<string> {
    return convertWithLibreOffice(inputPath, outputFilename, 'pdf');
}

/**
 * Convert HWP to PDF (Korean Hangul)
 */
export async function hwpToPDF(
    inputPath: string,
    outputFilename: string
): Promise<string> {
    return convertWithLibreOffice(inputPath, outputFilename, 'pdf');
}

/**
 * Convert HWP to DOCX (Korean Hangul)
 */
export async function hwpToDOCX(
    inputPath: string,
    outputFilename: string
): Promise<string> {
    return convertWithLibreOffice(inputPath, outputFilename, 'docx');
}

/**
 * Convert DOCX to HWP (reverse conversion)
 * Note: This may have limited support depending on LibreOffice version
 */
export async function docxToHWP(
    inputPath: string,
    outputFilename: string
): Promise<string> {
    // LibreOffice may not support direct DOCX to HWP conversion
    // This is a placeholder - may need alternative solution
    throw new Error('DOCX → HWP 변환은 현재 지원되지 않습니다. 한글 프로그램에서 직접 열어주세요.');
}

/**
 * Batch convert multiple documents
 */
export async function batchConvertDocuments(
    inputPaths: string[],
    outputFilenames: string[],
    targetFormat: 'pdf' | 'docx' | 'xlsx'
): Promise<string[]> {
    const promises = inputPaths.map((inputPath, index) =>
        convertWithLibreOffice(inputPath, outputFilenames[index], targetFormat)
    );

    return Promise.all(promises);
}
