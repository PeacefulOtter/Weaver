import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MySession } from "../../../types/session";
import spotify from "../spotify";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const { position_ms } = req.query
    const session = await getSession({ req }) as MySession;

    const ms = Math.round(Number(position_ms))

    const resp = await spotify(session).seek(ms);
    
    res.status(200).json({})
}