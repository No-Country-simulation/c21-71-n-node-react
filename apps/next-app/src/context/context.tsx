"use client";
import { LocalStorageEx, useLocalStorage } from "@/hooks/localStorage.hook";
import { createContext, useContext } from "react";

export interface GlobalContextI {
  token: LocalStorageEx<string>;
}

const globalContext = createContext({});

export const useGCToken = () => {
  return (useContext(globalContext) as GlobalContextI).token;
};

export function GlobalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = useLocalStorage<string>({
    key: "pr-ado--token",
    initial: null,
  });

  const value: GlobalContextI = { token };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}
