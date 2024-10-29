import React from "react";
import { InfoPetWithId } from "@adopcion/types";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { useTheme } from "next-themes";

interface PetsTableProps {
  pets: InfoPetWithId[];
  loading: boolean;
  onDeletePet: (pet: InfoPetWithId) => void;
  onSelectPet: (pet: InfoPetWithId) => void;
}

const PetsTable: React.FC<PetsTableProps> = ({ pets, loading, onDeletePet, onSelectPet }) => {
  const {theme} = useTheme(); // Usa el hook de tema de Material UI

  // Determinación del color del texto basado en el modo del tema
  const borderColor = theme === "dark" ? "#FFFFFF" : "#000000";

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Nombre</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Descripción</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Tipo</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Edad</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pets && pets.length > 0 ? (
          pets.map((pet) => (
            <TableRow key={pet.id} >
              <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{pet.name}</TableCell>
              <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{pet.description}</TableCell>
              <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{pet.type}</TableCell>
              <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{pet.age}</TableCell>
              <TableCell sx={{  borderBottom: `1px solid ${borderColor}` }}>
                <Button onClick={() => onSelectPet(pet)}>Editar</Button>
                <Button onClick={() => onDeletePet(pet)} color="error" >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={{ color: "var(--text-color-primary)" }}>
              No hay mascotas disponibles.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PetsTable;
