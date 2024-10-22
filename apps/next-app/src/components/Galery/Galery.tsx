"use client";
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Modal, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material';
import Slider from 'react-slick';
import { useTheme } from 'next-themes';

interface Pet {
    name: string;
    age: string;
    description: string;
    images: string[];
    type: string;
}

const pets: Pet[] = [
    {
        name: 'Yummy',
        age: '2 años',
        description: 'Soy Yummy, muy simpático y dulce. Estoy vacunado y castrado.',
        images: ['/perro1.jfif', '/perro2.jfif', '/perro3.jfif'],
        type: 'dog'
    },
    {
        name: 'Mowgli',
        age: '4 años',
        description: 'Soy Mowgli, muy tranquilo. Estoy vacunado y castrado.',
        images: ['/perro2.jfif', '/perro3.jfif', '/perro1.jfif'],
        type: 'dog'
    },
    {
        name: 'Burako',
        age: '1 año y 6 meses',
        description: 'Soy Burako, un caballero elegante. Estoy vacunado y castrado.',
        images: ['/perro3.jfif', '/perro2.jfif', '/perro1.jfif'],
        type: 'dog'
    },
    {
        name: 'Ummy',
        age: '3 años',
        description: 'Soy Yummy, muy simpático y dulce. Estoy vacunado y castrado.',
        images: ['/perro1.jfif', '/perro2.jfif', '/perro3.jfif'],
        type: 'dog'
    },
    {
        name: 'Li',
        age: '4 años y 7 meses',
        description: 'Soy Li, muy tranquilo. Estoy vacunado y castrado.',
        images: ['/perro2.jfif', '/perro3.jfif', '/perro1.jfif'],
        type: 'other'
    },
    {
        name: 'Kika',
        age: '6 años y 6 meses',
        description: 'Soy Kika, muy simpática. Estoy vacunada y castrada.',
        images: ['/perro3.jfif', '/perro2.jfif', '/perro1.jfif'],
        type: 'cat'
    },
    // Se pueden agregar más mascotas aquí...
];

const Galery: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';



    const handleOpen = (pet: Pet) => {
        setSelectedPet(pet);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPet(null);
    };

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    // Configuración del slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    // Filtrar mascotas basado en el filtro seleccionado
    const filteredPets = filter === 'all' ? pets : pets.filter((pet) => pet.type === filter);

    return (
        <>
            {/* Filtro de tipo de mascota */}
            <Box sx={{
                marginBottom: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2vh',
                borderRadius: 5,
                maxWidth: '40vw',
                backgroundColor: isDarkMode ? '#121212' : '#fff', // Cambia el color del fondo según el modo
            }}>
                <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{
                        minWidth: 220,
                        borderRadius: 5,
                    }}
                >
                    <InputLabel
                        id="filter-label"
                        sx={{
                            borderRadius: 5,
                            color: isDarkMode ? 'white' : 'black', // Cambia el color del texto
                            "&.Mui-focused": {
                                color: isDarkMode ? 'white' : 'black', // Cambia el color cuando está enfocado
                            }
                        }}>Filtrar por Tipo</InputLabel>
                    <Select
                        labelId="filter-label"
                        value={filter}
                        onChange={handleFilterChange}
                        label="Filtrar por Tipo"
                        sx={{
                            color: isDarkMode ? 'white' : 'black',
                            borderRadius: 5,
                            "&.MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: isDarkMode ? 'white' : 'black', // Cambia el borde
                                },
                                "&:hover fieldset": {
                                    borderColor: isDarkMode ? 'white' : 'black', // Cambia el borde en hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: isDarkMode ? 'white' : 'black', // Cambia el borde cuando está enfocado
                                },
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    borderRadius: 5, // Bordes redondeados del menú de opciones
                                    backgroundColor: isDarkMode ? '#333' : '#fff', // Cambia el fondo del menú dinámico
                                    color: isDarkMode ? 'white' : 'black', // Cambia el color del texto del menú
                                },
                            },
                        }}
                    >
                        <MenuItem value="all" >Todos</MenuItem>
                        <MenuItem value="dog" >Perros</MenuItem>
                        <MenuItem value="cat">Gatos</MenuItem>
                        <MenuItem value="other">Otros</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Galería de mascotas */}
            <Grid container spacing={2} sx={{ width: '85vw' }}>
                {filteredPets.map((pet, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#ECA26E',
                                borderRadius: 5,
                                cursor: 'pointer', // Para indicar que es clickeable
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                "&:hover": {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                },

                            }}
                            onClick={(e) => {
                                // Si no se hace clic en los puntos del slider, abrir el modal
                                if (!(e.target as HTMLElement).closest('.slick-dots')) {
                                    handleOpen(pet);
                                }
                            }}
                        >
                            <div
                                className="slider-container"
                                {...(open ? { inert: true } : {})}
                            >
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
                        width: '45vw',
                        height: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: 10,
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
                                            image={image}
                                            alt={`${selectedPet.name} - ${idx + 1}`}
                                            sx={{
                                                borderRadius: 5,
                                                width: '100%', // Asegura que la imagen tome todo el ancho del contenedor del carrusel
                                                height: 'auto', // Mantiene la proporción correcta de la imagen
                                                maxHeight: { xs: '50vh', md: 300 }, // Limitar la altura según la pantalla
                                                objectFit: 'cover', // Hace que la imagen se ajuste al contenedor sin deformarse
                                                margin: '0 auto', // Centra la imagen
                                            }}
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