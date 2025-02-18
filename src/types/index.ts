type Picture = 'large' | 'medium' | 'thumbnail';

export type UserType = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    [key in Picture]: string;
  };
};

export interface UserTypeResponse {
  results: UserType[];
}

export type CatFactType = {
  fact: string;
  length: number;
};

export type CatFactsResponse = {
  data: CatFactType[];
  current_page: number;
  total: number;
  per_page: number;
};

export interface InfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
