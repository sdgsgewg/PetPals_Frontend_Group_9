"use client";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect, useState } from "react";
import TextareaField from "@/app/components/FormField/TextareaField";
import { useGlobal } from "@/app/context/GlobalContext";

const NewService = () => {
  const { formattedPrice } = useGlobal();
  const { loggedInUser } = useUsers();
  const {
    service_categories,
    newService,
    newServiceErrorMessages,
    fetchServiceCategories,
    setNewService,
    resetNewService,
    addNewService,
  } = useServices();

  const [displayPrice, setDisplayPrice] = useState<string>(
    newService.price ? formattedPrice(newService.price) : ""
  );

  useEffect(() => {
    resetNewService();
    setDisplayPrice("");
    fetchServiceCategories();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newService.providerId !== loggedInUser.userId) {
      setNewService("providerId", loggedInUser.userId);
    }
    if (loggedInUser?.name && newService.createdBy !== loggedInUser.name) {
      setNewService("createdBy", loggedInUser.name);
    }
  }, [loggedInUser?.userId, loggedInUser?.name]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue: string | number =
      name === " categoryId" || name === "price" ? Number(value) : value;
    setNewService(name, newValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue || "0", 10);
    setNewService("price", numericValue);
    setDisplayPrice(formattedPrice(numericValue));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNewService();
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 border bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Tambah Layanan Hewan Peliharaan Baru
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <InputField
            label="Name"
            name="name"
            placeholder="Name"
            value={newService.name}
            onChange={handleInputChange}
            error={newServiceErrorMessages.Name}
          />

          {/* Service Category */}
          <SelectField
            label="Category"
            name="categoryId"
            value={newService.categoryId}
            onChange={handleInputChange}
            options={service_categories}
            error={newServiceErrorMessages.CategoryId}
          />

          {/* Description */}
          <TextareaField
            label="Description"
            name="description"
            placeholder="Describe your service"
            value={newService.description}
            onChange={(e) => handleInputChange(e)}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            placeholder="Price"
            value={displayPrice}
            onChange={handlePriceChange}
            error={newServiceErrorMessages.Price}
          />

          {/* Address */}
          <InputField
            label="Address"
            name="address"
            placeholder="Address"
            value={newService.address}
            onChange={handleInputChange}
            error={newServiceErrorMessages.Address}
          />

          {/* City */}
          <InputField
            label="City"
            name="city"
            placeholder="City"
            value={newService.city}
            onChange={handleInputChange}
            error={newServiceErrorMessages.City}
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>

      <MessageModal
        title="Add New Service"
        message="New Service has been added"
      />
    </NormalContent>
  );
};

export default NewService;
