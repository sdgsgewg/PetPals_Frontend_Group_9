import { usePets } from "@/app/context/adoptions/PetsContext";
import React, { useEffect } from "react";

const PetFilterField = () => {
  const { species, fetchSpecies, filters, setFilters } = usePets();

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
        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="species"
        >
          Species
        </label>
        <select
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="species"
          value={filters.species}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {species.map((species) => (
            <option key={species.speciesId} value={species.name}>
              {species.name}
            </option>
          ))}
        </select>

        {/* Age */}
        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="minAge"
        >
          Min Age
        </label>
        <input
          type="text"
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="minAge"
          id="minAge"
          value={filters.minAge}
          onChange={handleInputChange}
        />

        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="maxAge"
        >
          Max Age
        </label>
        <input
          type="text"
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="maxAge"
          id="maxAge"
          value={filters.maxAge}
          onChange={handleInputChange}
        />

        {/* Price */}
        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="minPrice"
        >
          Min Price
        </label>
        <input
          type="text"
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="minPrice"
          id="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />

        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="maxPrice"
        >
          Max Price
        </label>
        <input
          type="text"
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="maxPrice"
          id="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default PetFilterField;
