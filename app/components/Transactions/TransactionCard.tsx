import { useGlobal } from "@/app/context/GlobalContext";
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
              ? transaction.user.name
              : `From ${transaction.adopter.name}`}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-[30%] md:w-[25%] lg:w-[22%]">
            {transactionType === "history" ? (
              <Image
                src={
                  transaction.transactionType.toLowerCase() === "service"
                    ? getImageUrlByServiceCategory(
                        transaction?.item?.category?.name
                      )
                    : getImageUrlByBreed(
                        transaction?.item?.species?.name,
                        transaction?.item?.breed
                      )
                }
                alt="Test"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={
                  transaction.transactionType === "Adoption"
                    ? getImageUrlByBreed(
                        transaction.pet.species.name,
                        transaction.pet.breed
                      )
                    : getImageUrlByServiceCategory(
                        transaction.service.category.name
                      )
                }
                alt="Test"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="font-semibold">
              {transactionType === "history"
                ? transaction.item.name
                : transactionType === "adoptionReq"
                ? transaction.pet.name
                : transaction.service.name}
            </p>
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
