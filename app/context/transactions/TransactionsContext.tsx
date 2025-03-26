"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import api from "@/lib/apiClient";
import { GlobalActionType } from "../GlobalActions";
import { TransactionsReducer, initialState } from "./TransactionsReducer";
import { ITransaction } from "@/app/interface/ITransaction";

interface TransactionsContextType {
  transactions: ITransaction[];
  transactionType: string;
  fetchTransactionHistory: (
    adopterId: number,
    transactionType: string
  ) => Promise<void>;
  setTransactionType: (transactionType: string) => void;
  loading: boolean;
  error: string | null;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(TransactionsReducer, initialState);

  const fetchTransactionHistory = async (adopterId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(
        `/transaction-history/${adopterId}?transactionType=${state.transactionType}`
      );

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_TRANSACTION_HISTORY,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch transaction history failed",
        });
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch transaction history failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setTransactionType = (transactionType: string) => {
    dispatch({
      type: GlobalActionType.SET_TRANSACTION_TYPE,
      payload: transactionType,
    });
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions: state.transactions,
        transactionType: state.transactionType,
        fetchTransactionHistory,
        setTransactionType,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
}
