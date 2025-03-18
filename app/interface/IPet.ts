export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

interface IPet {
  petId: number;
  owner_id: number;
  species_id: number;
  name: string;
  breed: string;
  age: number;
  description: string;
  image: string;
  status: PetStatus;
}

export default IPet;
