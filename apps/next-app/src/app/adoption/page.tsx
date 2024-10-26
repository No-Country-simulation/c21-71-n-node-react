// app/dashboard/page.tsx
"use client";
import React, { useRef } from "react";
import styles from "@/app/page.module.css";
import Hero from "@/components/Hero/Hero";
import { usePage } from "./page.hooks";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Gallery from "@/components/Gallery/Gallery";

interface DecodedToken {
  roleId: string;
  exp: number;
  iat: number;
  email: string;
}

const Dashboard: React.FC = () => {
  const { loading, pets } = usePage();
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const isTokenValid = () => {
    const token = localStorage.getItem("pr-ado--token");
    if (!token) {
      return false;
    }

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const handleAdopt = () => {
    if (isTokenValid()) {
      alert("¡Gracias por adoptar!");
    } else {
      alert("Por favor, inicia sesión para adoptar.");
      router.push("/auth/login");
    }
  };

  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={styles.main}
      style={{ width: "100%", marginBottom: "10vh" }}
    >
      <Hero scrollToGallery={scrollToGallery} />
      <div
        ref={galleryRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Gallery
          loading={loading}
          pets={pets}
          modalActions={
            <>
              <Button
                onClick={handleAdopt}
                variant="contained"
                color="primary"
                sx={{
                  m: 2,
                  backgroundColor: "#e47116",
                  "&:hover": { backgroundColor: "#c4530a" },
                }}
              >
                Adoptar!
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
