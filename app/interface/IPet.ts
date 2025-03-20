export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

interface IPet {
  pet_id: number;
  owner_id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  image: string;
  status: PetStatus;
}

export default IPet;
