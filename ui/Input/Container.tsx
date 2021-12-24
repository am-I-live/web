import { FC } from "react";

type Props = {
	className: string;
	label?: string;
};

export const InputContainer: FC<Props> = ({ className, label, children }) => {
	return (
		<div className={className}>
			<p className="text-white mb-3">{label}</p>

			{children}
		</div>
	);
};
