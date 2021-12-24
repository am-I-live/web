import { Session, User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { FC, useEffect, useState } from "react";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { useCookie } from "../../core/useCookie";
import { Button } from "../../ui/Button";
import { supa } from "../_app";

import router from "next/router";
import { Input } from "../../ui/Input";
import { InputContainer } from "../../ui/Input/Container";
import { Textarea } from "../../ui/Textarea";

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

const home: FC<Props> = ({ activeSession }) => {
	const { createCookie, getCookies } = useCookie();
	const [username, setUsername] = useState<string>();
	const [bio, setBio] = useState<string>();
	const [disabled, setDisabled] = useState<boolean>(true);

	useEffect(() => {
		setDisabled(false);
	}, [username]);

	useEffect(() => {
		if (!activeSession == null) {
			router.push("/login");
		}
	});

	supa.auth.getSessionFromUrl().then(({ data }) => {
		if (data != null) {
			createCookie(null, "__sess", data);
		}
	});

	return (
		<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold">
					Your Account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
				<div className="bg-twitch-grey py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<span className="grid grid-flow-col space-x-5 justify-center">
						<Button
							onClick={() => null}
							disabled={true}
							text="Connect Twitch"
							icon={<FaTwitch size={18} className="mr-3 mt-1" />}
						/>

						<Button
							color="red"
							onClick={() => null}
							disabled={true}
							text="Connect Youtube"
							icon={<FaYoutube size={18} className="mr-3 mt-1" />}
						/>
					</span>

					<InputContainer className="mt-6 mx-3" label="Username">
						<Input placeholder="PewDiePie" onChange={(e) => setUsername(e)} />
					</InputContainer>
					<InputContainer className="mt-6 mx-3" label="Bio">
						<Textarea placeholder="Hi!" onChange={(e) => setBio(e)} />

						<div className="mt-5 w-full ml-auto">
							<Button disabled={disabled} text="Save" onClick={() => {}} />
						</div>
					</InputContainer>
				</div>
			</div>
		</div>
	);
};

export default home;
