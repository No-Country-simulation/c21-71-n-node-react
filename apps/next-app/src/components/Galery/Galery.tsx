"use client";
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Modal, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slider from 'react-slick';

interface Pet {
    name: string;
    age: string;
    description: string;
    images: string[];
}

const pets: Pet[] = [
    {
        name: 'Yummy',
        age: '2 años',
        description: 'Soy Yummy, muy simpático y dulce. Estoy vacunado y castrado.',
        images: ['/Images/perro1.jfif', '/Images/perro2.jfif', '/Images/perro3.jfif']
    },
    {
        name: 'Mowgli',
        age: '4 años',
        description: 'Soy Mowgli, muy tranquilo. Estoy vacunado y castrado.',
        images: ['/Images/perro2.jfif', '/Images/perro3.jfif', '/Images/perro1.jfif']
    },
    {
        name: 'Burako',
        age: '1 año y 6 meses',
        description: 'Soy Burako, un caballero elegante. Estoy vacunado y castrado.',
        images: ['/Images/perro3.jfif', '/Images/perro2.jfif', '/Images/perro1.jfif']
    },
    // Se pueden agregar más mascotas aquí...
];

const Galery: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    const handleOpen = (pet: Pet) => {
        setSelectedPet(pet);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPet(null);
    };

    // Configuración del slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Grid container spacing={2} sx={{ width: '85vw' }}>
                {pets.map((pet, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#ECA26E',
                                borderRadius: 10,
                                cursor: 'pointer', // Para indicar que es clickeable
                            }}
                            onClick={(e) => {
                                // Si no se hace clic en los puntos del slider, abrir el modal
                                if (!(e.target as HTMLElement).closest('.slick-dots')) {
                                    handleOpen(pet);
                                }
                            }}
                        >
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {pet.images.map((image, idx) => (
                                        <div key={idx}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={image}
                                                alt={`${pet.name} - ${idx + 1}`}
                                                onClick={() => handleOpen(pet)} // Abre el modal al hacer clic en la imagen
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <CardContent>
                                <Typography variant="h5">{pet.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {pet.age}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal con más información */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 20,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedPet && (
                        <Box sx={{ alignContent: 'center' }}>
                            <Slider {...settings}>
                                {selectedPet.images.map((image, idx) => (
                                    <div key={idx}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={image}
                                            alt={`${selectedPet.name} - ${idx + 1}`}
                                            sx={{ borderRadius: 10 }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                            <Typography variant="h4" sx={{ color: '#194143' }}>{selectedPet.name}</Typography>
                            <Typography variant="h6" sx={{ color: '#194143' }} mt={2}>
                                {selectedPet.age}
                            </Typography>
                            <Typography variant="body1" mt={2} sx={{ color: '#194143' }}>
                                {selectedPet.description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "#1eb7b2",
                                        "&:hover": { backgroundColor: "#189e9b" },
                                    }}
                                >
                                    Cerrar
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default Galery;
