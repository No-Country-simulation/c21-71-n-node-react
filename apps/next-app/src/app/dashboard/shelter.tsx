import React from "react";
import { Box, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import RegisterPet from "@/components/ShelterDashboard/RegisterPet";
import Gallery from "@/components/Gallery/Gallery";
import { useShelter } from "./shelter.hook";

export default function ShelterPage() {
  const {
    setRegisterPetOpen,
    registerPetOpen,
    setPets,
    loading,
    pets,
    selectedPet,
    setSelectedPet,
    deletePet,
  } = useShelter();

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
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
        addPet={(pet) => setPets((prev) => [...prev, pet])}
      />

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
        flexDirection="column"
        gap={4}
        marginBottom={4}
      >
        <Gallery
          loading={loading}
          pets={pets}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          modalActions={
            <>
              <Button
                onClick={deletePet}
                variant="contained"
                color="primary"
                sx={{
                  m: 2,
                  backgroundColor: "#E41616FF",
                  "&:hover": { backgroundColor: "#E41616FF" },
                }}
              >
                Eliminar
              </Button>
            </>
          }
        />
      </Box>
    </Container>
  );
}
