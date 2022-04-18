import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSpotify } from "../context/SpotifyContext";
import { CurrentTrack } from "../models/models";


const useProgress = (
    currentTrack: CurrentTrack, 
    isPlaying: boolean, 
    nextTrack: () => void
)
: [number, Dispatch<SetStateAction<number>>] => {

    const delay = 1000 // ms
    
    const [max, setMax] = useState<number>(0)
    const [position, setPosition] = useState<number>(0);

    useEffect( () => {
        const interval = setInterval( () => {
            setPosition( t => isPlaying ? t + delay : t );
        }, delay );
    
        return () => clearInterval(interval);

    }, [isPlaying]);

    useEffect( () => {
        if ( currentTrack === undefined ) return
        setPosition(currentTrack.position_ms)
        setMax(currentTrack.duration_ms)
    }, [currentTrack])

    useEffect( () => {
        if (position >= max && isPlaying) {
            nextTrack()
        }
    }, [position])
  
    return [position, setPosition];

};

export default useProgress