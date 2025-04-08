"use client";
import AuthBox from "@/app/components/Authentication/AuthForm";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import React from "react";

const Login = () => {
  const { loading } = useUsers();

  return (
    <>
      <AuthBox authType="Login" />

      {loading && (
        <NormalContent>
          <Loading />
        </NormalContent>
      )}
    </>
  );
};

export default Login;
