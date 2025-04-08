import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import React from "react";
import PetFilterField from "./PetFilterField";
import ServiceFilterField from "./ServiceFilterField";
import { useGlobal } from "@/app/context/GlobalContext";
import { X } from "lucide-react";

interface FilterModalProps {
  filterType: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ filterType }) => {
  const { isFilterModalOpen, handleCloseFilterModal } = useGlobal();
  const petContext = usePets();
  const serviceContext = useServices();

  const isPetsFilter = filterType === "pets";
  const fetchFunction = isPetsFilter
    ? petContext.fetchPets
    : serviceContext.fetchServices;

  const handleReset = () => {
    if (filterType === "pets") {
      const { resetFilters } = petContext;
      resetFilters();
    } else {
      const { resetFilters } = serviceContext;
      resetFilters();
    }
  };

  const handleApply = () => {
    fetchFunction();
  };

  return (
    <div
      className={`${
        !isFilterModalOpen
          ? "hidden"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between pb-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 font-bold">
          <h1 className="text-xl">Filter</h1>
          <button
            className="text-xl cursor-pointer text-gray-900 dark:text-gray-300"
            onClick={handleCloseFilterModal}
          >
            <X size={28} />
          </button>
        </div>

        {filterType === "pets" ? <PetFilterField /> : <ServiceFilterField />}

        {/* Filter Actions */}
        <div className="flex justify-center items-center gap-8 pt-4 border-t border-gray-300 dark:border-gray-600">
          <button
            type="button"
            className="bg-gray-400 dark:bg-gray-700 text-white border px-4 py-1 rounded-xl shadow-sm cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 dark:bg-blue-600 text-white border px-4 py-1 rounded-xl shadow-sm cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 transition duration-300 ease-in-out"
            onClick={() => handleApply()}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
