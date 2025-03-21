import { useServices } from "@/app/context/ServicesContext";
import React from "react";

const ServiceFilterField = () => {
  const { service_categories, filters, setFilters } = useServices();

  // Meng-update state ketika input berubah
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
    <div className="w-full py-2">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Service Category */}
        <label className="text-slate-400 font-semibold" htmlFor="categoryName">
          Service Category
        </label>
        <select
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
          name="categoryName"
          value={filters.categoryName}
          onChange={handleInputChange}
        >
          <option value="">Select a Service Category</option>
          {service_categories.map((service_category) => (
            <option
              key={service_category.category_id}
              value={service_category.name}
            >
              {service_category.name}
            </option>
          ))}
        </select>

        {/* Price */}
        <label className="text-slate-400 font-semibold" htmlFor="minPrice">
          Min Price
        </label>
        <input
          type="text"
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
          name="minPrice"
          id="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />

        <label className="text-slate-400 font-semibold" htmlFor="maxPrice">
          Max Price
        </label>
        <input
          type="text"
          className="w-full outline-none bg-none border border-[#adadad] p-2 mt-2 mb-4 rounded-lg text-black"
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
