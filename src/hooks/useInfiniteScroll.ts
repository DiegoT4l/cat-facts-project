import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

interface InfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
}: InfiniteScrollOptions) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
}


export default useInfiniteScroll;