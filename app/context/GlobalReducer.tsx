import { GlobalAction, GlobalActionType } from "./GlobalActions";

export function GlobalReducer(
  state: {
    test: [];
  },
  action: GlobalAction
) {
  switch (action.type) {
    default:
      return state;
  }
}
