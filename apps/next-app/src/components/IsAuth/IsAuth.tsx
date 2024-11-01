"use client";

import styles from "./page.module.css";
import { useEffect, ComponentType } from "react";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import Loader from "../Loader/Loader";
import { useGCAuth } from "@/context/context";

export default function IsAuth(WrappedComponent: ComponentType): ComponentType {
  return function AuthenticatedComponent(props: object) {
    const gcAuth = useGCAuth();

    useEffect(() => {
      document.getElementsByTagName("body")[0].classList.add(styles.page);

      return () => {
        document.getElementsByTagName("body")[0].classList.remove(styles.page);
      };
    }, []);

    if (gcAuth.isLoggedIn === null) return <Loader />;
    if (gcAuth.isLoggedIn === false) return <NotAuthenticated />;
    return <WrappedComponent {...props} />;
  };
}
