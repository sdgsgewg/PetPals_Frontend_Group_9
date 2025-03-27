import { ITransaction } from "@/app/interface/transaction/ITransaction";
import React from "react";

interface TransactionCardProps {
  transaction: ITransaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  return <div className="w-full px-4 py-4">{transaction.petOrServiceName}</div>;
};

export default TransactionCard;
