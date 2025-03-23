"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { PetsProvider } from "./context/PetsContext";
import { ServicesProvider } from "./context/ServicesContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PetsProvider>
        <ServicesProvider>{children}</ServicesProvider>
      </PetsProvider>
    </ThemeProvider>
  );
};

export default Providers;
