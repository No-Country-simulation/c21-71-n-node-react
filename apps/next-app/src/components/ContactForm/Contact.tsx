'use client';
import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { theme, } = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    try {
      setSuccess('¡Mensaje enviado exitosamente!');
    } catch (error: unknown) {
      setError('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 4, flexGrow: 1 ,alignItems: 'center' }}>
      {/* Datos de contacto a la izquierda */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '30%',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 'bold' }}>
          Contáctanos
        </Typography>
        <Typography>Email: contacto@hogarparapeludos.com</Typography>
        <Typography>Teléfono: +54 9 11 1234 5678</Typography>
        <Box sx={{ mt: 2 }}>
          <Image src="/mapa.jpg" alt="Mapa" width={400} height={250} />
        </Box>
      </Box>

      {/* Formulario de contacto */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            width: '50%',
            fontFamily: 'var(--font-geist-sans)',
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            borderColor: theme === 'dark' ? '#fff' : '#000',
            borderRadius: 2,
            borderWidth: 2,
            borderStyle: 'solid',
            p: 4,
            color: theme === 'dark' ? '#fff' : '#000', 
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
      >
        <Typography variant="h5" sx={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 'bold' }}>
          Envíanos un mensaje
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Nombre"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={{
            input: { color: theme === 'dark' ? '#fff' : '#000' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000', // Bordes blancos en modo oscuro
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000',
              },
            },
            '& label': {
              color: theme === 'dark' ? '#fff' : '#000', // Etiqueta blanca en modo oscuro
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{
            input: { color: theme === 'dark' ? '#fff' : '#000' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000', // Bordes blancos en modo oscuro
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000',
              },
            },
            '& label': {
              color: theme === 'dark' ? '#fff' : '#000', // Etiqueta blanca en modo oscuro
            },
          }}
        />
        <TextField
          label="Consulta"
          name="message"
          variant="outlined"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          sx={{
            input: { color: theme === 'dark' ? '#fff' : '#000' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000', // Bordes blancos en modo oscuro
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#000',
              },
            },
            '& label': {
              color: theme === 'dark' ? '#fff' : '#000', // Etiqueta blanca en modo oscuro
            },
          }}
        />

        <Button type="submit" variant="contained" color="warning">
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
