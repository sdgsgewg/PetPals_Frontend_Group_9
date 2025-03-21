import IService from "@/app/interface/IService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface ServiceCardProps {
  service: IService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const splitCategoryName = service.categoryName.split(" ");
  const modifiedCategoryName = splitCategoryName
    .map((word) => word.toLowerCase())
    .join("-");

  const formattedPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Link href={`/services/${service.slug}`}>
      <div className="w-full h-full flex flex-col items-center border rounded-md shadow-md overflow-hidden mb-4 hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
        <div className="w-full h-[55%] overflow-hidden">
          <Image
            src={`/img/services/${modifiedCategoryName}.jpg`}
            alt={service.name}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[45%] flex flex-col justify-between p-3">
          <div>
            <p className="text-sm font-semibold text-slate-300">
              {service.categoryName}
            </p>
            <p className="text-lg font-bold text-slate-500">{service.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-sm text-red-500"
              />
              <span className="text-sm text-slate-400">{service.city}</span>
            </div>
          </div>
          <div className="text-md font-semibold text-slate-400">
            <p>{"Rp " + formattedPrice(service.price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
