"use client";

import IsAuth from "@/components/IsAuth/IsAuth";
import Loader from "@/components/Loader/Loader";
import { RoleT } from "@/types/roles";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShelterPage from "./shelter";
import AdminPage from "./AdminPage";
import { useGCToken } from "@/context/context";

function DashboardPage() {
  const router = useRouter();
  const gcToken = useGCToken();
  const [role, setRole] = useState<RoleT | null>(null);

  useEffect(() => {
    if (!gcToken.data) {
      router.push("/auth/login");
      return;
    }

    const data = jwtDecode<{ email: string; roleId: number }>(gcToken.data);

    setRole(
      data.roleId === 1 ? "ADMIN" : data.roleId === 2 ? "ADOPTER" : "SHELTER"
    );
  }, [gcToken, router]);

  if (role === null) return <Loader />;
  if (role === "ADMIN")
    return (
      <div>
        <AdminPage />
      </div>
    );
  return <ShelterPage />;
}

export default IsAuth(DashboardPage);
