import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { parseCookies, setCookie } from "nookies";

export const useCookie = () => {
	const createCookie = (
		ctx:
			| Pick<NextPageContext, "res">
			| {
					res: NextApiResponse;
			  }
			| null,
		name: string,
		data: any
	) => setCookie(ctx, name, JSON.stringify(data), { secure: true, path: "/" });

	const getCookies = (
		ctx?:
			| Pick<NextPageContext, "req">
			| {
					req: NextApiRequest;
			  }
	) => parseCookies(ctx);

	return {
		createCookie,
		getCookies,
	};
};
