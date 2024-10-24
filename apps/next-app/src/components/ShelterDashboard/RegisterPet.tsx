import { useState } from "react";
import { Container, Modal, SelectChangeEvent } from "@mui/material";
import {
  CustomForm,
  CustomSubmitButton,
  CustomSubmitButtonStateT,
  CustomTextField,
  ImageUpload,
} from "../Form/Form";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormDataI {
  name: string;
  description: string;
  type: string;
  imageUrl: string[];
}

export default function RegisterPet({ open, onClose }: Props) {
  const [formData, setFormData] = useState<FormDataI>({
    name: "",
    description: "",
    type: "",
    imageUrl: [],
  });
  const [, setImages] = useState<File[]>([]);
  const [submitState] = useState<CustomSubmitButtonStateT>("initial");

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = () => {
    // Validar datos
    // Subir imagenes
    // Enviar datos al servidor
    // Limpiar formulario
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
          <CustomTextField
            label="Tipo de mascota"
            type="text"
            name="type"
            value={formData.type}
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
              setImages((prev) => ({ ...prev, imageUrl: newFiles }))
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
