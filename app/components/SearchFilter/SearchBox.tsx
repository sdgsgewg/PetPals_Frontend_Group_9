import { usePets } from "@/app/context/adoptions/PetsContext";
import { useServices } from "@/app/context/ServicesContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(name, value);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full md:w-85 flex-1 flex pe-0 md:pe-4"
    >
      <input
        type="text"
        name="searchValue"
        id="searchValue"
        value={filters.searchValue}
        placeholder={placeholder}
        className="bg-white flex-1 w-85 md:w-75 border outline-none rounded-s-xl px-4 py-2"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="flex-none w-15 md:w-25 bg-blue-400 dark:bg-blue-800 text-white rounded-e-xl px-3 py-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
        onClick={fetchFunction}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBox;
