import { Container, Modal } from "@mui/material";
import { CustomForm, CustomSubmitButton, ImageUpload } from "../Form/Form";
import { useRegisterPet } from "./registerPet.hook";
import { InfoPetWithId } from "@adopcion/types";
import { CommonFields } from "./commonFields";

interface Props {
  open: boolean;
  onClose: () => void;
  addPet: (pet: InfoPetWithId) => void;
}

export default function RegisterPet({ open, onClose, addPet }: Props) {
  const {
    formData,
    handleInputChange,
    setFormData,
    submitState,
    handleSubmit,
  } = useRegisterPet(onClose, addPet);

  return (
    <Modal open={open} onClose={onClose}>
      <Container sx={{ maxHeight: "100vh", overflowY: "auto" }}>
        <CustomForm title="Registra tu mascota">
          <CommonFields
            handleInputChange={handleInputChange}
            formData={formData}
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
