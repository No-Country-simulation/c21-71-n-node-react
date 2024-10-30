import React from "react";
import { IUserResponse } from "@adopcion/types";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { useTheme } from "next-themes";

interface UsersTableProps {
  users: IUserResponse[];
  loading: boolean;
  onDeleteUser: (user: IUserResponse) => void;
  onSelectUser: (user: IUserResponse) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading, onDeleteUser, onSelectUser }) => {
    const {theme} = useTheme(); // Usa el hook de tema de Material UI

    // Determinación del color del texto basado en el modo del tema
    const borderColor = theme === "dark" ? "#ffffff" : "#000000";

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
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Email</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Nombre</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Rol</TableCell>
          <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{user.email}</TableCell>
            <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{`${user.firstname} ${user.lastname}`}</TableCell>
            <TableCell sx={{ color: "var(--text-color-primary)", borderBottom: `1px solid ${borderColor}` }}>{user.roleId}</TableCell>
            <TableCell sx={{ borderBottom: `1px solid ${borderColor}` }}>
              <Button onClick={() => onSelectUser(user)}>Editar</Button>
              <Button onClick={() => onDeleteUser(user)} color="error">
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
