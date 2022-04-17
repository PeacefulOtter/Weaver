

import { FiShuffle, FiPlay, FiPause, FiChevronsLeft, FiChevronsRight, FiRotateCw } from 'react-icons/fi'
import { useSpotify } from '../../context/SpotifyContext'

import styles from './Playback.module.css'

const { playbackContainer, playbackControl, playbackBtn, playbackArrow, playPauseBtn } = styles

const Controller= () => {
    
    const { isPlaying, setIsPlaying } = useSpotify()

    return (
        <div className={playbackContainer + " " + playbackControl}>
            <div className={playbackContainer}>
                <div className={playbackBtn}><FiShuffle/></div>
                <div className={playbackBtn + ' ' + playbackArrow}><FiChevronsLeft/></div>
            </div>
            <div className={playbackBtn + ' ' + playPauseBtn} onClick={() => setIsPlaying(!isPlaying)}>
                { isPlaying ? <FiPause/> : <FiPlay style={{marginLeft: '5px'}}/> }
            </div>
            <div  className={playbackContainer}>
                <div className={playbackBtn + ' ' + playbackArrow}><FiChevronsRight/></div>
                <div className={playbackBtn}><FiRotateCw/></div>
            </div>
        </div>
    )
}

export default Controller