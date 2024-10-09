import Image from "next/image";
import styles from "./page.module.css";
import Galery from "@/components/Galery/Galery";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
        <h1>Layout</h1>
        </div>
      </main>
    </div>
  );
}
