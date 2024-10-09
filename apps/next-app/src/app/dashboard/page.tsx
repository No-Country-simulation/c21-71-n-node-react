// app/dashboard/page.tsx
"use client";
import React from 'react';
import Galery from '@/components/Galery/Galery'; // Ajusta la ruta según dónde esté tu componente
import styles from "@/app/page.module.css";

const Dashboard: React.FC = () => {
    return (
        <div className={styles.main} style={{display:'flex', justifyContent:'center', alignItems: 'center', marginTop:'10vh'}}>
            <h1>Mascotas Disponibles</h1>
            <Galery />
        </div>
    );
};

export default Dashboard;
