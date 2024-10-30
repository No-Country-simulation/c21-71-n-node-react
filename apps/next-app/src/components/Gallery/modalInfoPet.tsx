import { InfoPetWithId } from "@adopcion/types";
import { Box, Modal, Typography } from "@mui/material";
import { CustomSlider } from "./slider";
import { ActionButton } from "./ActionButton";

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedPet: InfoPetWithId | null;
  settings: object;
  children: React.ReactNode;
}

export function ModalInfoPet({
  open,
  handleClose,
  selectedPet,
  settings,
  children,
}: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {xs:250, md:500},
          bgcolor: "background.paper",
          borderRadius: 10,
          boxShadow: 24,
          p: 4,
        }}
      >
        {selectedPet && (
          <Box sx={{ alignContent: "center" }}>
            <CustomSlider
              settings={settings}
              pet={selectedPet}
              handleOpen={() => {}}
            />
            <Typography variant="h4" sx={{ color: "#194143", mt:3 }}>
              {selectedPet.name}
            </Typography>
            {selectedPet.age ? (
              <Typography variant="body2" color="text.secondary">
                Edad: {selectedPet.age}
              </Typography>
            ) : null}
            <Typography variant="body1" mt={2} sx={{ color: "#194143" }}>
              {selectedPet.description}
            </Typography>
            <Box sx={{ display: {xs:"block", md:"flex"}, justifyContent: "center"  }}>
              {children}
              <ActionButton
                onClick={handleClose}
                text="Cerrar"
                bgColor="#f0f0f0"
                color="#333"
                hoverBgColor="#e0e0e0"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
