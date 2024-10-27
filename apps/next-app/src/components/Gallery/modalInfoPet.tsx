import { InfoPetWithId } from "@adopcion/types";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CustomSlider } from "./slider";

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
          width: 500,
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
            <Typography variant="h4" sx={{ color: "#194143" }}>
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {children}
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
                sx={{
                  m: 2,
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                Cerrar
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
