import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MySession } from "../../../types/session";
import spotify from "../spotify";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const session = await getSession({ req }) as MySession;

    const playlists = await spotify.playlists(session);

    res.status(200).json(playlists);
}