import React, { useState } from "react";
import { Box, Container, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import UsersTable from "@/components/AdminDashboard/UsersTable";
import PetsTable from "@/components/AdminDashboard/PetsTable";
import { useAdmin } from "./admin.hooks";

export default function AdminPage() {
  const [selectedSection, setSelectedSection] = useState<"Usuarios" | "Mascotas">("Usuarios");

  const { users, loading: loadingUsers, deleteUser, setSelectedUser, allPets, loading, deletePet, setSelectedPet } = useAdmin();

  const handleSectionClick = (section: "Usuarios" | "Mascotas") => {
    setSelectedSection(section);
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", mt: 5 }}>
      {/* Menú lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            backgroundColor: "#135b5e",
            color: "white",
            position: "fixed",
            top: { xs: 67, md: 87 },
            height: { xs: "calc(100vh - 128px)", md: "calc(100vh - 148px)" },
          },
        }}
      >
        <List>
          {["Usuarios", "Mascotas"].map((section) => (
            <ListItem
              key={section}
              onClick={() => handleSectionClick(section as "Usuarios" | "Mascotas")}
              component="button"
              sx={{ textAlign: "left" }}
            >
              <ListItemText primary={section} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {selectedSection}
        </Typography>
        {selectedSection === "Usuarios" ? (
          <UsersTable
            users={users}
            loading={loadingUsers}
            onDeleteUser={deleteUser}
            onSelectUser={setSelectedUser}
          />
        ) : (
          <PetsTable
            pets={allPets}
            loading={loading}
            onDeletePet={deletePet}
            onSelectPet={setSelectedPet}
          />
        )}
      </Box>
    </Container>
  );
}
