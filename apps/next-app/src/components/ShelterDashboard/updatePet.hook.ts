import { useEffect, useState } from "react";
import { CustomSubmitButtonStateT } from "../Form/Form";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { backendURL } from "@/config";
import { getToken } from "@/utils/token";
import { InfoPetWithId } from "@adopcion/types";
import { useRouter } from "next/navigation";

const InitialFormData: InfoPetWithId = {
  id: -1,
  name: "",
  type: "",
  age: "",
  description: "",
  imageUrl: [],
  shelterId: null
};

export function useUpdatePet(
  initial: InfoPetWithId | null,
  getData: () => Promise<void>,
  onClose: () => void
) {
  const [formData, setFormData] = useState<InfoPetWithId>(InitialFormData);
  const [submitState, setSubmitState] =
    useState<CustomSubmitButtonStateT>("initial");

  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (initial) setFormData(initial);
  }, [initial]);

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async () => {
    if (formData.id === -1) {
      alert("Oops. Ocurrió un error.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.type.trim() ||
      !formData.age.trim()
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!token) {
      router.push("/auth/login");
      return;
    }

    setSubmitState("loading");

    const data = {
      id: formData.id,
      infoPet: {
        name: formData.name,
        type: formData.type,
        age: formData.age,
        description: formData.description,
      },
    };

    try {
      await axios.put(`${backendURL}/pet`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitState("success");
      await getData();
      alert("Se actualizo la mascota con éxito");
      onClose();
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
      alert("Hubo un problema al actualizar la mascota. Inténtalo de nuevo.");
      setSubmitState("error");
    }
  };

  return {
    formData,
    submitState,
    handleInputChange,
    handleSubmit,
  };
}
