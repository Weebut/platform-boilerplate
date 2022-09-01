export interface User {
  email: string;
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
  }[];
}
