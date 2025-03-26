import IService from "@/app/interface/IService";
import Image from "next/image";
import React from "react";
import ServiceCard from "./ServiceCard";
import { useServices } from "@/app/context/services/ServicesContext";
import Loading from "@/app/loading";

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
        <div className="flex flex-col items-center justify-center gap-4 text-black">
          <Image
            src={`/img/service-not-found.png`}
            alt="Service Not Found"
            width={200}
            height={200}
          />
          <p className="text-2xl font-bold">Service Not Found</p>
        </div>
      )}
    </>
  );
};

export default ServiceList;
