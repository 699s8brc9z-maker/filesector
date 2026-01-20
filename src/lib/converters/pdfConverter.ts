import { PDFDocument, rgb } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs/promises';
import { getFilePath } from '../fileCleanup';

export interface ImageToPDFOptions {
    pageSize?: 'A4' | 'Letter' | 'auto';
    margin?: number;
    orientation?: 'portrait' | 'landscape';
}

/**
 * Convert single image to PDF
 */
export async function imageToPDF(
    imagePath: string,
    outputFilename: string,
    options: ImageToPDFOptions = {}
): Promise<string> {
    const pdfDoc = await PDFDocument.create();
    const imageBytes = await fs.readFile(imagePath);

    // Detect image type and embed
    let image;
    const ext = imagePath.toLowerCase();

    if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
        image = await pdfDoc.embedJpg(imageBytes);
    } else if (ext.endsWith('.png')) {
        image = await pdfDoc.embedPng(imageBytes);
    } else {
        // Convert other formats to PNG first
        const pngBuffer = await sharp(imagePath).png().toBuffer();
        image = await pdfDoc.embedPng(pngBuffer);
    }

    const { width, height } = image.scale(1);

    // Determine page size
    let pageWidth = width;
    let pageHeight = height;

    if (options.pageSize === 'A4') {
        pageWidth = 595; // A4 width in points
        pageHeight = 842; // A4 height in points
    } else if (options.pageSize === 'Letter') {
        pageWidth = 612;
        pageHeight = 792;
    }

    // Apply orientation
    if (options.orientation === 'landscape') {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate image dimensions to fit page with margin
    const margin = options.margin || 20;
    const maxWidth = pageWidth - (margin * 2);
    const maxHeight = pageHeight - (margin * 2);

    let imgWidth = width;
    let imgHeight = height;

    // Scale to fit
    const scale = Math.min(maxWidth / width, maxHeight / height, 1);
    imgWidth = width * scale;
    imgHeight = height * scale;

    // Center image
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    page.drawImage(image, {
        x,
        y,
        width: imgWidth,
        height: imgHeight,
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = getFilePath(outputFilename);
    await fs.writeFile(outputPath, pdfBytes);

    return outputPath;
}

/**
 * Convert multiple images to a single PDF
 */
export async function imagesToPDF(
    imagePaths: string[],
    outputFilename: string,
    options: ImageToPDFOptions = {}
): Promise<string> {
    const pdfDoc = await PDFDocument.create();

    for (const imagePath of imagePaths) {
        const imageBytes = await fs.readFile(imagePath);

        // Detect image type and embed
        let image;
        const ext = imagePath.toLowerCase();

        if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
            image = await pdfDoc.embedJpg(imageBytes);
        } else if (ext.endsWith('.png')) {
            image = await pdfDoc.embedPng(imageBytes);
        } else {
            // Convert other formats to PNG first
            const pngBuffer = await sharp(imagePath).png().toBuffer();
            image = await pdfDoc.embedPng(pngBuffer);
        }

        const { width, height } = image.scale(1);

        // Determine page size
        let pageWidth = width;
        let pageHeight = height;

        if (options.pageSize === 'A4') {
            pageWidth = 595;
            pageHeight = 842;
        } else if (options.pageSize === 'Letter') {
            pageWidth = 612;
            pageHeight = 792;
        }

        // Apply orientation
        if (options.orientation === 'landscape') {
            [pageWidth, pageHeight] = [pageHeight, pageWidth];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Calculate image dimensions to fit page with margin
        const margin = options.margin || 20;
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);

        let imgWidth = width;
        let imgHeight = height;

        // Scale to fit
        const scale = Math.min(maxWidth / width, maxHeight / height, 1);
        imgWidth = width * scale;
        imgHeight = height * scale;

        // Center image
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        page.drawImage(image, {
            x,
            y,
            width: imgWidth,
            height: imgHeight,
        });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = getFilePath(outputFilename);
    await fs.writeFile(outputPath, pdfBytes);

    return outputPath;
}

/**
 * Merge multiple PDFs into one
 */
export async function mergePDFs(
    pdfPaths: string[],
    outputFilename: string
): Promise<string> {
    const mergedPdf = await PDFDocument.create();

    for (const pdfPath of pdfPaths) {
        const pdfBytes = await fs.readFile(pdfPath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const outputPath = getFilePath(outputFilename);
    await fs.writeFile(outputPath, pdfBytes);

    return outputPath;
}
