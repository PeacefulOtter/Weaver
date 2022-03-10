
import { useEffect, useState } from 'react';
import Header from './header';
import Music, { MusicModel } from './music';

import { get } from '../../assets/requests';

import styles from './Playlist.module.css'
import { useRouter } from 'next/router';

export interface PlaylistModel {
    name: string;
    image: string;
    id: string;
    musics: MusicModel[]
}

const Playlist = ( { id } ) => {

    const [playlist, setPlaylist] = useState<PlaylistModel | undefined>(undefined)

    useEffect( () => {
	    get( 'http://localhost:3000/api/spotify/playlist', { id }, setPlaylist )
    }, [id])

    return (
        <>
        <Header />
        { playlist !== undefined
            ? <div className={styles.playlistwrapper}>
                <div className={styles.playlistcontainer}>
                    { playlist.musics.map( (music: MusicModel, i: number) => 
                        <Music key={`Music${Math.random()}`} {...music} index={i} /> 
                    ) }
                </div>
            </div>
            : <></>
        }
        </>
    )
}

export default Playlist;