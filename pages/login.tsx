import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { FC, useEffect, useLayoutEffect, useState } from "react";
import { FaMagic, FaTwitch } from "react-icons/fa";

import { BASE_URI, supa } from "./_app";
import { parseCookies } from "nookies";
import { Session, User } from "@supabase/supabase-js";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const cookie = parseCookies(ctx)["__sess"];

	if (cookie == null) {
		return { props: {} };
	}

	const currentSession: Session = JSON.parse(cookie);

	if (currentSession == null || currentSession.access_token == null)
		return { props: {} };

	const session = await supa.auth.api.getUser(currentSession.access_token);
	const activeSession = session != null && session.data != null;

	return {
		props: {
			activeSession: activeSession,
			session: currentSession,
		},
	};
};

type Props = {
	activeSession: boolean;
	session: User;
};

const login: FC<Props> = ({ activeSession, session }) => {
	const router = useRouter();
	const [showMagicMail, setMagicMail] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (activeSession) router.push("/user/home");
	}, []);

	return (
		<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-twitch-grey py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{showMagicMail ? (
						<MagicLinkPage />
					) : (
						<CredinetialsPage changeView={() => setMagicMail(true)} />
					)}
				</div>
			</div>
		</div>
	);
};

type CredinetialsProps = {
	changeView: () => void;
};

const CredinetialsPage: FC<CredinetialsProps> = ({ changeView }) => {
	const [email, setEmail] = useState<string>();

	const authWithTwitch = () =>
		supa.auth.signIn(
			{
				provider: "twitch",
			},
			{
				redirectTo: "http://" + BASE_URI + "/user/home",
			}
		);

	const authWithMagic = () => {
		if (email == null) {
			return;
		}

		supa.auth.api.sendMagicLinkEmail(email, {
			redirectTo: "http://" + BASE_URI + "/user/home",
		});

		changeView();
	};

	return (
		<>
			<form className="space-y-6" action="#" method="POST">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-white"
					>
						Email address
					</label>
					<div className="mt-2">
						<input
							onChange={(e) => setEmail(e.currentTarget.value)}
							id="email"
							name="email"
							type="email"
							placeholder="elon@spacex.com"
							autoComplete="email"
							required
							className="appearance-none block w-full px-4 py-3 border-2 border-gray-700 bg-twitch-grey rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<button
						type="button"
						onClick={() => authWithMagic()}
						className="w-full flex justify-center py-2 px-4 leading-6 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
					>
						Sign in
					</button>
				</div>
			</form>

			<div className="mt-6">
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-600" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-twitch-grey text-gray-400">
							Or continue with
						</span>
					</div>
				</div>

				<div className="mt-6">
					<div>
						<a
							onClick={() => authWithTwitch()}
							className="w-full cursor-pointer inline-flex justify-center py-2 px-4 border-2 border-gray-600 rounded-md shadow-sm bg-twitch-grey text-sm font-medium text-gray-500 hover:bg-gray-600 hover:text-gray-50"
						>
							<span className="sr-only">Sign in with Twitch</span>
							<FaTwitch size={24} />
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

const MagicLinkPage: FC = () => {
	return (
		<div className="text-center">
			<div className="flex justify-center">
				<FaMagic size={36} />
			</div>

			<div className="flex flex-col mt-4">
				<h2 className="text-2xl font-medium">Check your email!</h2>
				<p className="text-base text-gray-400">
					we sent you a login link to your email, if its not there check your
					spam folder.
				</p>
			</div>
		</div>
	);
};

export default login;
