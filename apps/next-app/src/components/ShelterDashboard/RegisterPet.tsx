import { useState } from "react";
import { Container, MenuItem, Modal, SelectChangeEvent } from "@mui/material";
import {
  CustomForm,
  CustomSelector,
  CustomSubmitButton,
  CustomSubmitButtonStateT,
  CustomTextField,
  ImageUpload,
} from "../Form/Form";
import { PetTypeE } from "@/types/pet";
import axios from "axios";
import { backendURL } from "@/config";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormDataI {
  name: string;
  description: string;
  type: string;
  images: File[];
}

export default function RegisterPet({ open, onClose }: Props) {
  const [formData, setFormData] = useState<FormDataI>({
    name: "",
    description: "",
    type: "",
    images: [],
  });
  const [submitState] = useState<CustomSubmitButtonStateT>("initial");

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.type.trim() ||
      formData.images.length === 0
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (formData.images.length > 3) {
      alert("Solo se permiten un máximo de 3 imágenes.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);

    formData.images.forEach((image) => {
      formDataToSend.append("image", image);
    });

    try {
      const token = localStorage.getItem("pr-ado--token");

      await axios.post(`${backendURL}/pet`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Mascota registrada con éxito.");
      setFormData({
        name: "",
        description: "",
        type: "",
        images: [],
      });
      onClose();
    } catch (error) {
      console.error("Error al registrar mascota:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          "Hubo un error al registrar la mascota.";
        alert(`Error: ${errorMessage}`);
      } else {
        alert("Error inesperado: " + error);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container sx={{ maxHeight: "100vh", overflowY: "auto" }}>
        <CustomForm title="Registra tu mascota">
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
          <CustomSubmitButton
            text="Registrar Mascota"
            state={submitState}
            onClick={handleSubmit}
          />
        </CustomForm>
      </Container>
    </Modal>
  );
}
