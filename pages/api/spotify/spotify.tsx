

import SpotifyWebApi from 'spotify-web-api-node';

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = "http://127.0.0.1:3000/api/spotify/logged";

const spotifyApi = new SpotifyWebApi( {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
} );

const scopes = [
    "playlist-read-private",
    "user-read-private",
    "user-read-playback-state",
    "user-read-playback-position",
    "app-remote-control",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-library-read",
    "streaming",
    "user-top-read",
]

const state = "dev-state"

let a = 0;

const spotify = {
    getLoginURL: () => spotifyApi.createAuthorizeURL(scopes, state),
    setTokens: async (code: string) => {
        console.log(a++);
        const tokens = await spotifyApi.authorizationCodeGrant(code)
        spotifyApi.setAccessToken(tokens.body['access_token']);
        spotifyApi.setRefreshToken(tokens.body['refresh_token']);
    },
    me: async () => await spotifyApi.getMe(),
    getPlaylists: async (userId: string) => await spotifyApi.getUserPlaylists(userId),
    getPlaylist: async (id: string) => await spotifyApi.getPlaylist(id)
}

export default spotify;