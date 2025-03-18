"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import IPet from "../interface/IPet";
import { GlobalReducer } from "./GlobalReducer";
import { GlobalActionType } from "./GlobalActions";
import { pets } from "../data/pets";
import ISpecies from "../interface/ISpecies";
import { species } from "../data/species";

interface GlobalContextType {
  species: ISpecies[];
  pets: IPet[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, {
    species: species,
    pets: pets,
  });

  const getAllPets = () => dispatch({ type: GlobalActionType.GET_ALL_PETS });

  return (
    <GlobalContext.Provider value={{ species: state.species, pets: state.pets }}>
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
