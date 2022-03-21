import { useSpotify } from "../../context/SpotifyContext";
import { FiShuffle, FiPlay, FiPause, FiChevronsLeft, FiChevronsRight, FiRotateCw, FiSpeaker, FiList, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'
import styles from './Playback.module.css'

const Playback = () => {

    const { currentTrackID } = useSpotify()

    const image = "IMAGE"
    const title = "Title"
    const authors = "Bill, Willis"
    const currentTime = "1:34"
    const totalTime = "3:08"

    return (
        <div className={styles.playbackWrapper}>
            <div className={styles.playbackContainer}>
                <div>{image}</div>
                <div>
                    <div>{title}</div>
                    <div>{authors}</div>
                </div>
            </div>

            <div className={styles.playbackContainer + ' ' + styles.centerContainer}>
                <div className={styles.playbackContainer}>
                    <div><FiShuffle/></div>
                    <div><FiChevronsLeft/></div>
                    <div className={styles.playPauseBtn}><FiPause/></div>
                    <div><FiChevronsRight/></div>
                    <div><FiRotateCw/></div>
                </div>
                <div className={styles.playbackContainer}>
                    { currentTime }
                    <div className={styles.progressBar}>
                        <div className={styles.progressBarProgress}></div>
                    </div>
                    { totalTime }
                </div>
            </div>

            <div className={styles.playbackContainer}>
                <div><FiList /></div>
                <div><FiSpeaker /></div>
                <div><FiVolume2 /> ---------- </div>
            </div>
        </div>
    )
}

export default Playback;