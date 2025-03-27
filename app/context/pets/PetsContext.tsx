"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import IPet from "../../interface/pet/IPet";
import { PetsReducer } from "./PetsReducer";
import { GlobalActionType } from "../GlobalActions";
import api from "@/lib/apiClient";
import { IPetFilterParams } from "../../interface/pet/IPetFilterParams";
import ISpecies from "../../interface/pet/ISpecies";

interface PetsContextType {
  species: ISpecies[];
  pets: IPet[];
  pet: IPet;
  filters: IPetFilterParams;
  setFilters: (name: string, value: string) => void;
  resetFilters: () => void;
  fetchPets: () => Promise<void>;
  fetchSpecies: () => Promise<void>;
  fetchPetDetail: (slug: string) => Promise<void>;
  loading: boolean;
  error: boolean;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(PetsReducer, {
    species: [],
    pets: [],
    filters: {
      searchValue: "",
      species: "",
      minAge: "",
      maxAge: "",
      minPrice: "",
      maxPrice: "",
    } as IPetFilterParams,
    pet: {} as IPet,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/adoption-list", {
        params: {
          name: state.filters.searchValue,
          minAge: state.filters.minAge,
          maxAge: state.filters.maxAge,
          breed: state.filters.searchValue,
          species: state.filters.species,
          minPrice: state.filters.minPrice,
          maxPrice: state.filters.maxPrice,
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

  const fetchSpecies = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/get-species", {
        params: {
          speciesId: "",
          name: "",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_ALL_SPECIES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching species:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const setFilters = (name: string, value: string) => {
    dispatch({
      type: GlobalActionType.SET_PET_FILTER,
      payload: { name, value },
    });
  };

  const resetFilters = () => {
    dispatch({
      type: GlobalActionType.RESET_PET_FILTERS,
    });
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
        filters: state.filters,
        setFilters,
        resetFilters,
        fetchPets,
        fetchSpecies,
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
