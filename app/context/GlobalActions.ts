import IPet from "../interface/IPet";
import { IRole } from "../interface/IRole";
import IService from "../interface/IService";
import { IServiceCategory } from "../interface/IServiceCategory";
import ISpecies from "../interface/ISpecies";
import { ITransaction } from "../interface/ITransaction";
import IUser from "../interface/IUser";

export enum GlobalActionType {
  // Global
  SET_MESSAGE_MODAL = "SET_MESSAGE_MODAL",
  SET_FILTER_MODAL = "SET_FILTER_MODAL",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",

  // Users
  SET_USER_REGISTER = "SET_USER_REGISTER",
  RESET_USER_REGISTER = "RESET_USER_REGISTER",
  SET_USER_LOGIN = "SET_USER_LOGIN",
  RESET_USER_LOGIN = "RESET_USER_LOGIN",
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  GET_LOGGED_IN_USER = "GET_LOGGED_IN_USER",
  GET_USER_ROLES = "GET_USER_ROLES",
  REGISTER_USER = "REGISTER_USER",
  SET_REGISTER_ERROR_MESSAGES = "SET_REGISTER_ERROR_MESSAGES",
  RESET_REGISTER_ERROR_MESSAGES = "RESET_REGISTER_ERROR_MESSAGES",
  SET_LOGGED_IN = "SET_LOGGED_IN",

  // Pets
  GET_AVAILABLE_PETS = "GET_AVAILABLE_PETS",
  GET_ALL_SPECIES = "GET_ALL_SPECIES",
  SET_PET_FILTER = "SET_PET_FILTER",
  RESET_PET_FILTERS = "RESTE_PET_FILTERS",
  GET_PET_DETAIL = "GET_PET_DETAIL",

  // Adoptions
  ADOPT_PET = "ADOPT_PET",
  GET_USER_ADOPTIONS = "GET_USER_ADOPTIONS",
  GET_ADOPTION_REQUESTS = "GET_ADOPTION_REQUESTS",
  ACCEPT_PET_ADOPTION = "ACCEPT_PET_ADOPTION",
  REJECT_PET_ADOPTION = "REJECT_PET_ADOPTION",

  // Services
  GET_ALL_SERVICES = "GET_ALL_SERVICES",
  GET_ALL_SERVICE_CATEGORIES = "GET_ALL_SERVICE_CATEGORIES",
  SET_SERVICE_FILTER = "SET_SERVICE_FILTER",
  RESET_SERVICE_FILTERS = "RESTE_SERVICE_FILTERS",
  GET_SERVICE_DETAIL = "GET_SERVICE_DETAIL",
  BOOK_SERVICE = "BOOK_SERVICE",

  // Transactions
  GET_TRANSACTION_HISTORY = "GET_TRANSACTION_HISTORY",
  SET_TRANSACTION_TYPE = "SET_TRANSACTION_TYPE",
}

export type GlobalAction =
  // Global
  | { type: GlobalActionType.SET_MESSAGE_MODAL; payload: boolean }
  | { type: GlobalActionType.SET_FILTER_MODAL; payload: boolean }
  | { type: GlobalActionType.SET_LOADING; payload: boolean }
  | { type: GlobalActionType.SET_ERROR; payload: string | null }

  // Users, Register, Login
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
      type: GlobalActionType.RESET_USER_LOGIN;
    }
  | {
      type: GlobalActionType.LOGIN_USER;
      payload: IUser;
    }
  | {
      type: GlobalActionType.LOGOUT_USER;
    }
  | { type: GlobalActionType.REGISTER_USER }
  | {
      type: GlobalActionType.SET_REGISTER_ERROR_MESSAGES;
      payload: Record<string, string>;
    }
  | {
      type: GlobalActionType.RESET_REGISTER_ERROR_MESSAGES;
    }
  | { type: GlobalActionType.GET_LOGGED_IN_USER; payload: IUser }
  | {
      type: GlobalActionType.GET_USER_ROLES;
      payload: IRole[];
    }
  | { type: GlobalActionType.SET_LOGGED_IN; payload: boolean }

  // Pets
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

  // Adoptions
  | {
      type: GlobalActionType.ADOPT_PET;
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
    }
  | {
      type: GlobalActionType.BOOK_SERVICE;
    }

  // Transactions
  | {
      type: GlobalActionType.GET_TRANSACTION_HISTORY;
      payload: ITransaction[];
    }
  | {
      type: GlobalActionType.SET_TRANSACTION_TYPE;
      payload: string;
    };
