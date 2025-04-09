"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import BookingDate from "@/app/components/Transactions/TransactionDetail/BookingDate";
import TransactionDetailCard from "@/app/components/Transactions/TransactionDetail/TransactionDetailCard";
import UserInfo from "@/app/components/Transactions/TransactionDetail/UserInfo";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { IUser } from "@/app/interface/user/IUser";
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
    isAdoptionTransactionRequest,
    isServiceTransactionRequest,
    loading,
    error,
  } = useTransactions();

  const item =
    transactionType === "adoption" && isAdoptionTransactionRequest(transaction)
      ? transaction.pet
      : isServiceTransactionRequest(transaction)
      ? transaction.service
      : null;

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

  if (error || !transaction || !item) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      {/* Adopter, Owner, or Provider Information */}
      <UserInfo
        user={
          loggedInUser?.role?.name?.toLowerCase() === "adopter"
            ? transactionType === "adoption" &&
              isAdoptionTransactionRequest(transaction)
              ? transaction.owner
              : isServiceTransactionRequest(transaction)
              ? transaction.provider
              : ({} as IUser)
            : transaction.adopter
        }
        item={item}
      />

      {/* Transaction Detail Card */}
      {item && (
        <div className="my-8">
          <TransactionDetailCard
            transactionType={transactionType?.toString()}
            item={item}
          />
        </div>
      )}

      {/* Booking Date */}
      <BookingDate />
    </NormalContent>
  );
};

export default TransactionDetail;
