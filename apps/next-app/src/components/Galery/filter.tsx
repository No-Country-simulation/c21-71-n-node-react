import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  filter: string;
  handleFilterChange: (event: SelectChangeEvent) => void;
}

export function FilterPets({ filter, handleFilterChange }: Props) {
  return (
    <Box
      sx={{
        marginBottom: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2vh",
        borderRadius: 8,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        maxWidth: "40vw",
        margin: "0 auto",
      }}
    >
      <FormControl
        variant="outlined"
        fullWidth
        sx={{ minWidth: 220, borderRadius: 5, color: "white" }}
      >
        <InputLabel
          id="filter-label"
          sx={{
            borderRadius: 5,
            borderColor: "white",
            color: "white",
            "&.Mui-focused": { color: "white" },
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
            color: "white",
            borderRadius: 5,
            "&.MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
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
