import { backendURL } from "@/config";
import { InfoPet } from "@adopcion/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const usePage = () => {
  const [pets, setPets] = useState<InfoPet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendURL}/pets`);
      const pets: InfoPet[] = response.data.petsList;
      setPets(pets);
      setLoading(false);
      console.log(pets);
    } catch (error) {
      console.error("Error fetching pets data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { pets, loading };
};
