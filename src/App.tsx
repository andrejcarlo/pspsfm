import React, { useState, useEffect } from 'react';
import './App.css';

import { MediaPlayer } from './components/MediaPlayer'
import { BuyMeACoffee } from './components/BuyMeACoffee'
import { AzuraData } from './components/interfaces';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import axios from 'axios';


const url = 'https://play.pspsfm.com/api/nowplaying';

const App : React.FC = () => {
  const [azuraData, setAzuraData] = useState<AzuraData | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  let jsonData : AzuraData;
  //const {loading, error, data } = useFetch(url);
  //const { loading, error, data = [] } = useFetch('http://45.63.41.251/api/nowplaying', {}, [])
  
  useEffect(() => { 
    // fetch data on component mount just once
    if (azuraData === null) fetchData();
    // fetch data continously every 5000 milliseconds
    const timer = setTimeout(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  })


  const fetchData = async () => {
    await axios(url)
    .then(response => {
      jsonData = JSON.parse(JSON.stringify(response.data[0]))
      setAzuraData(jsonData)
    })
    .catch(error => {
      console.log("Error fetching data");
      console.error(error);
    })
    .finally(() => { 
      setIsLoading(false);
      //console.log("Data fetched!");
    })
  }


  // Wait for user to interact with DOM
  if (!enabled) return (
    <div className="App">
      <header className="App-header">
      <IconButton sx={{fontSize:500}} aria-label="fingerprint" color="inherit" size="large" onClick={() => setEnabled(true)}>
        <PetsIcon fontSize="inherit" color="inherit"/>
      </IconButton>
      </header>
    </div>

  )
  
  // Wait until all data has been fetched then initialise MediaPlayer Component
  return loading ? (
    <div className="App">
       <header className="App-header">
          <Typography variant="h1" component="div" gutterBottom>
            Loading...
          </Typography>
        </header>
     </div>
  ) : (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" component="div" gutterBottom>
          pspspspspsps
        </Typography>

        <MediaPlayer 
        songArtist={azuraData?.now_playing.song?.artist} 
        songTitle={azuraData?.now_playing.song?.title}
        isPlaying={azuraData?.is_online}
        radioLink={azuraData?.station.listen_url}
        />
      </header>
      <BuyMeACoffee></BuyMeACoffee>
    </div>
     
  );


}

export default App;

