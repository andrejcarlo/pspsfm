
import Typography from '@mui/material/Typography'
import React from 'react'
import { BuyMeACoffee } from './BuyMeACoffee'
import { AzuraData } from './interfaces'
import { MediaPlayer } from './MediaPlayer'
import '../App.css';


interface Props {
    azuraData?: AzuraData
}


export const MainScreen : React.FC<Props> = (props: Props) => {


    return (
    <div>
        <Typography variant="h1" component="div" gutterBottom>
            pspspspspsps
        </Typography>

        <MediaPlayer 
        songArtist={props.azuraData?.now_playing.song?.artist} 
        songTitle={props.azuraData?.now_playing.song?.title}
        isPlaying={props.azuraData?.is_online}
        radioLink={props.azuraData?.station.listen_url}
        />
        <BuyMeACoffee></BuyMeACoffee>
    </div>
  )
} 