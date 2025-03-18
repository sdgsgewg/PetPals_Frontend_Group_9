export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

interface IPet {
  petId: number;
  owner_id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  status: PetStatus;
}

export default IPet;
