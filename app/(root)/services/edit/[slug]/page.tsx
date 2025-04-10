"use client";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import { useServices } from "@/app/context/services/ServicesContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGlobal } from "@/app/context/GlobalContext";
import TextareaField from "@/app/components/FormField/TextareaField";
import Loading from "@/app/loading";

const EditService = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const { formattedPrice } = useGlobal();
  const {
    service,
    service_categories,
    newService,
    newServiceErrorMessages,
    fetchServiceCategories,
    fetchServiceDetail,
    setNewService,
    editService,
    loading,
  } = useServices();

  const [displayPrice, setDisplayPrice] = useState<string>(
    newService.price ? formattedPrice(newService.price) : ""
  );

  useEffect(() => {
    if (!slug) return;
    fetchServiceCategories();
    fetchServiceDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (!service) return;
    setNewService("serviceId", service.serviceId);
    setNewService("name", service.name);
    setNewService("categoryId", service?.category?.id);
    setNewService("description", service.description);
    setNewService("price", service.price);
    setNewService("address", service.address);
    setNewService("city", service.city);
    setDisplayPrice(formattedPrice(service.price));
  }, [service]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const newValue: string | number =
      name === "categoryId" ? Number(value) : value;
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

    editService(service.serviceId);
  };

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

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
            onChange={handleInputChange}
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
            Update
          </button>
        </form>
      </div>

      <MessageModal title="Update Service" message="Service has been updated" />
    </NormalContent>
  );
};

export default EditService;
