import IService from "@/app/interface/IService";
import { IServiceCategory } from "@/app/interface/IServiceCategory";
import { IServiceFilterParams } from "@/app/interface/IServiceFilterParams";
import { GlobalAction, GlobalActionType } from "../GlobalActions";

export function ServicesReducer(
  state: {
    service_categories: IServiceCategory[];
    services: IService[];
    filters: IServiceFilterParams;
    service: IService;
  },
  action: GlobalAction
) {
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
    default:
      return state;
  }
}
