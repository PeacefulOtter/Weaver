import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Header from "../components/playlist/header/Header";
import Track from "../components/playlist/track/Track";

import { MySession } from "../types/session";
import spotify from "./api/spotify";
import vibrant from "../lib/color";
import { useSpotify } from "../context/SpotifyContext";
import { TrackModel } from "../models/models";

import styles from '../components/playlist/Playlist.module.css'


export interface PlaylistModel {
    name: string;
    image: string;
    id: string;
    tracks: TrackModel[]
}

const Home = ( { color, image, name, owner, total, tracks  } ) => {

    const { currentTrack } = useSpotify()

    return (
        <div className={'playlist-wrapper'} style={{width: '100%', display: 'flex', 'flexDirection': 'column'}}>
            <Header color={color} name={name} image={image} owner={owner} total={total}/>
                <div className={styles.playlistwrapper}>
                    <div className={styles.playlistcontainer}>
                        { tracks !== undefined
                            ? tracks.map( (track: TrackModel, i: number) => 
                                <Track 
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
    console.log(playlist);
    
    const { images, name, owner, tracks } = playlist
    const image = images[0].url
    const color = await vibrant.getColor(image)

    const { items, total, next } = tracks
    
    // NEXT_REQUEST = next 'https://api.spotify.com/v1/playlists/3t0U0T2GvsHQDZTHM2LUmh/tracks?offset=100&limit=100'

    const _tracks: TrackModel[] = items
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

    return { props: { color, image, name, owner, total, tracks: _tracks } };
}

export default Home;
