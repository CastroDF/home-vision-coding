import { renderHook, act } from '@testing-library/react';
import { HousesProvider, useHouses } from '@/context/HousesContext';
import * as fetchHousesModule from '@/utils/fetchHouses';
import * as getCoordinatesModule from '@/utils/getCoordinates';
import { vi } from 'vitest';

describe('HousesContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('loads more houses', async () => {
    vi.spyOn(fetchHousesModule, 'fetchHouses').mockResolvedValue({
      houses: [
        {
          id: 1,
          address: '123 Main St',
          homeowner: 'Alice',
          price: 100000,
          photoURL: 'test.jpg',
        },
      ],
      ok: true,
    });

    const wrapper = ({ children }: any) => (
      <HousesProvider>{ children }</HousesProvider>
    );
    const { result } = renderHook(() => useHouses(), { wrapper });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.houses).toHaveLength(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('sets error if fetching fails', async () => {
    vi.spyOn(fetchHousesModule, 'fetchHouses').mockRejectedValue(
      new Error('Fail')
    );

    const wrapper = ({ children }: any) => (
      <HousesProvider>{ children }</HousesProvider>
    );
    const { result } = renderHook(() => useHouses(), { wrapper });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.isError).toBe(true);
  });

  it('caches coordinates after fetching and saves to localStorage', async () => {
    const address = '123 Main St';
    const coords: [number, number] = [40, -74];

    const getCoordsMock = vi
      .spyOn(getCoordinatesModule, 'getCoordinates')
      .mockResolvedValue(coords);

    // Spy on localStorage.setItem to inspect what gets written to localStorage
    const localStorageSpy = vi.spyOn(localStorage.__proto__, 'setItem');

    const wrapper = ({ children }: any) => (
      <HousesProvider>{ children }</HousesProvider>
    );

    const { result } = renderHook(() => useHouses(), { wrapper });

    // Call getCoordinates, which should trigger the mocked fetch and update the cache
    let resolved: [number, number] | null = null;
    await act(async () => {
      resolved = await result.current.getCoordinates(address);
    });

    expect(resolved).toEqual(coords);
    expect(getCoordsMock).toHaveBeenCalledTimes(1);

    const setCalls = localStorageSpy.mock.calls.filter(
      ([key]) => key === 'coords'
    );
    // There should be at least one call to cache the coordinates
    expect(setCalls.length).toBeGreaterThan(0);

    const lastSetValue = String(setCalls[setCalls.length - 1]?.[1] ?? '[]');
    const lastCoordsEntry = JSON.parse(lastSetValue);

    const entry = lastCoordsEntry.find((e: any[]) => e[0] === address);

    // Ensure the cached coordinates match the expected ones
    expect(entry?.[1]).toEqual(coords);
  });
});
