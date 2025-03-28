import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Image from "next/image";
import React from "react";

interface ItemDetailCardProps {
  itemType: string;
  imageUrl: string | null;
  status?: string | null;
  price: string | null;
  isAdopted?: boolean;
  onClick: () => void;
}

const ItemDetailCard: React.FC<ItemDetailCardProps> = ({
  itemType,
  imageUrl,
  status = null,
  price,
  isAdopted = false,
  onClick,
}) => {
  const { loggedInUser } = useUsers();
  const petContext = usePets();
  const serviceContext = useServices();

  const isPet = itemType === "pet";
  const data = isPet ? petContext.pet : serviceContext.service;

  return (
    <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image */}
        <div className="flex justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={data.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Right: Pet or Service Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {data.name}
          </h2>
          {isPet ? (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Species:</span>{" "}
                {data?.species?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Breed:</span> {data.breed}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Age:</span> {data.age} years
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Category:</span>{" "}
                {data?.category?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Address:</span> {data.address}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">City:</span> {data.city}
              </p>
            </>
          )}

          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {data.description}
          </p>

          {isPet && (
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <span className="font-semibold">Status:</span> {status}
            </p>
          )}
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Price: Rp {price}
          </p>

          {/* Action Buttons */}
          {loggedInUser?.role?.name?.toLowerCase() === "adopter" && (
            <div className="mt-4">
              {isPet ? (
                <button
                  className={`${
                    isAdopted
                      ? "bg-green-500 cursor-not-allowed"
                      : status?.toLowerCase() === "available"
                      ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                      : "bg-gray-500 cursor-not-allowed"
                  } w-1/2 text-white font-semibold py-2 px-4 rounded-md shadow-md`}
                  onClick={onClick}
                  disabled={isAdopted || status?.toLowerCase() !== "available"}
                >
                  {isAdopted ? "Adopted" : "Adopt Now"}
                </button>
              ) : (
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer"
                  onClick={onClick}
                >
                  Book Now
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailCard;
