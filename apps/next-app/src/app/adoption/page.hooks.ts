import { backendURL } from "@/config";
import { useGCToken } from "@/context/context";
import { DecodedToken } from "@/types/api";
import { InfoPetResponse, ShelterInfo } from "@adopcion/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const usePage = () => {
  const gcToken = useGCToken();
  const [pets, setPets] = useState<InfoPetResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPet, setSelectedPet] = useState<InfoPetResponse | null>(null);
  const [shelterInfo, setShelterInfo] = useState<ShelterInfo | null>(null);

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendURL}/pets`);
      const pets: InfoPetResponse[] = response.data.petsList;
      setPets(pets);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pets data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gcToken]);

  const isTokenValid = () => {
    if (!gcToken.data) {
      return false;
    }

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(gcToken.data);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const handleAdopt = async () => {
    if (isTokenValid()) {
      try {
        // Asegúrate de que `selectedPet` tenga el `shelterId` necesario.
        const shelterId = selectedPet?.shelterId;
        if (!shelterId) return;

        // Realiza la solicitud al backend
        const response = await axios.get(`${backendURL}/shelter/${shelterId}`, {
          headers: { Authorization: `Bearer ${gcToken.data}` },
        });
        const shelterData = response.data.shelter;

        // Guarda los datos del refugio en un estado
        setShelterInfo(shelterData);
      } catch (error) {
        console.error("Error al obtener la información del refugio:", error);
      }
    } else {
      alert("Por favor, inicia sesión para adoptar.");
      router.push("/auth/login");
    }
  };

  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    pets,
    loading,
    selectedPet,
    galleryRef,
    setSelectedPet,
    handleAdopt,
    scrollToGallery,
    shelterInfo,
    setShelterInfo,
  };
};
