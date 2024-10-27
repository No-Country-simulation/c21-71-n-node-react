import { InfoPetWithId } from "@adopcion/types";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export function useGallery(
  pets: InfoPetWithId[],
  selectedPet: InfoPetWithId | null,
  setSelectedPet: React.Dispatch<React.SetStateAction<InfoPetWithId | null>>
) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const handleOpen = (pet: InfoPetWithId) => {
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
      : pets.filter((pet: InfoPetWithId) => pet.type.toLowerCase() === filter);

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
