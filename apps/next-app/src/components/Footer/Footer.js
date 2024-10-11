import Box from "@mui/material/Box";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <Box className={styles.footer}>
      <span className={styles.content}>
        PRIVACY POLICY
      </span>
    </Box>
  );
};

export default Footer;