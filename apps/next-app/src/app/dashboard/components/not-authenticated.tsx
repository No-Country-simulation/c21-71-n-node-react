import { Container, Typography, Box } from "@mui/material";
import DataDog from "@/components/Icons/datadog";
import { useTheme } from "next-themes";

export function NotAuthenticated() {
  const { theme } = useTheme();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        No autenticado
      </Typography>
      <Box mt={4}>
        <DataDog fill={theme === "dark" ? "#ffffff" : "#000000"} />
      </Box>
    </Container>
  );
}
