import React, { useEffect, useState } from 'react';
import styles from '../styles/Station.module.css';
import Head from 'next/head';
import Image from 'next/image';

import { BuyMeACoffee } from '../common/components/BuyMeACoffee'
import { MediaPlayer } from '../common/components/MediaPlayer'
import { Navbar } from '../common/components/Navbar'

import axios from 'axios';
import Marquee from "react-fast-marquee";
import { useTransition, animated} from 'react-spring'

import { Constants } from '../common/utils/Constants'
import { RadioData } from '../common/utils/interfaces'

interface Props {
  // nothing  
}

const backgroundMedia = Constants.GIPHY_BACKGROUND;
const channel_text = ['Ocean','Ocean','Ocean','Ocean','Ocean','Ocean','Ocean','Ocean']

const OceanChannel : React.FC<Props> = () => {
    const [radioData, setRadioData] = useState<RadioData | undefined>(undefined);
    const [loading, setIsLoading] = useState(true);
    const [backgroundIndex, setBackgroundIndex] = useState(0)
    

    const transitionBackground = useTransition(backgroundIndex, {
        key: backgroundIndex,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1500 },
      })

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
          setBackgroundIndex(state => (state + 1) % backgroundMedia.length);
        }, 7500);
    
        // const backgroundImageTimer = setInterval(() => setBackgroundIndex(state => (state + 1) % Constants.BACKGROUND_IMAGES.length), 4000)
    
        return () => { 
            //clearTimeout(backgroundImageTimer)
            clearTimeout(radioDataTimer);
          }
    
      },[radioData])
    
    
    const fetchData = async () => {
        await axios(Constants.RADIO_URL)
        .then(response => {
            let jsonData : RadioData = JSON.parse(JSON.stringify(response.data[1]))
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
        <Head>
            <title>
                Psps FM - Ocean
            </title>
            <meta name="description" content="Listen to our ocean mixtape by @andrejcarlo" />
            <meta name="keywords" content="music, streaming, entertainment"></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        {transitionMediaPlayer ((style, item) => 
        item ? (
        <animated.div style={style} className={styles.App_disabled}>
            {transitionBackground((style, i) => (
                <animated.div
                //className={styles.bg}
                style={{
                    ...style,
                    //backgroundImage: `url(https://images.unsplash.com/${Constants.BACKGROUND_IMAGES[i]}?w=1920&q=80&auto=format&fit=crop)`,
                    //backgroundImage: `url(https://media.giphy.com/media/${backgroundMedia[i]})`,
                }}
                > 
                    <Image quality={100} src={`https://media.giphy.com/media/${backgroundMedia[i]}`} alt="Boo" layout='fill' objectFit='cover' />
                </animated.div>
                
            ))}

            <Navbar channel_selected={"ocean"} />

            <Marquee 
            speed={100}
            gradient={true}
            pauseOnClick={true}
            >
                {channel_text.map((item,i) => {
                    return <div key={i} className={styles.channel_title_text}>
                        {item}
                    </div> 
                })}
            </Marquee>


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

export default OceanChannel;