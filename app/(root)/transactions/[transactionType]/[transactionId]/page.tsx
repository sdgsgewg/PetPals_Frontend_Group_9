"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import BookingDate from "@/app/components/Transactions/TransactionDetail/BookingDate";
import TransactionDetailCard from "@/app/components/Transactions/TransactionDetail/TransactionDetailCard";
import UserInfo from "@/app/components/Transactions/TransactionDetail/UserInfo";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const TransactionDetail = () => {
  const { transactionType, transactionId } = useParams();

  const { loggedInUser } = useUsers();
  const {
    transaction,
    fetchAdoptionTransactionDetail,
    fetchServiceTransactionDetail,
    loading,
    error,
  } = useTransactions();

  useEffect(() => {
    if (!transactionType || !transactionId) return;

    if (transactionType === "adoption") {
      fetchAdoptionTransactionDetail(Number(transactionId));
    } else {
      fetchServiceTransactionDetail(Number(transactionId));
    }
  }, [transactionType, transactionId]);

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

  if (error || !transaction) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      {/* Owner or Provider Information */}
      {(transaction.owner || transaction.adopter || transaction.provider) && (
        <UserInfo
          user={
            loggedInUser?.role?.name?.toLowerCase() === "adopter"
              ? transactionType === "adoption"
                ? transaction.owner
                : transaction.provider
              : transaction.adopter
          }
          item={
            transactionType === "adoption"
              ? transaction.pet
              : transaction.service
          }
        />
      )}

      {/* Transaction Detail Card */}
      <div className="my-8">
        <TransactionDetailCard
          transactionType={transactionType?.toString()}
          item={
            transactionType === "adoption"
              ? transaction.pet
              : transaction.service
          }
        />
      </div>

      {/* Booking Date */}
      <BookingDate />
    </NormalContent>
  );
};

export default TransactionDetail;
