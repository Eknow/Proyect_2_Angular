export interface User {
  id?: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password?: string;
  status?: boolean;
  creationDate?: Date;
  deleteDate?: Date;
}
