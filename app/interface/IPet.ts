import IUser from "./IUser";

export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

interface IPet {
  petId: number;
  name: string;
  slug: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  status: PetStatus;
  price: number;
  owner: IUser;
}

export default IPet;
