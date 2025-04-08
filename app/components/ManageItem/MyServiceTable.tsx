import React from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { useServices } from "@/app/context/services/ServicesContext";
import Link from "next/link";
import { useGlobal } from "@/app/context/GlobalContext";
import { IService } from "@/app/interface/service/IService";

interface MyServiceTableProps {
  updateSelectedService: (service: IService) => void;
  onOpen: () => void;
}

const MyServiceTable: React.FC<MyServiceTableProps> = ({
  updateSelectedService,
  onOpen,
}) => {
  const { formattedPrice } = useGlobal();
  const { providerServices } = useServices();

  const handleRemoveService = (service: IService) => {
    updateSelectedService(service);
    onOpen();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-300 dark:border-gray-700 shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price (Rp)</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
          {providerServices.map((service, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{service.name}</td>
              <td className="p-3">{service?.category?.name}</td>
              <td className="p-3">{formattedPrice(service.price)}</td>
              <td className="p-3 flex gap-2">
                {/* View */}
                <Link href={`/services/${service.slug}`}>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer">
                    <Eye size={16} />
                  </button>
                </Link>

                {/* Edit */}
                <Link href={`/services/edit/${service.slug}`}>
                  <button className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 cursor-pointer">
                    <Pencil size={16} />
                  </button>
                </Link>

                {/* Delete */}
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 cursor-pointer"
                  onClick={() => handleRemoveService(service)}
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyServiceTable;
