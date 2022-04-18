import { FC } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi'
import { useSpotify } from '../../../context/SpotifyContext';

import styles from './Track.module.css'

interface ITrackIndex {
    isHover: boolean;
    index: number;
    color: string;
    isCurrentTrack: boolean;
}

const TrackIndex: FC<ITrackIndex> = ( { isHover, index, color, isCurrentTrack } ) => {

    const { isPlaying } = useSpotify()

    const iconStyle = { padding: 0, fill: color, stroke: color }

    return (
        <div className={styles.trackindex} style={ { color } }>
            { isHover 
                ? isCurrentTrack && isPlaying
                    ? <FiPause style={ iconStyle }/>
                    : <FiPlay  style={ iconStyle }/>
                : <>{index + 1}</>
            }
        </div>
    )
}


export default TrackIndex;