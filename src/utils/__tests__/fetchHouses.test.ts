import { fetchHouses } from '@/utils/fetchHouses';
import axios from 'axios';
import { vi } from 'vitest';

describe('fetchHouses', () => {
  const mockResponse = {
    status: 200,
    data: {
      ok: true,
      houses: [
        {
          id: 1,
          address: '123 Main St',
          homeowner: 'Alice',
          price: 100000,
          photoURL: 'test.jpg',
        },
      ],
    },
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns houses when API responds with ok: true', async () => {
    vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResponse));

    const data = await fetchHouses(1, 10);
    expect(data).toEqual(mockResponse.data);
  });

  it('throws if API status is not 200', async () => {
    vi.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({ ...mockResponse, status: 500 })
    );

    await expect(fetchHouses()).rejects.toThrow('Request failed with status: 500');
  });

  it('throws if API responds with ok: false', async () => {
    vi.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        ...mockResponse,
        data: { ...mockResponse.data, ok: false },
      })
    );

    await expect(fetchHouses()).rejects.toThrow('API responded with ok: false');
  });
});
