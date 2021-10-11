import React, { useState, useEffect } from 'react';
import './App.css';

import {MediaPlayer} from './components/MediaPlayer'
import { Song } from './components/interfaces';
import { Typography } from '@mui/material';


const App : React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null | undefined>(null);

  const fetchCurrentSong = () => {
    // GET request from API
    setCurrentSong({
      title: 'Sandstorm',
      artist: 'Darude',
    });

  }

  useEffect(() => {
    fetchCurrentSong()
  }, [])

  //fetchCurrentSong(); 

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" component="div" gutterBottom>
          pspspspspsps
        </Typography>

        <MediaPlayer 
        songArtist={currentSong?.artist} 
        songTitle={currentSong?.title}
        />
      </header>
    </div>
  );
}

export default App;
