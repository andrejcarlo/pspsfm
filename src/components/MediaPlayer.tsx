
import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

interface Props {
    songTitle?: string,
    songArtist?: string,
    isPlaying?: boolean,
    radioLink?: string,
}

export const MediaPlayer : React.FC<Props> = (props:Props) => {
    const [audio] = useState(new Audio(props.radioLink));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => {
        setPlaying(!playing);
        console.log(playing)
        console.log(props.radioLink)

    }
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing, audio]
    );
    


    const renderPlayButton = () => { 
        if (playing === false) {
            return ( 
                <IconButton onClick={toggle} size='large' color="primary">
                    <PlayCircleOutlineIcon fontSize="inherit" color="primary">
                    </PlayCircleOutlineIcon>
                </IconButton>
            )
        } else if (playing === true) {
            return ( 
                <IconButton onClick={toggle} size='large' color="primary">
                    <PauseCircleOutlineIcon fontSize="inherit" color="primary">
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

        </div>
    ) : (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Meow! Station is offline :(
            </Typography>

        </div>
    )
}
  