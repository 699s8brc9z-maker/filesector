import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import { getFilePath } from '../fileCleanup';

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export interface VideoConversionOptions {
    format?: 'mp4' | 'webm' | 'gif' | 'mp3';
    quality?: 'high' | 'medium' | 'low';
    maxDuration?: number; // seconds
    width?: number;
    height?: number;
    fps?: number;
}

/**
 * Convert video to GIF
 */
export async function videoToGIF(
    inputPath: string,
    outputFilename: string,
    options: { width?: number; fps?: number; duration?: number } = {}
): Promise<string> {
    const outputPath = getFilePath(outputFilename);
    const width = options.width || 480;
    const fps = options.fps || 10;

    return new Promise((resolve, reject) => {
        let command = ffmpeg(inputPath)
            .outputOptions([
                `-vf scale=${width}:-1:flags=lanczos,fps=${fps}`,
                '-loop 0'
            ])
            .output(outputPath);

        // Limit duration if specified
        if (options.duration) {
            command = command.duration(options.duration);
        }

        command
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`GIF 변환 실패: ${err.message}`)))
            .run();
    });
}

/**
 * Extract audio from video as MP3
 */
export async function videoToMP3(
    inputPath: string,
    outputFilename: string,
    bitrate: string = '192k'
): Promise<string> {
    const outputPath = getFilePath(outputFilename);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat('mp3')
            .audioBitrate(bitrate)
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`MP3 추출 실패: ${err.message}`)))
            .run();
    });
}

/**
 * Convert video format
 */
export async function convertVideoFormat(
    inputPath: string,
    outputFilename: string,
    targetFormat: 'mp4' | 'webm',
    quality: 'high' | 'medium' | 'low' = 'medium'
): Promise<string> {
    const outputPath = getFilePath(outputFilename);

    // Quality presets
    const qualitySettings = {
        high: { videoBitrate: '2000k', audioBitrate: '192k' },
        medium: { videoBitrate: '1000k', audioBitrate: '128k' },
        low: { videoBitrate: '500k', audioBitrate: '96k' }
    };

    const settings = qualitySettings[quality];

    return new Promise((resolve, reject) => {
        let command = ffmpeg(inputPath)
            .videoBitrate(settings.videoBitrate)
            .audioBitrate(settings.audioBitrate);

        if (targetFormat === 'mp4') {
            command = command
                .videoCodec('libx264')
                .audioCodec('aac')
                .outputOptions(['-movflags', '+faststart']);
        } else if (targetFormat === 'webm') {
            command = command
                .videoCodec('libvpx')
                .audioCodec('libvorbis');
        }

        command
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`비디오 변환 실패: ${err.message}`)))
            .run();
    });
}

/**
 * Extract video thumbnail (first frame)
 */
export async function extractThumbnail(
    inputPath: string,
    outputFilename: string,
    timeOffset: number = 1 // seconds
): Promise<string> {
    const outputPath = getFilePath(outputFilename);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .screenshots({
                timestamps: [timeOffset],
                filename: path.basename(outputFilename),
                folder: path.dirname(outputPath),
                size: '640x?'
            })
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`썸네일 추출 실패: ${err.message}`)));
    });
}

/**
 * Get video metadata
 */
export async function getVideoMetadata(inputPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(inputPath, (err, metadata) => {
            if (err) {
                reject(new Error(`메타데이터 읽기 실패: ${err.message}`));
            } else {
                resolve(metadata);
            }
        });
    });
}

/**
 * Compress video
 */
export async function compressVideo(
    inputPath: string,
    outputFilename: string,
    compressionLevel: 'light' | 'medium' | 'heavy' = 'medium'
): Promise<string> {
    const outputPath = getFilePath(outputFilename);

    const compressionSettings = {
        light: { crf: 23, preset: 'medium' },
        medium: { crf: 28, preset: 'medium' },
        heavy: { crf: 32, preset: 'slow' }
    };

    const settings = compressionSettings[compressionLevel];

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions([
                `-crf ${settings.crf}`,
                `-preset ${settings.preset}`,
                '-movflags +faststart'
            ])
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`비디오 압축 실패: ${err.message}`)))
            .run();
    });
}
