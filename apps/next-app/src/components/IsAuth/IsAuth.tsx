"use client";

import axios from "axios";
import { useEffect, useState, ComponentType } from "react";
import { backendURL } from "@/config";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import Loader from "../Loader/Loader";

export default function IsAuth(WrappedComponent: ComponentType): ComponentType {
  return function AuthenticatedComponent(props: object) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const token = localStorage.getItem("pr-ado--token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      axios
        .get(`${backendURL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <Loader />;
    if (isAuthenticated === false) return <NotAuthenticated />;
    return <WrappedComponent {...props} />;
  };
}
