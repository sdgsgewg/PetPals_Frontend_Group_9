"use client";
import Link from "next/link";
import React from "react";
import LoginInputField from "./Login/LoginInputField";
import RegisterInputField from "./Register/RegisterInputField";
import { useUsers } from "@/app/context/users/UsersContext";

interface AuthFormProps {
  authType: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ authType }) => {
  const userContext = useUsers();
  const authFunction =
    authType === "Login" ? userContext.loginUser : userContext.registerUser;

  return (
    <div className="w-full max-w-sm md:max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{authType}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Input Field */}
        {authType === "Login" ? <LoginInputField /> : <RegisterInputField />}

        {/* Login or Register Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg my-6 cursor-pointer"
          onClick={authFunction}
        >
          {authType}
        </button>

        {/* Navigation */}
        <p className="text-sm text-center">
          {`${
            authType === "Login"
              ? "Don't have an account yet?"
              : "Already have an account?"
          }`}{" "}
          <Link
            href={`${authType === "Login" ? "/register" : "/login"}`}
            className="text-blue-500 dark:text-blue-300 font-semibold"
          >
            {`${authType === "Login" ? "Register here" : "Login here"}`}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
