import type { UserTypeResponse, CatFactsResponse } from '@/types';

async function requestUsers(): Promise<UserTypeResponse['results']> {
  const response = await fetch('https://randomuser.me/api/?results=10&inc=name,picture&seed=38c36f5c3dccb94f');

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

export async function fetchUserDataWithFacts(page: number) {
  const [randomUsers, catFacts] = await Promise.all([requestUsers(), requestCatFacts(page)]);

  return {
    catFacts,
    randomUsers,
    nextPage:
      catFacts.current_page < Math.ceil(catFacts.total / catFacts.per_page) ? catFacts.current_page + 1 : undefined,
  };
}
