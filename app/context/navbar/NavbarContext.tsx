"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { initialState, NavbarReducer } from "./NavbarReducer";
import { GlobalActionType } from "../GlobalActions";

interface NavbarContextType {
  isDropdownMenuOpen: boolean;
  handleOpenDropdownMenu: () => void;
  handleCloseDropdownMenu: () => void;
  toggleDropdownMenu: () => void;
  isUserDropdownMenuOpen: boolean;
  handleOpenUserDropdownMenu: () => void;
  handleCloseUserDropdownMenu: () => void;
  toggleUserDropdownMenu: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(NavbarReducer, initialState);

  const handleOpenDropdownMenu = () => {
    dispatch({ type: GlobalActionType.SET_DROPDOWN_MENU, payload: true });
  };
  const handleCloseDropdownMenu = () => {
    dispatch({ type: GlobalActionType.SET_DROPDOWN_MENU, payload: false });
  };
  const toggleDropdownMenu = () => {
    dispatch({ type: GlobalActionType.TOGGLE_DROPDOWN_MENU });
  };

  const handleOpenUserDropdownMenu = () => {
    dispatch({ type: GlobalActionType.SET_USER_DROPDOWN_MENU, payload: true });
  };
  const handleCloseUserDropdownMenu = () => {
    dispatch({ type: GlobalActionType.SET_USER_DROPDOWN_MENU, payload: false });
  };
  const toggleUserDropdownMenu = () => {
    dispatch({ type: GlobalActionType.TOGGLE_USER_DROPDOWN_MENU });
  };

  return (
    <NavbarContext.Provider
      value={{
        isDropdownMenuOpen: state.isDropdownMenuOpen,
        handleOpenDropdownMenu,
        handleCloseDropdownMenu,
        toggleDropdownMenu,
        isUserDropdownMenuOpen: state.isUserDropdownMenuOpen,
        handleOpenUserDropdownMenu,
        handleCloseUserDropdownMenu,
        toggleUserDropdownMenu,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
