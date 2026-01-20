import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { getFilePath } from '../fileCleanup';

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export interface AudioConversionOptions {
    format: 'mp3' | 'wav' | 'm4a' | 'ogg';
    bitrate?: string;
    sampleRate?: number;
}

/**
 * Convert audio format
 */
export async function convertAudio(
    inputPath: string,
    outputFilename: string,
    options: AudioConversionOptions
): Promise<string> {
    const outputPath = getFilePath(outputFilename);
    const bitrate = options.bitrate || '192k';
    const sampleRate = options.sampleRate || 44100;

    return new Promise((resolve, reject) => {
        let command = ffmpeg(inputPath)
            .toFormat(options.format)
            .audioBitrate(bitrate)
            .audioFrequency(sampleRate);

        // Format-specific settings
        if (options.format === 'mp3') {
            command = command.audioCodec('libmp3lame');
        } else if (options.format === 'wav') {
            command = command.audioCodec('pcm_s16le');
        } else if (options.format === 'm4a') {
            command = command.audioCodec('aac');
        } else if (options.format === 'ogg') {
            command = command.audioCodec('libvorbis');
        }

        command
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`오디오 변환 실패: ${err.message}`)))
            .run();
    });
}

/**
 * Get audio metadata
 */
export async function getAudioMetadata(inputPath: string): Promise<any> {
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
