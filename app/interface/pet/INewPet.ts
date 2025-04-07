export interface INewPet {
  petId?: number;
  name: string;
  breed: string;
  age: number;
  genderId: number;
  speciesId: number;
  description: string;
  price: number;
  imageUrl?: string;
  ownerId: number;
}
