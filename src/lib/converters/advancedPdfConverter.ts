import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { getFilePath } from '../fileCleanup';
import sharp from 'sharp';

/**
 * Extract text from PDF using pdf-lib
 * Note: pdf-lib has limited text extraction. For production, consider using pdf-parse or pdfjs-dist
 */
export async function extractTextFromPDF(pdfPath: string): Promise<string> {
    try {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();

        // pdf-lib doesn't have built-in text extraction
        // This is a placeholder - for production use pdf-parse
        return `PDF has ${pages.length} pages`;
    } catch (error) {
        console.error('[PDF Text Extraction] Error:', error);
        throw new Error('PDF 텍스트 추출 실패');
    }
}

/**
 * Extract images from PDF pages
 */
export async function pdfToImages(
    pdfPath: string,
    outputBasename: string,
    format: 'jpg' | 'png' = 'jpg'
): Promise<string[]> {
    try {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const outputPaths: string[] = [];

        // Note: pdf-lib doesn't support rendering pages to images
        // For production, use pdf-poppler or pdf2image
        // This is a placeholder implementation

        for (let i = 0; i < pages.length; i++) {
            const outputFilename = `${outputBasename}_page_${i + 1}.${format}`;
            outputPaths.push(getFilePath(outputFilename));
        }

        return outputPaths;
    } catch (error) {
        console.error('[PDF to Images] Error:', error);
        throw new Error('PDF 이미지 추출 실패');
    }
}

/**
 * Split PDF into individual pages
 */
export async function splitPDF(
    pdfPath: string,
    outputBasename: string
): Promise<string[]> {
    try {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();
        const outputPaths: string[] = [];

        for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(copiedPage);

            const outputFilename = `${outputBasename}_page_${i + 1}.pdf`;
            const outputPath = getFilePath(outputFilename);
            const newPdfBytes = await newPdf.save();
            await fs.writeFile(outputPath, newPdfBytes);

            outputPaths.push(outputPath);
        }

        return outputPaths;
    } catch (error) {
        console.error('[PDF Split] Error:', error);
        throw new Error('PDF 분할 실패');
    }
}

/**
 * Extract specific pages from PDF
 */
export async function extractPDFPages(
    pdfPath: string,
    outputFilename: string,
    pageNumbers: number[] // 1-indexed
): Promise<string> {
    try {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const newPdf = await PDFDocument.create();

        // Convert to 0-indexed and copy pages
        const zeroIndexedPages = pageNumbers.map(n => n - 1);
        const copiedPages = await newPdf.copyPages(pdfDoc, zeroIndexedPages);
        copiedPages.forEach(page => newPdf.addPage(page));

        const outputPath = getFilePath(outputFilename);
        const newPdfBytes = await newPdf.save();
        await fs.writeFile(outputPath, newPdfBytes);

        return outputPath;
    } catch (error) {
        console.error('[PDF Extract Pages] Error:', error);
        throw new Error('PDF 페이지 추출 실패');
    }
}

/**
 * Get PDF metadata
 */
export async function getPDFMetadata(pdfPath: string) {
    try {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        return {
            pageCount: pdfDoc.getPageCount(),
            title: pdfDoc.getTitle(),
            author: pdfDoc.getAuthor(),
            subject: pdfDoc.getSubject(),
            creator: pdfDoc.getCreator(),
            producer: pdfDoc.getProducer(),
        };
    } catch (error) {
        console.error('[PDF Metadata] Error:', error);
        throw new Error('PDF 메타데이터 읽기 실패');
    }
}

/**
 * Compress PDF by reducing image quality
 */
export async function compressPDF(
    pdfPath: string,
    outputFilename: string,
    quality: number = 80
): Promise<string> {
    try {
        // This is a simplified implementation
        // For production, use ghostscript or similar tools
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const outputPath = getFilePath(outputFilename);
        const compressedBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
        });

        await fs.writeFile(outputPath, compressedBytes);
        return outputPath;
    } catch (error) {
        console.error('[PDF Compression] Error:', error);
        throw new Error('PDF 압축 실패');
    }
}

/**
 * Rotate PDF pages
 */
export async function rotatePDF(
    pdfPath: string,
    outputFilename: string,
    degrees: 90 | 180 | 270
): Promise<string> {
    try {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();

        pages.forEach(page => {
            page.setRotation({ angle: degrees, type: 'degrees' });
        });

        const outputPath = getFilePath(outputFilename);
        const rotatedBytes = await pdfDoc.save();
        await fs.writeFile(outputPath, rotatedBytes);

        return outputPath;
    } catch (error) {
        console.error('[PDF Rotation] Error:', error);
        throw new Error('PDF 회전 실패');
    }
}
