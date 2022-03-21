import { MySession } from "../../../types/session";

const SPOTIFY_URL = 'https://api.spotify.com/v1'

const spotifyFetch = async (path: string, session: MySession, args?: string ) => {

    const init = {
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
        }
    }
    
    const putInit = args !== undefined 
        ? {
            method: args !== undefined ? "PUT" : "GET",
            body: JSON.stringify({uris: [`spotify:track:${args}`]})
        } : {}

    console.log({...init, ...putInit});

    const res = await fetch( SPOTIFY_URL + path, { ...init, ...putInit } )

    return await res.json()
}

const spotify = { 
    me: async (session: MySession) => 
        await spotifyFetch("/me", session),
    playlists: async (session: MySession) => 
        await spotifyFetch('/me/playlists', session),
    playlist: async (session: MySession, playlistId: string) => 
        await spotifyFetch('/playlists/' + playlistId, session),
    play: async (session: MySession, trackId: string) => 
        await spotifyFetch('/me/player/play', session, trackId)
}

export default spotify;