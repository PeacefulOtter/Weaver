import { MySession } from "../../../types/session";

const SPOTIFY_URL = 'https://api.spotify.com/v1'

const spotifyFetch = async (path: string, session: MySession) => {
    console.log(session);
    
    const res = await fetch( SPOTIFY_URL + path, {
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
    } )

    return await res.json()
}

const spotify = { 
    me: async (session: MySession) => 
        await spotifyFetch("/me", session),
    playlists: async (session: MySession) => 
        await spotifyFetch('/me/playlists', session),
    playlist: async (session: MySession, playlistId: string) => 
        await spotifyFetch('/playlists/' + playlistId, session),
}


export default spotify;