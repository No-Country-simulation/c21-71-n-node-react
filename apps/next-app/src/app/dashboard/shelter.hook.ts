import { backendURL } from "@/config";
import { useGCToken } from "@/context/context";
import { InfoPetResponse } from "@adopcion/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useShelter() {
  const gcToken = useGCToken();
  const [registerPetOpen, setRegisterPetOpen] = useState(false);
  const [pets, setPets] = useState<InfoPetResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPet, setSelectedPet] = useState<InfoPetResponse | null>(null);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);

  const router = useRouter();

  const getData = useCallback(async () => {
    if (!gcToken.data) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await axios.get(`${backendURL}/pets-by-shelter`, {
        headers: { Authorization: `Bearer ${gcToken.data}` },
      });
      setPets(response.data.pets as InfoPetResponse[]);
    } catch (error) {
      console.error("Error fetching pets data:", error);
    } finally {
      setLoading(false);
    }
  }, [gcToken, router]);

  useEffect(() => {
    getData();
  }, [getData]);

  const deletePet = async () => {
    if (!selectedPet) return;

    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar a "${selectedPet.name}"? Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendURL}/pet/${selectedPet.id}`, {
        headers: { Authorization: `Bearer ${gcToken.data}` },
      });
      await getData();

      alert(`Mascota ${selectedPet.name} eliminada exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar la mascota:", error);
      alert(
        "Hubo un error al eliminar la mascota. Por favor, intenta nuevamente."
      );
    }
  };

  return {
    setRegisterPetOpen,
    registerPetOpen,
    setPets,
    loading,
    pets,
    selectedPet,
    setSelectedPet,
    deletePet,
    openUpdateForm,
    setOpenUpdateForm,
    getData,
  };
}
