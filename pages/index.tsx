import React, { useState, useEffect } from 'react';
import styles from '../styles/Station.module.css'

import IconButton from '@mui/material/IconButton';
import { useTransition, animated} from 'react-spring';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Constants } from '../common/utils/Constants';

interface Props {
  // nothing
}

const backgroundMedia = Constants.GIPHY_BACKGROUND;


const Home : React.FC<Props> = () => {
  const [enabled, setEnabled] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const router = useRouter();


  const transitionEnable = useTransition(enabled, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: enabled,
    config: { duration: 500 },
    //onRest: () => seEnabled(!enabled),
  })


  const transitionBackground = useTransition(backgroundIndex, {
    key: backgroundIndex,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1500 },
  })

  useEffect(() => { 

    const backgroundImageTimer = setInterval(() => setBackgroundIndex(state => (state + 1) % backgroundMedia.length), 7500)
    

    return () => { 
      clearTimeout(backgroundImageTimer)
      }

  })

  const enableApp = () => {
      setEnabled(true);
      router.push('emolino'); // emolino is main
  }


  return (
    
    // 3 transitions -> enable/disable , loading/done, mediaPlayer
    <div className={styles.App}> 
      <Head>
          <title>
             Welcome to Psps FM ?!
          </title>
          <meta name="description" content="Listen to our latest radio stations pspsps" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      {transitionEnable ((style, item) => 
        item ? '' : (
          <animated.div style={style} className={styles.App_disabled}>

            {transitionBackground((style, i) => (
                <animated.div
                style={{
                    ...style,
                }}
                >
                  <Image priority={false} quality={100} src={`https://media.giphy.com/media/${backgroundMedia[i]}`} alt="Boo" layout='fill' objectFit='cover'/>
                </animated.div>
                
            ))}
            
            <IconButton sx={{fontSize:300, opacity:0.7}} aria-label="fingerprint" color="default" size="large" onClick={enableApp}>
                  <Image src="/play_icon.svg" alt="Press me to start" width="300" height="300"/>
            </IconButton>
          </animated.div>
          
        )
      )}
      
    </div>
  )

}

export default Home;