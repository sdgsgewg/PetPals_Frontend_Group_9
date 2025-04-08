import { GlobalAction, GlobalActionType } from "../GlobalActions";

export interface NavbarState {
  isDropdownMenuOpen: boolean;
  isUserDropdownMenuOpen: boolean;
}

export const initialState: NavbarState = {
  isDropdownMenuOpen: false,
  isUserDropdownMenuOpen: false,
};

export function NavbarReducer(state: NavbarState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.SET_DROPDOWN_MENU:
      return {
        ...state,
        isDropdownMenuOpen: action.payload,
      };
    case GlobalActionType.TOGGLE_DROPDOWN_MENU:
      return {
        ...state,
        isDropdownMenuOpen: !state.isDropdownMenuOpen,
      };
    case GlobalActionType.SET_USER_DROPDOWN_MENU:
      return {
        ...state,
        isUserDropdownMenuOpen: action.payload,
      };
    case GlobalActionType.TOGGLE_USER_DROPDOWN_MENU:
      return {
        ...state,
        isUserDropdownMenuOpen: !state.isUserDropdownMenuOpen,
      };
    default:
      return state;
  }
}
