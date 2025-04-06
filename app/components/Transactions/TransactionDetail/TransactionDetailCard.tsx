"use client";
import { useGlobal } from "@/app/context/GlobalContext";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { IPet } from "@/app/interface/pet/IPet";
import { IService } from "@/app/interface/service/IService";
import Image from "next/image";
import React from "react";

interface TransactionDetailCardProps {
  transactionType: string | undefined;
  item: IPet | IService;
}

const TransactionDetailCard: React.FC<TransactionDetailCardProps> = ({
  transactionType,
  item,
}) => {
  const { getImageUrlByBreed, getImageUrlByServiceCategory, formattedPrice } =
    useGlobal();
  const { transaction } = useTransactions();

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-md px-4 py-4">
      <div className="flex gap-4">
        <div className="w-[30%] md:w-[25%] lg:w-[22%]">
          <Image
            src={
              transactionType?.toLowerCase() === "service"
                ? getImageUrlByServiceCategory(item?.category?.name)
                : getImageUrlByBreed(item?.species?.name, item?.breed)
            }
            alt="Test"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold mb-2">{item?.name}</p>
          <span className="bg-slate-500 dark:bg-slate-600 text-xs font-semibold rounded-2xl px-2 py-1">
            {transactionType === "adoption"
              ? item?.breed
              : item?.category?.name}
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
