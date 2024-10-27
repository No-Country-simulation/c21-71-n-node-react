"use client";

import React from "react";
import styles from "@/app/page.module.css";
import Hero from "@/components/Hero/Hero";
import { usePage } from "./page.hooks";
import Gallery from "@/components/Gallery/Gallery";
import { ActionButton } from "@/components/Gallery/ActionButton";

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
              <ActionButton
                onClick={handleAdopt}
                text="Adoptar!"
                bgColor="#e47116"
                hoverBgColor="#c4530a"
              />
            </>
          }
        />
      </div>
    </div>
  );
}
