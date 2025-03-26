import IService from "@/app/interface/IService";
import Image from "next/image";
import React from "react";
import ServiceCard from "./ServiceCard";
import { useServices } from "@/app/context/services/ServicesContext";
import Loading from "@/app/loading";
import ItemNotFound from "../ItemNotFound";

interface ServiceListProps {
  filteredServices: IService[];
}

const ServiceList: React.FC<ServiceListProps> = ({ filteredServices }) => {
  const { loading } = useServices();

  return (
    <>
      {loading ? (
        <Loading />
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {filteredServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          image_url="/img/service-not-found.png"
          message="Service Not Found"
        />
      )}
    </>
  );
};

export default ServiceList;
