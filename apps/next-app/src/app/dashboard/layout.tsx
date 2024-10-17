"use client";

import { backendURL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { NotAuthenticated } from "./components/not-authenticated";
import Loading from "./components/loading";

export default function ProtectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("pr-ado--token");

    if (!token) return setIsAuthenticated(false);

    axios
      .get(`${backendURL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <>
      {isAuthenticated && children}
      {isAuthenticated === false && <NotAuthenticated />}
      {isAuthenticated === null && <Loading />}
    </>
  );
}
