import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import Loading from "@/app/loading";
import React from "react";
import TransactionCard from "./TransactionCard";
import ItemNotFound from "../ItemNotFound";

const TransactionList = () => {
  const { transactions, loading } = useTransactions();

  return (
    <>
      {loading ? (
        <Loading />
      ) : transactions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} transaction={transaction} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          message="Transaction Not Found"
        />
      )}
    </>
  );
};

export default TransactionList;
