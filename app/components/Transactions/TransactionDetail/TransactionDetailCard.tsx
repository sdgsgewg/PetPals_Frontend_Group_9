"use client";
import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { IPet } from "@/app/interface/pet/IPet";
import { IService } from "@/app/interface/service/IService";
import Image from "next/image";
import React from "react";

interface TransactionDetailCardProps {
  transactionType: string | undefined; // adoption or service
  item: IPet | IService;
}

const TransactionDetailCard: React.FC<TransactionDetailCardProps> = ({
  transactionType,
  item,
}) => {
  const { getImageUrlByBreed, getImageUrlByServiceCategory, formattedPrice } =
    useGlobal();
  const { transaction } = useTransactions();
  const { isIPet } = usePets();
  const { isIService } = useServices();

  if (!item) {
    return; // or show fallback UI
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-md px-4 py-4">
      <div className="flex gap-4">
        <div className="w-[30%] md:w-[25%] lg:w-[22%]">
          <Image
            src={
              transactionType?.toLowerCase() === "service" && isIService(item)
                ? getImageUrlByServiceCategory(item?.category?.name) ??
                  "/img/services.jpg"
                : isIPet(item)
                ? getImageUrlByBreed(item?.species?.name, item?.breed) ??
                  "/img/pets.jpg"
                : "/img/pets.jpg" // fallback to default image
            }
            alt="Test"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold mb-2">{item?.name}</p>
          <span className="bg-slate-300 dark:bg-slate-600 text-xs font-semibold rounded-2xl px-2 py-1">
            {transactionType?.toLowerCase() === "adoption" && isIPet(item)
              ? item?.breed
              : isIService(item)
              ? item?.category?.name
              : ""}
          </span>
        </div>
      </div>
      <div className="mt-2 text-end">
        <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{`Rp ${formattedPrice(
          transaction.price
        )}`}</p>
      </div>
    </div>
  );
};

export default TransactionDetailCard;
