"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState, ComponentType } from "react";
import { backendURL } from "@/config";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import Loader from "../Loader/Loader";
import { getToken } from "@/utils/token";

export default function IsAuth(WrappedComponent: ComponentType): ComponentType {
  return function AuthenticatedComponent(props: object) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      document.getElementsByTagName("body")[0].classList.add(styles.page);
      const token = getToken();

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

      return () => {
        document.getElementsByTagName("body")[0].classList.remove(styles.page);
      };
    }, []);

    if (isAuthenticated === null) return <Loader />;
    if (isAuthenticated === false) return <NotAuthenticated />;
    return <WrappedComponent {...props} />;
  };
}
