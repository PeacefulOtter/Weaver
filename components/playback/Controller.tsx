

import { FiShuffle, FiPlay, FiPause, FiChevronsLeft, FiChevronsRight, FiRotateCw } from 'react-icons/fi'
import { useSpotify } from '../../context/SpotifyContext'

import styles from './Playback.module.css'

const { playbackContainer, playbackControl, playbackBtn, checkedBtn, playbackArrow, playPauseBtn } = styles

const PlaybackBtn = ( { Icon, active, toggleState, } ) => {

    const checkedStyle = active ? ' ' + checkedBtn : ''

    return (
        <div 
            className={playbackBtn + checkedStyle} 
            onClick={() => toggleState(s => !s)} 
        >
            <Icon />
        </div>
    )
}

const Controller= () => {
    
    const { 
        isPlaying, shuffle, repeat, 
        setShuffle, setRepeat,
        resumeTrack, pauseTrack, prevTrack, nextTrack 
    } = useSpotify()

    return (
        <div className={playbackContainer + " " + playbackControl}>
            <div className={playbackContainer}>
                <PlaybackBtn Icon={FiShuffle} active={shuffle} toggleState={setShuffle} />
                <div className={playbackBtn + ' ' + playbackArrow} onClick={prevTrack}><FiChevronsLeft/></div>
            </div>
            <div className={playbackBtn + ' ' + playPauseBtn} onClick={isPlaying ? pauseTrack : resumeTrack}>
                { isPlaying ? <FiPause/> : <FiPlay style={{marginLeft: '5px'}}/> }
            </div>
            <div  className={playbackContainer}>
                <div className={playbackBtn + ' ' + playbackArrow} onClick={nextTrack}><FiChevronsRight/></div>
                <PlaybackBtn Icon={FiRotateCw} active={repeat} toggleState={setRepeat} />
            </div>
        </div>
    )
}

export default Controller