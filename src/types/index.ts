type Picture = 'large' | 'medium' | 'thumbnail';

export type userType = {
  name: {
    first: string,
    last: string
  }
  picture: {
    [key in Picture]: string
  }
}

export type catFactType = {
  fact: string
  length: number
}