"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { PetsProvider } from "./context/pets/PetsContext";
import { ServicesProvider } from "./context/services/ServicesContext";
import { GlobalProvider } from "./context/GlobalContext";
import { UsersProvider } from "./context/users/UsersContext";
import { AdoptionsProvider } from "./context/adoptions/AdoptionsContext";
import { TransactionsProvider } from "./context/transactions/TransactionsContext";
import { ForumsProvider } from "./context/forums/ForumsContext";
import { NavbarProvider } from "./context/navbar/NavbarContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GlobalProvider>
        <NavbarProvider>
          <UsersProvider>
            <PetsProvider>
              <AdoptionsProvider>
                <ServicesProvider>
                  <TransactionsProvider>
                    <ForumsProvider>{children}</ForumsProvider>
                  </TransactionsProvider>
                </ServicesProvider>
              </AdoptionsProvider>
            </PetsProvider>
          </UsersProvider>
        </NavbarProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default Providers;
