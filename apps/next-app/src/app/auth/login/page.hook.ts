import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function usePage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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
