import type { UserType, CatFactsResponse } from '@/types';



async function requestUsers(): Promise<UserType[]> {
  const response = await fetch(
    'https://randomuser.me/api/?results=20&inc=name,picture&seed=38c36f5c3dccb94f'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data.results;
}

async function requestCatFacts(page: number): Promise<CatFactsResponse> {
  const response = await fetch(`https://catfact.ninja/facts?page=${page}&limit=10`);

  if (!response.ok) {
    throw new Error('Failed to fetch cat facts');
  }

  return response.json();
}

export async function fetchuserDataWithFacts(page: number) {
  const [randomUsers, catFacts] = await Promise.all([
    requestUsers(),
    requestCatFacts(page),
  ]);

  return {
    catFacts: catFacts.data,
    randomUsers,
    nextPage: catFacts.current_page < Math.ceil(catFacts.total / catFacts.per_page)
      ? catFacts.current_page + 1
      : undefined,
  };
}
