import { Container, Typography, Box, Button } from "@mui/material";
import DataDog from "@/components/Icons/datadog";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function NotAuthenticated() {
  const { theme } = useTheme();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", my: 4 }}>
      <Typography variant="h4" gutterBottom>
        No autenticado
      </Typography>
      <Box mt={4} sx={{ maxWidth: "380px", mx: "auto" }}>
        <DataDog fill={theme === "dark" ? "#ffffff" : "#000000"} />
      </Box>
      <Link href="/auth/login" passHref>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1EBAB3",
            width: "100%",
            py: 1,
          }}
        >
          Iniciar sesión
        </Button>
      </Link>
    </Container>
  );
}
