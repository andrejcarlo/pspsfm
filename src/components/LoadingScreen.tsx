import Typography from '@mui/material/Typography'
import React from 'react'
import '../App.css';


export const LoadingScreen : React.FC = () => {


    return (
    <div className="App">
        <header className="App-disabled">
            <Typography variant="h1" component="div" color="black" gutterBottom>
                Loading...
            </Typography>
        </header>
    </div>
  )
} 