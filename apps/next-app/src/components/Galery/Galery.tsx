import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Slider from "react-slick";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {Pets} from '@adopcion/types'
import axios from "axios";

interface DecodedToken {
  roleId: string;
  exp: number;
  iat: number;
  email: string;
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;







const Galery: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [selectedPet, setSelectedPet] = useState<Pets | null>(null);
  const [pets, setPets] = useState<Pets | null>(null);

  const router = useRouter();

  const fetchData = async () => {
    const response = await fetch(`${backendUrl}/api/data`);
    const pets: Pets[] = await response.json()
    setPets(pets)
    console.log(pets);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (pet: Pets) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPet(null);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredPets =
    filter === "all" ? pets : pets.filter((pet:Pets) => pet.type === filter);

  // Nueva función para verificar el token
  const isTokenValid = () => {
    const token = localStorage.getItem("pr-ado--token");
    if (!token) {
      return false; // No hay token
    }

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

      if (decoded.exp < currentTime) {
        return false; // El token ha expirado
      }

      return true; // El token es válido
    } catch (e: unknown) {
      console.error(e);
      return false; // Error al decodificar el token
    }
  };

  // Función para manejar la adopción
  const handleAdopt = () => {
    if (isTokenValid()) {
      // El token es válido, proceder con la adopción
      alert("¡Gracias por adoptar!");
      // Aquí podrías agregar la lógica para la adopción, como hacer una petición al backend
    } else {
      // El token no es válido, redirigir al usuario a iniciar sesión
      alert("Por favor, inicia sesión para adoptar.");
      router.push("/auth/login");
      // window.location.href = '/login';
    }
  };

  return (
    <>
      {/* Filtro de tipo de mascota */}
      <Box
        sx={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2vh",
          borderRadius: 8,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          maxWidth: "40vw",
          margin: "0 auto",
        }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          sx={{ minWidth: 220, borderRadius: 5, color: "white" }}
        >
          <InputLabel
            id="filter-label"
            sx={{
              borderRadius: 5,
              borderColor: "white",
              color: "white",
              "&.Mui-focused": { color: "white" },
            }}
          >
            Filtrar por Tipo
          </InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={handleFilterChange}
            label="Filtrar por Tipo"
            sx={{
              color: "white",
              borderRadius: 5,
              "&.MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            MenuProps={{ PaperProps: { sx: { borderRadius: 5 } } }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="dog">Perros</MenuItem>
            <MenuItem value="cat">Gatos</MenuItem>
            <MenuItem value="other">Otros</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Galería de mascotas */}
      <Grid container spacing={2} sx={{ width: "85vw" }}>
        {filteredPets.map((pet, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                backgroundColor: "#ECA26E",
                borderRadius: 5,
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest(".slick-dots")) {
                  handleOpen(pet);
                }
              }}
            >
              <div
                className="slider-container"
                {...(open ? { inert: true } : {})}
              >
                <Slider {...settings}>
                  {pet.images.map((image, idx) => (
                    <div key={idx}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt={`${pet.name} - ${idx + 1}`}
                        onClick={() => handleOpen(pet)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <CardContent>
                <Typography variant="h5">{pet.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.age}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal con más información */}
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
              <Slider {...settings}>
                {selectedPet.images.map((image, idx) => (
                  <div key={idx}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image}
                      alt={`${selectedPet.name} - ${idx + 1}`}
                      sx={{ borderRadius: 10 }}
                    />
                  </div>
                ))}
              </Slider>
              <Typography variant="h4" sx={{ color: "#194143" }}>
                {selectedPet.name}
              </Typography>
              <Typography variant="h6" sx={{ color: "#194143" }} mt={2}>
                {selectedPet.age}
              </Typography>
              <Typography variant="body1" mt={2} sx={{ color: "#194143" }}>
                {selectedPet.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleAdopt} // Llama a la función de adopción
                  variant="contained"
                  color="primary"
                  sx={{
                    m: 2,
                    backgroundColor: "#e47116",
                    "&:hover": { backgroundColor: "#c4530a" },
                  }}
                >
                  Adoptar!
                </Button>
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
    </>
  );
};

export default Galery;
