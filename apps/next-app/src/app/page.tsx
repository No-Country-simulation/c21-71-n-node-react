import Image from "next/image";
import styles from "./page.module.css";
import Galery from "@/components/Galery/Galery";

export default function Home() {
  return (
    <div className={styles.page}>
        <h1>Mascotas Disponibles para Adopción</h1>
      <main className={styles.main}>
        <div className={styles.ctas}>
        <Galery />
        </div>
      </main>
    </div>
  );
}
