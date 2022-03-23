import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Header from "../components/playlist/header";
import Track, { TrackModel } from "../components/playlist/track";
import { MySession } from "../types/session";
import spotify from "./api/spotify";
import styles from '../components/playlist/Playlist.module.css'


export interface PlaylistModel {
    name: string;
    image: string;
    id: string;
    musics: TrackModel[]
}

const Home = ( { image, name, owner, tracks  } ) => {

    return (
        <div className={'playlist-wrapper'} style={{width: '100%', display: 'flex', 'flexDirection': 'column'}}>
            <Header name={name} image={image} owner={owner}/>
            { tracks !== undefined
                ? <div className={styles.playlistwrapper}>
                    <div className={styles.playlistcontainer}>
                        { tracks.map( (track: TrackModel, i: number) => 
                            <Track key={`track-${Math.random()}`} track={track} index={i} /> 
                        ) }
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {  
    const session = await getSession(ctx) as MySession
    const playlistID = ctx.params.playlistID;
    console.log(playlistID);
    
    const playlist = await spotify.playlist(session, playlistID as string)
    const { images, name, owner, tracks } = playlist
    const image = images[0].url
    
    const { items } = tracks 

    const t = items
        .filter(item => item.track !== null)
        .map(item => {
        
            const { added_at, track } = item
            console.log(item);
            
            const { name, id, album, artists } = track;
            const albumName = album.name
            const image = album.images[Math.min(1, album.images.length - 1)].url
            const _artists = artists.map( artist => artist.name )
            
            return { added_at, name, id, image, artists: _artists, album: albumName, duration: track.duration_ms }
        })

    return { props: { image, name, owner, tracks: t } };
}

export default Home;
