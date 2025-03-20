import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const { species, filters, setFilters, fetchPets } = useGlobal();

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

  const handleReset = () => {
    setFilters({
      searchValue: "",
      species: "",
      minAge: "",
      maxAge: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div
      className={`${
        !isOpen
          ? "hidden"
          : "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-44 z-50"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between pb-2 border-b text-gray-600 font-bold">
          <h1 className="text-xl">Filter</h1>
          <button className="text-xl cursor-pointer" onClick={onClose}>
            ✖️
          </button>
        </div>

        {/* Filtering */}
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

        {/* Filter Actions */}
        <div className="flex justify-center items-center gap-8 pt-4 border-t">
          <button
            type="button"
            className="bg-[#adadad] text-white border px-4 py-1 rounded-xl shadow-sm cursor-pointer hover:bg-[#767676] transition duration-300 ease-in-out"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 text-white border px-4 py-1 rounded-xl shadow-sm cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={() => {
              fetchPets();
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
