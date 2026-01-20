/**
 * Client-side image compression before upload
 * Reduces upload time and server storage
 */

export interface CompressionOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    maxSizeMB?: number;
}

const DEFAULT_OPTIONS: CompressionOptions = {
    maxWidth: 3840, // 4K
    maxHeight: 2160,
    quality: 0.85, // 85% quality
    maxSizeMB: 1, // Don't compress if smaller than 1MB
};

/**
 * Compress image file before upload
 * Returns compressed file or original if compression not needed
 */
export async function compressImage(
    file: File,
    options: CompressionOptions = {}
): Promise<File> {
    // Only compress images
    if (!file.type.startsWith('image/')) {
        return file;
    }

    // Skip if already small
    const opts = { ...DEFAULT_OPTIONS, ...options };
    if (file.size < (opts.maxSizeMB! * 1024 * 1024)) {
        return file;
    }

    try {
        // Create bitmap from file
        const bitmap = await createImageBitmap(file);

        // Calculate new dimensions
        let { width, height } = bitmap;
        const maxWidth = opts.maxWidth!;
        const maxHeight = opts.maxHeight!;

        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return file;
        }

        ctx.drawImage(bitmap, 0, 0, width, height);

        // Convert to blob with compression
        const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to compress image'));
                    }
                },
                'image/jpeg',
                opts.quality
            );
        });

        // Only return compressed if it's actually smaller
        if (blob.size < file.size) {
            const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
            });

            console.log(`Compressed: ${formatBytes(file.size)} → ${formatBytes(blob.size)} (${Math.round((1 - blob.size / file.size) * 100)}% reduction)`);

            return compressedFile;
        }

        return file;
    } catch (error) {
        console.error('Compression failed:', error);
        return file; // Return original on error
    }
}

/**
 * Compress multiple images
 */
export async function compressImages(
    files: File[],
    options?: CompressionOptions,
    onProgress?: (current: number, total: number) => void
): Promise<File[]> {
    const compressed: File[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await compressImage(file, options);
        compressed.push(result);

        if (onProgress) {
            onProgress(i + 1, files.length);
        }
    }

    return compressed;
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if browser supports image compression
 */
export function supportsCompression(): boolean {
    try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
    } catch {
        return false;
    }
}
