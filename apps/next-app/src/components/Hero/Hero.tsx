import Image from 'next/image';
import styles from './Hero.module.css'; // CSS module for styling

interface HeroProps {
    scrollToGallery: () => void;
  }

  const Hero: React.FC<HeroProps> = ({ scrollToGallery }) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          <h1 className={styles.heroTitle}>Mascotas Disponibles</h1>
          <p className={styles.heroDescription}>Adoptar una mascota puede cambiar tu vida y la de un animal necesitado. Únete a nuestra misión para encontrar hogares amorosos para cada uno de nuestros amigos peludos y descubre cómo la compañía de una mascota puede llenar de alegría cada rincón de tu hogar.</p>
          <a className={styles.heroButton} role="button" onClick={() => scrollToGallery()}>Descubre Más</a>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/images/dog.jpg" alt="perro y gato" width={500} height={400} className={styles.heroImage} />
        </div>
      </div>
    </div>
  );
};

export default Hero;