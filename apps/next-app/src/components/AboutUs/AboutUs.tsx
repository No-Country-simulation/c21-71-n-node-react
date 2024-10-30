'use client'
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import styles from "./aboutus.module.css";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function AboutUs() {
    return (
        <div className={styles.container}>
            <Grid container spacing={2} className={styles.info_bubbles}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'block', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h1 className={styles.title}>Sobre Nosotros</h1>
                    <p className={styles.text}>
                        En HogarParaPeludos, conectamos refugios de animales con personas que buscan adoptar una mascota. Creemos en brindar una segunda oportunidad a los animales en situación de abandono, facilitando el proceso de adopción de forma rápida y segura.
                    </p>
                    <p className={styles.text}>
                        Nuestro objetivo es proporcionar un hogar amoroso para cada animal, apoyando a los refugios con una plataforma eficiente y confiable para que puedan enfocarse en el bienestar de sus peludos mientras nosotros los ayudamos a encontrar a las familias ideales.
                    </p>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src="/dog2transp.png"
                        alt="our shelter"
                        width={0}
                        height={400}
                        sizes="100vw"
                        style={{ width: '60%', height: 'auto' }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12 }} sx={{ alignContent: "end" }} className={styles.info_bubbles}>
                <h2 className={styles.subtitle}>Nuestros Valores</h2>
                <Grid size={{ xs: 12 }}>
                    <div className={styles.info}>
                        <h4 className={styles.sectionTitle}>Compromiso con los refugios y adoptantes</h4>
                        <p className={styles.text}>
                            En HogarParaPeludos nos comprometemos a facilitar la adopción responsable, ayudando a los refugios a conectar con las personas adecuadas para brindar un hogar amoroso y seguro a cada animal.
                        </p>
                        <ul>
                            <li>
                                <CheckBoxIcon sx={{ color: "#135b5e" }} />
                                Plataforma fácil de usar
                            </li>
                            <li>
                                <CheckBoxIcon sx={{ color: "#135b5e" }} />
                                Apoyo a los refugios locales
                            </li>
                        </ul>
                    </div>
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ flexDirection: "row-reverse" }}>
                    <div className={styles.info}>
                        <h4 className={styles.sectionTitle}>Educación y Conciencia</h4>
                        <p className={styles.text}>
                            Trabajamos para educar a la comunidad sobre la importancia de la adopción responsable y promover el bienestar animal mediante programas de concienciación y eventos.
                        </p>
                        <ul>
                            <li>
                                <CheckBoxIcon sx={{ color: "#135b5e" }} />
                                Talleres y charlas educativas
                            </li>
                            <li>
                                <CheckBoxIcon sx={{ color: "#135b5e" }} />
                                Eventos de adopción y sensibilización
                            </li>
                        </ul>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
