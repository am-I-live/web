// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

// jamies user id 48234453
// lana lux 112375357

const TWITCH_BEAER = process.env.NEXT_PUBLIC_TWITCH_BEARER;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { data, status } = await axios.get(
		"https://api.twitch.tv/helix/streams",
		{
			params: {
				user_id: req.body.user_id,
			},
			headers: {
				"Client-ID": "gjmrqd4mdfympmti3ss1ah8r34mmc2",
				Authorization: "Bearer " + TWITCH_BEAER,
			},
		}
	);

	res.send({
		...data,
	});
}
