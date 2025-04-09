"use client";

import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionFilter from "@/app/components/Transactions/TransactionFilter";
import TransactionList from "@/app/components/Transactions/TransactionList";
import TransactionWrapper from "@/app/components/Transactions/TransactionWrapper";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Transactions = () => {
  const { loggedInUser } = useUsers();
  const { transactionType, fetchTransactionHistory, error } = useTransactions();
  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "owner") {
      router.push("/transactions/owner");
    } else if (role === "provider") {
      router.push("/transactions/provider");
    }
  }, [loggedInUser]);

  // 📥 Fetch data jika user adalah adopter
  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "adopter") {
      fetchTransactionHistory(loggedInUser.userId, transactionType);
    }
  }, [loggedInUser, transactionType]);

  // ❌ Jika error terjadi
  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <TransactionWrapper>
        <div className="border-b-2 pb-2 mb-4">
          <h1 className="text-4xl font-bold">Transaction History</h1>
        </div>
        <TransactionFilter />
        <TransactionList transactionType="history" />
      </TransactionWrapper>
    </NormalContent>
  );
};

export default Transactions;
