"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { PetsProvider } from "./context/pets/PetsContext";
import { ServicesProvider } from "./context/services/ServicesContext";
import { GlobalProvider } from "./context/GlobalContext";
import { UsersProvider } from "./context/users/UsersContext";
import { AdoptionsProvider } from "./context/adoptions/AdoptionsContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GlobalProvider>
        <UsersProvider>
          <PetsProvider>
            <AdoptionsProvider>
              <ServicesProvider>{children}</ServicesProvider>
            </AdoptionsProvider>
          </PetsProvider>
        </UsersProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default Providers;
