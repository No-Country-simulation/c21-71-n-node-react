import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import RegisterPet from "@/components/ShelterDashboard/RegisterPet";

export default function ShelterPage() {
  const [registerPetOpen, setRegisterPetOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        mb={4}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ backgroundColor: "#178685" }}
          onClick={() => setRegisterPetOpen(true)}
        >
          Publicar Mascota
        </Button>
      </Box>
      <RegisterPet
        open={registerPetOpen}
        onClose={() => setRegisterPetOpen(false)}
      />
    </Container>
  );
}
