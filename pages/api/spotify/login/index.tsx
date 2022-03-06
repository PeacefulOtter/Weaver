

import spotify from '../spotify'

export default function handler(req: any, res: any) {
    const loginURL = spotify.getLoginURL()
    res.status(200).json({url: loginURL})
}