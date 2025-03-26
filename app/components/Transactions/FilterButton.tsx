import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import React from "react";

interface FilterButtonProps {
  filterType: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterType }) => {
  const { setTransactionType } = useTransactions();

  return (
    <button
      className="w-[15%] bg-gray-300 dark:bg-gray-800 text-black dark:text-white px-2 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => setTransactionType(filterType)}
    >
      {filterType}
    </button>
  );
};

export default FilterButton;
