import axios from "axios";
import { useState } from "react";
import { backendURL } from "@/config";
import { SelectChangeEvent } from "@mui/material";
import { RoleE, RoleT } from "@/types/roles";
import { useRouter } from "next/navigation";
import { CustomSubmitButtonStateT } from "@/components/Form/Form";
import { jwtDecode } from "jwt-decode";
import { setToken } from "@/utils/token";

type FormData = {
  role: RoleT;
  name: string;
  lastname: string;
  sheltername: string;
  email: string;
  phone: string;
  password: string;
  passwordRepeat: string;
};

const initialFormState = {
  role: RoleE.ADOPTER,
  name: "",
  lastname: "",
  sheltername: "",
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

  const handleSubmit = () => {
    if (formData.role === RoleE.ADOPTER) {
      if (
        !formData.name ||
        !formData.lastname ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.passwordRepeat
      ) {
        return alert("Datos incompletos para el rol de adoptante.");
      }
    } else if (formData.role === RoleE.SHELTER) {
      if (
        !formData.sheltername ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.passwordRepeat
      ) {
        return alert("Datos incompletos para el rol de refugio.");
      }
    }

    if (formData.password !== formData.passwordRepeat)
      return alert("Las contraseñas no coinciden");

    if (!["ADOPTER", "SHELTER"].includes(formData.role))
      return alert("El rol no es válido");

    setRequestState("loading");

    const data = {
      type: formData.role.toLowerCase(),
      user: {
        ...(formData.role === "ADOPTER"
          ? {
              firstname: formData.name,
              lastname: formData.lastname,
            }
          : {
              shelter_name: formData.sheltername,
            }),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      },
    };

    axios
      .post(`${backendURL}/register`, data)
      .then(function (response) {
        const { token } = response.data;
        setToken(token);
        setFormData(initialFormState);
        const data = jwtDecode<{ email: string; roleId: number }>(token);
        setRequestState("success");
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
