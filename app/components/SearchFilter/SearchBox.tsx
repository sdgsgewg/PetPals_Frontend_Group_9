import { usePets } from "@/app/context/PetsContext";
import { useServices } from "@/app/context/ServicesContext";
import React from "react";

interface SearchBoxProps {
  searchType: string;
  placeholder: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, searchType }) => {
  const petContext = usePets();
  const serviceContext = useServices();

  const isPetsSearch = searchType === "pets";
  const { filters, setFilters } = isPetsSearch ? petContext : serviceContext;
  const fetchFunction = isPetsSearch
    ? petContext.fetchPets
    : serviceContext.fetchServices;

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
      className="w-85 flex-1 flex pe-4"
    >
      <input
        type="text"
        name="searchValue"
        id="searchValue"
        value={filters.searchValue}
        placeholder={placeholder}
        className="bg-white flex-1 w-80 border outline-none rounded-xl px-4 py-2 me-4 md:me-6 lg:me-8"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="flex-none w-20 bg-blue-400 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
        onClick={fetchFunction}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
