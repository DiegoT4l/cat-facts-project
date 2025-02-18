import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchuserDataWithFacts } from '@/services/requests';

function useCatFacts() {
  return useInfiniteQuery({
    queryKey: ['catFacts'],
    queryFn: ({ pageParam = 1 }) => fetchuserDataWithFacts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}


export default useCatFacts;