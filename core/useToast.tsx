import { ToastEvent } from "../pages/_app";

export const useToast = () => {
	const ErrorToast = (_title: string, _message: string) => {
		ToastEvent.emit({ type: "error", title: _title, message: _message });
	};

	const InfoToast = (_title: string, _message: string) => {
		ToastEvent.emit({
			type: "info",
			title: _title,
			message: _message,
		});
	};

	const SuccessToast = (_title: string, _message: string) => {
		ToastEvent.emit({ type: "success", title: _title, message: _message });
	};

	return {
		ErrorToast,
		SuccessToast,
		InfoToast,
	};
};
