import { ITransaction } from "@/app/interface/ITransaction";
import { GlobalAction, GlobalActionType } from "../GlobalActions";

export interface TransactionState {
  transactions: ITransaction[];
  transactionType: string;
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  transactions: [],
  transactionType: "All",
  loading: false,
  error: null,
};

export function TransactionsReducer(
  state: TransactionState,
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_TRANSACTION_HISTORY:
      return { ...state, transactions: action.payload };
    case GlobalActionType.SET_TRANSACTION_TYPE:
      return { ...state, transactionType: action.payload };
    default:
      return state;
  }
}
