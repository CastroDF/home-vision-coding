import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { House } from '@/types/house';
import { fetchHouses } from '@/utils/fetchHouses';
import { getCoordinates as fetchCoordinates } from '@/utils/getCoordinates';

interface HousesContextType {
  houses: House[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
  getCoordinates: (address: string) => Promise<[number, number] | null>;
}

const HousesContext = createContext<HousesContextType | undefined>(undefined);

const PER_PAGE = 10;

export const HousesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial houses from localStorage if available
  const [houses, setHouses] = useState<House[]>(() => {
    const stored = localStorage.getItem('houses');
    return stored ? JSON.parse(stored) : [];
  });

  // Load initial coordinates cache from localStorage if available
  const [coordsCache, setCoordsCache] = useState<Map<string, [number, number]>>(() => {
    const stored = localStorage.getItem('coords');
    return stored ? new Map(JSON.parse(stored)) : new Map();
  });

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Persist houses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('houses', JSON.stringify(houses));
  }, [houses]);

  // Persist coordinates cache to localStorage whenever it updates
  useEffect(() => {
    const entries = Array.from(coordsCache.entries());
    localStorage.setItem('coords', JSON.stringify(entries));
  }, [coordsCache]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchHouses(page, PER_PAGE);
      if (data.houses.length < PER_PAGE) setHasMore(false);

      setHouses((prev) => [...prev, ...data.houses]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  const getCoordinates = useCallback(
    async (address: string): Promise<[number, number] | null> => {
      if (coordsCache.has(address)) return coordsCache.get(address)!;

      const coords = await fetchCoordinates(address);
      if (coords) {
        setCoordsCache((prev) => new Map(prev).set(address, coords));
        return coords;
      }
      return null;
    },
    [coordsCache]
  );

  return (
    <HousesContext.Provider value={ { houses, isLoading, isError, hasMore, loadMore, getCoordinates } }>
      { children }
    </HousesContext.Provider>
  );
};

export const useHouses = () => {
  const context = useContext(HousesContext);
  if (!context) {
    throw new Error('useHouses must be used within a HousesProvider');
  }
  return context;
};
