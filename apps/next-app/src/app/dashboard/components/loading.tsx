import { Box } from "@mui/material";
import "../styles/loader.css";

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div className="loader"></div>
    </Box>
  );
}
