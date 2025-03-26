export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

interface IPet {
  petId: number;
  ownerName: string;
  name: string;
  slug: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  status: PetStatus;
  price: number;
}

export default IPet;
