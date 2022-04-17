
import { FiSpeaker, FiList, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'

import Current from "./Current";
import Progress from "./Progress";
import Controller from "./Controller";

import styles from './Playback.module.css'


const Playback = () => {
    return (
        <div className={styles.playbackWrapper}>
            <div className={styles.playbackContainer}>
                <Current />
            </div>

            <div className={styles.playbackContainer + ' ' + styles.centerContainer}>
                <Controller />
                <Progress />
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