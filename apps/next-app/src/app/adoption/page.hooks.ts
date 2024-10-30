import { backendURL } from "@/config";
import { DecodedToken } from "@/types/api";
import { getToken } from "@/utils/token";
import { InfoPetResponse } from "@adopcion/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const usePage = () => {
  const [pets, setPets] = useState<InfoPetResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPet, setSelectedPet] = useState<InfoPetResponse | null>(null);

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
  }, []);

  const isTokenValid = () => {
    const token = getToken();
    if (!token) {
      return false;
    }

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const handleAdopt = () => {
    if (isTokenValid()) {
      alert("¡Gracias por adoptar!");
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
  };
};
