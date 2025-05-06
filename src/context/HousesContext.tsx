import React, { createContext, useContext, useState, useCallback } from 'react';
import { House } from '@/types/house';
import { fetchHouses } from '@/utils/fetchHouses';

interface HousesContextType {
  houses: House[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const HousesContext = createContext<HousesContextType | undefined>(undefined);

const PER_PAGE = 10;

export const HousesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [houses, setHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <HousesContext.Provider value={ { houses, isLoading, isError, hasMore, loadMore } }>
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
