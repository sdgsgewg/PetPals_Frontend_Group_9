"use client";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect, useState } from "react";
import TextareaField from "@/app/components/FormField/TextareaField";

const NewPet = () => {
  const { formattedPrice } = useGlobal();
  const { loggedInUser } = useUsers();
  const {
    species,
    newPet,
    newPetErrorMessages,
    genderOptions,
    fetchSpecies,
    setNewPet,
    resetNewPet,
    addNewPet,
  } = usePets();

  const [displayPrice, setDisplayPrice] = useState<string>(
    newPet.price ? formattedPrice(newPet.price) : ""
  );

  useEffect(() => {
    resetNewPet();
    setDisplayPrice("");
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
      name === "age" || name === "speciesId" || name === "price"
        ? Number(value)
        : value;
    setNewPet(name, newValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // hanya angka
    const numericValue = parseInt(rawValue || "0", 10);
    setNewPet("price", numericValue); // Simpan dalam bentuk number di state utama
    setDisplayPrice(formattedPrice(numericValue)); // Simpan display string untuk tampilan
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
            error={newPetErrorMessages.Name}
          />

          {/* Breed */}
          <InputField
            label="Breed"
            name="breed"
            placeholder="Breed"
            value={newPet.breed}
            onChange={handleInputChange}
            error={newPetErrorMessages.Breed}
          />

          {/* Age */}
          <InputField
            label="Age"
            name="age"
            type="number"
            step="0.1"
            placeholder="Age"
            value={newPet.age}
            onChange={handleInputChange}
            error={newPetErrorMessages.Age}
          />

          {/* Gender */}
          <SelectField
            label="Gender"
            name="gender"
            value={newPet.genderId}
            onChange={handleInputChange}
            options={genderOptions}
            error={newPetErrorMessages.Gender}
          />

          {/* Species */}
          <SelectField
            label="Species"
            name="speciesId"
            value={newPet.speciesId}
            onChange={handleInputChange}
            options={species}
            error={newPetErrorMessages.SpeciesId}
          />

          {/* Description */}
          <TextareaField
            label="Description"
            name="description"
            placeholder="Describe your pet"
            value={newPet.description}
            onChange={(e) => handleInputChange(e)}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            placeholder="Price"
            value={displayPrice}
            onChange={handlePriceChange}
            error={newPetErrorMessages.Price}
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

      <MessageModal title="Add New Pet" message="New Pet has been added" />
    </NormalContent>
  );
};

export default NewPet;
