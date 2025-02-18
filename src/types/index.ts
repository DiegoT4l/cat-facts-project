type Picture = 'large' | 'medium' | 'thumbnail';

export type UserType = {
  name: {
    first: string,
    last: string
  }
  picture: {
    [key in Picture]: string
  }
}

export type CatFactType = {
  fact: string
  length: number
}

export type CatFactsResponse = {
  data: CatFactType[];
  current_page: number;
  total: number;
  per_page: number;
};