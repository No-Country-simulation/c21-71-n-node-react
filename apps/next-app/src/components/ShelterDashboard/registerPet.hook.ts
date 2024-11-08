import { useState } from "react";
import { CustomSubmitButtonStateT } from "../Form/Form";
import { SelectChangeEvent } from "@mui/material";
import { backendURL } from "@/config";
import axios from "axios";
import { InfoPetResponse } from "@adopcion/types";
import { useGCToken } from "@/context/context";

export interface FormDataI {
  name: string;
  description: string;
  type: string;
  age: string;
  images: File[];
}

export function useRegisterPet(
  onClose: () => void,
  addPet: (pet: InfoPetResponse) => void
) {
  const gcToken = useGCToken();
  const [formData, setFormData] = useState<FormDataI>({
    name: "",
    description: "",
    type: "",
    age: "",
    images: [],
  });
  const [submitState, setSubmitState] =
    useState<CustomSubmitButtonStateT>("initial");

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.type.trim() ||
      !formData.age.trim() ||
      formData.images.length === 0
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (formData.images.length > 3) {
      alert("Solo se permiten un máximo de 3 imágenes.");
      return;
    }

    setSubmitState("loading");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("age", formData.age);

    formData.images.forEach((image) => {
      formDataToSend.append("image", image);
    });

    try {
      const { data } = await axios.post(`${backendURL}/pet`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${gcToken.data}`,
        },
      });

      addPet(data.newPet);

      setSubmitState("success");
      alert("Mascota registrada con éxito.");
      setFormData({
        name: "",
        description: "",
        type: "",
        age: "",
        images: [],
      });
      onClose();
    } catch (error) {
      setSubmitState("error");
      console.error("Error al registrar mascota:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          "Hubo un error al registrar la mascota.";
        alert(`Error: ${errorMessage}`);
      } else {
        alert("Error inesperado: " + error);
      }
    }
  };

  return {
    formData,
    handleInputChange,
    setFormData,
    submitState,
    handleSubmit,
  };
}
