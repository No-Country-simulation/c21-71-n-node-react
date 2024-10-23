import React from "react";
import { Box, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function ShelterPage() {
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
        >
          Publicar Mascota
        </Button>
      </Box>
    </Container>
  );
}
