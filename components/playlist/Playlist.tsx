
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Music, { MusicModel } from './music';

import { get } from '../../assets/requests';

import styles from './Playlist.module.css'

const Playlist = () => {

    const { query } = useRouter()
    const [ musics, setMusics ] = useState<MusicModel[]>([])

    useEffect( () => {
        if ( !query.id ) return;

        get( '/api/playlist', query, (data) => {
            console.log(data);
            setMusics(data)
        } )
    
    }, [query] )
    


    return (
        <div className={styles.playlistwrapper}>
            <div className={styles.playlistcontainer}>
                { musics.map( (music: MusicModel, i: number) => 
                    <Music {...music} index={i} /> 
                ) }
            </div>
        </div>
    )
}

export default Playlist;