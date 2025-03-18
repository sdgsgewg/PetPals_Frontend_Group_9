import IPet from "../interface/IPet";
import ISpecies from "../interface/ISpecies";
import { GlobalAction, GlobalActionType } from "./GlobalActions";

export function GlobalReducer(
  state: { species: ISpecies[]; pets: IPet[] },
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_ALL_PETS:
      return { ...state, pets: state.pets };
    default:
      return state;
  }
}
