"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionFilter from "@/app/components/Transactions/TransactionFilter";
import TransactionList from "@/app/components/Transactions/TransactionList";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import React, { useEffect } from "react";

const Transactions = () => {
  const { loggedInUser } = useUsers();
  const { transactionType, fetchTransactionHistory, error } = useTransactions();

  useEffect(() => {
    fetchTransactionHistory(loggedInUser.userId, transactionType);
  }, []);

  useEffect(() => {
    fetchTransactionHistory(loggedInUser.userId, transactionType);
  }, [transactionType]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <div className="border-b-2 border-slate-200 pb-2 mb-4">
        <h1 className="text-4xl font-bold">Transaction History</h1>
      </div>
      <TransactionFilter />
      <TransactionList />
    </NormalContent>
  );
};

export default Transactions;
