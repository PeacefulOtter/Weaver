

import spotify from '../spotify'

export default async function handler(req: any, res: any) {
    const code = req.query.code;
    await spotify.setTokens(code)
    res.redirect('/playlists')
}