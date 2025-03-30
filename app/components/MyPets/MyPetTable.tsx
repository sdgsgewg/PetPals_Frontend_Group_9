import React from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { usePets } from "@/app/context/pets/PetsContext";
import Link from "next/link";

const MyPetTable = () => {
  const { ownerPets } = usePets();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-700 shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
          {ownerPets.map((pet, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{pet.name}</td>
              <td className="p-3">{pet.age}</td>
              <td className="p-3">{pet.gender}</td>
              <td className="p-3 flex gap-3">
                {/* View */}
                <Link href={`/adoptions/${pet.slug}`}>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer">
                    <Eye size={18} />
                  </button>
                </Link>

                {/* Edit */}
                <Link href={`/adoptions/edit/${pet.slug}`}>
                  <button className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 cursor-pointer">
                    <Pencil size={18} />
                  </button>
                </Link>

                {/* Delete */}
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 cursor-pointer">
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPetTable;
