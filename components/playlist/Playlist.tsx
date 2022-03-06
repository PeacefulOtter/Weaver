

import Music, { MusicModel } from './music';

import styles from './Playlist.module.css'

const Playlist = ( { playlist } ) => {

    return (
        <>
        <div className={styles.playlistwrapper}>
            <div className={styles.playlistcontainer}>
                { playlist.map( (music: MusicModel, i: number) => 
                    <Music key={`Music${Math.random()}`} {...music} index={i} /> 
                ) }
            </div>
        </div>
        </>
        
    )
}

export default Playlist;