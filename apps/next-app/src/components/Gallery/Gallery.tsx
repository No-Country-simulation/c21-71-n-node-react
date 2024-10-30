import React from "react";
import Grid from "@mui/material/Grid2";
import { InfoPetResponse } from "@adopcion/types";
import { FilterPets } from "./filter";
import { Loading } from "./loading";
import { PetCard } from "./petCard";
import { ModalInfoPet } from "./modalInfoPet";
import { useGallery } from "./gallery.hook";

interface Props {
  loading: boolean;
  pets: InfoPetResponse[];
  modalActions: React.ReactNode;
  selectedPet: InfoPetResponse | null;
  setSelectedPet: React.Dispatch<React.SetStateAction<InfoPetResponse | null>>;
}

export default function Gallery({
  modalActions,
  loading,
  pets,
  selectedPet,
  setSelectedPet,
}: Props) {
  const {
    filter,
    handleFilterChange,
    filteredPets,
    handleOpen,
    settings,
    open,
    handleClose,
  } = useGallery(pets, selectedPet, setSelectedPet);

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
