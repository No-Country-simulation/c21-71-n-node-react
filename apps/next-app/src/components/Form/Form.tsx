import {
  Button,
  Container,
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

export type CustomSubmitButtonStateT = "initial" | "loading" | "success";

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
