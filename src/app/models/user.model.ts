export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface NewUser extends Omit<User, 'id'> {}
