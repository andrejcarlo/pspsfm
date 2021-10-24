
import React, {useState, useEffect} from 'react';
import styles from '../styles.module.css'

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ReactPlayer from 'react-player'


interface Props {
    songTitle?: string,
    songArtist?: string,
    isPlaying?: boolean,
    radioLink?: string,
}

export const MediaPlayer : React.FC<Props> = (props:Props) => {
    const [url, setUrl] = useState(props.radioLink);
    const [playing, setPlaying] = useState(false);
    //const [volume, setVolume] = useState(0);
    const [key] = useState(0);
    const [muted, setMuted] = useState(true);

    const toggle = () => {
        setPlaying(!playing);
        //setVolume(volume ? 0 : 1);
        setMuted(!muted);
    }
  
    useEffect(() => {
        console.log("url changed");
        setUrl(props.radioLink);
      },
      [props.radioLink]
    );
    
    const buffering = () => {
        console.log("pspsfm is buffering");
    }


    const renderPlayButton = () => { 
        if (playing === false) {
            return ( 
                <IconButton sx={{fontSize:70}} onClick={toggle} size='large' color="error">
                    <PlayCircleOutlineIcon fontSize="inherit" color="inherit">
                    </PlayCircleOutlineIcon>
                </IconButton>
            )
        } else if (playing === true) {
            return ( 
                <IconButton sx={{fontSize:70}} onClick={toggle} size='large' color="error">
                    <PauseCircleOutlineIcon fontSize="inherit" color="inherit">
                    </PauseCircleOutlineIcon>
                </IconButton>
            )
        }
    }

    return props.isPlaying ? (
        <div>
            <div className={styles.player_description}>
                {props.songTitle} - {props.songArtist}
            </div>

            {renderPlayButton()}

            <ReactPlayer
            key={key}
            url={url}
            playing={props.radioLink ? true : false}
            //volume={volume}
            muted={muted}
            width={0}
            height={0}
            autoPlay={true}
            playsinline={true}
            onError={(e) => console.log("There's been an error playing the file ", e)}
            onBuffer={buffering}
            onBufferEnd={()=> console.log("Buffering done")}
            onReady={() => {console.log("Player loaded");}}
            />

        </div>
    ) : (
        <div>
            <div className={styles.player_offline}>
                Meow! Station is offline :(
            </div>

        </div>
    )
}
  