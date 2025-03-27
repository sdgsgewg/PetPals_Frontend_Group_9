import IService from "@/app/interface/service/IService";
import { IServiceCategory } from "@/app/interface/service/IServiceCategory";
import { IServiceFilterParams } from "@/app/interface/service/IServiceFilterParams";
import { GlobalAction, GlobalActionType } from "../GlobalActions";

export interface ServiceState {
  service_categories: IServiceCategory[];
  services: IService[];
  filters: IServiceFilterParams;
  service: IService;
  loading: boolean;
  error: string | null;
}

export const initialState: ServiceState = {
  service_categories: [],
  services: [],
  filters: {
    searchValue: "",
    categoryName: "",
    minPrice: "",
    maxPrice: "",
  } as IServiceFilterParams,
  service: {} as IService,
  loading: false,
  error: null,
};

export function ServicesReducer(state: ServiceState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.GET_ALL_SERVICES:
      return { ...state, services: action.payload };
    case GlobalActionType.GET_ALL_SERVICE_CATEGORIES:
      return { ...state, service_categories: action.payload };
    case GlobalActionType.SET_SERVICE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_SERVICE_FILTERS:
      return {
        ...state,
        filters: {
          searchValue: "",
          categoryName: "",
          minPrice: "",
          maxPrice: "",
        },
      };
    case GlobalActionType.GET_SERVICE_DETAIL:
      return { ...state, service: action.payload };
    case GlobalActionType.BOOK_SERVICE:
      return { ...state };
    default:
      return state;
  }
}
