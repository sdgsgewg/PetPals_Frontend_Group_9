import IPet from "../interface/IPet";
import IService from "../interface/IService";
import ISpecies from "../interface/ISpecies";
import { GlobalAction, GlobalActionType } from "./GlobalActions";

export function GlobalReducer(
  state: { species: ISpecies[]; pets: IPet[]; services: IService[] },
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_AVAILABLE_PETS:
      return { ...state, pets: action.payload };
    default:
      return state;
  }
}
