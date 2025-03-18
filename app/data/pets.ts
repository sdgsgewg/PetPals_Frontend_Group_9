import { PetStatus } from "../interface/IPet"; // Import PetStatus

const pets = [
  {
    petId: 1,
    owner_id: 1,
    name: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    description: "lorem ipsum dolor",
    status: "adopted" as PetStatus,
  },
  {
    petId: 2,
    owner_id: 2,
    name: "Axel",
    species: "Dog",
    breed: "Pitbull",
    age: 2,
    description: "lorem ipsum dolor",
    status: "available" as PetStatus,
  },
  {
    petId: 3,
    owner_id: 1,
    name: "Xavier",
    species: "Dog",
    breed: "Chihuahua",
    age: 1,
    description: "lorem ipsum dolor",
    status: "available" as PetStatus,
  },
  {
    petId: 4,
    owner_id: 3,
    name: "Lorem",
    species: "Cat",
    breed: "Unknown Breed",
    age: 3,
    description: "Orange fur Cat",
    status: "available" as PetStatus,
  }
];

export default pets;
