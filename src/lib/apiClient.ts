/**
 * Fetch with automatic retry logic
 * Handles network errors and server failures gracefully
 */

interface RetryOptions {
    maxRetries?: number;
    retryDelay?: number;
    backoff?: boolean;
    retryOn?: number[]; // HTTP status codes to retry on
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
    backoff: true,
    retryOn: [408, 429, 500, 502, 503, 504], // Timeout, Rate limit, Server errors
};

export async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retryOptions: RetryOptions = {}
): Promise<Response> {
    const opts = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
    let lastError: Error;

    for (let attempt = 0; attempt <= opts.maxRetries!; attempt++) {
        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(30000), // 30 second timeout
            });

            // Check if we should retry based on status code
            if (opts.retryOn!.includes(response.status) && attempt < opts.maxRetries!) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            lastError = error as Error;

            // Don't retry on last attempt
            if (attempt >= opts.maxRetries!) {
                break;
            }

            // Calculate delay with exponential backoff
            const delay = opts.backoff
                ? opts.retryDelay! * Math.pow(2, attempt)
                : opts.retryDelay!;

            console.log(
                `[Retry ${attempt + 1}/${opts.maxRetries}] Retrying after ${delay}ms...`,
                error instanceof Error ? error.message : error
            );

            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw lastError!;
}

/**
 * Wrapper for common API calls with retry
 */
export async function apiCall<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetchWithRetry(endpoint, options);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}
