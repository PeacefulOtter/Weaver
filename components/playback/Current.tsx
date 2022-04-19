
import Image from "next/image";

import { useSpotify } from '../../context/SpotifyContext';

import styles from './Playback.module.css'

const Current = () => {
    
    const { currentTrack } = useSpotify()

    if ( !currentTrack ) return null;

    return (
        <>
        <div className={styles.playbackImg + " img"} style={{backgroundImage: `url(${currentTrack.image})`, width: "60px", height: '60px'}}></div>
        <div>
            <div className={styles.playbackTitle}>{currentTrack.name}</div>
            <div className={styles.playbackAuthors}>{currentTrack.artists}</div>
        </div>
        </>
    )
}

export default Current;