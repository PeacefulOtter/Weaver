import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Header from "../components/playlist/header/Header";
import TrackLi from "../components/playlist/track/Track";

import { MySession } from "../types/session";
import spotify from "./api/spotify";
import vibrant from "../assets/color";
import { useSpotify } from "../context/SpotifyContext";
import { Playlist, Track } from "../models/models";

import styles from '../components/playlist/Playlist.module.css'
import { FC, useEffect } from "react";

interface IHome {
    playlist: Playlist;
    tracks: Track[]
}

const Home: FC<IHome> = ( { playlist, tracks } ) => {

    const { setCurTracks, currentTrack } = useSpotify()

    useEffect( () => {
        setCurTracks( tracks );
    }, [tracks])

    return (
        <div className={'playlist-wrapper'} style={{width: '100%', display: 'flex', 'flexDirection': 'column'}}>
            <Header playlist={playlist}/>

            <div className={styles.playlistwrapper}>
                <div className={styles.playlistcontainer}>
                    { tracks !== undefined
                        ? tracks.map( (track: Track, i: number) => 
                            <TrackLi 
                                key={`track-${Math.random()}`} 
                                track={track} 
                                index={i} 
                                isCurrentTrack={currentTrack && track.id === currentTrack.id}
                            />
                        )
                        : null 
                    }
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {  
    const session = await getSession(ctx) as MySession

    const playlistID = ctx.params.playlistID;
    
    const playlist = await spotify(session).playlist(playlistID as string)        
    
    const { images, name, owner, tracks } = playlist
    const image = images[0].url
    const color = await vibrant.getColor(image)

    const { items, total, next } = tracks
    const { display_name, type } = owner;

    const _owner = { display_name, id: owner.id, type }

    const _playlist: Playlist = { id: playlist.id, color, image, name, owner: _owner, totalTracks: total }
    
    const _tracks: Track[] = items
        .filter( (item: any) => item.track !== null)
        .map( (item: any) => {
            const { added_at, track } = item
            const { name, id, album, artists, duration_ms } = track;
            const albumName = album.name
            const image = album.images[Math.min(1, album.images.length - 1)].url
            const _artists = artists.map( artist => artist.name )
            
            return { 
                added_at, name, id, image, 
                artists: _artists, album: albumName, 
                duration_ms 
            }
        })

    return { props: { playlist: _playlist, tracks: _tracks } };
}

export default Home;
