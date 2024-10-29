import React, { useState } from "react";
import { Box, Container, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import UsersTable from "@/components/AdminDashboard/UsersTable";
import PetsTable from "@/components/AdminDashboard/PetsTable";

export default function AdminPage() {
  const [selectedSection, setSelectedSection] = useState<"Usuarios" | "Mascotas">("Usuarios");

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
              backgroundColor: "#135b5e", // Color de fondo del Drawer
              color: "white", // Color del texto
              position: "fixed", // Fija el Drawer
              top: 87, // Ajusta para no pisar el Navbar (ajusta este valor según la altura de tu Navbar)
              height: "calc(100vh - 87px)", // Asegura que ocupe toda la altura restante
            },
          }}
      >
        <List>
            {["Usuarios", "Mascotas"].map((section) => (
                <ListItem 
                key={section} 
                onClick={() => handleSectionClick(section as "Usuarios" | "Mascotas")} 
                component="button" // Indica que el ListItem actúa como un botón
                sx={{ textAlign: "left" }} // Ajusta el texto si es necesario
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
        {selectedSection === "Usuarios" ? <UsersTable /> : <PetsTable />}
      </Box>
    </Container>
  );
}
