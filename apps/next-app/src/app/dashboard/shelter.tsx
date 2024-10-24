import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import RegisterPet from "@/components/ShelterDashboard/RegisterPet";
import axios from "axios";
import { backendURL } from "@/config";
import { useRouter } from "next/navigation";

export interface PetI {
  id: number;
  name: string;
  description: string;
  type: string;
  imageUrl: string[];
  shelterId: number;
}

export interface PetsResponseI {
  ok: boolean;
  pets: PetI[];
}

export default function ShelterPage() {
  const [registerPetOpen, setRegisterPetOpen] = useState(false);
  const [pets, setPets] = useState<PetI[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("pr-ado--token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    axios
      .get(`${backendURL}/pets-by-shelter`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPets((response.data as PetsResponseI).pets);
      });
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
        gap={10}
      >
        {pets?.map((pet) => (
          <div key={pet.id}>
            {pet.id}
            {pet.name}
          </div>
        ))}
      </Box>
    </Container>
  );
}
