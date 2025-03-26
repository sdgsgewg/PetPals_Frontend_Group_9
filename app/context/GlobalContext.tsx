"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { GlobalReducer, initialState } from "./GlobalReducer";
import { GlobalActionType } from "./GlobalActions";

interface GlobalContextType {
  isMessageModalOpen: boolean;
  handleOpenMessageModal: () => void;
  handleCloseMessageModal: () => void;
  isFilterModalOpen: boolean;
  handleOpenFilterModal: () => void;
  handleCloseFilterModal: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const handleOpenMessageModal = () => {
    dispatch({ type: GlobalActionType.SET_MESSAGE_MODAL, payload: true });
  };

  const handleCloseMessageModal = () => {
    dispatch({ type: GlobalActionType.SET_MESSAGE_MODAL, payload: false });
  };

  const handleOpenFilterModal = () => {
    dispatch({ type: GlobalActionType.SET_FILTER_MODAL, payload: true });
  };
  const handleCloseFilterModal = () => {
    dispatch({ type: GlobalActionType.SET_FILTER_MODAL, payload: false });
  };

  return (
    <GlobalContext.Provider
      value={{
        isMessageModalOpen: state.isMessageModalOpen,
        handleOpenMessageModal,
        handleCloseMessageModal,
        isFilterModalOpen: state.isFilterModalOpen,
        handleOpenFilterModal,
        handleCloseFilterModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
