import { useEffect, useState } from "react";
import { LocalStorageEx } from "./localStorage.hook";
import axios from "axios";
import { backendURL } from "@/config";
import { jwtDecode } from "jwt-decode";
import { RoleT } from "@/types/roles";

interface PropsI {
  tokenStorage: LocalStorageEx<string>;
}

export interface AuthEx {
  isLoggedIn: boolean | null;
  role: RoleT | null;
  logOut: () => void;
}

export function useAuth({ tokenStorage }: PropsI): AuthEx {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [role, setRole] = useState<RoleT | null>(null);

  useEffect(() => {
    const token = tokenStorage.getItem();

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const data = jwtDecode<{ email: string; roleId: number }>(token);

    setRole(
      data.roleId === 1 ? "ADMIN" : data.roleId === 2 ? "ADOPTER" : "SHELTER"
    );

    axios
      .get(`${backendURL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [tokenStorage]);

  const logOut = () => {
    tokenStorage.removeItem();
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    role,
    logOut,
  };
}
