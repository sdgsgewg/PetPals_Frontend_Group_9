import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { IPet } from "@/app/interface/pet/IPet";
import { IService } from "@/app/interface/service/IService";
import React from "react";

interface RemoveItemModalProps {
  title: string;
  message: string;
  item: IPet | IService;
  itemType: string;
  isOpen: boolean;
  onClose: () => void;
}

const RemoveItemModal: React.FC<RemoveItemModalProps> = ({
  title,
  message,
  item,
  itemType,
  isOpen,
  onClose,
}) => {
  const { formattedPrice } = useGlobal();
  const petsContext = usePets();
  const servicesContext = useServices();

  const handleRemoveItem = () => {
    const isPet = itemType.toLowerCase() === "pet";
    const removeFunction = isPet
      ? petsContext.removePet
      : servicesContext.removeService;
    removeFunction(isPet ? item.petId : item.serviceId);
    onClose();
  };

  return (
    <div
      className={`${
        !isOpen
          ? "hidden"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-gray-600 font-bold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        {/* Item Detail Information */}
        <div className="mt-2">
          <p className="font-bold text-gray-700 mb-1">{`${itemType} Detail`}</p>
          <p className="text-sm font-semibold text-gray-700">{`Name: ${item.name}`}</p>
          <p className="text-sm font-semibold text-gray-700">{`Price: Rp ${formattedPrice(
            item.price
          )}`}</p>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleRemoveItem}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition duration-300 ease-in-out cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItemModal;
