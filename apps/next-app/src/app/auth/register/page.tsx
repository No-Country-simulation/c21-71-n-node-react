"use client";

import React from "react";
import { MenuItem } from "@mui/material";
import { RoleE } from "@/types/roles";
import {
  CustomCallAction,
  CustomForm,
  CustomSelector,
  CustomSubmitButton,
  CustomTextField,
} from "@/components/Form/Form";
import { usePage } from "./page.hook";

export default function AuthUserRegister() {
  const { formData, handleInputChange, handleSubmit, requestState } = usePage();

  return (
    <CustomForm title="Registro de Usuario">
      <CustomSelector<string>
        name="role"
        label="¿Cuál es tu rol en el proceso de adopción?"
        handleInputChange={handleInputChange}
        value={formData.role}
      >
        <MenuItem value="" disabled>
          Selecciona tu rol
        </MenuItem>
        <MenuItem value={RoleE.ADOPTER}>Adoptante</MenuItem>
        <MenuItem value={RoleE.SHELTER}>Refugio</MenuItem>
      </CustomSelector>

      {formData.role === "ADOPTER" ? (
        <>
          <CustomTextField
            label="Nombres"
            name="name"
            type="text"
            autoComplete="given-name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <CustomTextField
            label="Apellidos"
            name="lastname"
            type="text"
            autoComplete="family-name"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <CustomTextField
            label="Nombre del refugio"
            name="sheltername"
            type="text"
            value={formData.sheltername}
            onChange={handleInputChange}
          />
        </>
      )}

      <CustomTextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <CustomTextField
        label="Número de teléfono"
        name="phone"
        type="tel"
        autoComplete="tel"
        value={formData.phone}
        onChange={handleInputChange}
      />

      <CustomTextField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <CustomTextField
        label="Repite tu contraseña"
        type="password"
        name="passwordRepeat"
        value={formData.passwordRepeat}
        onChange={handleInputChange}
      />

      <CustomSubmitButton
        onClick={handleSubmit}
        text="Registrar"
        state={requestState}
      />

      <CustomCallAction
        question="¿Ya tienes una cuenta?"
        callToAction="Inicia Sesión"
        link="/auth/login"
      />
    </CustomForm>
  );
}
