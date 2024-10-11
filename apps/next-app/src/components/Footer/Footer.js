import Box from "@mui/material/Box";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <Box className={styles.footer}>
      <span className={styles.content}>
        POLÍTICA DE PRIVACIDAD
      </span>
    </Box>
  );
};

export default Footer;