import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import RegisterPet from "@/components/ShelterDashboard/RegisterPet";
import axios from "axios";
import { backendURL } from "@/config";
import { useRouter } from "next/navigation";
import { InfoPet } from "@adopcion/types";
import Gallery from "@/components/Gallery/Gallery";

export default function ShelterPage() {
  const [registerPetOpen, setRegisterPetOpen] = useState(false);
  const [pets, setPets] = useState<InfoPet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("pr-ado--token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`${backendURL}/pets-by-shelter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(response.data.pets as InfoPet[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets data:", error);
        setLoading(false);
      }
    })();
  }, [router]);

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
      />

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
        flexDirection="column"
        gap={10}
        marginBottom={4}
      >
        <Gallery loading={loading} pets={pets} modalActions={<></>} />
      </Box>
    </Container>
  );
}
