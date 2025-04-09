"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import ItemNotFound from "@/app/components/ItemNotFound";
import Header from "@/app/components/ManageItem/Header";
import MyServiceTable from "@/app/components/ManageItem/MyServiceTable";
import MessageModal from "@/app/components/modals/MessageModal";
import RemoveItemModal from "@/app/components/modals/RemoveItemModal";
import PageNotFound from "@/app/components/PageNotFound";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { IService } from "@/app/interface/service/IService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyServices = () => {
  const { loggedInUser } = useUsers();
  const { providerServices, fetchProviderServices, error } = useServices();

  const router = useRouter();

  const [selectedService, setSelectedService] = useState<IService>(
    {} as IService
  );

  const updateSelectedService = (service: IService) => {
    setSelectedService(service);
  };

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "adopter") {
      router.push("/");
    } else if (role === "owner") {
      router.push("/my-pets");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "provider") {
      fetchProviderServices(loggedInUser.userId);
    }
  }, [loggedInUser]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto">
        <Header
          title="My Services"
          redirectUrl="/services/new"
          addText="Add New Service"
        />
        {providerServices.length > 0 ? (
          <MyServiceTable updateSelectedService={updateSelectedService} />
        ) : (
          <ItemNotFound
            image_url="/img/pet-not-found.png"
            size={200}
            message="Service Not Found"
          />
        )}
      </div>

      <RemoveItemModal
        title="Remove Service Confirmation"
        message="Are you sure you want to remove this service?"
        item={selectedService}
        itemType="Service"
      />

      <MessageModal title="Remove Service" message="Service has been removed" />
    </NormalContent>
  );
};

export default MyServices;
