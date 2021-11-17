import { Dispatch, FC, SetStateAction } from "react";
import { Toast } from ".";

type Props = {
	state: [boolean, Dispatch<SetStateAction<boolean>>];
	title: string;
	desc: string;
	icon: JSX.Element;
};

export const ToastResolver: FC<Props> = ({ desc, icon, state, title }) => {
	return <>{/* <Toast /> */}</>;
};
