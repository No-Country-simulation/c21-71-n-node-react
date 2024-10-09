import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { RoleE, RoleT } from "@/types/roles";

type FormData = {
  role: RoleT;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  shelterName: string;
  address: string;
};

export function usePage() {
  const [formData, setFormData] = useState<FormData>({
    role: RoleE.ADOPTER,
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    shelterName: "",
    address: "",
  });

  function handleInputChange(e: SelectChangeEvent<string>): void;
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  function handleInputChange(e: any): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
}
