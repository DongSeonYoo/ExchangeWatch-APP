export interface User {
  idx: number;
  email: string;
  name: string;
  socialProvider: string;
  socialId: string;
  createdAt: Date;
  updatedAt: Date;
}
