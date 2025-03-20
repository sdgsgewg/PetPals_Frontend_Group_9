import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";

const SearchBox = () => {
  const { filters, setFilters, fetchPets } = useGlobal();

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
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-[90%] flex justify-between"
    >
      <input
        type="text"
        name="searchValue"
        id="searchValue"
        value={filters.searchValue}
        placeholder="Search by name or breed"
        className="w-[80%] border outline-none rounded-xl px-4 py-2"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="w-[15%] bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
        onClick={fetchPets}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
