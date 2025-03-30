export interface INewPet {
  name: string;
  breed: string;
  age: number;
  gender: string;
  speciesId: number;
  description: string;
  price: number;
  imageUrl?: string;
  ownerId: number;
}
