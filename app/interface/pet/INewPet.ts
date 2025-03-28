export interface INewPet {
  name: string;
  breed: string;
  age: number;
  speciesId: number;
  description: string;
  price: number;
  imageUrl?: string;
  ownerId: number;
}
