import { FC } from "react";

type Props = {
	onChange: (e: string) => void;
	placeholder?: string;
	id?: string;
	name?: string;
	autoComplete?: string;
	required?: boolean;
	type?: string;
};

export const Input: FC<Props> = ({
	id,
	name,
	onChange,
	placeholder,
	required,
	autoComplete,
	type,
}) => {
	return (
		<input
			onChange={(e) => onChange(e.currentTarget.value)}
			id={id}
			name={name}
			type={type}
			placeholder={placeholder}
			autoComplete={autoComplete}
			required={required}
			className="appearance-none block w-full px-4 py-3 border-2 border-gray-700 bg-twitch-grey rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>
	);
};
