import { backendURL } from "@/config";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function usePage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!Boolean(formData.email && formData.password))
      return alert("Datos incompletos");

    axios
      .post(`${backendURL}/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        const { token } = response.data;
        localStorage.setItem("pr-ado--token", token);
      })
      .catch(function (error) {
        if (error.response) return alert("Credenciales invalidas");

        alert("Opps! Ocurrio un error.");
      });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
}
