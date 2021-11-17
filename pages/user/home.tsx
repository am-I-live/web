import router from "next/router";
import { setCookie } from "nookies";
import { FC } from "react";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { useCookie } from "../../core/useCookie";
import { Button } from "../../ui/Button";
import { supa } from "../_app";

const home: FC = () => {
	const { createCookie } = useCookie();

	supa.auth.getSessionFromUrl().then(({ data }) => {
		// if (data == null) {
		// 	return router.push("/login");
		// }

		createCookie(null, "__sess", data);
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
							text="Connect Twitch"
							icon={<FaTwitch size={18} className="mr-3 mt-1" />}
						/>

						<Button
							color="red"
							onClick={() => null}
							text="Connect Youtube"
							icon={<FaYoutube size={18} className="mr-3 mt-1" />}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default home;
