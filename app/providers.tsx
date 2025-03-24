"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { PetsProvider } from "./context/adoptions/PetsContext";
import { ServicesProvider } from "./context/services/ServicesContext";
import { GlobalProvider } from "./context/GlobalContext";
import { UsersProvider } from "./context/users/UsersContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GlobalProvider>
        <UsersProvider>
          <PetsProvider>
            <ServicesProvider>{children}</ServicesProvider>
          </PetsProvider>
        </UsersProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default Providers;
