"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import IService from "../interface/IService";
import { IServiceFilterParams } from "../interface/IServiceFilterParams";
import { ServicesReducer } from "./ServicesReducer";
import { GlobalActionType } from "./GlobalActions";
import api from "@/lib/apiClient";
import { IServiceCategory } from "../interface/IServiceCategory";
import { serviceCategories } from "../data/serviceCategories";

interface ServicesContextType {
  service_categories: IServiceCategory[];
  services: IService[];
  service: IService;
  filters: IServiceFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<IServiceFilterParams>>;
  fetchServices: () => Promise<void>;
  fetchServiceDetail: (slug: string) => Promise<void>;
  loading: boolean;
  error: boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ServicesReducer, {
    service_categories: serviceCategories,
    services: [],
    service: {} as IService,
  });

  const [filters, setFilters] = useState<IServiceFilterParams>({
    searchValue: "",
    categoryName: "",
    minPrice: "",
    maxPrice: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/services-list", {
        params: {
          name: filters.searchValue,
          city: filters.searchValue,
          categoryName: filters.categoryName,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
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
        filters,
        setFilters,
        fetchServices,
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
