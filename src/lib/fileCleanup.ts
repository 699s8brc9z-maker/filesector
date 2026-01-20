import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/tmp/filesector-uploads';
const CLEANUP_INTERVAL = parseInt(process.env.CLEANUP_INTERVAL || '3600000'); // 1 hour

/**
 * Ensure upload directory exists
 */
export async function ensureUploadDir(): Promise<void> {
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
}

/**
 * Delete a file securely
 */
export async function deleteFile(filePath: string): Promise<void> {
    try {
        await fs.unlink(filePath);
        console.log(`[FileCleanup] Deleted: ${filePath}`);
    } catch (error) {
        console.error(`[FileCleanup] Error deleting ${filePath}:`, error);
    }
}

/**
 * Delete files older than specified age
 */
export async function cleanupOldFiles(maxAgeMs: number = CLEANUP_INTERVAL): Promise<void> {
    try {
        await ensureUploadDir();
        const files = await fs.readdir(UPLOAD_DIR);
        const now = Date.now();

        let deletedCount = 0;

        for (const file of files) {
            const filePath = path.join(UPLOAD_DIR, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && (now - stats.mtimeMs) > maxAgeMs) {
                await deleteFile(filePath);
                deletedCount++;
            }
        }

        if (deletedCount > 0) {
            console.log(`[FileCleanup] Cleaned up ${deletedCount} old files`);
        }
    } catch (error) {
        console.error('[FileCleanup] Error during cleanup:', error);
    }
}

/**
 * Schedule automatic cleanup
 */
export function scheduleCleanup(): NodeJS.Timeout {
    console.log(`[FileCleanup] Scheduled cleanup every ${CLEANUP_INTERVAL / 1000 / 60} minutes`);
    return setInterval(() => {
        cleanupOldFiles();
    }, CLEANUP_INTERVAL);
}

/**
 * Get upload directory path
 */
export function getUploadDir(): string {
    return UPLOAD_DIR;
}

/**
 * Get full file path in upload directory
 */
export function getFilePath(filename: string): string {
    return path.join(UPLOAD_DIR, filename);
}
