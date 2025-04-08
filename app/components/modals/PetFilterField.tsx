import { usePets } from "@/app/context/pets/PetsContext";
import React, { useEffect } from "react";
import SelectField from "../FormField/SelectField";
import InputField from "../FormField/InputField";

const PetFilterField = () => {
  const {
    species,
    fetchSpecies,
    filters,
    setFilters,
    petFiltersErrorMessages,
  } = usePets();

  useEffect(() => {
    fetchSpecies();
  }, []);

  // Meng-update state ketika input berubah
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(name, value);
  };

  return (
    <div className="w-full py-2">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Species */}
        <SelectField
          label="Species"
          name="species"
          value={filters.species}
          onChange={handleInputChange}
          options={species}
          error={petFiltersErrorMessages.Species}
        />

        {/* Age */}
        <InputField
          label="Min Age"
          type="number"
          name="minAge"
          placeholder="Minimum Age"
          value={filters.minAge}
          onChange={handleInputChange}
          error={petFiltersErrorMessages.MinAge}
        />
        <InputField
          label="Max Age"
          type="number"
          name="maxAge"
          placeholder="Maximum Age"
          value={filters.maxAge}
          onChange={handleInputChange}
          error={petFiltersErrorMessages.MaxAge}
        />

        {/* Price */}
        <InputField
          label="Min Price"
          type="number"
          name="minPrice"
          placeholder="Minimum Price"
          value={filters.minPrice}
          onChange={handleInputChange}
          error={petFiltersErrorMessages.MinPrice}
        />
        <InputField
          label="Max Price"
          type="number"
          name="maxPrice"
          placeholder="Maximum Price"
          value={filters.maxPrice}
          onChange={handleInputChange}
          error={petFiltersErrorMessages.MaxPrice}
        />
      </form>
    </div>
  );
};

export default PetFilterField;
