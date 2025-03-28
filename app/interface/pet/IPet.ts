import IUser from "../user/IUser";
import ISpecies from "./ISpecies";

export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

interface IPet {
  petId: number;
  name: string;
  slug: string;
  breed: string;
  age: number;
  description: string;
  status: PetStatus;
  price: number;
  owner: IUser;
  species: ISpecies;
}

export default IPet;
