import { MySession } from "../../../types/session";

const SPOTIFY_URL = 'https://api.spotify.com/v1'

const spotifyFetch = async (path: string, session: MySession, fetchOptions: any ) => {
    const init = { headers: {  Authorization: `Bearer ${session.user.accessToken}` } }
    return await fetch( SPOTIFY_URL + path, { ...init, ...fetchOptions } )
}

const spotifyPost = async (path: string, session: MySession ) => {
    const res = await spotifyFetch(path, session, {})
    return await res.json()
}

const spotifyPut = async (path: string, session: MySession, trackId: string ) => {
    const fetchOptions = {
        method: "PUT",
        body: JSON.stringify({uris: [`spotify:track:${trackId}`]})
    }
    await spotifyFetch(path, session, fetchOptions)
}

const spotify = { 
    me: async (session: MySession) => 
        await spotifyPost("/me", session),
    playlists: async (session: MySession) => 
        await spotifyPost('/me/playlists', session),
    playlist: async (session: MySession, playlistId: string) => 
        await spotifyPost('/playlists/' + playlistId, session),
    play: async (session: MySession, trackId: string) => 
        await spotifyPut('/me/player/play', session, trackId)
}

export default spotify;