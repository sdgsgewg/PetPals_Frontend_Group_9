"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import IPet from "../interface/IPet";
import { PetsReducer } from "./PetsReducer";
import { GlobalActionType } from "./GlobalActions";
import api from "@/lib/apiClient";
import { IPetFilterParams } from "../interface/IPetFilterParams";
import ISpecies from "../interface/ISpecies";
import { species } from "../data/species";

interface PetsContextType {
  species: ISpecies[];
  pets: IPet[];
  pet: IPet;
  filters: IPetFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<IPetFilterParams>>;
  fetchPets: () => Promise<void>;
  fetchPetDetail: (slug: string) => Promise<void>;
  loading: boolean;
  error: boolean;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(PetsReducer, {
    species: species,
    pets: [],
    pet: {} as IPet,
  });

  const [filters, setFilters] = useState<IPetFilterParams>({
    searchValue: "",
    species: "",
    minAge: "",
    maxAge: "",
    minPrice: "",
    maxPrice: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/adoption-list", {
        params: {
          name: filters.searchValue,
          minAge: filters.minAge,
          maxAge: filters.maxAge,
          breed: filters.searchValue,
          species: filters.species,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_AVAILABLE_PETS,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchPetDetail = async (slug: string) => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get(`/adoption-list/${slug}`);

      if (response.data) {
        dispatch({
          type: GlobalActionType.GET_PET_DETAIL,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching pet:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetsContext.Provider
      value={{
        species: state.species,
        pets: state.pets,
        pet: state.pet,
        filters,
        setFilters,
        fetchPets,
        fetchPetDetail,
        loading,
        error,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error("usePets must be used within a PetsProvider");
  }
  return context;
}
