import IUser from "@/app/interface/IUser";
import Link from "next/link";
import React from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";

interface ContactPersonCardProps {
  itemType: string;
  data: IUser;
}

const ContactPersonCard: React.FC<ContactPersonCardProps> = ({
  itemType,
  data,
}) => {
  const isPet = itemType === "pet";

  return (
    <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {data?.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Phone Number:</span> {data?.phone}
          </p>

          {isPet && (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Address:</span> {data?.address}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">City:</span> {data?.city}
              </p>
            </>
          )}
        </div>

        <div className="mt-4 lg:mt-0">
          {/* Action Buttons */}
          <Link target="_blank" href={`https://wa.me/${data?.phone}`}>
            <button className="w-1/2 lg:w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold flex items-center justify-center gap-1 py-2 px-4 rounded-md shadow-md cursor-pointer">
              <AiOutlineWhatsApp className="text-xl" />
              {`Contact ${isPet ? "Owner" : "Provider"}`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPersonCard;
