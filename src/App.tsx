import React, { useState, useEffect } from 'react';
import './App.css';

import { AzuraData } from './components/interfaces';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import axios from 'axios';
import { useTransition, animated} from 'react-spring'
import { MainScreen } from './components/MainScreen';

const url = 'https://play.pspsfm.com/api/nowplaying';

export const App : React.FC = () => {
  const [azuraData, setAzuraData] = useState<AzuraData | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);

  const transitionEnable = useTransition(enabled, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: enabled,
    config: { duration: 500 },
    //onRest: () => seEnabled(!enabled),
  })

  const transitionMediaPlayer = useTransition((!loading && enabled), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: enabled,
    delay: 500,
    config: { duration: 500 },
    //onRest: () => seEnabled(!enabled),
  })

  useEffect(() => { 
    // fetch data on component mount just once
    if (azuraData === undefined) fetchData();
    // fetch data continously every 5000 milliseconds
    const timer = setTimeout(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  })


  const fetchData = async () => {
    await axios(url)
    .then(response => {
      let jsonData : AzuraData = JSON.parse(JSON.stringify(response.data[0]))
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

  return (
    
    // 3 transitions -> enable/disable , loading/done, mediaPlayer
    <div className="App"> 

      {transitionEnable ((style, item) => 
        item ? '' : (
          <animated.div style={style} className="App-disabled">
            <IconButton sx={{fontSize:500}} aria-label="fingerprint" color="default" size="large" onClick={() => setEnabled(true)}>
              <PetsIcon fontSize="inherit" color="inherit"/>
            </IconButton>
          </animated.div>
          
        )
      )}
      
      {transitionMediaPlayer ((style, item) => 
      item ? (
      <animated.div style={style} className="App-disabled">
        <MainScreen azuraData={azuraData} />
      </animated.div> ) : ''
      )}
          
    </div>
  )

}

export default App;

