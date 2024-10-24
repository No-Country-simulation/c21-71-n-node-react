import Landing from "@/components/Landing/Landing";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
        <Landing/>
        </div>
      </main>
    </div>
  );
}
