import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUserDataWithFacts } from '@/services/requests';

function useCatFacts() {
  return useInfiniteQuery({
    queryKey: ['catFacts'],
    queryFn: ({ pageParam = 1 }) => fetchUserDataWithFacts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}


export default useCatFacts;