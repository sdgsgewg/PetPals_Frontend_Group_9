import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../modals/FilterModal";
import { useGlobal } from "@/app/context/GlobalContext";

interface FilterBoxProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({ isOpen, onOpen, onClose }) => {
  const { filters, setFilters, fetchPets } = useGlobal();

  return (
    <>
      <div>
        <button
          className="bg-gray-500 text-white rounded-xl shadow-md px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out cursor-pointer"
          onClick={onOpen}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div>
      <FilterModal
        isOpen={isOpen}
        onClose={onClose}
        filters={filters}
        setFilters={setFilters}
        fetchPets={fetchPets}
      />
    </>
  );
};

export default FilterBox;
