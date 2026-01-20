import sharp from 'sharp';
import path from 'path';
import { getFilePath } from '../fileCleanup';

export interface ImageConversionOptions {
    format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif';
    quality?: number; // 1-100
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'fill';
}

/**
 * Convert image to specified format
 */
export async function convertImage(
    inputPath: string,
    outputFilename: string,
    options: ImageConversionOptions
): Promise<string> {
    const outputPath = getFilePath(outputFilename);

    let pipeline = sharp(inputPath);

    // Resize if dimensions specified
    if (options.width || options.height) {
        pipeline = pipeline.resize(options.width, options.height, {
            fit: options.fit || 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        });
    }

    // Convert to target format
    switch (options.format) {
        case 'jpg':
        case 'jpeg':
            pipeline = pipeline.jpeg({ quality: options.quality || 90 });
            break;
        case 'png':
            pipeline = pipeline.png({ quality: options.quality || 90 });
            break;
        case 'webp':
            pipeline = pipeline.webp({ quality: options.quality || 90 });
            break;
        case 'gif':
            pipeline = pipeline.gif();
            break;
    }

    await pipeline.toFile(outputPath);

    return outputPath;
}

/**
 * Convert HEIC to JPG/PNG/WebP
 */
export async function convertHEIC(
    inputPath: string,
    outputFilename: string,
    targetFormat: 'jpg' | 'png' | 'webp' = 'jpg',
    quality: number = 90
): Promise<string> {
    return convertImage(inputPath, outputFilename, {
        format: targetFormat,
        quality
    });
}

/**
 * Compress image while maintaining format
 */
export async function compressImage(
    inputPath: string,
    outputFilename: string,
    quality: number = 80
): Promise<string> {
    const ext = path.extname(inputPath).toLowerCase().replace('.', '');
    const format = (ext === 'jpg' ? 'jpeg' : ext) as ImageConversionOptions['format'];

    return convertImage(inputPath, outputFilename, {
        format,
        quality
    });
}

/**
 * Get image metadata
 */
export async function getImageMetadata(inputPath: string) {
    const metadata = await sharp(inputPath).metadata();
    return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size,
        hasAlpha: metadata.hasAlpha
    };
}

/**
 * Batch convert multiple images
 */
export async function batchConvertImages(
    inputPaths: string[],
    outputFilenames: string[],
    options: ImageConversionOptions
): Promise<string[]> {
    const promises = inputPaths.map((inputPath, index) =>
        convertImage(inputPath, outputFilenames[index], options)
    );

    return Promise.all(promises);
}
