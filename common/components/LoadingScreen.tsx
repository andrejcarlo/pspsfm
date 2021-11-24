import Typography from '@mui/material/Typography'
import React from 'react'
import styles from '../../styles.module.css'


export const LoadingScreen : React.FC = () => {


    return (
    <div className={styles.App}>
        <header className={styles.App_disabled}>
            <Typography variant="h1" component="div" color="black" gutterBottom>
                Loading...
            </Typography>
        </header>
    </div>
  )
} 