import React from "react";
import { InfoPetWithId } from "@adopcion/types";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

interface PetsTableProps {
  pets: InfoPetWithId[];
  loading: boolean;
  onDeletePet: (pet: InfoPetWithId) => void;
  onSelectPet: (pet: InfoPetWithId) => void;
}

const PetsTable: React.FC<PetsTableProps> = ({ pets, loading, onDeletePet, onSelectPet }) => {
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
          <TableCell>Nombre</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Edad</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pets && pets.length > 0 ? (
          pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell>{pet.name}</TableCell>
              <TableCell>{pet.description}</TableCell>
              <TableCell>{pet.type}</TableCell>
              <TableCell>{pet.age}</TableCell>
              <TableCell>
                <Button onClick={() => onSelectPet(pet)}>Editar</Button>
                <Button onClick={() => onDeletePet(pet)} color="error">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center">
              No hay mascotas disponibles.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PetsTable;
