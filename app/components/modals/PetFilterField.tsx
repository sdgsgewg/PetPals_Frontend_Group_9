import { usePets } from "@/app/context/PetsContext";
import React from "react";

const PetFilterField = () => {
  const { species, filters, setFilters } = usePets();

  // Meng-update state ketika input berubah
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="w-full py-2">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Species */}
        <label className="text-slate-400 font-semibold" htmlFor="species">
          Species
        </label>
        <select
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
          name="species"
          value={filters.species}
          onChange={handleInputChange}
        >
          <option value="">Select a species</option>
          {species.map((species) => (
            <option key={species.species_id} value={species.slug}>
              {species.name}
            </option>
          ))}
        </select>

        {/* Age */}
        <label className="text-slate-400 font-semibold" htmlFor="minAge">
          Min Age
        </label>
        <input
          type="text"
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
          name="minAge"
          id="minAge"
          value={filters.minAge}
          onChange={handleInputChange}
        />

        <label className="text-slate-400 font-semibold" htmlFor="maxAge">
          Max Age
        </label>
        <input
          type="text"
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
          name="maxAge"
          id="maxAge"
          value={filters.maxAge}
          onChange={handleInputChange}
        />

        {/* Price */}
        <label className="text-slate-400 font-semibold" htmlFor="minPrice">
          Min Price
        </label>
        <input
          type="text"
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
          name="minPrice"
          id="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />

        <label className="text-slate-400 font-semibold" htmlFor="maxPrice">
          Max Price
        </label>
        <input
          type="text"
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
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
