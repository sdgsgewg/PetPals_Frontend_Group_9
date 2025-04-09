"use client";

import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionList from "@/app/components/Transactions/TransactionList";
import TransactionWrapper from "@/app/components/Transactions/TransactionWrapper";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ServiceTransactionRequest = () => {
  const { loggedInUser } = useUsers();
  const { fetchServiceTransactionRequest, error } = useTransactions();

  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "adopter") {
      router.push("/transactions");
    } else if (role === "owner") {
      router.push("/transactions/owner");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "provider") {
      fetchServiceTransactionRequest(loggedInUser.userId);
    }
  }, [loggedInUser]);

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
        <div className="border-b-2 border-slate-200 pb-2 mb-4">
          <h1 className="text-4xl font-bold">Transaction Request</h1>
        </div>
        <TransactionList transactionType="serviceReq" />
      </TransactionWrapper>
    </NormalContent>
  );
};

export default ServiceTransactionRequest;
