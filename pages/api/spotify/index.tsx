import { MySession } from "../../../types/session";

const SPOTIFY_URL = 'https://api.spotify.com/v1'

const spotifyFetch = async (path: string, session: MySession, fetchOptions: any = {} ) => {
    const init = { headers: {  Authorization: `Bearer ${session.user.accessToken}` } }
    const resp = await fetch( SPOTIFY_URL + path, { ...init, ...fetchOptions } )
    return resp
}

const spotifyGet = async (path: string, session: MySession) => {
    const resp = await spotifyFetch(path, session)
    return await resp.json()
}

const spotifyPost = async (path: string, session: MySession ) => {
    const fetchOptions = { method: "POST" }
    return await spotifyFetch(path, session, fetchOptions)
} 

const spotifyPut = async (path: string, session: MySession, body: any = {}, query: any = '' ) => {
    const fetchOptions = {
        method: "PUT",
        body: JSON.stringify(body),
    }
    return await spotifyFetch(path + query, session, fetchOptions)
}

const spotify = (session: MySession) => { 
    return {
        me: async () => await spotifyGet("/me", session),
        playlists: async () => await spotifyGet('/me/playlists', session),
        playlist: async (playlistId: string) => await spotifyGet('/playlists/' + playlistId, session),
        play: async (trackId: string) => await spotifyPut('/me/player/play', session, {uris: [`spotify:track:${trackId}`]}),
        pause: async () => await spotifyPut('/me/player/pause', session),
        resume: async (trackId: string, position_ms: number) => await spotifyPut('/me/player/play', session, {uris: [`spotify:track:${trackId}`], position_ms}),
        currentlyPlaying: async () => await spotifyGet('/me/player/currently-playing', session),
        seek: async (position_ms: number) => await spotifyPut('/me/player/seek', session, {}, '?position_ms='+position_ms ),
        prev: async () => await spotifyPost('/me/player/previous', session ),
        next: async () => await spotifyPost('/me/player/next', session ),
    }
}

export default spotify;