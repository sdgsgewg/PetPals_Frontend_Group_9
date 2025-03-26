import React from "react";
import FilterButton from "./FilterButton";

const TransactionFilter = () => {
  return (
    <div className="flex gap-6 mb-8">
      <FilterButton filterType="All" />
      <FilterButton filterType="Adoption" />
      <FilterButton filterType="Service" />
    </div>
  );
};

export default TransactionFilter;
