import { InfoPetResponse } from "@adopcion/types";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export function useGallery(
  pets: InfoPetResponse[],
  selectedPet: InfoPetResponse | null,
  setSelectedPet: React.Dispatch<React.SetStateAction<InfoPetResponse | null>>
) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const handleOpen = (pet: InfoPetResponse) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedPet(null);
  }, [setSelectedPet]);

  useEffect(() => {
    handleClose();
  }, [pets, handleClose]);

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
      : pets.filter(
          (pet: InfoPetResponse) => pet.type.toLowerCase() === filter
        );

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
