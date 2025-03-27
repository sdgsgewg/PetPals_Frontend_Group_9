"use client";
import InputField from "@/app/components/Authentication/InputField";
import SelectField from "@/app/components/Authentication/SelectField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import { usePets } from "@/app/context/pets/PetsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect } from "react";

const NewPet = () => {
  const { loggedInUser } = useUsers();
  const { species, newPet, fetchSpecies, setNewPet, addNewPet } = usePets();

  useEffect(() => {
    fetchSpecies();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newPet.ownerId !== loggedInUser.userId) {
      setNewPet("ownerId", loggedInUser.userId);
    }
  }, [loggedInUser?.userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue: string | number =
      name === "age" || name === " speciesId" || name === "price"
        ? Number(value)
        : value;
    setNewPet(name, newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNewPet();
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 border bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Tambah Hewan Peliharaan Baru
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <InputField
            label="Name"
            name="name"
            placeholder="Name"
            value={newPet.name}
            onChange={handleInputChange}
          />

          {/* Breed */}
          <InputField
            label="Breed"
            name="breed"
            placeholder="Breed"
            value={newPet.breed}
            onChange={handleInputChange}
          />

          {/* Age */}
          <InputField
            label="Age"
            name="age"
            type="number"
            placeholder="Age"
            value={newPet.age}
            onChange={handleInputChange}
          />

          {/* Species */}
          <SelectField
            label="Species"
            name="speciesId"
            value={newPet.speciesId}
            onChange={handleInputChange}
            options={species}
          />

          {/* Description */}
          <InputField
            label="Description"
            name="description"
            placeholder="Description"
            value={newPet.description}
            onChange={handleInputChange}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="Price"
            value={newPet.price}
            onChange={handleInputChange}
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>

      <MessageModal title="Add New Pet" message="New Pet has been made" />
    </NormalContent>
  );
};

export default NewPet;
