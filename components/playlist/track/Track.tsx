import { FC } from "react";

import TrackIndex from "./TrackIndex";

import { formatDate, formatTime } from "../../../assets/formats";
import { useSpotify } from "../../../context/SpotifyContext";
import useHover from "../../../hooks/useHover";
import { Track } from "../../../models/models";

import styles from './Track.module.css'


interface ITrack {
    index: number;
    track: Track;
    isCurrentTrack: boolean;
}

const TrackLi: FC<ITrack> = ( { index, track, isCurrentTrack } ) => {

    const { isHover, onMouseEnter, onMouseLeave } = useHover()

    const { name, artists, album, image, added_at, duration_ms } = track;
    const {  playTrack } = useSpotify()

    const currentTrackStyle = isCurrentTrack ? ' ' + styles.activeTrack : ''
    const color = isCurrentTrack ? 'var(--green)' : 'white'

    return (
        <div 
            className={styles.trackwrapper + currentTrackStyle} 
            onClick={playTrack(index)} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <TrackIndex isHover={isHover} index={index} color={color} isCurrentTrack={isCurrentTrack}/>
            <div className={styles.trackimg + " img"} style={{backgroundImage: `url(${image})`}}></div>
            <div className={styles.tracktitleauthor}>
                <div className={styles.tracktitle} style={{color: color}}>{name}</div>
                <div className={styles.trackauthor}>{artists.join(', ')}</div>
            </div>
            <div className={styles.trackalbum}>{album}</div>
            <div className={styles.trackdate}>{formatDate(added_at)}</div>
            <div className={styles.trackduration}>{formatTime(duration_ms)}</div>
        </div>
    )
}

export default TrackLi;