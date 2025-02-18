import { Fragment } from 'react';
import useCatFacts from '@/hooks/useCatFacts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Card from '@/components/Card.tsx';
import SkeletonCard from '@/components/SkeletonCard';
import Error from '@/components/Error';

function App() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useCatFacts();

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Error message={(error as Error).message} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container grow mx-auto p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {status === 'pending' ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.catFacts.data.map((fact, index) => (
                    <Card key={`${i}-${index}`} fact={fact.fact} user={page.randomUsers[index]} />
                  ))}
                </Fragment>
              ))}
            </>
          )}

          <div ref={ref} className="h-4">
            {isFetchingNextPage && <SkeletonCard />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
