'use client'
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import styles from "./landing.module.css";

export default function Landing() {
    return (

        <div className={styles.container}>
            <Grid container spacing={2} className={styles.grid} sx={{ height: "100vh" }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <h1>
                    Rescata, Adopta, Encuentra un Hogar
                    </h1>
                    <button className={styles.sign_up} >Sign Up</button>
                    <button className={styles.log_in} >Log In</button>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Image
                        src="/images/dog.jpg"
                        alt="landing dog"
                        width={0}
                        height={300}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12 }} className={styles.container}>
                <h1>Nuestro refugio</h1>
                <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                        src="/images/cute-cat.jpg"
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
                <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center", flexDirection: "row-reverse" }}>
                    <Image
                        src="/images/cute-dog.jpg"
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
        </div>
    );
}
