import axios from "axios";
import { useState } from "react";
import { backendURL } from "@/config";
import { SelectChangeEvent } from "@mui/material";
import { RoleE, RoleT } from "@/types/roles";
import { useRouter } from "next/navigation";
import { CustomSubmitButtonStateT } from "@/components/Form/Form";

type FormData = {
  role: RoleT;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  passwordRepeat: string;
};

const initialFormState = {
  role: RoleE.ADOPTER,
  name: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  passwordRepeat: "",
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !Boolean(
        formData.role &&
          formData.name &&
          formData.lastname &&
          formData.email &&
          formData.phone &&
          formData.password &&
          formData.passwordRepeat
      )
    )
      return alert("Datos incompletos");

    if (formData.password !== formData.passwordRepeat)
      return alert("Las contraseñas no coinciden");

    if (!["ADOPTER", "SHELTER"].includes(formData.role))
      return alert("El rol no es válido");

    setRequestState("loading");

    const role = formData.role === RoleE.ADOPTER ? 2 : 3;

    axios
      .post(`${backendURL}/register`, {
        firstname: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        roleId: role,
      })
      .then(function (response) {
        const { token } = response.data;
        localStorage.setItem("pr-ado--token", token);
        setRequestState("success");
        setFormData(initialFormState);
        alert("Registro de usuario exitoso");
        router.push("/auth/login");
      });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    requestState,
  };
}
