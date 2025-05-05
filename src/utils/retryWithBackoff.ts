/**
 * Retries a promise-returning function with incremental backoff delay between attempts.
 *
 * @param fn - The async function to retry.
 * @param retries - Maximum number of attempts before failing (default: 3).
 * @param delayMs - Base delay in milliseconds for backoff (default: 500).
 *
 * The delay increases linearly: attempt 1 = delayMs, attempt 2 = 2×delayMs, etc.
 * Useful for handling flaky APIs.
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 500
): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) {
        throw new Error(`Failed after ${retries} retries: ${(err as Error).message}`);
      }
      const wait = delayMs * attempt;
      await new Promise((r) => setTimeout(r, wait));
    }
  }

  throw new Error('Unreachable code'); // Fallback for TS
};
