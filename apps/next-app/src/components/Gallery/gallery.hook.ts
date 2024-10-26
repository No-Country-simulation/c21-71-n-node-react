import { InfoPet } from "@adopcion/types";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export function useGallery(pets: InfoPet[]) {
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

  return {
    filter,
    handleFilterChange,
    filteredPets,
    handleOpen,
    settings,
    open,
    selectedPet,
    handleClose,
  };
}
