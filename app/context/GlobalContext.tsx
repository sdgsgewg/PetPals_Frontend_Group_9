"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import IPet from "../interface/IPet";
import { GlobalReducer } from "./GlobalReducer";
import { GlobalActionType } from "./GlobalActions";
import ISpecies from "../interface/ISpecies";
import { species } from "../data/species";
import IService from "../interface/IService";
import { services } from "../data/services";
import api from "@/lib/apiClient";
import { IPetFilterParams } from "../interface/IPetFilterParams";

interface GlobalContextType {
  species: ISpecies[];
  pets: IPet[];
  services: IService[];
  filters: IPetFilterParams;
  setFilters: (filters: IPetFilterParams) => void;
  fetchPets: () => Promise<void>;
  loading: boolean;
  error: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, {
    species: species,
    pets: [],
    services: services,
  });

  const [filters, setFilters] = useState<IPetFilterParams>({
    searchValue: "",
    species: "",
    minAge: "",
    maxAge: "",
    minPrice: "",
    maxPrice: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Function untuk mengambil data pets dari API
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPets();
    }, 500); // Debounce API calls to avoid excessive requests

    return () => clearTimeout(timeoutId); // Cleanup function
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        species: state.species,
        pets: state.pets,
        services: state.services,
        filters,
        setFilters,
        fetchPets,
        loading,
        error,
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
