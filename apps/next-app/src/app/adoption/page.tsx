// app/dashboard/page.tsx
"use client";
import React, { useRef } from 'react';
import Galery from '@/components/Galery/Galery'; // Ajusta la ruta según dónde esté tu componente
import styles from "@/app/page.module.css";
import Hero from '@/components/Hero/Hero';
import { usePage } from './page.hooks';

const Dashboard: React.FC = () => {
    const { loading, pets } = usePage()
    const galleryRef = useRef<HTMLDivElement | null>(null);

    const scrollToGallery = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.main} style={{ width: '100%', marginBottom: '10vh' }}>
            <Hero scrollToGallery={scrollToGallery} />
            <div
                ref={galleryRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: '5vh',
                }}
            >
                <Galery loading={loading} pets={pets} />
            </div>
        </div>
    );
};

export default Dashboard;
