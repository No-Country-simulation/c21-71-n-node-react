// app/dashboard/page.tsx
"use client";
import React, { useRef } from 'react';
import Galery from '@/components/Galery/Galery'; // Ajusta la ruta según dónde esté tu componente
import styles from "@/app/page.module.css";
import Hero from '@/components/Hero/Hero';

const Dashboard: React.FC = () => {
    
    const galleryRef = useRef<HTMLDivElement | null>(null);
    
    const scrollToGallery = () => {
            if (galleryRef.current) {
                galleryRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };
    return (
        <div className={styles.main} style={{display:'flex', justifyContent:'center', alignItems: 'center', marginTop:'10vh', marginBottom:'10vh'}}>
            <Hero scrollToGallery={scrollToGallery} />
            <div ref={galleryRef}>
                <Galery />
            </div>
        </div>
    );
};

export default Dashboard;
