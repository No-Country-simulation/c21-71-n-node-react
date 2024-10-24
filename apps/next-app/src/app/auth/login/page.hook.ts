"use client";

import axios from "axios";
import { backendURL } from "@/config";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomSubmitButtonStateT } from "@/components/Form/Form";
import { jwtDecode } from "jwt-decode";

type FormData = {
  email: string;
  password: string;
};

const initialFormState = {
  email: "",
  password: "",
};

export function usePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const [requestState, setRequestState] =
    useState<CustomSubmitButtonStateT>("initial");

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = () => {
    if (!Boolean(formData.email && formData.password))
      return alert("Datos incompletos");

    setRequestState("loading");

    axios
      .post(`${backendURL}/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        const { token } = response.data;
        localStorage.setItem("pr-ado--token", token);
        setRequestState("success");
        setFormData(initialFormState);
        alert("Inicio de sesión exitoso");
        const data = jwtDecode<{ email: string; roleId: number }>(token);
        if (data.roleId === 2) {
          router.push("/adoption");
          return;
        }
        router.push("/dashboard");
      })
      .catch(function (error) {
        setRequestState("error");
        if (error.response) return alert("Datos invalidos!");
        alert("Opps! Ocurrio un error.");
      });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    requestState,
  };
}
