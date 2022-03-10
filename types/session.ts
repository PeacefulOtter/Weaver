import { DefaultSession } from "next-auth";


interface MyUser {
    accessToken?: string | null;
}
  
export interface MySession extends Omit<DefaultSession, "user"> {
    user?: MyUser;
    expires: string;
}

// const LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=playlist-read-private%20user-read-private%20user-read-playback-state%20user-read-playback-position%20app-remote-control%20user-modify-playback-state%20user-read-currently-playing%20user-library-read%20streaming%20user-top-read&state=dev-state`
// export default function handler(req: any, res: any) {
//     res.json({url: LOGIN_URL})
// }