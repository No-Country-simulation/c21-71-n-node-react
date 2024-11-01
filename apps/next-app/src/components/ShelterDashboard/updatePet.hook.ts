import { useEffect, useState } from "react";
import { CustomSubmitButtonStateT } from "../Form/Form";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { backendURL } from "@/config";
import { InfoPetResponse } from "@adopcion/types";
import { useRouter } from "next/navigation";
import { FormDataI } from "./registerPet.hook";
import { useGCToken } from "@/context/context";

const InitialFormData: FormDataI = {
  name: "",
  type: "",
  age: "",
  description: "",
  images: [],
};

export function useUpdatePet(
  initial: InfoPetResponse | null,
  getData: () => Promise<void>,
  onClose: () => void
) {
  const gcToken = useGCToken();
  const [formData, setFormData] = useState<FormDataI>(InitialFormData);
  const [submitState, setSubmitState] =
    useState<CustomSubmitButtonStateT>("initial");

  const router = useRouter();

  useEffect(() => {
    if (initial)
      setFormData({
        name: initial.name,
        type: initial.type,
        description: initial.description,
        age: initial.age,
        images: [],
      });
  }, [initial]);

  function handleInputChange(
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async () => {
    if (!initial) return;

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.type.trim() ||
      !formData.age.trim()
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (formData.images.length > 3) {
      alert("Debe haber como máximo 3 imagenes");
      return;
    }

    if (!gcToken.data) {
      router.push("/auth/login");
      return;
    }

    setSubmitState("loading");

    const formDataToSend = new FormData();
    formDataToSend.append("id", initial.id.toString());
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("age", formData.age);

    formData.images.forEach((image) => {
      formDataToSend.append("image", image);
    });

    try {
      await axios.put(`${backendURL}/pet`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${gcToken.data}`,
        },
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
    setFormData,
    submitState,
    handleInputChange,
    handleSubmit,
  };
}
