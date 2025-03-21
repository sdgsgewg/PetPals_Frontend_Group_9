import IService from "../interface/IService";
import { IServiceCategory } from "../interface/IServiceCategory";
import { GlobalAction, GlobalActionType } from "./GlobalActions";

export function ServicesReducer(
  state: { service_categories: IServiceCategory[]; services: IService[]; service: IService },
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_ALL_SERVICES:
      return { ...state, services: action.payload };
    case GlobalActionType.GET_SERVICE_DETAIL:
      return { ...state, service: action.payload };
    default:
      return state;
  }
}
