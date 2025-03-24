import { useServices } from "@/app/context/services/ServicesContext";
import React, { useEffect } from "react";

const ServiceFilterField = () => {
  const { service_categories, fetchServiceCategories, filters, setFilters } =
    useServices();

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
        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="categoryName"
        >
          Service Category
        </label>
        <select
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="categoryName"
          value={filters.categoryName}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {service_categories.map((service_category) => (
            <option
              key={service_category.categoryId}
              value={service_category.name}
            >
              {service_category.name}
            </option>
          ))}
        </select>

        {/* Price */}
        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="minPrice"
        >
          Min Price
        </label>
        <input
          type="text"
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="minPrice"
          id="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />

        <label
          className="text-gray-600 dark:text-gray-300 font-semibold"
          htmlFor="maxPrice"
        >
          Max Price
        </label>
        <input
          type="text"
          className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          name="maxPrice"
          id="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default ServiceFilterField;
