import IPet from "../interface/IPet";
import ISpecies from "../interface/ISpecies";
import { GlobalAction, GlobalActionType } from "./GlobalActions";

export function PetsReducer(
  state: { species: ISpecies[]; pets: IPet[]; pet: IPet },
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_AVAILABLE_PETS:
      return { ...state, pets: action.payload };
    case GlobalActionType.GET_PET_DETAIL:
      return { ...state, pet: action.payload };
    default:
      return state;
  }
}
