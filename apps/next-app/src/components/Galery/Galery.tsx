"use client";
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Modal, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Pet {
    name: string;
    age: string;
    description: string;
    image: string;
}

const pets: Pet[] = [
    {
        name: 'Yummy',
        age: '2 años',
        description: 'Soy Yummy, muy simpático y dulce. Estoy vacunado y castrado.',
        image: '/Images/perro1.jfif'
    },
    {
        name: 'Mowgli',
        age: '4 años',
        description: 'Soy Mowgli, muy tranquilo. Estoy vacunado y castrado.',
        image: '/Images/perro2.jfif',
    },
    {
        name: 'Burako',
        age: '1 año y 6 meses',
        description: 'Soy Burako, un caballero elegante. Estoy vacunado y castrado.',
        image: '/Images/perro3.jfif',
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

    return (
        <>
            <Grid container spacing={2} sx={{ width: '85vw' }}>
                {pets.map((pet, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card onClick={() => handleOpen(pet)} sx={{ backgroundColor: '#ECA26E' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={pet.image}
                                alt={pet.name}
                            />
                            <CardContent>
                                <Typography variant="h5" >{pet.name}</Typography>
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
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedPet && (
                        <>
                            <img
                                src={selectedPet.image}
                                alt={selectedPet.name}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    marginBottom: '16px'
                                }}
                            />
                            <Typography variant="h4" sx={{ color: '#194143' }}>{selectedPet.name}</Typography>
                            <Typography variant="h6" sx={{ color: '#194143' }} mt={2}>
                                {selectedPet.age}
                            </Typography>
                            <Typography variant="body1" mt={2} sx={{ color: '#194143' }}>
                                {selectedPet.description}
                            </Typography>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#1eb7b2", "&:hover": { backgroundColor: "#189e9b" }
                                }}
                            >
                                Cerrar
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default Galery;
