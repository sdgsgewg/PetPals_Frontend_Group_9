export enum UserRole {
  Adopter = "adopter",
  Owner = "owner",
  Provider = "provider",
}

interface IUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
}

export default IUser;
