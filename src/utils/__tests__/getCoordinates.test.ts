import axios from 'axios';
import { getCoordinates } from '../getCoordinates';
import { describe, expect, it, vi } from 'vitest';

describe('getCoordinates', () => {
  it('returns coordinates when API returns valid response', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        features: [
          { center: [-58.58, -34.34] },
        ],
      },
    });

    const result = await getCoordinates('Buenos Aires');
    expect(result).toEqual([-58.58, -34.34]);
  });

  it('returns null when API response is malformed', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        features: [],
      },
    });

    const result = await getCoordinates('Somewhere');
    expect(result).toBeNull();
  });

  it('returns null if request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => { });
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network error'));

    const result = await getCoordinates('Rosario');
    expect(result).toBeNull();
  });
});
