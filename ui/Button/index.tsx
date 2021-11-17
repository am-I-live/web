import { FC } from "react";

type ButtonProps = {
	text: string;
	onClick: () => void;
	icon?: JSX.Element;
	paddingX?: number;
	paddingY?: number;
	textSize?: string;
	color?: string;
};

export const Button: FC<ButtonProps> = ({
	onClick,
	text,
	icon,
	paddingX,
	paddingY,
	textSize,
	color,
}) => {
	return (
		<span className="inline-flex rounded-md shadow-sm">
			<button
				type="button"
				onClick={onClick}
				className={`inline-flex items-center px-${paddingX || 6} py-${
					paddingY || 3
				} border border-transparent ${
					textSize || "text-base"
				} leading-6 font-medium rounded-md text-white bg-${
					color || "indigo"
				}-700 hover:bg-${
					color || "indigo"
				}-600 focus:outline-none focus:border-${
					color || "indigo"
				}-700 focus:shadow-outline-${color || "indigo"} active:bg-${
					color || "indigo"
				}-700 transition ease-in-out duration-150`}
			>
				{icon}
				{text}
			</button>
		</span>
	);
};

export const BigButton: FC<ButtonProps> = ({
	onClick,
	text,
	icon,
	paddingX,
	paddingY,
	textSize,
	color,
}) => {
	return (
		<span className="inline-flex rounded-md shadow-sm">
			<button
				type="button"
				onClick={onClick}
				className={`inline-flex items-center px-${paddingX || 6} py-${
					paddingY || 3
				} border border-transparent ${
					textSize || "text-base"
				} leading-6 font-medium rounded-md text-white bg-${
					color || "indigo"
				}-700 hover:bg-${
					color || "indigo"
				}-600 focus:outline-none focus:border-${
					color || "indigo"
				}-700 focus:shadow-outline-${color || "indigo"} active:bg-${
					color || "indigo"
				}-700 transition ease-in-out duration-150`}
			>
				{icon}
				{text}
			</button>
		</span>
	);
};
