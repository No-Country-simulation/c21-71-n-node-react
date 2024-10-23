"use client";

import IsAuth from "@/components/IsAuth/IsAuth";
import Loader from "@/components/Loader/Loader";
import { RoleT } from "@/types/roles";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShelterPage from "./shelter";

function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<RoleT | null>(null);

  useEffect(() => {
    const token: string | null = localStorage.getItem("pr-ado--token");

    if (token === null) {
      router.push("/auth/login");
      return;
    }

    const data = jwtDecode<{ email: string; roleId: number }>(token);

    setRole(
      data.roleId === 1 ? "ADMIN" : data.roleId === 2 ? "ADOPTER" : "SHELTER"
    );
  }, [router]);

  if (role === null) return <Loader />;
  if (role === "ADMIN") return <div>ADMIN</div>;
  if (role === "SHELTER") return <ShelterPage />;
  return <div>ADOPTER</div>;
}

export default IsAuth(DashboardPage);
