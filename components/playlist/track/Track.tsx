import { FC } from "react";
import { useSpotify } from "../../../context/SpotifyContext";

import styles from './Track.module.css'

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

export interface TrackModel {
    playTrack: (id: string) => () => void;
    added_at: string;
    name: string;
    id: string;
    image: string
    artists: string[];
    album: string;
    duration: number;
}

interface TrackProps extends TrackModel {
    index: number
}

const formatDate = (date: string) => {
    const d = new Date(date)
    const day = d.getDate()
    const month = monthNames[d.getMonth()].substring(0, 3)
    const year = d.getFullYear()
    return day + ' ' + month + ' ' + year
}

const formatTime = (ms: number) => {

    const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
  
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

const track: FC<TrackProps> = ( { index, id, name, artists, album, image, added_at, duration } ) => {

    const { currentTrackID, playTrack } = useSpotify()

    const currentTrackStyle = currentTrackID === id 
        ? ' ' + styles.activeTrack : ''

    return (
        <div className={styles.trackwrapper + currentTrackStyle} onClick={playTrack(id)}>
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