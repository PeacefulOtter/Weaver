
import { formatTime } from '../../assets/formats';
import { useSpotify } from '../../context/SpotifyContext';

import styles from './Playback.module.css'
const { playbackContainer, playbackBtn, progressBar, progressBarBtn, progressBarProgress } = styles

const Progress = () => {
    
    const { currentTrack } = useSpotify()
    console.log(currentTrack);

    const progress = currentTrack
        ? (currentTrack.progress_ms / currentTrack.duration_ms) * 100
        : 0

    console.log(progress);
    

    return (
        <div className={playbackContainer}>
            { currentTrack && formatTime(currentTrack.progress_ms) }
            <div className={playbackBtn + ' ' + progressBar}>
                <div className={progressBarProgress} style={{width: progress + '%'}}></div>
                <div className={progressBarBtn}></div>
            </div>
            { currentTrack && formatTime(currentTrack.duration_ms) }
        </div>
    )
}

export default Progress;