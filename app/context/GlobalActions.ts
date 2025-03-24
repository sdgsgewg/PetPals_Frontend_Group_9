import IPet from "../interface/IPet";
import { IRole } from "../interface/IRole";
import IService from "../interface/IService";
import { IServiceCategory } from "../interface/IServiceCategory";
import ISpecies from "../interface/ISpecies";
import IUser from "../interface/IUser";

export enum GlobalActionType {
  // Users
  GET_USER_ROLES = "GET_USER_ROLES",
  SET_USER_REGISTER = "SET_USER_REGISTER",
  RESET_USER_REGISTER = "RESET_USER_REGISTER",
  SET_USER_LOGIN = "SET_USER_LOGIN",
  LOGIN_USER = "LOGIN_USER",
  RESET_USER_LOGIN = "RESET_USER_LOGIN",
  LOGOUT_USER = "LOGOUT_USER",

  // Adoptions
  GET_AVAILABLE_PETS = "GET_AVAILABLE_PETS",
  GET_ALL_SPECIES = "GET_ALL_SPECIES",
  SET_PET_FILTER = "SET_PET_FILTER",
  RESET_PET_FILTERS = "RESTE_PET_FILTERS",
  GET_PET_DETAIL = "GET_PET_DETAIL",

  // Services
  GET_ALL_SERVICES = "GET_ALL_SERVICES",
  GET_ALL_SERVICE_CATEGORIES = "GET_ALL_SERVICE_CATEGORIES",
  SET_SERVICE_FILTER = "SET_SERVICE_FILTER",
  RESET_SERVICE_FILTERS = "RESTE_SERVICE_FILTERS",
  GET_SERVICE_DETAIL = "GET_SERVICE_DETAIL",
}

export type GlobalAction =
  // Users, Register, Login
  | {
      type: GlobalActionType.GET_USER_ROLES;
      payload: IRole[];
    }
  | {
      type: GlobalActionType.SET_USER_REGISTER;
      payload: { name: string; value: string | number };
    }
  | {
      type: GlobalActionType.RESET_USER_REGISTER;
    }
  | {
      type: GlobalActionType.SET_USER_LOGIN;
      payload: { name: string; value: string };
    }
  | {
      type: GlobalActionType.LOGIN_USER;
      payload: IUser;
    }
  | {
      type: GlobalActionType.RESET_USER_LOGIN;
    }
  | {
      type: GlobalActionType.LOGOUT_USER;
    }

  // Adoptions
  | {
      type: GlobalActionType.GET_AVAILABLE_PETS;
      payload: IPet[];
    }
  | {
      type: GlobalActionType.GET_ALL_SPECIES;
      payload: ISpecies[];
    }
  | {
      type: GlobalActionType.SET_PET_FILTER;
      payload: { name: string; value: string };
    }
  | {
      type: GlobalActionType.RESET_PET_FILTERS;
    }
  | {
      type: GlobalActionType.GET_PET_DETAIL;
      payload: IPet;
    }

  // Services
  | {
      type: GlobalActionType.GET_ALL_SERVICES;
      payload: IService[];
    }
  | {
      type: GlobalActionType.GET_ALL_SERVICE_CATEGORIES;
      payload: IServiceCategory[];
    }
  | {
      type: GlobalActionType.SET_SERVICE_FILTER;
      payload: { name: string; value: string };
    }
  | {
      type: GlobalActionType.RESET_SERVICE_FILTERS;
    }
  | {
      type: GlobalActionType.GET_SERVICE_DETAIL;
      payload: IService;
    };
