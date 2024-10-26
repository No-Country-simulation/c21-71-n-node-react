import { InfoPet } from "@adopcion/types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Slider from "react-slick";

interface Props {
  handleOpen: (pet: InfoPet) => void;
  pet: InfoPet;
  settings: object;
}

export function PetCard({ handleOpen, pet, settings }: Props) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
        <div className="slider-container">
          <Slider {...settings}>
            {pet.imageUrl && pet.imageUrl.length > 0 ? (
              pet.imageUrl.map((image, idx) => (
                <div key={idx}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`${pet.name || "Mascota"} - ${idx + 1}`}
                    onClick={() => handleOpen(pet)}
                  />
                </div>
              ))
            ) : (
              <Typography variant="body2">
                No hay imágenes disponibles
              </Typography>
            )}
          </Slider>
        </div>
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
