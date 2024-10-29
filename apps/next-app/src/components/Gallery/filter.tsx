import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "next-themes";

interface Props {
  filter: string;
  handleFilterChange: (event: SelectChangeEvent) => void;
}

export function FilterPets({ filter, handleFilterChange }: Props) {
  const {theme} = useTheme(); 

  const color = theme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2vh",
        borderRadius: 8,
        maxWidth: "40vw",
        margin: "0 auto",
      }}
    >
      <FormControl
        variant="outlined"
        fullWidth
        sx={{ minWidth: 220, borderRadius: 5, color: `${color}` }}
      >
        <InputLabel
          id="filter-label"
          sx={{
            borderRadius: 5,
            borderColor: `${color}`,
            color: `${color}`,
            "&.Mui-focused": { color: `${color}` },
          }}
        >
          Filtrar por Tipo
        </InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filtrar por Tipo"
          sx={{
            color: `${color}`,
            borderRadius: 5,
            "&.MuiOutlinedInput-root": {
              "& fieldset": { borderColor: `${color}` },
              "&:hover fieldset": { borderColor: `${color}` },
              "&.Mui-focused fieldset": { borderColor: `${color}` },
            },
          }}
          MenuProps={{ PaperProps: { sx: { borderRadius: 5 } } }}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="dog">Perros</MenuItem>
          <MenuItem value="cat">Gatos</MenuItem>
          <MenuItem value="other">Otros</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
