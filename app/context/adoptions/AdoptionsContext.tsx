"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import api from "@/lib/apiClient";
import { GlobalActionType } from "../GlobalActions";
import IAdoption from "@/app/interface/IAdoption";
import { AdoptionsReducer, initialState } from "./AdoptionsReducer";

interface AdoptionsContextType {
  adoptions: IAdoption[];
  adoptPet: (petId: number, userId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AdoptionsContext = createContext<AdoptionsContextType | undefined>(
  undefined
);

export function AdoptionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AdoptionsReducer, initialState);

  const adoptPet = async (petId: number, userId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.post("/adoptions-transaction", {
        petId,
        userId,
      });

      if (response.data) {
        console.log("Adoption successful");
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Adoption failed",
        });
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Adoption failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  return (
    <AdoptionsContext.Provider
      value={{
        adoptions: state.adoptions,
        adoptPet,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </AdoptionsContext.Provider>
  );
}

export function useAdoptions() {
  const context = useContext(AdoptionsContext);
  if (!context) {
    throw new Error("useAdoptions must be used within a AdoptionsProvider");
  }
  return context;
}
