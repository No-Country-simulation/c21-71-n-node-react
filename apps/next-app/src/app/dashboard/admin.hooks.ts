import { backendURL } from "@/config";
import { useGCToken } from "@/context/context";
import { InfoPetResponse, IUserResponse } from "@adopcion/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useAdmin() {
  const gcToken = useGCToken();
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [allPets, setAllPets] = useState<InfoPetResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);
  const [selectedPet, setSelectedPet] = useState<InfoPetResponse | null>(null);

  const router = useRouter();

  const getData = useCallback(async () => {
    if (!gcToken.data) {
      router.push("/auth/login");
      return;
    }

    try {
      const [userResponse, petsResponse] = await Promise.all([
        axios.get(`${backendURL}/users`, {
          headers: { Authorization: `Bearer ${gcToken.data}` },
        }),
        axios.get(`${backendURL}/pets`, {
          headers: { Authorization: `Bearer ${gcToken.data}` },
        }),
      ]);

      setUsers(userResponse.data.users as IUserResponse[]);
      setAllPets(petsResponse.data.petsList as InfoPetResponse[]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [gcToken, router]);

  useEffect(() => {
    getData();
  }, [getData]);

  const deleteUser = async () => {
    if (!selectedUser) return;

    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar a "${selectedUser.firstname}"? Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendURL}/user/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${gcToken.data}` },
      });
      await getData();

      alert(`Usuario ${selectedUser.firstname} eliminado exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert(
        "Hubo un error al eliminar el usuario. Por favor, intenta nuevamente."
      );
    }
  };

  const deletePet = async (pet: InfoPetResponse) => {
    if (!selectedPet) return;

    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar a "${selectedPet.name}"? Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendURL}/pet/${pet.id}`, {
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
    setUsers,
    loading,
    users,
    selectedUser,
    setSelectedUser,
    deleteUser,
    getData,
    allPets,
    selectedPet,
    setSelectedPet,
    deletePet,
  };
}
