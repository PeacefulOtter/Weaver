
import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../assets/formats';
import { seek } from '../../assets/queries';
import { useSpotify } from '../../context/SpotifyContext';
import useProgress from '../../hooks/useProgress';

import styles from './Playback.module.css'
const { playbackContainer, playbackBtn, progressContainer, progressBar, progressBarBtn, progressBarProgress } = styles


const Progress = () => {
    
    const ref = useRef(null)

    const { currentTrack, position_ms, setPosition } = useSpotify()

    const progress = currentTrack 
        ? (position_ms / currentTrack.duration_ms) * 100
        : 0

    const seekTo = (e: any) => {
        const ex = e.clientX;
        const { x, width } = ref.current.getBoundingClientRect();
        const factor = (ex - x) / width // [0, 1]
        const duration = currentTrack ? currentTrack.duration_ms : 0
        const seek_position_ms = factor * duration
        seek( seek_position_ms, () => setPosition( seek_position_ms ) )
    }

    return (
        <div className={playbackContainer + ' ' + progressContainer}>
            { currentTrack && formatTime(position_ms) }
            <div className={playbackBtn + ' ' + progressBar} ref={ref} onClick={seekTo}>
                <div className={progressBarProgress} style={{width: progress + '%'}}></div>
                <div className={progressBarBtn}></div>
            </div>
            { currentTrack && formatTime(currentTrack.duration_ms) }
        </div>
    )
}

export default Progress;