import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { InfiniteScrollOptions } from '@/types';

function useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage }: InfiniteScrollOptions) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
}

export default useInfiniteScroll;
