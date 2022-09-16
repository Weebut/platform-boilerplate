export interface User {
  name: {
    familyName: string;
    givenName: string;
    nickName: string;
  };
  portfolios: {
    id: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
