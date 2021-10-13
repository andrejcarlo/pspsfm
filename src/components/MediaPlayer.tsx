
import React, {useState, useEffect} from 'react';
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
    const [volume, setVolume] = useState(0);
    const [key] = useState(0);

    const toggle = () => {
        setPlaying(!playing);
        setVolume(volume ? 0 : 1);
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
                <IconButton onClick={toggle} size='large' color="error">
                    <PlayCircleOutlineIcon fontSize="inherit" color="inherit">
                    </PlayCircleOutlineIcon>
                </IconButton>
            )
        } else if (playing === true) {
            return ( 
                <IconButton onClick={toggle} size='large' color="error">
                    <PauseCircleOutlineIcon fontSize="inherit" color="inherit">
                    </PauseCircleOutlineIcon>
                </IconButton>
            )
        }
    }

    return props.isPlaying ? (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                {props.songTitle} - {props.songArtist}
            </Typography>

            {renderPlayButton()}

            <ReactPlayer
            key={key}
            url={url}
            playing={props.radioLink ? true : false}
            volume={volume}
            width={0}
            height={0}
            onError={(e) => console.log("There's been an error playing the file ", e)}
            onBuffer={buffering}
            onBufferEnd={()=> console.log("Buffering done")}
            onReady={() => console.log("Player loaded")}
            />

        </div>
    ) : (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Meow! Station is offline :(
            </Typography>

        </div>
    )
}
  