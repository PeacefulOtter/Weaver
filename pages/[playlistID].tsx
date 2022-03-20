import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Header from "../components/playlist/header";
import Music, { MusicModel } from "../components/playlist/music";
import { MySession } from "../types/session";
import spotify from "./api/spotify";
import styles from '../components/playlist/Playlist.module.css'


export interface PlaylistModel {
    name: string;
    image: string;
    id: string;
    musics: MusicModel[]
}

const Home = ( { image, name, owner, tracks  } ) => {

    return (
        <div className={'playlist-wrapper'} style={{width: '100%', display: 'flex', 'flexDirection': 'column'}}>
            <Header name={name} image={image} owner={owner}/>
            { tracks !== undefined
                ? <div className={styles.playlistwrapper}>
                    <div className={styles.playlistcontainer}>
                        { tracks.map( (track: MusicModel, i: number) => 
                            <Music key={`Music${Math.random()}`} {...track} index={i} /> 
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
    console.log(playlist);
    const { images, name, owner, tracks } = playlist
    const image = images[0].url
    console.log(image);
    
    const { items } = tracks 
    
    return { props: { image, name, owner, tracks: items } };
}

export default Home;
