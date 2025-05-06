import React, { useRef, useCallback, useEffect } from 'react';
import HouseCard from '@/components/HouseCard';
import HouseCardSkeleton from '../HouseCard/Skeleton';
import { ListWrapper, Grid } from './styles';
import { useHouses } from '@/context/HousesContext';

const HouseList: React.FC = () => {
  const { houses, isLoading, isError, loadMore, hasMore } = useHouses();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [hasMore, isLoading, loadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 1 });
    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [onIntersect]);

  return (
    <ListWrapper>
      <Grid>
        { houses.map((house) => (
          <HouseCard key={ house.id } house={ house } />
        )) }

        { isLoading &&
          Array.from({ length: 10 }).map((_, i) => <HouseCardSkeleton key={ `skeleton-${i}` } />) }
      </Grid>

      { isError && <p style={ { textAlign: 'center', color: 'red' } }>Error fetching houses. Please try again.</p> }

      <div ref={ loaderRef } style={ { height: '1px' } } />
    </ListWrapper>
  );
};

export default HouseList;
