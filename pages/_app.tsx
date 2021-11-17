import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import router from "next/router";

import Pulse, { Event } from "@pulsejs/next";
import type { AppProps } from "next/app";
import { createClient } from "@supabase/supabase-js";
import { ToastType } from "../types/toast.type";

export const Core = new Pulse();

export const BASE_URI = process.env.NEXT_PUBLIC_URI!;

export const ToastEvent = new Event<ToastType>(() => Core);

export const supa = createClient(
	process.env.NEXT_PUBLIC_SUPA_URL!,
	process.env.NEXT_PUBLIC_KEY!,
	{
		autoRefreshToken: true,
		detectSessionInUrl: true,
		persistSession: true,
	}
);

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* {ToastEvent.on((props) => (
				<Toast {...props} />
			))} */}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
