import React from "react";
import { IUserResponse } from "@adopcion/types";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

interface UsersTableProps {
  users: IUserResponse[];
  loading: boolean;
  onDeleteUser: (user: IUserResponse) => void;
  onSelectUser: (user: IUserResponse) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading, onDeleteUser, onSelectUser }) => {
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
          <TableCell>Email</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Rol</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{`${user.firstname} ${user.lastname}`}</TableCell>
            <TableCell>{user.roleId}</TableCell>
            <TableCell>
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
