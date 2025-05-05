import { useState, useCallback } from 'react';
import { House } from '@/types/house';
import { fetchHouses } from '@/utils/fetchHouses';

const PER_PAGE = 10;

export const useFetchHouses = () => {
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

  return {
    houses,
    isLoading,
    isError,
    loadMore,
    hasMore,
  };
};
