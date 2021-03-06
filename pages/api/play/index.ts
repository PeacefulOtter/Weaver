import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MySession } from "../../../types/session";
import spotify from "../spotify";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const { id } = req.query
    const session = await getSession({ req }) as MySession;

    const track = await spotify(session).play(id as string);

    res.status(200).json(track);
}