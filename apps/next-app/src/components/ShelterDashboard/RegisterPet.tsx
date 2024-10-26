import { Container, MenuItem, Modal } from "@mui/material";
import {
  CustomForm,
  CustomSelector,
  CustomSubmitButton,
  CustomTextField,
  ImageUpload,
} from "../Form/Form";
import { PetTypeE } from "@/types/pet";
import { useRegisterPet } from "./registerPet.hook";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RegisterPet({ open, onClose }: Props) {
  const {
    formData,
    handleInputChange,
    setFormData,
    submitState,
    handleSubmit,
  } = useRegisterPet(onClose);

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
