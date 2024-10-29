import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface Pet {
  id: number;
  name: string;
  age: string;
}

const pets: Pet[] = [
  { id: 1, name: "Fido", age: "2 años" },
  { id: 2, name: "Max", age: "3 años" },
  // Más mascotas o datos de una API
];

export default function PetsTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Edad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell>{pet.id}</TableCell>
              <TableCell>{pet.name}</TableCell>
              <TableCell>{pet.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
