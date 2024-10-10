'use client'
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import Image from 'next/image';
import styles from "./landing.module.css";

export default function Landing() {
    return (

        <div className={styles.container}>
            <Grid container spacing={2} className={styles.grid} >
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid>
                        <h1>
                            Lorem ipsum dolor sit amet consectetur
                        </h1>
                        <Button variant="contained" sx={{ color: "#000", background: "#fff" }} className={styles.sign_up} >Sign Up</Button>
                        <Button sx={{ color: "#fff", border: "1px solid white" }} className={styles.log_in} >Log In</Button>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid>
                        <Image
                            src="/images/dog.jpg"
                            alt="landing dog"
                            width={0}
                            height={300}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
