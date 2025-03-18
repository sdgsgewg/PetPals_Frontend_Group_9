import IPet from "../interface/IPet";
import { GlobalAction, GlobalActionType } from "./GlobalActions";

export function GlobalReducer(state: { pets: IPet[] }, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.GET_ALL_PETS:
      return { ...state, pets: state.pets };
    default:
      return state;
  }
}
