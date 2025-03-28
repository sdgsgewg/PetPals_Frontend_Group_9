"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionList from "@/app/components/Transactions/TransactionList";
import TransactionWrapper from "@/app/components/Transactions/TransactionWrapper";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect } from "react";

const AdoptionTransactionRequest = () => {
  const { loggedInUser } = useUsers();
  const { fetchAdoptionTransactionRequest, error } = useTransactions();

  useEffect(() => {
    fetchAdoptionTransactionRequest(loggedInUser.userId);
  }, []);

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
          <h1 className="text-4xl font-bold">Transaction Request</h1>
        </div>
        <TransactionList transactionType="adoptionReq" />
      </TransactionWrapper>
    </NormalContent>
  );
};

export default AdoptionTransactionRequest;
