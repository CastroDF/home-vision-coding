import { retryWithBackoff } from '@/utils/retryWithBackoff';
import { describe, expect, it, vi } from 'vitest';

describe('retryWithBackoff', () => {
  it('returns result if function succeeds immediately', async () => {
    const fn = vi.fn().mockResolvedValue('success');

    const result = await retryWithBackoff(fn, 3, 10);

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries until function succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('success');

    const result = await retryWithBackoff(fn, 3, 10);

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws error after max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('persistent failure'));

    await expect(retryWithBackoff(fn, 3, 10)).rejects.toThrow(
      'Failed after 3 retries: persistent failure'
    );
  });
});
