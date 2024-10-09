"use client";

import React from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { RoleE } from "@/types/roles";
import Link from "next/link";
import { usePage } from "./page.hook";

export default function AuthUserRegister() {
  const { formData, handleInputChange, handleSubmit } = usePage();

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", color: "#1EBAB3" }}
      >
        Registro de Usuario
      </Typography>
      <form>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="role">
            ¿Cuál es tu rol en el proceso de adopción?
          </InputLabel>
          <Select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleInputChange}
            label="¿Cuál es tu rol en el proceso de adopción?"
          >
            <MenuItem value="" disabled>
              Selecciona tu rol
            </MenuItem>
            <MenuItem value={RoleE.ADOPTER}>Adoptante</MenuItem>
            <MenuItem value={RoleE.SHELTER}>Refugio</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Nombres"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          autoComplete="given-name"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Apellidos"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          autoComplete="family-name"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Número de teléfono"
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          autoComplete="tel"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Registrar
        </Button>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 2, color: "text.primary" }}
        >
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" passHref>
            <Button variant="text" color="primary">
              Iniciar sesión
            </Button>
          </Link>
        </Typography>
      </form>
    </Container>
  );
}
