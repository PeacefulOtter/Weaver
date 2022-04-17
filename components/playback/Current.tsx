
import Image from "next/image";

import { useSpotify } from '../../context/SpotifyContext';

import styles from './Playback.module.css'

const Current = () => {
    
    const { currentTrack } = useSpotify()
    console.log(currentTrack);

    if ( !currentTrack ) return null;

    return (
        <>
        <Image src={currentTrack.image} className={styles.playbackImg} width={'60px'} height={'60px'} />
        <div>
            <div className={styles.playbackTitle}>{currentTrack.name}</div>
            <div className={styles.playbackAuthors}>{currentTrack.artists}</div>
        </div>
        </>
    )
}

export default Current;