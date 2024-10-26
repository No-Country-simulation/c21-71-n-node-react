import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { InfoPet } from "@adopcion/types";
import { FilterPets } from "./filter";
import { Loading } from "./loading";
import { PetCard } from "./petCard";
import { ModalInfoPet } from "./modalInfoPet";

interface Props {
  loading: boolean;
  pets: InfoPet[];
  modalActions: React.ReactNode;
}

const Galery = ({ modalActions, loading, pets }: Props) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [selectedPet, setSelectedPet] = useState<InfoPet | null>(null);

  const handleOpen = (pet: InfoPet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPet(null);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredPets =
    filter === "all"
      ? pets
      : pets.filter((pet: InfoPet) => pet.type.toLowerCase() === filter);

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
};

export default Galery;
