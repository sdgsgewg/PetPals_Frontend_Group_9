"use client";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import { usePets } from "@/app/context/pets/PetsContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TextareaField from "@/app/components/FormField/TextareaField";
import { useGlobal } from "@/app/context/GlobalContext";

const EditPet = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const { formattedPrice } = useGlobal();
  const {
    pet,
    species,
    newPet,
    newPetErrorMessages,
    genderOptions,
    fetchSpecies,
    fetchPetDetail,
    setNewPet,
    editPet,
  } = usePets();

  const [displayPrice, setDisplayPrice] = useState<string>(
    pet.price ? formattedPrice(pet.price) : ""
  );

  useEffect(() => {
    fetchSpecies();
    fetchPetDetail(slug);
  }, []);

  useEffect(() => {
    setNewPet("petId", pet.petId);
    setNewPet("name", pet.name);
    setNewPet("breed", pet.breed);
    setNewPet("age", pet.age);
    setNewPet("genderId", pet?.gender?.toLowerCase() === "male" ? 1 : 2);
    setNewPet("speciesId", pet?.species?.id);
    setNewPet("description", pet.description);
    setNewPet("price", pet.price);
    setDisplayPrice(formattedPrice(pet.price));
  }, [pet]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue: string | number =
      name === "age" ||
      name === "speciesId" ||
      name === "genderId" ||
      name === "price"
        ? Number(value)
        : value;
    setNewPet(name, newValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue || "0", 10);
    setNewPet("price", numericValue);
    setDisplayPrice(formattedPrice(numericValue)); // Simpan display string untuk tampilan
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editPet(pet.petId);
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 border bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Hewan Peliharaan</h1>

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
            Update
          </button>
        </form>
      </div>

      <MessageModal title="Update Pet" message="Pet has been updated" />
    </NormalContent>
  );
};

export default EditPet;
