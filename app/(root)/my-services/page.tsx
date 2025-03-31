"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import ItemNotFound from "@/app/components/ItemNotFound";
import Header from "@/app/components/ManageItem/Header";
import MyServiceTable from "@/app/components/ManageItem/MyServiceTable";
import PageNotFound from "@/app/components/PageNotFound";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import React, { useEffect } from "react";

const MyServices = () => {
  const { loggedInUser } = useUsers();
  const { providerServices, fetchProviderServices, error, loading } =
    useServices();

  useEffect(() => {
    fetchProviderServices(loggedInUser.userId);
  }, []);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NormalContent>
            <div className="w-full max-w-lg sm:max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto">
              <Header
                title="My Services"
                redirectUrl="/services/new"
                addText="Add New Service"
              />
              {providerServices.length > 0 ? (
                <MyServiceTable />
              ) : (
                <ItemNotFound
                  image_url="/img/pet-not-found.png"
                  size={200}
                  message="Service Not Found"
                />
              )}
            </div>
          </NormalContent>
        </>
      )}
    </>
  );
};

export default MyServices;
