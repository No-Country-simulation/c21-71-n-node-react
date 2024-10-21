import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Modal, Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slider from 'react-slick';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from "next/navigation";

interface Pet {
    name: string;
    age: string;
    description: string;
    images: string[];
    type: string;
}

interface DecodedToken{
    roleId:string,
    exp: number,
    iat: number,
    email: string,
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
];

const Galery: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [filter, setFilter] = useState<string>('all');

    const router = useRouter();

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const filteredPets = filter === 'all' ? pets : pets.filter((pet) => pet.type === filter);

    // Nueva función para verificar el token
    const isTokenValid = () => {
        const token = localStorage.getItem('pr-ado--token');
        if (!token) {
            return false; // No hay token
        }

        try {
            const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

            if (decoded.exp < currentTime) {
                return false; // El token ha expirado
            }

            return true; // El token es válido
        } catch (e: unknown) {
            console.error(e)
            return false; // Error al decodificar el token
        }
    };

    // Función para manejar la adopción
    const handleAdopt = () => {
        if (isTokenValid()) {
            // El token es válido, proceder con la adopción
            alert("¡Gracias por adoptar!");
            // Aquí podrías agregar la lógica para la adopción, como hacer una petición al backend
        } else {
            // El token no es válido, redirigir al usuario a iniciar sesión
            alert("Por favor, inicia sesión para adoptar.");
            router.push("/auth/login")
            // window.location.href = '/login';
        }
    };

    return (
        <>
            {/* Filtro de tipo de mascota */}
            <Box sx={{ marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2vh', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', maxWidth: '40vw', margin: '0 auto', }}>
                <FormControl variant="outlined" fullWidth sx={{ minWidth: 220, borderRadius: 5, color: 'white' }}>
                    <InputLabel id="filter-label" sx={{ borderRadius: 5, borderColor: 'white', color: 'white', "&.Mui-focused": { color: 'white' } }}>Filtrar por Tipo</InputLabel>
                    <Select
                        labelId="filter-label"
                        value={filter}
                        onChange={handleFilterChange}
                        label="Filtrar por Tipo"
                        sx={{
                            color: 'white', borderRadius: 5,
                            "&.MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                            },
                        }}
                        MenuProps={{ PaperProps: { sx: { borderRadius: 5 } } }}
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
                                cursor: 'pointer',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                "&:hover": { transform: 'scale(1.05)', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' },
                            }}
                            onClick={(e) => {
                                if (!(e.target as HTMLElement).closest('.slick-dots')) {
                                    handleOpen(pet);
                                }
                            }}
                        >
                            <div className="slider-container" {...(open ? { inert: true } : {})}>
                                <Slider {...settings}>
                                    {pet.images.map((image, idx) => (
                                        <div key={idx}>
                                            <CardMedia component="img" height="200" image={image} alt={`${pet.name} - ${idx + 1}`} onClick={() => handleOpen(pet)} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <CardContent>
                                <Typography variant="h5">{pet.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{pet.age}</Typography>
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
                        width: 500,
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
                                        <CardMedia component="img" height="200" image={image} alt={`${selectedPet.name} - ${idx + 1}`} sx={{ borderRadius: 10 }} />
                                    </div>
                                ))}
                            </Slider>
                            <Typography variant="h4" sx={{ color: '#194143' }}>{selectedPet.name}</Typography>
                            <Typography variant="h6" sx={{ color: '#194143' }} mt={2}>{selectedPet.age}</Typography>
                            <Typography variant="body1" mt={2} sx={{ color: '#194143' }}>{selectedPet.description}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    color="primary"
                                    sx={{ m: 2, backgroundColor: "#1eb7b2", "&:hover": { backgroundColor: "#189e9b" } }}
                                >
                                    Cerrar
                                </Button>
                                <Button
                                    onClick={handleAdopt} // Llama a la función de adopción
                                    variant="contained"
                                    color="primary"
                                    sx={{ m: 2, backgroundColor: "#e47116", "&:hover": { backgroundColor: "#c4530a" } }}
                                >
                                    Adoptar!
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
