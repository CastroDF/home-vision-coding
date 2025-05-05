import { useState, useCallback, useEffect } from 'react';
import { House } from '@/types/house';
import { fetchHouses } from '@/utils/fetchHouses';

const PER_PAGE = 10;

export const useFetchHouses = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Clear cached houses on initial mount
    if (page === 1) {
      localStorage.removeItem('houses');
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchHouses(page, PER_PAGE);
      if (data.houses.length < PER_PAGE) setHasMore(false);

      setHouses((prev) => {
        const updated = [...prev, ...data.houses];
        // Persist the updated list to localStorage so /house/:id pages can read it
        localStorage.setItem('houses', JSON.stringify(updated));
        return updated;
      });

      setPage((prev) => prev + 1);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  return {
    houses,
    isLoading,
    isError,
    loadMore,
    hasMore,
  };
};
