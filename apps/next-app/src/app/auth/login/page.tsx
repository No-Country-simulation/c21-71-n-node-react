"use client";

import React from "react";
import {
  CustomCallAction,
  CustomForm,
  CustomSubmitButton,
  CustomTextField,
} from "@/components/Form/Form";
import { usePage } from "./page.hook";

export default function AuthUserRegister() {
  const { formData, handleInputChange, handleSubmit, requestState } = usePage();

  return (
    <CustomForm title="Inicio de sesión">
      <CustomTextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <CustomTextField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <CustomSubmitButton
        onClick={handleSubmit}
        text="Iniciar Sesión"
        state={requestState}
      />

      <CustomCallAction
        question="¿No tienes una cuenta?"
        callToAction="Crea una cuenta"
        link="/auth/register"
      />
    </CustomForm>
  );
}
