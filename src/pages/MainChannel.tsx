import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'

import { BuyMeACoffee } from '../components/BuyMeACoffee'
import { RadioData } from '../components/interfaces'
import { MediaPlayer } from '../components/MediaPlayer'

import Typography from '@mui/material/Typography'
import { RouteComponentProps } from '@reach/router'
import axios from 'axios';
import { useTransition, animated} from 'react-spring'

import {Constants} from '../components/Constants'



interface Props extends RouteComponentProps { }


const MainChannel : React.FC<Props> = () => {
    const [radioData, setRadioData] = useState<RadioData | undefined>(undefined);
    const [loading, setIsLoading] = useState(true);

    const transitionMediaPlayer = useTransition((!loading), {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: loading,
        delay: 500,
        config: { duration: 500 },
        //onRest: () => seEnabled(!enabled),
      })

      useEffect(() => { 
        // fetch data on component mount just once
        if (radioData === undefined) fetchData();
        // fetch data continously every 5000 milliseconds
        const radioDataTimer = setTimeout(() => {
          fetchData();
        }, 5000);
    
        // const backgroundImageTimer = setInterval(() => setBackgroundIndex(state => (state + 1) % Constants.BACKGROUND_IMAGES.length), 4000)
    
        return () => { 
            clearTimeout(radioDataTimer);
            //clearTimeout(backgroundImageTimer)
          }
    
      })
    
    
    const fetchData = async () => {
        await axios(Constants.RADIO_URL)
        .then(response => {
            let jsonData : RadioData = JSON.parse(JSON.stringify(response.data[0]))
            setRadioData(jsonData)
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
    <div className={styles.App}>
        {transitionMediaPlayer ((style, item) => 
        item ? (
        <animated.div style={style} className={styles.App_disabled}>
            <Typography variant="h1" component="div" gutterBottom>
                pspspspspsps
            </Typography>

            <MediaPlayer 
            songArtist={radioData?.now_playing.song?.artist} 
            songTitle={radioData?.now_playing.song?.title}
            isPlaying={radioData?.is_online}
            radioLink={radioData?.station.listen_url}
            />
            
            <BuyMeACoffee></BuyMeACoffee>
        </animated.div> ) : ''
        )}
    </div>
  )
} 

export default MainChannel;