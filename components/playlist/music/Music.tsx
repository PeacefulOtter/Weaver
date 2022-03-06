import { FC } from "react";

import styles from './Music.module.css'

export interface MusicModel {
    title: string;
    author: string;
    album: string;
    date: string;
    duration: string;
}

interface MusicProps extends MusicModel {
    index: number
}

const Music: FC<MusicProps> = ( { index, title, author, album, date, duration } ) => {

    return (
        <div className={styles.musicwrapper}>
            <div className={styles.musicindex}>{index}</div>
            <div className={styles.musicimg + " img"}></div>
            <div className={styles.musictitleauthor}>
                <div className={styles.musictitle}>{title}</div>
                <div className={styles.musicauthor}>{author}</div>
            </div>
            <div className={styles.musicalbum}>{album}</div>
            <div className={styles.musicdate}>{date}</div>
            <div className={styles.musicduration}>{duration}</div>
        </div>
    )
}

export default Music;