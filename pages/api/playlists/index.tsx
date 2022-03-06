
import SpotifyWebApi from 'spotify-web-api-node';

const USERNAME = "laalfzw2l71e8kbijo36ykulk"
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = "http://127.0.0.1:3000";
console.log(CLIENT_ID);
console.log(CLIENT_SECRET);
console.log(REDIRECT_URI);
console.log('here');


// credentials are optional
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


const getURL = () => {
    return spotifyApi.createAuthorizeURL(scopes, state)
}

export default function handler(req: any, res: any) {
    console.log(CLIENT_ID);
    
    // res.status(200).json({id: getURL()})
    res.redirect(getURL())
}