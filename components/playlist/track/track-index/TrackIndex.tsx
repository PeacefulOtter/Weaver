import { FC } from 'react';
import { FiPlay, FiPause, FiBarChart2 } from 'react-icons/fi'

import styles from '../Track.module.css'

interface ITrackIndex {
    isHover: boolean;
    index: number;
    isCurrentTrack: boolean;
}

const TrackIndex: FC<ITrackIndex> = ( { isHover, index, isCurrentTrack } ) => {

    const color = isCurrentTrack 
        ? 'var(--green)' 
        : 'white'

    const iconStyle = { padding: 0, fill: color, stroke: color }

    return (
        <div className={styles.trackindex} style={ { color } }>
            { isHover 
                ? isCurrentTrack 
                    ? <FiPause style={ iconStyle }/>
                    : <FiPlay  style={ iconStyle }/>
                : <>{index + 1}</>
            }
        </div>
    )
}


export default TrackIndex;