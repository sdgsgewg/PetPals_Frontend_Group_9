"use client";
import InputField from "@/app/components/Authentication/InputField";
import SelectField from "@/app/components/Authentication/SelectField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import { useServices } from "@/app/context/services/ServicesContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditService = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const {
    service,
    service_categories,
    newService,
    fetchServiceCategories,
    fetchServiceDetail,
    setNewService,
    editService,
  } = useServices();

  useEffect(() => {
    fetchServiceCategories();
    fetchServiceDetail(slug);
  }, []);

  useEffect(() => {
    setNewService("serviceId", service.serviceId);
    setNewService("name", service.name);
    setNewService("categoryId", service?.category?.categoryId);
    setNewService("description", service.description);
    setNewService("price", service.price);
    setNewService("address", service.address);
    setNewService("city", service.city);
  }, [service]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue: string | number =
      name === "categoryId" ? Number(value) : value;
    setNewService(name, newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editService(service.serviceId);
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 border bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Edit Layanan Hewan Peliharaan
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <InputField
            label="Name"
            name="name"
            placeholder="Name"
            value={newService.name}
            onChange={handleInputChange}
          />

          {/* Service Category */}
          <SelectField
            label="Category"
            name="categoryId"
            value={newService.categoryId}
            onChange={handleInputChange}
            options={service_categories}
          />

          {/* Description */}
          <InputField
            label="Description"
            name="description"
            placeholder="Description"
            value={newService.description}
            onChange={handleInputChange}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={handleInputChange}
          />

          {/* Address */}
          <InputField
            label="Address"
            name="address"
            placeholder="Address"
            value={newService.address}
            onChange={handleInputChange}
          />

          {/* City */}
          <InputField
            label="City"
            name="city"
            placeholder="City"
            value={newService.city}
            onChange={handleInputChange}
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>

      <MessageModal title="Update Service" message="Service has been updated" />
    </NormalContent>
  );
};

export default EditService;
