import { FC } from "react";

import TrackIndex from "./track-index/TrackIndex";

import { formatDate, formatTime } from "../../../assets/formats";
import { useSpotify } from "../../../context/SpotifyContext";
import useHover from "../../../hooks/useHover";
import { TrackModel } from "../../../models/models";

import styles from './Track.module.css'


interface TrackProps {
    index: number;
    track: TrackModel;
    isCurrentTrack: boolean;
}

const track: FC<TrackProps> = ( { index, track, isCurrentTrack } ) => {

    const { isHover, onMouseEnter, onMouseLeave } = useHover()

    const { name, artists, album, image, added_at, duration_ms } = track;
    const {  playTrack } = useSpotify()

    const currentTrackStyle = isCurrentTrack ? ' ' + styles.activeTrack : ''

    return (
        <div 
            className={styles.trackwrapper + currentTrackStyle} 
            onClick={playTrack(track)} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <TrackIndex isHover={isHover} index={index} isCurrentTrack={isCurrentTrack}/>
            <div className={styles.trackimg + " img"} style={{backgroundImage: `url(${image})`}}></div>
            <div className={styles.tracktitleauthor}>
                <div className={styles.tracktitle}>{name}</div>
                <div className={styles.trackauthor}>{artists.join(', ')}</div>
            </div>
            <div className={styles.trackalbum}>{album}</div>
            <div className={styles.trackdate}>{formatDate(added_at)}</div>
            <div className={styles.trackduration}>{formatTime(duration_ms)}</div>
        </div>
    )
}

export default track;