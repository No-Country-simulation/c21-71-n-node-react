"use client";
import { AuthEx, useAuth } from "@/hooks/auth.hook";
import { LocalStorageEx, useLocalStorage } from "@/hooks/localStorage.hook";
import { createContext, useContext } from "react";

export interface GlobalContextI {
  auth: AuthEx;
  token: LocalStorageEx<string>;
}

const globalContext = createContext({});

export const useGCAuth = (): AuthEx => {
  return (useContext(globalContext) as GlobalContextI).auth;
};

export const useGCToken = (): LocalStorageEx<string> => {
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

  const auth = useAuth({ tokenStorage: token });

  const value: GlobalContextI = { auth, token };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}
