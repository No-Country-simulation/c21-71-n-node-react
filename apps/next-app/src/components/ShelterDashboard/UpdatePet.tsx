import { Container, Modal } from "@mui/material";
import { CustomForm, CustomSubmitButton } from "../Form/Form";
import { CommonFields } from "./commonFields";
import { useUpdatePet } from "./updatePet.hook";
import { InfoPetWithId } from "@adopcion/types";

interface Props {
  open: boolean;
  onClose: () => void;
  initial: InfoPetWithId | null;
  getData: () => Promise<void>;
}

export function UpdatePet({ initial, open, onClose, getData }: Props) {
  const { formData, submitState, handleInputChange, handleSubmit } =
    useUpdatePet(initial, getData, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <Container sx={{ maxHeight: "100vh", overflowY: "auto" }}>
        <CustomForm title="Actualiza tu mascota">
          <CommonFields
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <CustomSubmitButton
            text="Actualizar Mascota"
            state={submitState}
            onClick={handleSubmit}
          />
        </CustomForm>
      </Container>
    </Modal>
  );
}
