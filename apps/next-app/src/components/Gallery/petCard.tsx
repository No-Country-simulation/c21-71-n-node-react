import { InfoPetResponse } from "@adopcion/types";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CustomSlider } from "./slider";

interface Props {
  handleOpen: (pet: InfoPetResponse) => void;
  pet: InfoPetResponse;
  settings: object;
}

export function PetCard({ handleOpen, pet, settings }: Props) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          backgroundColor: "#ECA26E",
          borderRadius: 5,
          cursor: "pointer",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest(".slick-dots"))
            handleOpen(pet);
        }}
      >
        <CustomSlider
          settings={settings}
          pet={pet}
          handleOpen={handleOpen}
          height={{ xs: 300, md: 300 }}
        />
        <CardContent>
          <Typography variant="h5">{pet.name}</Typography>
          {pet.age ? (
            <Typography variant="body2" color="text.secondary">
              Edad: {pet.age}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
}
