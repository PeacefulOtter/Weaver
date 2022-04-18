

import { FiShuffle, FiPlay, FiPause, FiChevronsLeft, FiChevronsRight, FiRotateCw } from 'react-icons/fi'
import { useSpotify } from '../../context/SpotifyContext'

import styles from './Playback.module.css'

const { playbackContainer, playbackControl, playbackBtn, playbackArrow, playPauseBtn } = styles

const Controller= () => {
    
    const { isPlaying, resumeTrack, pauseTrack, prevTrack, nextTrack } = useSpotify()

    return (
        <div className={playbackContainer + " " + playbackControl}>
            <div className={playbackContainer}>
                <div className={playbackBtn}><FiShuffle/></div>
                <div className={playbackBtn + ' ' + playbackArrow} onClick={prevTrack}><FiChevronsLeft/></div>
            </div>
            <div className={playbackBtn + ' ' + playPauseBtn} onClick={isPlaying ? pauseTrack : resumeTrack}>
                { isPlaying ? <FiPause/> : <FiPlay style={{marginLeft: '5px'}}/> }
            </div>
            <div  className={playbackContainer}>
                <div className={playbackBtn + ' ' + playbackArrow} onClick={nextTrack}><FiChevronsRight/></div>
                <div className={playbackBtn}><FiRotateCw/></div>
            </div>
        </div>
    )
}

export default Controller