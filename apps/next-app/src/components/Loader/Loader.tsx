import { Box } from "@mui/material";
import "./loader.css";

export default function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "calc(100vh - 67px - 61px)" }}
    >
      <div className="loader"></div>
    </Box>
  );
}
