"use client";

import IsAuth from "@/components/IsAuth/IsAuth";
import Loader from "@/components/Loader/Loader";
import { RoleT } from "@/types/roles";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShelterPage from "./shelter";
import { getToken } from "@/utils/token";
import AdminPage from "./AdminPage";

function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<RoleT | null>(null);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const data = jwtDecode<{ email: string; roleId: number }>(token);

    setRole(
      data.roleId === 1 ? "ADMIN" : data.roleId === 2 ? "ADOPTER" : "SHELTER"
    );
  }, [router]);

  if (role === null) return <Loader />;
  if (role === "ADMIN") return <div><AdminPage /></div>;
  if (role === "SHELTER") return <ShelterPage />;
  return <div>ADOPTER</div>;
}

export default IsAuth(DashboardPage);
