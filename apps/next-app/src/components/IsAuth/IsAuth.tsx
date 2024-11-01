"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState, ComponentType } from "react";
import { backendURL } from "@/config";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import Loader from "../Loader/Loader";
import { useGCToken } from "@/context/context";

export default function IsAuth(WrappedComponent: ComponentType): ComponentType {
  return function AuthenticatedComponent(props: object) {
    const gcToken = useGCToken();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      document.getElementsByTagName("body")[0].classList.add(styles.page);
      if (!gcToken.data) {
        setIsAuthenticated(false);
        return;
      }

      axios
        .get(`${backendURL}/me`, {
          headers: { Authorization: `Bearer ${gcToken.data}` },
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));

      return () => {
        document.getElementsByTagName("body")[0].classList.remove(styles.page);
      };
    }, [gcToken]);

    if (isAuthenticated === null) return <Loader />;
    if (isAuthenticated === false) return <NotAuthenticated />;
    return <WrappedComponent {...props} />;
  };
}
