import IPet from "../../interface/IPet";
import { IPetFilterParams } from "../../interface/IPetFilterParams";
import ISpecies from "../../interface/ISpecies";
import { GlobalAction, GlobalActionType } from "../GlobalActions";

export function PetsReducer(
  state: {
    species: ISpecies[];
    pets: IPet[];
    filters: IPetFilterParams;
    pet: IPet;
  },
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_AVAILABLE_PETS:
      return { ...state, pets: action.payload };
    case GlobalActionType.GET_ALL_SPECIES:
      return { ...state, species: action.payload };
    case GlobalActionType.SET_PET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_PET_FILTERS:
      return {
        ...state,
        filters: {
          searchValue: "",
          species: "",
          minAge: "",
          maxAge: "",
          minPrice: "",
          maxPrice: "",
        },
      };
    case GlobalActionType.GET_PET_DETAIL:
      return { ...state, pet: action.payload };
    default:
      return state;
  }
}
