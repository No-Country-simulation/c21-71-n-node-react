import { useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface CustomFormProps {
  children: React.ReactNode;
  title: string;
}

interface CustomTextFieldProps {
  label: string;
  type: string;
  name: string;
  autoComplete?: string;
  value: string;
  onChange: {
    (e: SelectChangeEvent<string>): void;
    (e: React.ChangeEvent<HTMLInputElement>): void;
  };
}

export type CustomSubmitButtonStateT =
  | "initial"
  | "loading"
  | "success"
  | "error";

interface CustomSubmitButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  state: CustomSubmitButtonStateT;
}

interface CustomCallActionProps {
  question: string;
  link: string;
  callToAction: string;
}

interface ImageUploadProps {
  onChange: (files: File[]) => void;
}

interface CustomSelectorProps<T> {
  children: React.ReactNode;
  label: string;
  name: string;
  handleInputChange: (
    e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  value: T;
}

export function CustomForm(props: CustomFormProps) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", color: "#1EBAB3" }}
      >
        {props.title}
      </Typography>
      <form>{props.children}</form>
    </Container>
  );
}

export function CustomTextField(props: CustomTextFieldProps) {
  return (
    <TextField
      fullWidth
      label={props.label}
      type={props.type}
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      autoComplete={props.autoComplete}
      sx={{ mb: 2 }}
    />
  );
}

export function CustomSubmitButton(props: CustomSubmitButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={props.onClick}
      sx={{ mt: 2 }}
      disabled={props.state === "loading"}
    >
      {props.state === "loading" ? "Cargando..." : props.text}
    </Button>
  );
}

export function CustomCallAction(props: CustomCallActionProps) {
  return (
    <Typography
      variant="body2"
      sx={{ textAlign: "center", mt: 2, color: "text.primary" }}
    >
      {props.question}{" "}
      <Link href={props.link} passHref>
        <Button variant="text" color="primary">
          {props.callToAction}
        </Button>
      </Link>
    </Typography>
  );
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles(newFiles);
      onChange(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="image-upload">
        <Button variant="contained" component="span">
          Subir Imágenes
        </Button>
      </label>
      <Box display="flex" flexDirection="column" width="100%" sx={{ gap: 1 }}>
        {files.length > 0 && (
          <Typography variant="body2" sx={{ color: "black" }}>
            Imágenes seleccionadas:
          </Typography>
        )}
        {files.map((file, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: "black" }}>
              {file.name}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveFile(index)}
            >
              Eliminar
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function CustomSelector<T>({
  children,
  label,
  name,
  handleInputChange,
  value,
}: CustomSelectorProps<T>) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        name={name}
        id={name}
        value={value as string}
        onChange={handleInputChange}
        label={label}
      >
        {children}
      </Select>
    </FormControl>
  );
}
