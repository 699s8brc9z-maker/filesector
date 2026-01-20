/**
 * Batch conversion queue system
 * Handles multiple file conversions with progress tracking
 */

export interface ConversionJob {
    id: string;
    filename: string;
    inputPath: string;
    outputFilename: string;
    targetFormat: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number; // 0-100
    error?: string;
    startTime?: number;
    endTime?: number;
}

export interface BatchConversionOptions {
    maxConcurrent?: number;
    onProgress?: (job: ConversionJob) => void;
    onComplete?: (job: ConversionJob) => void;
    onError?: (job: ConversionJob, error: Error) => void;
}

export class ConversionQueue {
    private jobs: Map<string, ConversionJob> = new Map();
    private activeJobs: Set<string> = new Set();
    private maxConcurrent: number;

    constructor(maxConcurrent: number = 3) {
        this.maxConcurrent = maxConcurrent;
    }

    /**
     * Add a job to the queue
     */
    addJob(job: Omit<ConversionJob, 'status' | 'progress'>): string {
        const fullJob: ConversionJob = {
            ...job,
            status: 'pending',
            progress: 0,
        };

        this.jobs.set(job.id, fullJob);
        return job.id;
    }

    /**
     * Get job status
     */
    getJob(jobId: string): ConversionJob | undefined {
        return this.jobs.get(jobId);
    }

    /**
     * Get all jobs
     */
    getAllJobs(): ConversionJob[] {
        return Array.from(this.jobs.values());
    }

    /**
     * Update job progress
     */
    updateJobProgress(jobId: string, progress: number) {
        const job = this.jobs.get(jobId);
        if (job) {
            job.progress = Math.min(100, Math.max(0, progress));
            this.jobs.set(jobId, job);
        }
    }

    /**
     * Mark job as processing
     */
    startJob(jobId: string) {
        const job = this.jobs.get(jobId);
        if (job) {
            job.status = 'processing';
            job.startTime = Date.now();
            this.activeJobs.add(jobId);
            this.jobs.set(jobId, job);
        }
    }

    /**
     * Mark job as completed
     */
    completeJob(jobId: string) {
        const job = this.jobs.get(jobId);
        if (job) {
            job.status = 'completed';
            job.progress = 100;
            job.endTime = Date.now();
            this.activeJobs.delete(jobId);
            this.jobs.set(jobId, job);
        }
    }

    /**
     * Mark job as failed
     */
    failJob(jobId: string, error: string) {
        const job = this.jobs.get(jobId);
        if (job) {
            job.status = 'failed';
            job.error = error;
            job.endTime = Date.now();
            this.activeJobs.delete(jobId);
            this.jobs.set(jobId, job);
        }
    }

    /**
     * Check if can start new job
     */
    canStartNewJob(): boolean {
        return this.activeJobs.size < this.maxConcurrent;
    }

    /**
     * Get pending jobs
     */
    getPendingJobs(): ConversionJob[] {
        return Array.from(this.jobs.values()).filter(job => job.status === 'pending');
    }

    /**
     * Get active jobs count
     */
    getActiveJobsCount(): number {
        return this.activeJobs.size;
    }

    /**
     * Clear completed jobs
     */
    clearCompletedJobs() {
        for (const [id, job] of this.jobs.entries()) {
            if (job.status === 'completed' || job.status === 'failed') {
                this.jobs.delete(id);
            }
        }
    }

    /**
     * Get queue statistics
     */
    getStats() {
        const jobs = Array.from(this.jobs.values());
        return {
            total: jobs.length,
            pending: jobs.filter(j => j.status === 'pending').length,
            processing: jobs.filter(j => j.status === 'processing').length,
            completed: jobs.filter(j => j.status === 'completed').length,
            failed: jobs.filter(j => j.status === 'failed').length,
        };
    }
}

// Global queue instance
let globalQueue: ConversionQueue | null = null;

/**
 * Get or create global conversion queue
 */
export function getConversionQueue(): ConversionQueue {
    if (!globalQueue) {
        globalQueue = new ConversionQueue(3); // Max 3 concurrent conversions
    }
    return globalQueue;
}

/**
 * Process conversion job with automatic queue management
 */
export async function processConversionJob(
    job: Omit<ConversionJob, 'status' | 'progress'>,
    converter: (inputPath: string, outputFilename: string) => Promise<string>
): Promise<string> {
    const queue = getConversionQueue();
    const jobId = queue.addJob(job);

    try {
        queue.startJob(jobId);
        queue.updateJobProgress(jobId, 10);

        const outputPath = await converter(job.inputPath, job.outputFilename);

        queue.updateJobProgress(jobId, 90);
        queue.completeJob(jobId);

        return outputPath;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '변환 실패';
        queue.failJob(jobId, errorMessage);
        throw error;
    }
}
