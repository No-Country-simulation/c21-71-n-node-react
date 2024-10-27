"use client";

import React from "react";
import styles from "@/app/page.module.css";
import Hero from "@/components/Hero/Hero";
import { usePage } from "./page.hooks";
import { Button } from "@mui/material";
import Gallery from "@/components/Gallery/Gallery";

export default function Dashboard() {
  const {
    pets,
    loading,
    selectedPet,
    galleryRef,
    setSelectedPet,
    handleAdopt,
    scrollToGallery,
  } = usePage();

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
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
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
}
