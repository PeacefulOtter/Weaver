import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MySession } from "../../../types/session";
import spotify from "../spotify";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const { trackId, position_ms } = req.query
    const session = await getSession({ req }) as MySession;

    const ms = Math.round(Number(position_ms))

    const resp = await spotify(session).resume(trackId as string, ms);

    console.log(resp);
    

    res.status(200).json({});
}