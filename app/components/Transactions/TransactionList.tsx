import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import Loading from "@/app/loading";
import React from "react";
import TransactionCard from "./TransactionCard";
import ItemNotFound from "../ItemNotFound";

interface TransactionListProps {
  transactionType: string; // history | adoptionReq | serviceReq
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactionType,
}) => {
  const { transactions, loading } = useTransactions();

  const transactionList =
    transactionType === "history" ? transactions : transactions;

  return (
    <>
      {loading ? (
        <Loading />
      ) : transactions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {transactionList.map((transaction, index) => (
            <TransactionCard
              key={index}
              transactionType={transactionType}
              transaction={transaction}
            />
          ))}
        </div>
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          size={200}
          message="No Transaction Yet"
        />
      )}
    </>
  );
};

export default TransactionList;
