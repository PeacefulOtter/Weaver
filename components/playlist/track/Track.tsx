import { FC } from "react";
import { formatDate, formatTime } from "../../../assets/formats";
import { useSpotify } from "../../../context/SpotifyContext";
import { TrackModel } from "../../../models/models";

import styles from './Track.module.css'


interface TrackProps {
    index: number
    track: TrackModel
}

const track: FC<TrackProps> = ( { index, track } ) => {

    const { id, name, artists, album, image, added_at, duration } = track;
    const { currentTrack, playTrack } = useSpotify()

    const currentTrackStyle = currentTrack && currentTrack.id === id 
        ? ' ' + styles.activeTrack : ''

    return (
        <div className={styles.trackwrapper + currentTrackStyle} onClick={playTrack(track)}>
            <div className={styles.trackindex}>{index + 1}</div>
            <div className={styles.trackimg + " img"} style={{backgroundImage: `url(${image})`}}></div>
            <div className={styles.tracktitleauthor}>
                <div className={styles.tracktitle}>{name}</div>
                <div className={styles.trackauthor}>{artists.join(', ')}</div>
            </div>
            <div className={styles.trackalbum}>{album}</div>
            <div className={styles.trackdate}>{formatDate(added_at)}</div>
            <div className={styles.trackduration}>{formatTime(duration)}</div>
        </div>
    )
}

export default track;