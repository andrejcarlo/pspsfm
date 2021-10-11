import React, { useState, useEffect } from 'react';
import './App.css';

import { MediaPlayer } from './components/MediaPlayer'
import { AzuraData } from './components/interfaces';
import { Typography } from '@mui/material';
import axios from 'axios';

const url = 'http://45.63.41.251/api/nowplaying';

const App : React.FC = () => {
  const [azuraData, setAzuraData] = useState<AzuraData | null>(null);
  const [loading, setIsLoading] = useState(true);
  let jsonData : AzuraData;
  //const {loading, error, data } = useFetch(url);
  //const { loading, error, data = [] } = useFetch('http://45.63.41.251/api/nowplaying', {}, [])
  
  useEffect(() => { fetchData();}, []) // componentDidMount


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
      console.log(jsonData)
    })
  }


  // const updateRadioStationData = () => {
  //   console.log(data)

  //   setAzuraData(data[0]);
  //   console.log(azuraData);
  // }

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
     </div>
  );


}

export default App;

