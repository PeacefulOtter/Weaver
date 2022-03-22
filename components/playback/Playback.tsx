import { useSpotify } from "../../context/SpotifyContext";
import { FiShuffle, FiPlay, FiPause, FiChevronsLeft, FiChevronsRight, FiRotateCw, FiSpeaker, FiList, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'
import styles from './Playback.module.css'
import Image from "next/image";
import { formatTime } from "../../assets/formats";

const Playback = () => {

    const { isPlaying, setIsPlaying, currentTrack } = useSpotify()

    const currentTime = "1:34"
    const totalTime = "3:08"

    return (
        <div className={styles.playbackWrapper}>
            <div className={styles.playbackContainer}>
                { currentTrack && <>
                    <Image src={currentTrack.image} className={styles.playbackImg} width={'60px'} height={'60px'} />
                    <div>
                        <div className={styles.playbackTitle}>{currentTrack.name}</div>
                        <div className={styles.playbackAuthors}>{currentTrack.artists}</div>
                    </div></>
                }
            </div>

            <div className={styles.playbackContainer + ' ' + styles.centerContainer}>
                <div className={styles.playbackContainer + " " + styles.playbackControl}>
                    <div className={styles.playbackContainer}>
                        <div className={styles.playbackBtn}><FiShuffle/></div>
                        <div className={styles.playbackBtn + ' ' + styles.playbackArrow}><FiChevronsLeft/></div>
                    </div>
                    <div className={styles.playbackBtn + ' ' + styles.playPauseBtn} onClick={() => setIsPlaying(!isPlaying)}>
                        { isPlaying ? <FiPause/> : <FiPlay style={{marginLeft: '5px'}}/> }
                    </div>
                    <div  className={styles.playbackContainer}>
                        <div className={styles.playbackBtn + ' ' + styles.playbackArrow}><FiChevronsRight/></div>
                        <div className={styles.playbackBtn}><FiRotateCw/></div>
                    </div>
                </div>
                <div className={styles.playbackContainer}>
                    { currentTrack && currentTime }
                    <div className={styles.playbackBtn + ' ' + styles.progressBar}>
                        <div className={styles.progressBarBtn} style={{transform: 'translate(340px, -5px)'}}></div>
                        <div className={styles.progressBarProgress}></div>
                    </div>
                    { currentTrack && formatTime(currentTrack.duration) }
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