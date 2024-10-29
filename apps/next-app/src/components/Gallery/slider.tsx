import { InfoPetWithId } from "@adopcion/types";
import { CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";

interface Props {
  settings: object;
  pet: InfoPetWithId;
  handleOpen: (pet: InfoPetWithId) => void;
}

export function CustomSlider({ handleOpen, pet, settings }: Props) {
  const CustomCardMedia = ({ image }: { image: string }) => {
    return (
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={`${pet.name || "Mascota"}`}
        onClick={() => handleOpen(pet)}
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
