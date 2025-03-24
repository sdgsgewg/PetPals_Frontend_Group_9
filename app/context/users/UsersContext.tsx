"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import api from "@/lib/apiClient";
import IUser from "@/app/interface/IUser";
import { IRole } from "@/app/interface/IRole";
import { UsersReducer } from "./UsersReducer";
import { GlobalActionType } from "../GlobalActions";
import { IUserRegister } from "@/app/interface/IUserRegister";
import { IUserLogin } from "@/app/interface/IUserLogin";
import { useRouter } from "next/navigation";

interface UsersContextType {
  user: IUser;
  userRegister: IUserRegister;
  userLogin: IUserLogin;
  loggedInUser: IUser;
  roles: IRole[];
  fetchRoles: () => Promise<void>;
  setUserRegister: (name: string, value: string) => void;
  registerUser: () => Promise<void>;
  setUserLogin: (name: string, value: string) => void;
  loginUser: () => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
  error: boolean;
  isLoggedIn: boolean;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(UsersReducer, {
    user: {} as IUser,
    userRegister: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      roleId: 0,
    },
    userLogin: {
      email: "",
      password: "",
    },
    loggedInUser: {} as IUser,
    roles: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/get-user-roles", {
        params: {
          RoleId: "",
          Name: "",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_USER_ROLES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const setUserRegister = (name: string, value: string | number) => {
    dispatch({
      type: GlobalActionType.SET_USER_REGISTER,
      payload: { name, value },
    });
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.post("/register-petpals", state.userRegister);

      if (response.data) {
        alert("Registration successful");

        dispatch({
          type: GlobalActionType.RESET_USER_REGISTER,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        alert("Registration Failed");
        setError(true);
      }
    } catch (error) {
      console.error("Error register user:", error);
      alert("Registration Failed");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const setUserLogin = (name: string, value: string) => {
    dispatch({
      type: GlobalActionType.SET_USER_LOGIN,
      payload: { name, value },
    });
  };

  const loginUser = async () => {
    try {
      setLoading(true);
      setError(false);
      setIsLoggedIn(false);

      const response = await api.post("/login-petpals", state.userLogin);

      if (response.data) {
        alert("Login successful");

        dispatch({
          type: GlobalActionType.LOGIN_USER,
          payload: response.data.user,
        });

        dispatch({
          type: GlobalActionType.RESET_USER_LOGIN,
        });

        setIsLoggedIn(true);

        // Redirect ke halaman home
        router.push("/");
      } else {
        console.error("Invalid API response format:", response.data);
        alert("Login Failed");
        setError(true);
      }
    } catch (error) {
      console.error("Error login user:", error);
      alert("Login Failed");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);

    dispatch({
      type: GlobalActionType.LOGOUT_USER,
    });
  };

  return (
    <UsersContext.Provider
      value={{
        user: state.user,
        userRegister: state.userRegister,
        userLogin: state.userLogin,
        loggedInUser: state.loggedInUser,
        roles: state.roles,
        fetchRoles,
        setUserRegister,
        registerUser,
        setUserLogin,
        loginUser,
        logoutUser,
        loading,
        error,
        isLoggedIn,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
