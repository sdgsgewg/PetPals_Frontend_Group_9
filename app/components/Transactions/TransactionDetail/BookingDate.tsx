import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import React from "react";

const BookingDate = () => {
  const { transaction } = useTransactions();

  const formattedDate = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="w-full rounded-md shadow-md overflow-hidden">
      <div className="bg-slate-200 dark:bg-gray-800 px-4 py-2">
        <p className="font-bold">Booking Date</p>
      </div>
      <div className="bg-white dark:bg-gray-700 text-sm px-4 py-4">
        {formattedDate(transaction.bookingDate)}
      </div>
    </div>
  );
};

export default BookingDate;
