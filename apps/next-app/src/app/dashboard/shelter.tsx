import { Box, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import RegisterPet from "@/components/ShelterDashboard/RegisterPet";
import Gallery from "@/components/Gallery/Gallery";
import { useShelter } from "./shelter.hook";
import { ActionButton } from "@/components/Gallery/ActionButton";
import { UpdatePet } from "@/components/ShelterDashboard/UpdatePet";
import { usePage } from "../adoption/page.hooks";
export default function ShelterPage() {
  const {
    setRegisterPetOpen,
    registerPetOpen,
    setPets,
    loading,
    pets,
    selectedPet,
    setSelectedPet,
    deletePet,
    openUpdateForm,
    setOpenUpdateForm,
    getData,
  } = useShelter();

  const {shelterInfo, setShelterInfo} = usePage();


  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ backgroundColor: "#178685" }}
          onClick={() => setRegisterPetOpen(true)}
        >
          Publicar Mascota
        </Button>
      </Box>
      <RegisterPet
        open={registerPetOpen}
        onClose={() => setRegisterPetOpen(false)}
        addPet={(pet) => setPets((prev) => [...prev, pet])}
      />

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
        flexDirection="column"
        gap={4}
        marginBottom={4}
      >
        <Gallery
          loading={loading}
          pets={pets}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          shelterInfo={shelterInfo}
          setShelterInfo={setShelterInfo}
          modalActions={
            <>
              <ActionButton
                onClick={() => setOpenUpdateForm(true)}
                text="Actualizar"
                bgColor="#e47116"
                hoverBgColor="#c4530a"
              />
              <ActionButton
                onClick={deletePet}
                text="Eliminar"
                bgColor="#E41616FF"
                hoverBgColor="#DF2F2FFF"
              />
            </>
          }
        />
      </Box>

      <UpdatePet
        open={openUpdateForm}
        getData={getData}
        onClose={() => setOpenUpdateForm(false)}
        initial={selectedPet}
      />
    </Container>
  );
}
