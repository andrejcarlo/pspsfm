
import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

interface Props {
    songTitle?: string,
    songArtist?: string,
}

export const MediaPlayer : React.FC<Props> = (props:Props) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const renderPlayButton = () => { 
        if (isPlaying == false) {
            return ( 
                <IconButton onClick={() => setIsPlaying(true)} size='large' color="primary">
                    <PlayCircleOutlineIcon fontSize="inherit" color="primary">
                    </PlayCircleOutlineIcon>
                </IconButton>
            )
        } else if (isPlaying == true) {
            return ( 
                <IconButton onClick={() => setIsPlaying(false)} size='large' color="primary">
                    <PauseCircleOutlineIcon fontSize="inherit" color="primary">
                    </PauseCircleOutlineIcon>
                </IconButton>
            )
        }
    }

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                {props.songTitle} - {props.songArtist}
            </Typography>

            {renderPlayButton()}

        </div>
    )
}
  