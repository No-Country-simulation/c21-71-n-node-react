import { InfoPetResponse } from "@adopcion/types";
import { CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";

interface Props {
  settings: object;
  pet: InfoPetResponse;
  handleOpen: (pet: InfoPetResponse) => void;
  height?: { xs: number; md: number };
}

export function CustomSlider({ height, handleOpen, pet, settings }: Props) {
  const CustomCardMedia = ({ image }: { image: { url: string } }) => {
    return (
      <CardMedia
        component="img"
        image={image.url}
        alt={`${pet.name || "Mascota"}`}
        onClick={() => handleOpen(pet)}
        sx={{
          borderRadius: 2,
          objectFit: "contain",
          height,
        }}
      />
    );
  };

  return (
    <div className="slider-container">
      {pet.imageUrl.length > 1 ? (
        <Slider {...settings}>
          {pet.imageUrl && pet.imageUrl.length > 0 ? (
            pet.imageUrl.map((image, idx) => (
              <div key={idx}>
                <CustomCardMedia image={image} />
              </div>
            ))
          ) : (
            <Typography variant="body2">No hay imágenes disponibles</Typography>
          )}
        </Slider>
      ) : (
        <CustomCardMedia image={pet.imageUrl[0]} />
      )}
    </div>
  );
}
