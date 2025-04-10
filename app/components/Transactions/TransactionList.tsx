import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import React from "react";
import TransactionCard from "./TransactionCard";
import ItemNotFound from "../ItemNotFound";
import Loading from "../Loading";

interface TransactionListProps {
  transactionType: string; // history | adoptionReq | serviceReq
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactionType,
}) => {
  const { transactions, loading } = useTransactions();

  const transactionList =
    transactionType === "history" ? transactions : transactions;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {transactions.length > 0 ? (
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
          image_url="/img/transaction-not-found.png"
          size={200}
          message="No Transaction Yet"
        />
      )}
    </>
  );
};

export default TransactionList;
