import { usePets } from "@/app/context/PetsContext";
import { useServices } from "@/app/context/ServicesContext";
import React from "react";
import PetFilterField from "./PetFilterField";
import ServiceFilterField from "./ServiceFilterField";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterType: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filterType,
}) => {
  const petContext = usePets();
  const serviceContext = useServices();

  const isPetsFilter = filterType === "pets";
  const fetchFunction = isPetsFilter
    ? petContext.fetchPets
    : serviceContext.fetchServices;

  const handleReset = () => {
    if (filterType === "pets") {
      const { setFilters } = petContext;
      setFilters({
        searchValue: "",
        species: "",
        minAge: "",
        maxAge: "",
        minPrice: "",
        maxPrice: "",
      });
    } else {
      const { setFilters } = serviceContext;
      setFilters({
        searchValue: "",
        categoryName: "",
        minPrice: "",
        maxPrice: "",
      });
    }
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

        {filterType === "pets" ? <PetFilterField /> : <ServiceFilterField />}

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
              fetchFunction();
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
