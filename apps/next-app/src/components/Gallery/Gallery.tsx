import React from "react";
import Grid from "@mui/material/Grid2";
import { InfoPet } from "@adopcion/types";
import { FilterPets } from "./filter";
import { Loading } from "./loading";
import { PetCard } from "./petCard";
import { ModalInfoPet } from "./modalInfoPet";
import { useGallery } from "./gallery.hook";

interface Props {
  loading: boolean;
  pets: InfoPet[];
  modalActions: React.ReactNode;
}

export default function Gallery({ modalActions, loading, pets }: Props) {
  const {
    filter,
    handleFilterChange,
    filteredPets,
    handleOpen,
    settings,
    open,
    selectedPet,
    handleClose,
  } = useGallery(pets);

  if (loading) return <Loading />;

  return (
    <>
      <FilterPets filter={filter} handleFilterChange={handleFilterChange} />

      <Grid container spacing={2} sx={{ width: "85vw" }}>
        {filteredPets.map((pet, index) => (
          <PetCard
            handleOpen={handleOpen}
            pet={pet}
            settings={settings}
            key={index}
          />
        ))}
      </Grid>

      <ModalInfoPet
        open={open}
        handleClose={handleClose}
        selectedPet={selectedPet}
        settings={settings}
      >
        {modalActions}
      </ModalInfoPet>
    </>
  );
}
