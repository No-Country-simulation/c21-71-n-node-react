import { Container, Modal } from "@mui/material";
import { CustomForm, CustomSubmitButton } from "../Form/Form";
import { useRegisterPet } from "./registerPet.hook";
import { InfoPetResponse } from "@adopcion/types";
import { CommonFields } from "./commonFields";

interface Props {
  open: boolean;
  onClose: () => void;
  addPet: (pet: InfoPetResponse) => void;
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
            setFormData={setFormData}
            formData={formData}
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
