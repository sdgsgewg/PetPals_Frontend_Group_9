import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { IService } from "@/app/interface/service/IService";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";
import { IServiceTransaction } from "@/app/interface/transaction/IServiceTransaction";
import { ITransaction } from "@/app/interface/transaction/ITransaction";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TransactionCardProps {
  transactionType: string; // history | adoptionReq | serviceReq
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transactionType,
  transaction,
}) => {
  const { getImageUrlByBreed, getImageUrlByServiceCategory, formattedPrice } =
    useGlobal();
  const {
    isTransactionHistory,
    isAdoptionTransactionRequest,
    isServiceTransactionRequest,
  } = useTransactions();
  const { isIPet } = usePets();

  let imageUrl: string = "/img/pets.jpg";
  let itemName = "";

  // Tentukan image dan nama
  if (isTransactionHistory(transaction)) {
    itemName = transaction.item.name;
    if (
      transaction?.transactionType?.toLowerCase() === "adoption" &&
      isIPet(transaction.item)
    ) {
      imageUrl =
        getImageUrlByBreed(
          transaction?.item?.species?.name,
          transaction?.item?.breed
        ) ?? "/img/pets.jpg";
    } else {
      const service = transaction.item as IService;
      imageUrl =
        getImageUrlByServiceCategory(service?.category?.name) ??
        "/img/services.jpg";
    }
  } else if (isAdoptionTransactionRequest(transaction)) {
    imageUrl =
      getImageUrlByBreed(
        transaction?.pet?.species?.name,
        transaction?.pet?.breed
      ) ?? "/img/pets.jpg";
    itemName = transaction.pet.name;
  } else if (isServiceTransactionRequest(transaction)) {
    imageUrl =
      getImageUrlByServiceCategory(transaction?.service?.category?.name) ??
      "/img/services.jpg";
    itemName = transaction.service.name;
  }

  return (
    <Link
      href={`/transactions/${transaction.transactionType.toLowerCase()}/${
        transaction.transactionId
      }`}
    >
      <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-md px-4 py-4">
        <div className="mb-2">
          <p className="font-semibold">
            {transactionType === "history"
              ? isTransactionHistory(transaction)
                ? transaction?.user?.name
                : "Unknown"
              : `From ${
                  isAdoptionTransactionRequest(transaction) ||
                  isServiceTransactionRequest(transaction)
                    ? transaction?.adopter?.name
                    : "Unknown"
                }`}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-[30%] md:w-[25%] lg:w-[22%]">
            <Image
              src={imageUrl}
              alt={itemName}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{itemName}</p>
          </div>
        </div>
        <div className="mt-2 text-end">
          <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{`Rp ${formattedPrice(
            transaction.price
          )}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default TransactionCard;
