"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import api from "@/lib/apiClient";
import { IServiceCategory } from "@/app/interface/IServiceCategory";
import IService from "@/app/interface/IService";
import { IServiceFilterParams } from "@/app/interface/IServiceFilterParams";
import { ServicesReducer } from "./ServicesReducer";
import { GlobalActionType } from "../GlobalActions";

interface ServicesContextType {
  service_categories: IServiceCategory[];
  services: IService[];
  service: IService;
  filters: IServiceFilterParams;
  setFilters: (name: string, value: string) => void;
  resetFilters: () => void;
  fetchServices: () => Promise<void>;
  fetchServiceCategories: () => Promise<void>;
  fetchServiceDetail: (slug: string) => Promise<void>;
  loading: boolean;
  error: boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ServicesReducer, {
    service_categories: [],
    services: [],
    filters: {
      searchValue: "",
      categoryName: "",
      minPrice: "",
      maxPrice: "",
    } as IServiceFilterParams,
    service: {} as IService,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/services-list", {
        params: {
          name: state.filters.searchValue,
          city: state.filters.searchValue,
          categoryName: state.filters.categoryName,
          minPrice: state.filters.minPrice,
          maxPrice: state.filters.maxPrice,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_ALL_SERVICES,
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

  const fetchServiceCategories = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/get-service-categories", {
        params: {
          categoryId: "",
          name: "",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_ALL_SERVICE_CATEGORIES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching service categories:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const setFilters = (name: string, value: string) => {
    dispatch({
      type: GlobalActionType.SET_SERVICE_FILTER,
      payload: { name, value },
    });
  };

  const resetFilters = () => {
    dispatch({
      type: GlobalActionType.RESET_SERVICE_FILTERS,
    });
  };

  const fetchServiceDetail = async (slug: string) => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get(`/service-list/${slug}`);

      if (response.data) {
        dispatch({
          type: GlobalActionType.GET_SERVICE_DETAIL,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        service_categories: state.service_categories,
        services: state.services,
        service: state.service,
        filters: state.filters,
        setFilters,
        resetFilters,
        fetchServices,
        fetchServiceCategories,
        fetchServiceDetail,
        loading,
        error,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}
