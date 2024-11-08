'use client'
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import styles from "./landing.module.css";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Link from 'next/link';
import { Box } from '@mui/material';
import { useGCAuth } from '@/context/context';

export default function Landing() {
    const gcAuth = useGCAuth()
    return (

        <div className={styles.container}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'block', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h1>Rescata, Adopta, Encuentra un Hogar</h1>
                    {!gcAuth.isLoggedIn ? (
                        <Box
                        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
                        >
                        <Link
                            href="/auth/register"
                            className={`${styles.button} ${styles.sign_up}`}
                        >
                            Registrarse
                        </Link>
                        <Link
                            href="/auth/login"
                            className={`${styles.button} ${styles.log_in}`}
                        >
                            Inicia Sesión
                        </Link>
                        </Box>
                    ) : <></>}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Image
                        src="/dog.jpg"
                        alt="landing dog"
                        width={0}
                        height={300}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12 }} sx={{ alignContent: "end", marginTop: "80px" }}>
                <h1>Nuestro refugio</h1>
                <Grid size={{ xs: 12 }} className={styles.info_bubbles}>
                    <Image
                        src="/cute-cat.jpg"
                        alt="cute cat"
                        width={380}
                        height={320}
                        className={styles.profile}
                    />
                    <div className={styles.info} >
                        <h4>Adopta con nosotros</h4>
                        <span>Aquí encontrarás las mejores mascotas del área, desde perros y gatos hasta otros animales que buscan un hogar lleno de amor y cuidado.</span>
                    </div>
                </Grid>
                <Grid size={{ xs: 12 }} className={styles.info_bubbles} sx={{ flexDirection: "row-reverse" }}>
                    <Image
                        src="/cute-dog.jpg"
                        alt="cute dog"
                        width={380}
                        height={320}
                        className={styles.profile}
                    />
                    <div className={styles.info} >
                        <h4>Encuentrale un hogar a tu peludo</h4>
                        <span>Registra a tu mascota en nuestra plataforma y encuentra la familia perfecta para él/ella. ¡Ayudanos a darles un segundo chance!</span>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12 }} sx={{ alignContent: "end", marginTop: "80px" }}>
                <h1>Nuestra misión</h1>
                <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", md: "row" } }} className={styles.us}>
                    <Image
                        src="/overlay_dog3.png"
                        alt="no background dog"
                        width={520}
                        height={420}
                    />
                    <div className={styles.info} >
                        <h2>Cuidar a nuestros peluditos hasta encontrarles un hogar</h2>
                        <span>Recibimos todo tipo de mascotas y nos encargamos de cuidarlos hasta encontrarle el hogar ideal para ellos.</span>
                        <div className={styles.column}>
                            <ul>
                                <li>
                                    <CheckBoxIcon sx={{ color: "#1EBAB3" }} />
                                    Atención médica
                                </li>
                                <li>
                                    <CheckBoxIcon sx={{ color: "#1EBAB3" }} />
                                    Profesional Capacitado
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <CheckBoxIcon sx={{ color: "#1EBAB3" }} />
                                    Comida saludable
                                </li>
                                <li>
                                    <CheckBoxIcon sx={{ color: "#1EBAB3" }} />
                                    Los mejores veterinarios
                                </li>
                            </ul>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
