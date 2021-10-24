import React, { useState, useEffect } from 'react';
import styles from '../styles.module.css'

import { RouteComponentProps, useNavigate} from '@reach/router';

import IconButton from '@mui/material/IconButton';
import { useTransition, animated} from 'react-spring'
import { ReactComponent as EnableIcon } from '../assets/3dviewer-material-light.svg';
import SvgIcon from '@mui/material/SvgIcon';

import {Constants} from '../components/Constants'

interface Props extends RouteComponentProps {}


const HomePage : React.FC<Props> = () => {
  const [enabled, setEnabled] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const navigate = useNavigate();

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
    config: { duration: 3000 },
  })

  useEffect(() => { 

    const backgroundImageTimer = setInterval(() => setBackgroundIndex(state => (state + 1) % Constants.BACKGROUND_IMAGES.length), 4000)

    console.log("HomePage loaded")
    

    return () => { 
      clearTimeout(backgroundImageTimer)
      }

  })

  const enableApp = () => {
      setEnabled(true);
      navigate('emolino')
  }


  return (
    
    // 3 transitions -> enable/disable , loading/done, mediaPlayer
    <div className={styles.App}> 

      {transitionBackground((style, i) => (
        <animated.div
          className={styles.bg}
          style={{
            ...style,
            backgroundImage: `url(https://images.unsplash.com/${Constants.BACKGROUND_IMAGES[i]}?w=1920&q=80&auto=format&fit=crop)`,
          }}
          /> 
      ))}

      {transitionEnable ((style, item) => 
        item ? '' : (
          <animated.div style={style} className={styles.App_disabled}>
            <IconButton sx={{fontSize:500}} aria-label="fingerprint" color="default" size="large" onClick={enableApp}>
              <SvgIcon fontSize="inherit">
                  <EnableIcon />
              </SvgIcon>
            </IconButton>
          </animated.div>
          
        )
      )}
      
    </div>
  )

}

export default HomePage;