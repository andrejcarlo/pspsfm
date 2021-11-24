
import React, { useEffect, useState } from 'react';
import styles from '../styles/Station.module.css';
import Head from 'next/head';
import Image from 'next/image';

import { BuyMeACoffee } from '../common/components/BuyMeACoffee'
import { MediaPlayer } from '../common/components/MediaPlayer'

import axios from 'axios';
import Marquee from "react-fast-marquee";
import { useTransition, animated} from 'react-spring'

import { Constants } from '../common/utils/Constants'
import { RadioData } from '../common/utils/interfaces'

interface Props {
  // nothing  
}

const backgroundMedia = Constants.GIPHY_BACKGROUND;

const MainChannel : React.FC<Props> = () => {
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
        <Head>
            <title>
                Psps FM - Emolino
            </title>
            <meta name="description" content="Listen to our emolino mixtape by @alxmuller" />
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
                    <Image className={styles.bg} src={`https://media.giphy.com/media/${backgroundMedia[i]}`} alt="Background Gifs" layout='fill' objectFit='cover' />
                </animated.div>
                
            ))}
            <div className={styles.App_logo} title={"@andrejcarlo <3 @alxmuller"}>
                <Marquee 
                speed={40}
                gradient={false}
                pauseOnHover={true}
                direction={"right"}
                >
                    psps fm  /  e̶m̶o̶l̶i̶n̶o̶  /  ocean  /  doors  /  naughty
                </Marquee>
            </div>

            

            <Marquee 
            className={styles.channel_title}
            speed={100}
            gradient={true}
            pauseOnClick={true}
            >
                Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino Emolino hi Emolino Emolino Emolino Emolino Emolino Emolino Emolino help Emolino <br></br>
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

export default MainChannel;