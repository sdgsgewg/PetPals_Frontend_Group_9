import { useServices } from "@/app/context/services/ServicesContext";
import React, { useEffect } from "react";
import SelectField from "../FormField/SelectField";
import InputField from "../FormField/InputField";

const ServiceFilterField = () => {
  const {
    service_categories,
    fetchServiceCategories,
    filters,
    setFilters,
    serviceFiltersErrorMessages,
  } = useServices();

  useEffect(() => {
    fetchServiceCategories();
  }, []);

  // Meng-update state ketika input berubah
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(name, value);
  };

  return (
    <div className="w-full py-2">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Service Category */}
        <SelectField
          label="Service Category"
          name="categoryName"
          value={filters.categoryName}
          onChange={handleInputChange}
          options={service_categories}
          error={serviceFiltersErrorMessages.CategoryName}
        />

        {/* Price */}
        <InputField
          label="Min Price"
          type="number"
          name="minPrice"
          placeholder="Minimum Price"
          value={filters.minPrice}
          onChange={handleInputChange}
          error={serviceFiltersErrorMessages.MinPrice}
        />
        <InputField
          label="Max Price"
          type="number"
          name="maxPrice"
          placeholder="Maximum Price"
          value={filters.maxPrice}
          onChange={handleInputChange}
          error={serviceFiltersErrorMessages.MaxPrice}
        />
      </form>
    </div>
  );
};

export default ServiceFilterField;
