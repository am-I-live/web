import styles from "../styles/Home.module.css";

import axios from "axios";

import { FC } from "react";
import { Stream } from "../types/steam.type";
import { VOD } from "../types/vod.type";
import router from "next/router";
import { GetServerSidePropsContext } from "next";
import { GetStreamer, StreamerDatum } from "../types/streamer.type";

const BASE_URI = process.env.NEXT_PUBLIC_URI;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const name = ctx.query.streamer;

	const rawStreamer = await axios.post<GetStreamer>(
		"http://" + BASE_URI + "/api/get_streamer",
		{
			name: name,
		}
	);

	const streamer =
		rawStreamer.data.data != null ? rawStreamer.data.data[0] : null;

	if (streamer == null) {
		return {
			props: {
				stream: null,
				vods: null,
				user: null,
			},
		};
	}

	const stream = await axios.post<Stream>(
		"http://" + BASE_URI + "/api/get_stream",
		{
			user_id: streamer.id,
		}
	);

	const vods = await axios.post<VOD>("http://" + BASE_URI + "/api/get_vods", {
		user_id: streamer.id,
	});

	return {
		props: {
			stream: stream.data,
			vods: vods.data,
			user: streamer,
		},
	};
};

type Props = {
	vods: VOD;
	stream: Stream;
	user: StreamerDatum;
};

const streamer: FC<Props> = ({ stream, vods, user }) => {
	if (user == null) {
		return (
			<main className={styles.main}>
				<div className="bg-twitch-grey text-white p-10 rounded-lg shadow-md border-1 border-gray-300">
					<h2 className="text-center text-4xl">User Not Found. 😢</h2>
				</div>
			</main>
		);
	}

	const resolveRedirect =
		vods.data[0] != null
			? vods.data[0].url
			: "https://twitch.tv/" + user.display_name;

	return (
		<div>
			<main className={styles.main}>
				<div className="bg-twitch-grey text-white p-6 rounded-lg shadow-md border-1 border-gray-400">
					<div className="flex flex-row">
						{stream.data[0] == null ? (
							<h2 className="text-3xl">{user.display_name} is offline 😞</h2>
						) : (
							<div className="ml-3 flex flex-row mt-2">
								<img
									className="rounded-full w-24 mr-4"
									src={user.profile_image_url}
									alt={"logo"}
								/>

								<span className="flex flex-col">
									<h2>{stream.data[0].title}</h2>
									<h2>Streaming: {stream.data[0].game_name}</h2>
									<h3>Viewers: {stream.data[0].viewer_count}</h3>
								</span>
							</div>
						)}
					</div>

					{stream.data[0] == null ? (
						<span className="rounded-md shadow-sm">
							<button
								onClick={() => router.push(resolveRedirect)}
								type="button"
								className="mt-5 w-full px-3 py-4 border border-transparent text-xl leading-4 font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
							>
								{vods.data[0] != null
									? "Watch Latest Vod " + vods.data[0].title
									: "Visit Channel"}
							</button>
						</span>
					) : (
						<span className="rounded-md shadow-sm">
							<button
								onClick={() =>
									router.push(`https://www.twitch.tv/${user.display_name}`)
								}
								type="button"
								className="mt-5 w-full px-3 py-4 border border-transparent text-xl leading-4 font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
							>
								View Stream
							</button>
						</span>
					)}
				</div>
			</main>
		</div>
	);
};

export default streamer;
