import { Box } from "@mui/material";
import "./loader.css";

export default function Loader() {
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
