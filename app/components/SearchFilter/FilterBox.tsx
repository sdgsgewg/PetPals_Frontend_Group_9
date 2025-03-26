import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useGlobal } from "@/app/context/GlobalContext";

const FilterBox = () => {
  const { handleOpenFilterModal } = useGlobal();

  return (
    <>
      <div className="w-10 flex-none mt-3 md:mt-0">
        <button
          className="bg-gray-300 dark:bg-gray-600 text-slate-500 dark:text-slate-50 rounded-xl shadow-md px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-300 ease-in-out cursor-pointer"
          onClick={handleOpenFilterModal}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div>
    </>
  );
};

export default FilterBox;
