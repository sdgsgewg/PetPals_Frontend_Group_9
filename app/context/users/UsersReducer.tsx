import { IRole } from "@/app/interface/IRole";
import IUser from "@/app/interface/IUser";
import { GlobalAction, GlobalActionType } from "../GlobalActions";
import { IUserRegister } from "@/app/interface/IUserRegister";
import { IUserLogin } from "@/app/interface/IUserLogin";

export function UsersReducer(
  state: {
    user: IUser;
    userRegister: IUserRegister;
    userLogin: IUserLogin;
    loggedInUser: IUser;
    roles: IRole[];
  },
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.GET_USER_ROLES:
      return { ...state, roles: action.payload };
    case GlobalActionType.SET_USER_REGISTER:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_USER_REGISTER:
      return {
        ...state,
        userRegister: {
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          roleId: 0,
        },
      };
    case GlobalActionType.SET_USER_LOGIN:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.LOGIN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case GlobalActionType.RESET_USER_LOGIN:
      return {
        ...state,
        userLogin: {
          email: "",
          password: "",
        },
      };
    case GlobalActionType.LOGOUT_USER:
      return {
        ...state,
        loggedInUser: null,
      };
    default:
      return state;
  }
}
