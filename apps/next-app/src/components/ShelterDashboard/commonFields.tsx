import { MenuItem, SelectChangeEvent } from "@mui/material";
import { CustomSelector, CustomTextField, ImageUpload } from "../Form/Form";
import { PetTypeE } from "@/types/pet";
import { Dispatch, SetStateAction } from "react";
import { FormDataI } from "./registerPet.hook";

interface Props {
  handleInputChange: (
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  setFormData: Dispatch<SetStateAction<FormDataI>>;
  formData: {
    name: string;
    type: string;
    age: string;
    description: string;
  };
}

export function CommonFields({
  handleInputChange,
  setFormData,
  formData,
}: Props) {
  return (
    <>
      <CustomTextField
        label="Nombre de la mascota"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <CustomSelector<string>
        name="type"
        label="Tipo de mascota"
        handleInputChange={handleInputChange}
        value={formData.type}
      >
        <MenuItem value="" disabled>
          Selecciona el tipo de mascota
        </MenuItem>
        <MenuItem value={PetTypeE.DOG}>Perro</MenuItem>
        <MenuItem value={PetTypeE.CAT}>Gato</MenuItem>
        <MenuItem value={PetTypeE.OTHER}>Otro</MenuItem>
      </CustomSelector>
      <CustomTextField
        label="Edad de la mascota"
        type="text"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
      />
      <CustomTextField
        label="Descripción"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <ImageUpload
        onChange={(newFiles) =>
          setFormData((prev) => {
            return { ...prev, images: newFiles };
          })
        }
      />
    </>
  );
}
